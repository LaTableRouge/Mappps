import { __experimentalUnitControl as UnitControl } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

const UNITS = [{ value: 'px', label: 'px', default: 0 }]

export default function UnitMarkerClusterSize({ defaultValue, setAttributes }) {
  const handleChange = (value) => {
    setAttributes({ selectedMarkerClusterSize: value })
  }

  return (
    <UnitControl
      help={__('The displayed sizes of the cluster icons', 'mappps')}
      label={__('Cluster icon size', 'mappps')}
      units={UNITS}
      value={defaultValue}
      onChange={handleChange}
    />
  )
}
