/* eslint-disable camelcase */
export default function CreateFilters(categories, taxonomies, posts) {
  if (!taxonomies?.length || !Object.keys(categories)?.length || !posts?.length) {
    return {}
  }

  return taxonomies.reduce((filtersObject, { name, rest_base, slug }) => {
    const associatedCategories = categories[slug]
    if (!associatedCategories?.length) return filtersObject

    posts.forEach((post) => {
      const postCategories = post[rest_base]
      if (!postCategories?.length) return

      associatedCategories.forEach((category) => {
        if (!postCategories.includes(category.id)) return

        if (!filtersObject[rest_base]) {
          filtersObject[rest_base] = {
            name,
            slug,
            categories: []
          }
        }

        if (!filtersObject[rest_base].categories.includes(category)) {
          filtersObject[rest_base].categories.push(category)
        }
      })
    })

    return filtersObject
  }, {})
}
