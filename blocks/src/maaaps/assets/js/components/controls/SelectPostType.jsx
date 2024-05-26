import { SelectControl } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

export default function SelectPostType(props) {
  const { setAttributes, postTypes, defaultValue } = props

  const options = []
  postTypes.forEach((postType) => {
    options.push({ label: postType.name, value: postType.slug })
  })

  return (
    <SelectControl
      label={__('Post type', 'maaaps')}
      options={options}
      defaultValue={defaultValue}
      onChange={(value) => {
        let selectedPostType = postTypes.filter((postType) => postType.slug === value)
        if (selectedPostType.length) {
          selectedPostType = selectedPostType[0]
        }

        setAttributes({
          postType: selectedPostType.slug,
          taxonomies: [],
          selectedTaxonomies: [],
          categories: {},
          selectedCategories: []
        })
      }}
    />
  )
}
