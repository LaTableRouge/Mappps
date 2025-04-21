/**
 * Builds an array of all taxonomies and terms that are in the fetched posts.
 *
 * @param {Object[]} taxonomies Array of taxonomy objects with name, restBase, and slug properties.
 * @param {Object} terms Object with taxonomy slugs as keys and arrays of terms as values.
 * @param {Object[]} posts Array of post objects.
 * @return {Object} Object with taxonomy restBase as keys and arrays of terms as values.
 */
export function buildTaxonomyTermsFromPosts(taxonomies, terms, posts) {
  if (!taxonomies?.length || !Object.keys(terms)?.length || !posts?.length) {
    return {}
  }

  return taxonomies.reduce((filtersObject, { name, rest_base: restBase, slug }) => {
    const associatedTerms = terms[slug]
    if (!associatedTerms?.length) return filtersObject

    posts.forEach((post) => {
      const postTerms = post[restBase]
      if (!postTerms?.length) return

      associatedTerms.forEach((term) => {
        if (!postTerms.includes(term.id)) return

        if (!filtersObject[restBase]) {
          filtersObject[restBase] = {
            name,
            slug,
            terms: []
          }
        }

        if (!filtersObject[restBase].terms.some((t) => t.id === term.id)) {
          filtersObject[restBase].terms.push(term)
        }
      })
    })

    return filtersObject
  }, {})
}
