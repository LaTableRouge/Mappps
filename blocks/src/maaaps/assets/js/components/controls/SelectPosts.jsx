import { SelectControl } from '@wordpress/components'
import { useEffect } from '@wordpress/element'
import { __ } from '@wordpress/i18n'

import GetPosts from '../../utils/GetPosts'

export default function SelectPosts(props) {
  const { categories, defaultValue, postType, setAttributes, taxonomies } = props

  const { posts, resolved } = GetPosts(postType, taxonomies, categories)

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

      if (postIDs.length) {
        setAttributes({
          posts: posts,
          selectedPosts: postIDs,
          firstSelectedPost: Number(postIDs[0])
        })
      } else {
        setAttributes({
          posts: [],
          selectedPosts: [],
          firstSelectedPost: null
        })
      }
    } else {
      setAttributes({
        posts: [],
        selectedPosts: [],
        firstSelectedPost: null
      })
    }
  }, [resolved])

  return (
    <>
      {!!resolved && (
        <SelectControl
          multiple
          defaultValue={defaultValue}
          label={__('Posts', 'maaaps')}
          options={options}
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
