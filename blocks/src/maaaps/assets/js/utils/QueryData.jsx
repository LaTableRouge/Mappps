import { useEntityRecords } from '@wordpress/core-data'
import { useEffect } from '@wordpress/element'

export default function QueryData(setAttributes, postType = '', taxonomies = [], categories = []) {
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
      let filteredRecords = []
      if (records.length) {
        filteredRecords = records.filter((record) => !!record.meta.lat && !!record.meta.lng)
      }
      globRecords.push(...filteredRecords)
    }

    if (taxonomies.length === hasGlobResolved) {
      hasGlobResolved = true
    }
  })

  useEffect(() => {
    if (hasGlobResolved && globRecords.length) {
      const postIDs = []
      globRecords.forEach((record) => {
        postIDs.push(record.id)
      })
      setAttributes({ posts: postIDs })
    } else {
      setAttributes({ posts: [] })
    }
  }, [hasGlobResolved])

  return {
    resolved: hasGlobResolved,
    posts: globRecords
  }
}
