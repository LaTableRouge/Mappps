import '../styles/editor.scss'

import { BlockContextProvider, useBlockProps } from '@wordpress/block-editor'
import { memo, useEffect, useMemo, useState } from '@wordpress/element'

import Controls from './components/Controls'
import PostTemplateInnerBlocks from './components/PostTemplateInnerBlocks'
import PostTemplatePreview from './components/PostTemplatePreview'
import AlterBlockProps from './utils/AlterBlockProps'
import GetBlocks from './utils/GetBlocks'

export default function Edit({ attributes, clientId, context, isSelected, setAttributes }) {
  const blockId = context['mps/blockId']

  const blockProps = useBlockProps()

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

    document.addEventListener('mps-queried-posts', eventSetPosts)
    return () => {
      document.removeEventListener('mps-queried-posts', eventSetPosts)
    }
  }, [blockId])

  const blockContexts = useMemo(
    () =>
      posts.slice(0, 2).map((post) => ({
        postType: post.type,
        postId: post.id
      })),
    [posts]
  )

  const MemorizedPostTemplateBlockPreview = memo(PostTemplatePreview)

  const blocks = GetBlocks(clientId)

  return (
    <nav {...AlterBlockProps(blockProps, attributes)}>
      <Controls attributes={attributes} setAttributes={setAttributes} />

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
