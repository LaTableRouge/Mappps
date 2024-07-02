import { SelectControl } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

import GetCategories from '../../utils/GetCategories'

export default function SelectCategories(props) {
  const { defaultValue, setAttributes, taxonomies } = props

  const categories = GetCategories(taxonomies)

  const options = []
  if (Object.keys(categories).length) {
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
  }

  return (
    <SelectControl
      multiple
      defaultValue={defaultValue}
      label={__('Categories', 'maaaps')}
      options={options}
      onChange={(value) => {
        setAttributes({
          selectedCategories: value,
          categories,
          posts: [],
          selectedPosts: []
        })
      }}
    />
  )
}
