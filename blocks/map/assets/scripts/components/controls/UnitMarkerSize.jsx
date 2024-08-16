import { __experimentalUnitControl as UnitControl } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

export default function UnitMarkerSize({ defaultValue, setAttributes }) {
  return (
    <UnitControl
      help={__('The displayed sizes of the marker icons', 'maaaps')}
      label={__('Marker icon size', 'maaaps')}
      units={[{ value: 'px', label: 'px', default: 0 }]}
      value={defaultValue}
      onChange={(value) => {
        setAttributes({ selectedMarkerSize: value })
      }}
    />
  )
}
