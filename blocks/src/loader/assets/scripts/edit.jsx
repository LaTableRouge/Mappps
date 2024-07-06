import '../styles/editor.scss'

import { useBlockProps } from '@wordpress/block-editor'

import Controls from './components/Controls'
import Loader from './components/Loader'

export default function Edit({ attributes, clientId, context, setAttributes }) {
  const postIDs = context['mps/postIDs']

  const blockProps = useBlockProps()
  blockProps.style['--spinner-size'] = `${attributes.selectedSpinnerSize}px`

  // attributes are the states stored by Wordpress
  // They are defined in the block.json

  // States that aren't stored by Wordrpess
  // They are only usefull for the preview

  return (
    <div {...blockProps} data-has-posts={!!postIDs.length}>
      <Controls attributes={attributes} setAttributes={setAttributes} />

      <Loader hasPosts={!!postIDs.length} />
    </div>
  )
}
