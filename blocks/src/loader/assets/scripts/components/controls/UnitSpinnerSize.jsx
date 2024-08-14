import { __experimentalNumberControl as UnitControl } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

export default function UnitSpinnerSize(props) {
  const { defaultValue, setAttributes } = props

  return (
    <UnitControl
      help={__("The displayed size of the loader's spinner", 'maaaps')}
      label={__('Spinner size', 'maaaps')}
      units={[{ value: 'px', label: 'px', default: 0 }]}
      value={defaultValue}
      onChange={(value) => {
        setAttributes({ selectedSpinnerSize: value })
      }}
    />
  )
}
