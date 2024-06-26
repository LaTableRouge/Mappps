import { SelectControl } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

export default function SelectTiles(props) {
  const { setAttributes, defaultValue, options } = props

  return (
    <SelectControl
      label={__('Map tiles style', 'maaaps')}
      options={options}
      defaultValue={defaultValue}
      onChange={(value) => {
        setAttributes({
          selectedMapTiles: value
        })
      }}
    />
  )
}
