import { ToggleControl } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

export default function ToggleLimitedSearch(props) {
  const { defaultValue, setAttributes } = props

  return (
    <ToggleControl
      checked={defaultValue}
      help={defaultValue ? __('Search results will be limited to the selected posts', 'mappps') : ''}
      label={__('Limit search results?', 'mappps')}
      onChange={(value) => {
        setAttributes({ limitedSearch: value, selectedSearchResult: {} })
      }}
    />
  )
}
