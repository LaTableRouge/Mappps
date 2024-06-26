import { SelectControl } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

export default function SelectDisplayType(props) {
  const { setAttributes, defaultValue } = props

  const options = [
    { label: __('Map + Sidebar'), value: 'full' },
    { label: __('Map'), value: 'map' }
  ]

  return (
    <SelectControl
      label={__('Display mode', 'maaaps')}
      options={options}
      defaultValue={defaultValue}
      onChange={(value) => {
        setAttributes({ selectedDisplayType: value })
      }}
    />
  )
}
