import '../styles/editor.scss'

import { useBlockProps } from '@wordpress/block-editor'

import Controls from './components/Controls'
import Main from './main'

export default function Edit({ attributes, context, setAttributes }) {
  const blockProps = useBlockProps()
  const blockId = context['mppps/blockId']

  return (
    <div {...blockProps}>
      <Controls attributes={attributes} setAttributes={setAttributes} />
      <Main attributes={attributes} blockId={blockId} />
    </div>
  )
}
