import '../styles/editor.scss'

import { BlockContextProvider, useBlockProps } from '@wordpress/block-editor'
import { memo, useMemo, useState } from '@wordpress/element'

import PostTemplateInnerBlocks from './components/PostTemplateInnerBlocks'
import PostTemplatePreview from './components/PostTemplatePreview'
import GetBlocks from './utils/GetBlocks'

export default function Edit({ attributes, clientId, context, setAttributes }) {
  const blockProps = useBlockProps()

  // attributes & context are the states stored by Wordpress
  // They are defined in the block.json
  const postType = context['mps/postType']
  const postIDs = context['mps/postIDs']

  // States that aren't stored by Wordrpess
  // They are only usefull for the preview
  const [activeBlockContextId, setActiveBlockContextId] = useState()

  const blockContexts = useMemo(
    () =>
      postIDs?.slice(0, 10).map((id) => ({
        postType,
        postId: id
      })),
    [postIDs]
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
