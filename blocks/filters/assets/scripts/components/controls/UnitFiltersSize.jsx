import { __experimentalUnitControl as UnitControl } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

const UNITS = [
  { value: 'px', label: 'px', default: 0 },
  { value: 'cqw', label: 'cqw', default: 0 },
  { value: '%', label: '%', default: 0 }
]

export default function UnitFiltersSize({ defaultValue, setAttributes }) {
  const handleChange = (value) => {
    setAttributes({ selectedFiltersSize: value })
  }

  return (
    <UnitControl
      help={__('Desktop only, set the maximum size for the filter popup', 'mappps')}
      label={__('Filters size', 'mappps')}
      units={UNITS}
      value={defaultValue}
      onChange={handleChange}
    />
  )
}
