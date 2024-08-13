import '../styles/editor.scss'

import { useBlockProps } from '@wordpress/block-editor'
import { useEffect, useState } from '@wordpress/element'

import Controls from './components/Controls'
import Main from './main'
import AlterBlockProps from './utils/AlterBlockProps'

export default function Edit({ attributes, context, isSelected, setAttributes }) {
  const blockId = context['mps/blockId']

  // BlockProps are the data that will be inserted into the main html tag of the block (style, data-attr, etc...)
  const blockProps = useBlockProps()

  // attributes are the states stored by Wordpress
  // They are defined in the block.json

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
    <div {...AlterBlockProps(blockProps, attributes)}>
      {!!posts.length && (
        <>
          <Controls attributes={attributes} setAttributes={setAttributes} />
          <Main attributes={attributes} blockId={blockId} queriedPosts={posts} />
        </>
      )}
    </div>
  )
}
