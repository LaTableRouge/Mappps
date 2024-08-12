import '../styles/editor.scss'

import { BlockContextProvider, useBlockProps } from '@wordpress/block-editor'
import { memo, useEffect, useMemo, useState } from '@wordpress/element'

import PostTemplateInnerBlocks from './components/PostTemplateInnerBlocks'
import PostTemplatePreview from './components/PostTemplatePreview'
import GetBlocks from './utils/GetBlocks'

export default function Edit({ attributes, clientId, context, isSelected, setAttributes }) {
  const blockProps = useBlockProps()

  // attributes & context are the states stored by Wordpress
  // They are defined in the block.json
  const blockId = context['mps/blockId']

  // States that aren't stored by Wordrpess
  // They are only usefull for the preview
  const [activeBlockContextId, setActiveBlockContextId] = useState()
  const [posts, setPosts] = useState([])

  useEffect(() => {
    async function eventSetPosts(e) {
      await e
      const details = e.detail
      if (details.id === blockId) {
        setPosts(details.posts)
      }
    }

    document.addEventListener('mps-posts', eventSetPosts)
    return () => {
      document.removeEventListener('mps-posts', eventSetPosts)
    }
  }, [blockId])

  const blockContexts = useMemo(
    () =>
      posts.slice(0, 3).map((post) => ({
        postType: post.type,
        postId: post.id
      })),
    [posts]
  )

  const MemorizedPostTemplateBlockPreview = memo(PostTemplatePreview)

  const blocks = GetBlocks(clientId)

  return (
    <nav {...blockProps}>
      <ul>
        {blockContexts
          && blockContexts.map((blockContext) => (
            <BlockContextProvider key={blockContext.postId} value={blockContext}>
              {/* Editable block */}
              {blockContext.postId === (activeBlockContextId || blockContexts[0]?.postId) ? <PostTemplateInnerBlocks /> : null}
              {/* Other blocks just for the preview */}
              <MemorizedPostTemplateBlockPreview
                blockContextId={blockContext.postId}
                blocks={blocks}
                isHidden={blockContext.postId === (activeBlockContextId || blockContexts[0]?.postId)}
                setActiveBlockContextId={setActiveBlockContextId}
              />
            </BlockContextProvider>
          ))}
      </ul>
    </nav>
  )
}
