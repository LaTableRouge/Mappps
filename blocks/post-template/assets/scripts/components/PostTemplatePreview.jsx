import { __experimentalUseBlockPreview as useBlockPreview } from '@wordpress/block-editor'
import { useCallback } from '@wordpress/element'

export default function PostTemplatePreview({ blockContextId, blocks, isHidden, setActiveBlockContextId }) {
  const blockPreviewProps = useBlockPreview({
    blocks,
    props: {
      className: 'post-template__record'
    }
  })

  const handleClick = useCallback(() => {
    setActiveBlockContextId(blockContextId)
  }, [blockContextId, setActiveBlockContextId])

  return <li {...blockPreviewProps} role="button" style={{ display: isHidden ? 'none' : undefined }} tabIndex={0} onClick={handleClick} onKeyPress={handleClick} />
}
