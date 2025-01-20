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

  const options = Object.entries(categories).reduce((acc, [, elements]) => {
    if (elements.length) {
      elements.forEach((element) => {
        acc.push({ label: element.name, value: element.id })
      })
    }
    return acc
  }, [])

  const handleChange = (value) => {
    setQueriedPosts([])
    setAttributes({
      selectedCategories: value
    })
  }

  if (!resolved) {
    return <Spinner />
  }
  if (!Object.keys(categories).length) {
    return __('No categories could be recovered.', 'mappps')
  }

  return <SelectControl multiple defaultValue={defaultValue} label={__('Categories', 'mappps')} options={options} onChange={handleChange} />
}
