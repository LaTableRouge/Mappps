import '../styles/editor.scss'

import { useBlockProps } from '@wordpress/block-editor'
import { useEffect, useState } from '@wordpress/element'

import Controls from './components/Controls'
import Main from './main'

export default function Edit({ attributes, context, setAttributes }) {
  const blockId = context['mps/blockId']
  const categories = context['mps/categories']
  const taxonomies = context['mps/taxonomies']

  const blockProps = useBlockProps()

  const [posts, setPosts] = useState([])

  useEffect(() => {
    async function eventSetPosts(e) {
      await e
      const details = e.detail
      if (details.id === blockId) {
        setPosts(details.posts)
      }
    }

    document.addEventListener('mps-queried-posts', eventSetPosts)
    return () => {
      document.removeEventListener('mps-queried-posts', eventSetPosts)
    }
  }, [blockId])

  return (
    <div {...blockProps}>
      <Controls attributes={attributes} setAttributes={setAttributes} />
      <Main blockId={blockId} categories={categories} queriedPosts={posts} taxonomies={taxonomies} />
    </div>
  )
}
