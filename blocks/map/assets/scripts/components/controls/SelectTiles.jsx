import { SelectControl } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

export default function SelectTiles({ defaultValue, options, setAttributes }) {
  options = options.map(({ label, value }) => ({ label, value }))

  const handleChange = (value) => {
    setAttributes({ selectedMapTiles: value })
  }

  return <SelectControl defaultValue={defaultValue} label={__('Map tiles', 'mappps')} options={options} onChange={handleChange} />
}
