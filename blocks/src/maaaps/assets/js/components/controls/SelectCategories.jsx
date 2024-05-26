import { SelectControl } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

import GetCategories from '../../utils/GetCategories'

export default function SelectCategories(props) {
  const { setAttributes, attributes } = props

  GetCategories(attributes.selectedTaxonomies, attributes, setAttributes)
  const categories = attributes.categories
  const defaultValue = attributes.selectedCategories

  const options = []
  for (const key in categories) {
    if (Object.hasOwnProperty.call(categories, key)) {
      const elements = categories[key]
      if (elements.length) {
        elements.forEach((element) => {
          options.push({ label: element.name, value: element.id })
        })
      }
    }
  }

  return (
    <SelectControl
      label={__('Categories', 'maaaps')}
      multiple
      options={options}
      defaultValue={defaultValue}
      onChange={(value) => {
        setAttributes({ selectedCategories: value })
      }}
    />
  )
}
