import '../styles/editor.scss'

import { InnerBlocks, useBlockProps } from '@wordpress/block-editor'
import { useSelect } from '@wordpress/data'
import { useEffect, useMemo, useState } from '@wordpress/element'

import Controls from './components/Controls'
import Main from './main'
import AlterBlockProps from './utils/AlterBlockProps'

const TEMPLATE = [['mppps/markers', {}]]

export default function Edit({ attributes, clientId, context, setAttributes }) {
  const blockId = context['mppps/blockId']
  const blockProps = useBlockProps()
  const [posts, setPosts] = useState([])

  // Get child blocks attributes
  const childBlocks = useSelect((select) => select('core/block-editor').getBlocks(clientId), [clientId])
  const childValues = useMemo(() => childBlocks.map(({ attributes, name }) => ({ name, attributes })), [childBlocks])
  useEffect(() => {
    if (childValues.length) {
      let markersConfig = childValues.find(({ name }) => name === 'mppps/markers')
      markersConfig = markersConfig.attributes
      setAttributes(markersConfig)
    }
  }, [childValues])

  useEffect(() => {
    const handlePosts = async (e) => {
      const { id, posts } = e.detail
      if (id === blockId) {
        setPosts(posts)
      }
    }

    document.addEventListener('mppps-queried-posts', handlePosts)
    return () => {
      document.removeEventListener('mppps-queried-posts', handlePosts)
    }
  }, [blockId])

  if (!posts.length) {
    return null
  }

  return (
    <div {...AlterBlockProps(blockProps, attributes)}>
      <Controls attributes={attributes} setAttributes={setAttributes} />
      <InnerBlocks template={TEMPLATE} templateLock="all" />
      <Main attributes={attributes} blockId={blockId} inEditor={true} queriedPosts={posts} />
    </div>
  )
}
