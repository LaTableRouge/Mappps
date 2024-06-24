import { SelectControl } from '@wordpress/components'
import { useEffect } from '@wordpress/element'
import { __ } from '@wordpress/i18n'

import GetPosts from '../../utils/GetPosts'

export default function SelectPosts(props) {
  const { setAttributes, postType, taxonomies, categories, defaultValue } = props

  const { resolved, posts } = GetPosts(postType, taxonomies, categories)

  const hasDefaultValue = defaultValue.length

  const options = []
  if (resolved && posts.length) {
    posts.forEach((post) => {
      options.push({ label: `[${post.id}] ${post.title.raw}`, value: `${post.id}` })

      if (!hasDefaultValue) {
        defaultValue.push(`${post.id}`)
      }
    })
  }

  useEffect(() => {
    if (resolved && posts.length) {
      const postIDs = []
      posts.forEach((post) => {
        postIDs.push(`${post.id}`)
      })
      setAttributes({
        posts: posts,
        selectedPosts: postIDs
      })
    } else {
      setAttributes({ posts: [] })
    }
  }, [resolved])

  return (
    <>
      {!!resolved && (
        <SelectControl
          label={__('Posts', 'maaaps')}
          multiple
          options={options}
          defaultValue={defaultValue}
          onChange={(value) => {
            setAttributes({
              selectedPosts: value
            })
          }}
        />
      )}
    </>
  )
}
