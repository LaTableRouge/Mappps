import { useSelect } from '@wordpress/data'
import { useMemo } from '@wordpress/element'

// Get categories by taxonomies
const getAssociateTaxonomyCategories = (taxonomies, categoriesToExclude) => {
  let hasGlobResolved = false

  const { records, resolvedCounter } = useSelect(
    (select) => {
      const { getEntityRecords, hasFinishedResolution } = select('core')
      const groupsArgs = { per_page: -1 }

      const records = []
      let resolvedCounter = 0
      taxonomies.forEach((taxonomy) => {
        const record = getEntityRecords('taxonomy', taxonomy, groupsArgs)
        const resolved = hasFinishedResolution('getEntityRecords', ['taxonomy', taxonomy, groupsArgs])

        if (resolved) {
          resolvedCounter++
          if (record) {
            records.push(record)
          }
        }
      })

      return { records, resolvedCounter }
    },
    [taxonomies]
  )

  const categories = useMemo(() => {
    const categories = {}

    if (records && records.length) {
      const flatArray = records.flat()
      const filteredCategories = flatArray.filter((category) => !categoriesToExclude.includes(category.id))

      if (filteredCategories.length) {
        filteredCategories.forEach(({ id, link, name, taxonomy }) => {
          if (!categories[taxonomy]) {
            categories[taxonomy] = []
          }

          categories[taxonomy].push({ name, id, link })
        })
      }
    }

    return categories
  }, [records])

  if (taxonomies.length === resolvedCounter) {
    hasGlobResolved = true
  }

  return {
    categories,
    resolved: hasGlobResolved
  }
}

export default function GetCategories(taxonomies = []) {
  if (!taxonomies.length) {
    return false
  }

  const categoriesToExclude = [1]

  const categories = getAssociateTaxonomyCategories(taxonomies, categoriesToExclude)

  return categories
}
