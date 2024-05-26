import { useEntityRecords } from '@wordpress/core-data'

export default function QueryData(postType = '', taxonomies = [], categories = []) {
  let hasGlobResolved = 0
  const globRecords = []

  taxonomies.forEach((taxonomy) => {
    const args = {
      per_page: -1,
      status: 'publish',
      tax_relation: 'OR'
    }
    if (taxonomy === 'post_tag') {
      taxonomy = 'tags'
    }
    args[taxonomy] = categories

    const { hasResolved, records } = useEntityRecords('postType', postType, args)
    if (hasResolved) {
      hasGlobResolved++
      globRecords.push(...records)
    }

    if (taxonomies.length === hasGlobResolved) {
      hasGlobResolved = true
    }
  })

  return {
    resolved: hasGlobResolved,
    posts: globRecords
  }
}
