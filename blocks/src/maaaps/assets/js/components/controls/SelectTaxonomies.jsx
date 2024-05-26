import { SelectControl } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

import GetTaxonomies from '../../utils/GetTaxonomies'

export default function SelectTaxonomies(props) {
  const { setAttributes, attributes } = props

  GetTaxonomies(attributes.postType, attributes, setAttributes)
  const taxonomies = attributes.taxonomies
  const defaultValue = attributes.selectedTaxonomies

  const options = []
  taxonomies.forEach((taxonomy) => {
    options.push({ label: taxonomy.name, value: taxonomy.slug })
  })

  return (
    <SelectControl
      label={__('Taxonomies', 'maaaps')}
      multiple
      options={options}
      defaultValue={defaultValue}
      onChange={(value) => {
        setAttributes({
          selectedTaxonomies: value,
          categories: {},
          selectedCategories: []
        })
      }}
    />
  )
}
