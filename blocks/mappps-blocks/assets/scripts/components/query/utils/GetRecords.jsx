import { store as coreStore, useEntityRecords } from '@wordpress/core-data'
import { useSelect } from '@wordpress/data'
import { useMemo } from '@wordpress/element'
// Get posts/records by Post Types, Taxonomies & Categories
export default function GetPosts(query) {
  const globRecords = []

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

  // Get taxonomies for the current post type
  const taxonomies = useSelect(
    (select) =>
      select(coreStore).getTaxonomies({
        type: postType,
        per_page: -1,
        context: 'view'
      }),
    [postType]
  )

  // Build the query object for the REST API using useMemo to ensure stability
  const queryObject = useMemo(() => {
    const query = {
      offset: offset || 0,
      order,
      orderby: orderBy
    }

    // There is no need to build the taxQuery if we inherit.
    if (taxQuery && !inherit) {
      // We have to build the tax query for the REST API and use as
      // keys the taxonomies `rest_base` with the `term ids` as values.
      const builtTaxQuery = Object.entries(taxQuery || {}).reduce((accumulator, [taxonomySlug, terms]) => {
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

    //   query.meta_query = [
    //     {
    //       key: 'lat',
    //       compare: 'EXISTS'
    //     },
    //     {
    //         key: 'lat',
    //         value: [0, ''],
    //         compare: 'NOT IN'
    //     },
    //     {
    //       key: 'lng',
    //       compare: 'EXISTS'
    //     },
    //     {
    //         key: 'lng',
    //         value: [0, ''],
    //         compare: 'NOT IN'
    //     }
    // ],
    // query.meta_query_relation = 'AND'

    return {
      ...query,
      ...restQueryArgs
    }
  }, [offset, order, orderBy, taxQuery, inherit, taxonomies, perPage, author, search, exclude, parents, format, sticky, restQueryArgs])

  // Use useEntityRecords with the stable query object
  const { hasResolved, records } = useEntityRecords('postType', postType, queryObject)

  if (hasResolved) {
    if (records?.length) {
      const filteredRecords = records
        .map((record) => {
          // Handle ACF/SCF coordinates fields
          if ('acf' in record) {
            if (record.acf?.mappps_lat && record.acf?.mappps_lng) {
              return {
                ...record,
                meta: {
                  ...record.meta,
                  lat: Number(record.acf.mappps_lat),
                  lng: Number(record.acf.mappps_lng)
                }
              }
            }
          }
          return record
        })
        .filter((record) => record.meta?.lat && record.meta?.lng)
      globRecords.push(...filteredRecords)
    }
  }

  return {
    resolved: hasResolved,
    posts: [...new Set(globRecords)] // remove duplicates
  }
}
