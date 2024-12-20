import { __experimentalUnitControl as UnitControl } from '@wordpress/components'
import { memo, useCallback } from '@wordpress/element'
import { __ } from '@wordpress/i18n'

const UNITS = [
  { value: 'px', label: 'px', default: 0 },
  { value: 'cqw', label: 'cqw', default: 0 },
  { value: '%', label: '%', default: 0 }
]

function UnitDetailsSize({ defaultValue, setAttributes }) {
  const handleChange = useCallback(
    (value) => {
      setAttributes({ selectedDetailsSize: value })
    },
    [setAttributes]
  )

  return (
    <UnitControl
      help={__('Desktop only, set the maximum size for the details popup', 'mappps')}
      label={__('Popups size', 'mappps')}
      units={UNITS}
      value={defaultValue}
      onChange={handleChange}
    />
  )
}

export default memo(UnitDetailsSize)
