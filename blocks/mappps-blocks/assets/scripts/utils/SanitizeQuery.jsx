import { store as coreStore } from '@wordpress/core-data'
import { useSelect } from '@wordpress/data'
// Get posts/records by Post Types, Taxonomies & Categories
export default function GetPosts(query) {
  const {
    author,
    exclude,
    format,
    inherit,
    offset = 0,
    order,
    orderBy,
    parents,
    perPage,
    postType,
    search,
    sticky,
    taxQuery,
    // We gather extra query args to pass to the REST API call.
    // This way extenders of Query Loop can add their own query args,
    // and have accurate previews in the editor.
    // Noting though that these args should either be supported by the
    // REST API or be handled by custom REST filters like `rest_{$this->post_type}_query`.
    ...restQueryArgs
  } = query

  const { posts } = useSelect(
    (select) => {
      const { getEntityRecords, getTaxonomies } = select(coreStore)
      const query = {
        offset: offset || 0,
        order,
        orderby: orderBy
      }
      // There is no need to build the taxQuery if we inherit.
      if (taxQuery && !inherit) {
        const taxonomies = getTaxonomies({
          type: postType,
          per_page: -1,
          context: 'view'
        })
        // We have to build the tax query for the REST API and use as
        // keys the taxonomies `rest_base` with the `term ids` as values.
        const builtTaxQuery = Object.entries(taxQuery).reduce((accumulator, [taxonomySlug, terms]) => {
          const taxonomy = taxonomies?.find(({ slug }) => slug === taxonomySlug)
          if (taxonomy?.rest_base) {
            accumulator[taxonomy?.rest_base] = terms
          }
          return accumulator
        }, {})
        if (Object.keys(builtTaxQuery).length) {
          Object.assign(query, builtTaxQuery)
        }
      }
      if (perPage) {
        query.per_page = perPage
      }
      if (author) {
        query.author = author
      }
      if (search) {
        // Ensure search is passed directly to the API, not nested under query[search]
        query.search = search
      }
      if (exclude?.length) {
        query.exclude = exclude
      }
      if (parents?.length) {
        query.parent = parents
      }
      if (format?.length) {
        query.format = format
      }

      /*
       * Handle cases where sticky is set to `exclude` or `only`.
       * Which works as a `post__in/post__not_in` query for sticky posts.
       */
      if (sticky && sticky !== 'ignore') {
        query.sticky = sticky === 'only'
      }

      if (sticky === 'ignore') {
        // Remove any leftover sticky query parameter.
        delete query.sticky
        query.ignore_sticky = true
      }

      // When we preview Query Loop blocks we should prefer the current
      // block's postType, which is passed through block context.
      return {
        posts: getEntityRecords('postType', postType, {
          ...query,
          ...restQueryArgs
        })
      }
    },
    [perPage, offset, order, orderBy, author, search, postType, exclude, sticky, inherit, taxQuery, parents, format, restQueryArgs]
  )

  return posts
}
