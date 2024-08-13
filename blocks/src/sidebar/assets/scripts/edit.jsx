import '../styles/editor.scss'

import { InnerBlocks, useBlockProps } from '@wordpress/block-editor'

export default function Edit({ attributes, clientId, isSelected, setAttributes }) {
  const blockProps = useBlockProps()

  // attributes are the states stored by Wordpress
  // They are defined in the block.json

  // States that aren't stored by Wordrpess
  // They are only usefull for the preview

  return (
    <aside {...blockProps}>
      <InnerBlocks
        template={[
          ['core/paragraph', {}],
          ['mps/searchbar', {}],
          ['mps/filters', {}],
          ['mps/post-template', {}]
        ]}
      />
    </aside>
  )
}