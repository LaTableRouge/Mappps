import { SelectControl } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

import GetTaxonomies from '../../utils/GetTaxonomies'

export default function SelectTaxonomies(props) {
  const { setAttributes, postType, defaultValue } = props

  const taxonomies = GetTaxonomies(postType) || []

  const options = []
  if (taxonomies.length) {
    taxonomies.forEach((taxonomy) => {
      options.push({ label: taxonomy.name, value: taxonomy.slug })
    })
  }

  return (
    <SelectControl
      label={__('Taxonomies', 'maaaps')}
      multiple
      options={options}
      defaultValue={defaultValue}
      onChange={(value) => {
        setAttributes({
          selectedTaxonomies: value,
          taxonomies,
          categories: {},
          selectedCategories: [],
          posts: [],
          selectedPosts: []
        })
      }}
    />
  )
}
