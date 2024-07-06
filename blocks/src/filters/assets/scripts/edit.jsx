import '../styles/editor.scss'

import { useBlockProps } from '@wordpress/block-editor'

export default function Edit({ attributes, setAttributes }) {
  const blockProps = useBlockProps()

  // attributes are the states stored by Wordpress
  // They are defined in the block.json

  // States that aren't stored by Wordrpess
  // They are only usefull for the preview
  return <div {...blockProps}>Filters</div>
}
