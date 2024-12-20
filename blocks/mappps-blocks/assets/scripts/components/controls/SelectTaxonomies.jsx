import { SelectControl, Spinner } from '@wordpress/components'
import { useEffect } from '@wordpress/element'
import { __ } from '@wordpress/i18n'

import GetTaxonomies from '../../utils/GetTaxonomies'

export default function SelectTaxonomies({ defaultValue, postType, setAttributes, setQueriedPosts }) {
  const { resolved, taxonomies } = GetTaxonomies(postType)

  useEffect(() => {
    if (resolved && Object.keys(taxonomies).length) {
      setAttributes({ taxonomies })
    }
  }, [resolved])

  const options
    = taxonomies?.map((taxonomy) => ({
      label: taxonomy.name,
      value: taxonomy.slug
    })) ?? []

  const handleChange = (value) => {
    setQueriedPosts([])
    setAttributes({
      selectedTaxonomies: value,
      categories: {},
      selectedCategories: []
    })
  }

  if (!resolved) {
    return <Spinner />
  }

  if (!taxonomies?.length) {
    return __('No taxonomies could be recovered.', 'mappps')
  }

  return <SelectControl multiple defaultValue={defaultValue} label={__('Taxonomies', 'mappps')} options={options} onChange={handleChange} />
}
