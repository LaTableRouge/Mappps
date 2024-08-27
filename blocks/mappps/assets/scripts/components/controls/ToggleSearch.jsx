import { ToggleControl } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

export default function ToggleSearch({ defaultValue, setAttributes }) {
  return (
    <ToggleControl
      checked={defaultValue}
      help={defaultValue ? __('A search bar will be displayed', 'mappps') : ''}
      label={__('Display search bar?', 'mappps')}
      onChange={(value) => {
        setAttributes({ displaySearch: value, selectedSearchResult: {} })
      }}
    />
  )
}
