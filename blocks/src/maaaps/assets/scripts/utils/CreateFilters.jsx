export default function CreateFilters(categories, taxonomies, posts, setFilters) {
  const filtersObject = {}

  // useEffect(() => {
  if (taxonomies.length && Object.keys(categories).length && posts.length) {
    // eslint-disable-next-line camelcase
    taxonomies.forEach(({ name, rest_base, slug }) => {
      const associatedCategories = categories[slug]

      posts.forEach((post) => {
        // eslint-disable-next-line camelcase
        const postAssociatedCategories = post[rest_base]
        if (postAssociatedCategories.length && associatedCategories && associatedCategories.length) {
          associatedCategories.forEach((category) => {
            if (postAssociatedCategories.includes(category.id)) {
              // eslint-disable-next-line camelcase
              if (!filtersObject[rest_base]) {
                // eslint-disable-next-line camelcase
                filtersObject[rest_base] = {
                  name,
                  slug
                }
              }

              // eslint-disable-next-line camelcase
              if (!filtersObject[rest_base].categories) {
                // eslint-disable-next-line camelcase
                filtersObject[rest_base].categories = []
              }

              // eslint-disable-next-line camelcase
              if (!filtersObject[rest_base].categories.includes(category)) {
                // eslint-disable-next-line camelcase
                filtersObject[rest_base].categories.push(category)
              }
            }
          })
        }
      })
    })
  }

  // setFilters(filtersObject)
  // }, [categories, taxonomies, posts])

  return filtersObject
}
