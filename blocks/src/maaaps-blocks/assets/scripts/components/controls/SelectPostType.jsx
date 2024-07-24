import { SelectControl } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

export default function SelectPostType({ defaultValue, postTypes, setAttributes }) {
  const options = []
  postTypes.types.forEach((postType) => {
    options.push({ label: postType.name, value: postType.slug })
  })

  return (
    <SelectControl
      defaultValue={defaultValue}
      label={__('Post type', 'maaaps')}
      options={options}
      onChange={(value) => {
        let selectedPostType = postTypes.types.filter((postType) => postType.slug === value)
        if (selectedPostType.length) {
          selectedPostType = selectedPostType[0]
        }
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
      }}
    />
  )
}
