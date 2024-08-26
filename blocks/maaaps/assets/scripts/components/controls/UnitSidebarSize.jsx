import { __experimentalUnitControl as UnitControl } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

export default function UnitSidebarSize({ defaultValue, setAttributes }) {
  return (
    <UnitControl
      help={__('Desktop only', 'mappps')}
      label={__('Sidebar size', 'mappps')}
      units={[
        { value: 'px', label: 'px', default: 0 },
        { value: 'cqw', label: 'cqw', default: 0 },
        { value: '%', label: '%', default: 0 }
      ]}
      value={defaultValue}
      onChange={(value) => {
        setAttributes({ selectedSidebarSize: value })
      }}
    />
  )
}
