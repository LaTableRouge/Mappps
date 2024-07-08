import { sluggify } from '../common/functions'

export default function FilterPosts(posts = [], filterValues = {}, searchValue = '') {
  if (!searchValue && !Object.keys(filterValues).length) {
    return posts
  }

  if (searchValue) {
    const compareRegex = new RegExp(sluggify(searchValue), '')
    posts = posts.filter((post) => post.slug.match(compareRegex))
  }

  return posts
}
