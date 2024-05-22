import { SelectControl } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

export default function SelectPostType(props) {
  const { setAttributes, postTypes } = props

  const options = []
  postTypes.forEach((postType) => {
    options.push({ label: postType.name, value: postType.slug })
  })
  options.push({ label: 'AYAYA', value: 'test' })

  return (
    <SelectControl
      label={__('Post type', 'maaaps')}
      options={options}
      onChange={(value) => {
        const taxonomies = []

        let selectedPostType = postTypes.filter((postType) => postType.slug === value)
        if (selectedPostType.length) {
          selectedPostType = selectedPostType[0]
          if (selectedPostType.taxonomies && selectedPostType.taxonomies.length) {
            taxonomies.push(...selectedPostType.taxonomies)
          }
        }

        setAttributes({
          'post-type': value,
          taxonomies,
          taxonomy: null
        })
      }}
    />
  )
}
