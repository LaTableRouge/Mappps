import '../styles/editor.scss'

import { InnerBlocks, useBlockProps } from '@wordpress/block-editor'

import Controls from './components/Controls'

export default function Edit({ attributes, clientId, isSelected, setAttributes }) {
  const blockProps = useBlockProps()

  return (
    <aside {...blockProps}>
      <Controls attributes={attributes} setAttributes={setAttributes} />

      <InnerBlocks
        template={[
          ['mps/searchbar', {}],
          ['mps/filters-toggle', {}],
          ['mps/post-template', {}]
        ]}
        templateLock={false}
      />
    </aside>
  )
}
