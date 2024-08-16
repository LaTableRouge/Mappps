import { sluggify } from '../common/functions'

export default function FilterPosts(posts = [], filterValues = {}, searchValue = '') {
  if (!searchValue && !Object.keys(filterValues).length) {
    return posts
  }

  if (Object.keys(filterValues).length) {
    const filteredPosts = posts.filter((post) => {
      let filteredPost = false

      for (const taxonomy in filterValues) {
        if (post[taxonomy]) {
          const categories = filterValues[taxonomy].categories

          const checkedCategories = categories.filter((category) => category.checked)
          if (checkedCategories.length) {
            const found = post[taxonomy].some((id) => checkedCategories.map(({ id }) => id).includes(id))
            if (found) {
              filteredPost = true
              break
            }
          }
        }
      }

      return filteredPost
    })

    if (filteredPosts.length) {
      posts = filteredPosts
    }
  }

  if (searchValue) {
    const compareRegex = new RegExp(sluggify(searchValue), '')
    posts = posts.filter((post) => post.slug.match(compareRegex))
  }

  return posts
}
