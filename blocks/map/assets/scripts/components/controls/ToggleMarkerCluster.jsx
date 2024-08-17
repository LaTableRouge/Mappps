import { ToggleControl } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

export default function ToggleMarkerCluster({ defaultValue, setAttributes }) {
  return (
    <ToggleControl
      checked={defaultValue}
      help={defaultValue ? __('Markers will be clustered (The clustering cannot be seen in gutenberg)', 'maaaps') : __('Markers will not be clustered', 'maaaps')}
      label={__('Marker clustering', 'maaaps')}
      onChange={(value) => {
        setAttributes({ isClustered: value })
      }}
    />
  )
}
