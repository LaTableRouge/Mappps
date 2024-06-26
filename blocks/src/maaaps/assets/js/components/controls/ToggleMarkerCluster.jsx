import { ToggleControl } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

export default function ToggleMarkerCluster(props) {
  const { defaultValue, setAttributes } = props

  return (
    <ToggleControl
      label={__('Marker clustering', 'maaaps')}
      help={defaultValue ? __('Markers will be clustered', 'maaaps') : __('Markers will not be clustered', 'maaaps')}
      checked={defaultValue}
      onChange={(value) => {
        setAttributes({ isClustered: value })
      }}
    />
  )
}
