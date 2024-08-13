import { __experimentalUnitControl as UnitControl } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

export default function UnitPopupsSize({ defaultValue, setAttributes }) {
  return (
    <UnitControl
      help={__('Desktop only, set the size for the details popup', 'maaaps')}
      label={__('Popups size', 'maaaps')}
      units={[
        { value: 'px', label: 'px', default: 0 },
        { value: 'cqw', label: 'cqw', default: 0 },
        { value: '%', label: '%', default: 0 }
      ]}
      value={defaultValue}
      onChange={(value) => {
        setAttributes({ selectedPopupsSize: value })
      }}
    />
  )
}
