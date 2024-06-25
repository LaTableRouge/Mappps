import { useEntityRecords } from '@wordpress/core-data'

export default function GetPosts(postType = '', taxonomies = [], categories = []) {
  let hasGlobResolved = false
  let resolvedCounter = 0
  const globRecords = []

  taxonomies.forEach((taxonomy) => {
    const args = {
      per_page: -1,
      status: 'publish',
      tax_relation: 'OR'
    }
    args[taxonomy] = categories

    const { hasResolved, records } = useEntityRecords('postType', postType, args)
    if (hasResolved) {
      resolvedCounter++
      let filteredRecords = []
      if (records.length) {
        filteredRecords = records.filter((record) => !!record.meta.lat && !!record.meta.lng)
      }
      globRecords.push(...filteredRecords)
    }

    if (taxonomies.length === resolvedCounter) {
      hasGlobResolved = true
    }
  })

  return {
    resolved: hasGlobResolved,
    posts: [...new Set(globRecords)] // remove duplicates
  }
}
