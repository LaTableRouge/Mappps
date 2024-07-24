import '../styles/editor.scss'

import { useBlockProps } from '@wordpress/block-editor'

import Controls from './components/Controls'
import Loader from './components/Loader'

export default function Edit({ attributes, context, isSelected, setAttributes }) {
  const postIDs = context['mps/postIDs']

  const blockProps = useBlockProps()
  blockProps.style['--spinner-size'] = `${attributes.selectedSpinnerSize}px`

  return (
    <div {...blockProps} data-has-posts={!!postIDs.length}>
      <Controls attributes={attributes} setAttributes={setAttributes} />

      <Loader hasPosts={!!postIDs.length} />
    </div>
  )
}
