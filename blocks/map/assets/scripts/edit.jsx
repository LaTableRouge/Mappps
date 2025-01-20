import '../styles/editor.scss'

import { useBlockProps } from '@wordpress/block-editor'
import { useEffect, useState } from '@wordpress/element'

import Controls from './components/Controls'
import Main from './main'
import AlterBlockProps from './utils/AlterBlockProps'

export default function Edit({ attributes, context, setAttributes }) {
  const blockId = context['mppps/blockId']
  const blockProps = useBlockProps()
  const [posts, setPosts] = useState([])

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
      <Main attributes={attributes} blockId={blockId} inEditor={true} queriedPosts={posts} />
    </div>
  )
}
