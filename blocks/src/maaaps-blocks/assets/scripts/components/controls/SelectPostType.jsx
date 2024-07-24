import { SelectControl } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

export default function SelectPostType({ defaultValue, postTypes, setAttributes, setQueriedPosts }) {
  const options = []
  postTypes.forEach((postType) => {
    options.push({ label: postType.name, value: postType.slug })
  })

  return (
    <SelectControl
      defaultValue={defaultValue}
      label={__('Post type', 'maaaps')}
      options={options}
      onChange={(value) => {
        let selectedPostType = postTypes.filter((postType) => postType.slug === value)
        if (selectedPostType.length) {
          selectedPostType = selectedPostType[0]
        }

        setQueriedPosts([])
        setAttributes({
          postType: selectedPostType.slug ?? '',
          taxonomies: [],
          selectedTaxonomies: [],
          categories: {},
          selectedCategories: [],
          selectedPosts: []
        })
      }}
    />
  )
}
