import { useEntityRecords } from '@wordpress/core-data'

// Get posts/records by Post Types, Taxonomies & Categories
export default function GetPosts(postType = '', taxonomies = [], categories = []) {
  let resolvedCounter = 0
  const globRecords = []

  taxonomies.forEach((taxonomy) => {
    const args = {
      per_page: -1,
      status: 'publish',
      tax_relation: 'OR',
      _embed: ''
    }
    args[taxonomy] = categories

    const { hasResolved, records } = useEntityRecords('postType', postType, args)
    if (hasResolved) {
      resolvedCounter++

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
  })

  return {
    resolved: taxonomies.length === resolvedCounter,
    posts: [...new Set(globRecords)] // remove duplicates
  }
}
