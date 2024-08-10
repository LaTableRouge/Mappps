import '../styles/editor.scss'

import { useBlockProps } from '@wordpress/block-editor'

import Controls from './components/Controls'
import Loader from './components/Loader'
import AlterBlockProps from './utils/AlterBlockProps'

export default function Edit({ attributes, context, isSelected, setAttributes }) {
  const postIDs = context['mps/postIDs']

  const blockProps = useBlockProps()

  return (
    <div {...AlterBlockProps(blockProps, attributes)} data-has-posts={!!postIDs.length}>
      <Controls attributes={attributes} setAttributes={setAttributes} />

      <Loader />
    </div>
  )
}
