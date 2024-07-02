import { SelectControl } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

export default function SelectDisplayType(props) {
  const { defaultValue, setAttributes } = props

  const options = [
    { label: __('Map + Sidebar'), value: 'full' },
    { label: __('Map'), value: 'map' }
  ]

  return (
    <SelectControl
      defaultValue={defaultValue}
      label={__('Display mode', 'maaaps')}
      options={options}
      onChange={(value) => {
        setAttributes({ selectedDisplayType: value })
      }}
    />
  )
}
