import { ToggleControl } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

export default function ToggleSearch(props) {
  const { defaultValue, setAttributes } = props

  return (
    <ToggleControl
      label={__('Display search bar?', 'maaaps')}
      help={defaultValue ? __('A search bar will be displayed', 'maaaps') : ''}
      checked={defaultValue}
      onChange={(value) => {
        setAttributes({ displaySearch: value, selectedSearchResult: {} })
      }}
    />
  )
}
