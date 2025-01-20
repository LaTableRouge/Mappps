import '../styles/editor.scss'

import { useBlockProps } from '@wordpress/block-editor'

import Main from './main'

export default function Edit({ context }) {
  const { 'mppps/blockId': blockId } = context

  const blockProps = useBlockProps()

  return (
    <div {...blockProps}>
      <Main blockId={blockId} />
    </div>
  )
}
