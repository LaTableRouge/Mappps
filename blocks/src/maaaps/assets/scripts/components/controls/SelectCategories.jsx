import { SelectControl, Spinner } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

import GetCategories from '../../utils/GetCategories'

export default function SelectCategories({ defaultValue, setAttributes, setQueriedPosts, taxonomies }) {
  const { categories, resolved } = GetCategories(taxonomies)

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

  if (resolved) {
    return (
      <>
        {/* eslint-disable-next-line multiline-ternary */}
        {Object.keys(categories).length ? (
          <SelectControl
            multiple
            defaultValue={defaultValue}
            label={__('Categories', 'maaaps')}
            options={options}
            onChange={(value) => {
              setQueriedPosts([])
              setAttributes({
                selectedCategories: value,
                categories
                // selectedPosts: []
              })
            }}
          />
        ) : (
          __('No categories could be recovered.', 'maaaps')
        )}
      </>
    )
  } else {
    return <Spinner />
  }
}
