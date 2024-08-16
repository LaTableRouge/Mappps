import { __experimentalUseBlockPreview as useBlockPreview } from '@wordpress/block-editor'
export default function PostTemplatePreview({ blockContextId, blocks, isHidden, setActiveBlockContextId }) {
  const blockPreviewProps = useBlockPreview({
    blocks,
    props: {
      className: 'post-template__record'
    }
  })

  const handleOnClick = () => {
    setActiveBlockContextId(blockContextId)
  }

  const style = {
    display: isHidden ? 'none' : undefined
  }

  return <li {...blockPreviewProps} role="button" style={style} tabIndex={0} onClick={handleOnClick} onKeyPress={handleOnClick} />
}
