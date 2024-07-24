import { SelectControl, Spinner } from '@wordpress/components'
import { useEffect } from '@wordpress/element'
import { __ } from '@wordpress/i18n'

import GetCategories from '../../utils/GetCategories'

export default function SelectCategories({ defaultValue, setAttributes, setQueriedPosts, taxonomies }) {
  const { categories, resolved } = GetCategories(taxonomies)

  useEffect(() => {
    if (resolved && Object.keys(categories).length) {
      setAttributes({ categories })
    }
  }, [resolved])

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
                selectedCategories: value
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
