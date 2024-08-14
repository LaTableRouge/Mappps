import '../styles/editor.scss'

import { useBlockProps } from '@wordpress/block-editor'

import Controls from './components/Controls'
import Main from './main'

export default function Edit({ attributes, context, setAttributes }) {
  const blockId = context['mps/blockId']

  const blockProps = useBlockProps()

  return (
    <div {...blockProps}>
      <Controls limitedSearch={attributes.limitedSearch} setAttributes={setAttributes} />

      <Main attributes={attributes} blockId={blockId} />
    </div>
  )
}
