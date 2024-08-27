import { ToggleControl } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

export default function ToggleFilters({ defaultValue, setAttributes }) {
  return (
    <ToggleControl
      checked={defaultValue}
      help={defaultValue ? __('A filter dropdown will be displayed', 'mappps') : ''}
      label={__('Display filters?', 'mappps')}
      onChange={(value) => {
        setAttributes({ displayFilters: value })
      }}
    />
  )
}
