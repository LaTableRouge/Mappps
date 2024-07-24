import { Button, SelectControl } from '@wordpress/components'
import { useState } from '@wordpress/element'
import { __ } from '@wordpress/i18n'

import GetPosts from '../../utils/GetPosts'

export default function SelectPosts({ categories, defaultValue, postType, setAttributes, setQueriedPosts, taxonomies }) {
  const { posts, resolved } = GetPosts(postType, taxonomies, categories)

  const [selectedPosts, setSelectedPosts] = useState([])

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

  return (
    <>
      {!!resolved && (
        <form
          role="form"
          onSubmit={(e) => {
            e.preventDefault()

            if (resolved && posts.length) {
              setQueriedPosts(posts)

              if (hasDefaultValue) {
                setAttributes({
                  selectedPosts
                })
              } else {
                const postIDs = []
                posts.forEach((post) => {
                  postIDs.push(`${post.id}`)
                })
                setAttributes({
                  selectedPosts: postIDs
                })
              }
            } else {
              setQueriedPosts([])
              setAttributes({
                selectedPosts: []
              })
            }
          }}
        >
          <SelectControl
            multiple
            defaultValue={defaultValue}
            label={__('Posts', 'maaaps')}
            name="posts"
            options={options}
            onChange={(value) => {
              setSelectedPosts(value)
            }}
          />

          <Button type="submit" variant="primary">
            {__('Confirm selection', 'maaaps')}
          </Button>
        </form>
      )}
    </>
  )
}
