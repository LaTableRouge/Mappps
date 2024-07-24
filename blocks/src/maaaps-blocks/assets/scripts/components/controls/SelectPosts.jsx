import { Button, SelectControl, Spinner } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

import GetPosts from '../../utils/GetPosts'

export default function SelectPosts({ categories, defaultValue, postType, setAttributes, taxonomies }) {
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

  if (resolved) {
    return (
      <>
        {posts.length
          ? (
          <form
            role="form"
            onSubmit={(e) => {
              e.preventDefault()

              const selectedPosts = Array.from(e.target.posts.selectedOptions, (option) => option.value)
              setAttributes({
                selectedPosts
              })
            }}
          >
            <SelectControl multiple defaultValue={defaultValue} label={__('Posts', 'maaaps')} name="posts" options={options} />

            <Button type="submit" variant="primary">
              {__('Confirm selection', 'maaaps')}
            </Button>
          </form>
            )
          : (
              __('No posts could be recovered.', 'maaaps')
            )}
      </>
    )
  } else {
    return <Spinner />
  }
}
