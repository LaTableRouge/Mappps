import { useSelect } from '@wordpress/data'
import { useMemo } from '@wordpress/element'

// Get categories by taxonomies
const getAssociateTaxonomyCategories = (taxonomies, categoriesToExclude) => {
  const records = useSelect(
    (select) => {
      const { getEntityRecords } = select('core')
      const groupsArgs = { per_page: -1 }

      const records = []
      if (taxonomies.length) {
        taxonomies.forEach((taxonomy) => {
          const record = getEntityRecords('taxonomy', taxonomy, groupsArgs)
          if (record) {
            records.push(record)
          }
        })
      }

      return records
    },
    [taxonomies]
  )

  const categories = useMemo(() => {
    const categories = {}

    if (records && records.length) {
      const flatArray = records.flat()
      const filteredCategories = flatArray.filter((category) => !categoriesToExclude.includes(category.id))

      if (filteredCategories.length) {
        filteredCategories.forEach(({ id, name, taxonomy }) => {
          if (!categories[taxonomy]) {
            categories[taxonomy] = []
          }

          categories[taxonomy].push({ name, id })
        })
      }
    }

    return categories
  }, [records])

  return categories
}

export default function GetCategories(taxonomies = []) {
  const categoriesToExclude = [1]

  const categories = getAssociateTaxonomyCategories(taxonomies, categoriesToExclude)

  return categories
}
