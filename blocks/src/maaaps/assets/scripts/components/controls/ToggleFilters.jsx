import { ToggleControl } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

export default function ToggleFilters({ defaultValue, setAttributes }) {
  return (
    <ToggleControl
      checked={defaultValue}
      help={defaultValue ? __('A filter dropdown will be displayed', 'maaaps') : ''}
      label={__('Display filters?', 'maaaps')}
      onChange={(value) => {
        setAttributes({ displayFilters: value })
      }}
    />
  )
}
