import '../styles/editor.scss'

import { useBlockProps } from '@wordpress/block-editor'

import Controls from './components/Controls'

export default function Edit({ attributes, setAttributes }) {
  const blockProps = useBlockProps()

  // attributes are the states stored by Wordpress
  // They are defined in the block.json

  // States that aren't stored by Wordrpess
  // They are only usefull for the preview

  return (
    <div {...blockProps}>
      <Controls limitedSearch={attributes.limitedSearch} />
      <button
        onClick={() => {
          setAttributes({ searchValue: 'aayayayay' + new Date() })
        }}
      >
        SearchBar
      </button>
    </div>
  )
}
