import { useSelect } from '@wordpress/data'
import { useMemo } from '@wordpress/element'

const CATEGORIES_TO_EXCLUDE = [1]

function getAssociateTaxonomyCategories(taxonomies, categoriesToExclude) {
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
    const result = {}

    if (records?.length) {
      const flatArray = records.flat()
      const filteredCategories = flatArray.filter((category) => !categoriesToExclude.includes(category.id))

      filteredCategories.forEach(({ id, link, name, taxonomy }) => {
        if (!result[taxonomy]) {
          result[taxonomy] = []
        }
        result[taxonomy].push({ name, id, link })
      })
    }

    return result
  }, [records])

  return {
    categories,
    resolved: taxonomies.length === resolvedCounter
  }
}

export default function GetCategories(taxonomies = []) {
  if (!taxonomies.length) {
    return false
  }

  return getAssociateTaxonomyCategories(taxonomies, CATEGORIES_TO_EXCLUDE)
}
