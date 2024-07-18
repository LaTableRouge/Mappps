import { SelectControl, Spinner } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

import GetTaxonomies from '../../utils/GetTaxonomies'

export default function SelectTaxonomies({ defaultValue, postType, setAttributes, setQueriedPosts }) {
  const { resolved, taxonomies } = GetTaxonomies(postType)

  const options = []
  if (taxonomies && taxonomies.length) {
    taxonomies.forEach((taxonomy) => {
      options.push({ label: taxonomy.name, value: taxonomy.slug })
    })
  }

  if (resolved) {
    return (
      <>
        {/* eslint-disable-next-line multiline-ternary */}
        {taxonomies.length ? (
          <SelectControl
            multiple
            defaultValue={defaultValue}
            label={__('Taxonomies', 'maaaps')}
            options={options}
            onChange={async (value) => {
              setQueriedPosts([])
              setAttributes({
                selectedTaxonomies: value,
                taxonomies,
                categories: {},
                selectedCategories: []
                // selectedPosts: []
              })
            }}
          />
        ) : (
          __('No taxonomies could be recovered.', 'maaaps')
        )}
      </>
    )
  } else {
    return <Spinner />
  }
}
