import { SelectControl } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

export default function SelectPostType({ defaultValue, postTypes, setAttributes, setQueriedPosts }) {
  const options = postTypes.types.map((postType) => ({
    label: postType.name,
    value: postType.slug
  }))

  const handleChange = (value) => {
    let selectedPostType = postTypes.types.filter((postType) => postType.slug === value)
    if (selectedPostType.length) {
      selectedPostType = selectedPostType[0]
    }

    setQueriedPosts([])
    setAttributes({
      postType: selectedPostType.slug ?? '',
      postTypeRestBase: selectedPostType.rest_base ?? '',
      postTypeRestNamespace: selectedPostType.rest_namespace ?? '',
      taxonomies: [],
      selectedTaxonomies: [],
      categories: {},
      selectedCategories: []
      // selectedPosts: []
    })
  }

  return <SelectControl defaultValue={defaultValue} label={__('Post type', 'mappps')} options={options} onChange={handleChange} />
}
