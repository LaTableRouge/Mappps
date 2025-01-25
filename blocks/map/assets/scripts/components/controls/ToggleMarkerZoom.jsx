import { ToggleControl } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

export default function ToggleMarkerZoom({ defaultValue, setAttributes }) {
  const handleChange = (value) => {
    setAttributes({ canZoomToMarker: value })
  }

  const helpText = defaultValue ? __('The map will zoom to the marker when clicked', 'mappps') : ''

  return <ToggleControl checked={defaultValue} help={helpText} label={__('Zoom to marker', 'mappps')} onChange={handleChange} />
}
