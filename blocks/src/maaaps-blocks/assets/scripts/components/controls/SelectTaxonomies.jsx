import { SelectControl } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

import GetTaxonomies from '../../utils/GetTaxonomies'

export default function SelectTaxonomies({ defaultValue, postType, setAttributes, setQueriedPosts }) {
  const taxonomies = GetTaxonomies(postType) || []

  const options = []
  if (taxonomies.length) {
    taxonomies.forEach((taxonomy) => {
      options.push({ label: taxonomy.name, value: taxonomy.slug })
    })
  }

  return (
    <SelectControl
      multiple
      defaultValue={defaultValue}
      label={__('Taxonomies', 'maaaps')}
      options={options}
      onChange={(value) => {
        setQueriedPosts([])
        setAttributes({
          selectedTaxonomies: value,
          taxonomies,
          categories: {},
          selectedCategories: [],
          selectedPosts: []
        })
      }}
    />
  )
}
