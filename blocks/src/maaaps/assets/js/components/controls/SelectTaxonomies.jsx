import { SelectControl } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

import GetTaxonomies from '../../utils/GetTaxonomies'

export default function SelectTaxonomies(props) {
  const { defaultValue, postType, setAttributes } = props

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
