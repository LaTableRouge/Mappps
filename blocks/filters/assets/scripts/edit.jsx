import '../styles/editor.scss'

import { useBlockProps } from '@wordpress/block-editor'
import { useEffect, useState } from '@wordpress/element'

import Controls from './components/Controls'
import Main from './main'
import AlterBlockProps from './utils/AlterBlockProps'

export default function Edit({ attributes, context, setAttributes }) {
  const { 'mppps/blockId': blockId, 'mppps/categories': categories, 'mppps/taxonomies': taxonomies } = context

  const blockProps = useBlockProps()
  const alteredProps = AlterBlockProps(blockProps, attributes)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const handleQueriedPosts = async (e) => {
      const { id, posts } = e.detail
      if (id === blockId) {
        setPosts(posts)
      }
    }

    document.addEventListener('mppps-queried-posts', handleQueriedPosts)
    return () => {
      document.removeEventListener('mppps-queried-posts', handleQueriedPosts)
    }
  }, [blockId])

  return (
    <div {...alteredProps}>
      <Controls attributes={attributes} setAttributes={setAttributes} />
      <Main blockId={blockId} categories={categories} queriedPosts={posts} taxonomies={taxonomies} />
    </div>
  )
}
