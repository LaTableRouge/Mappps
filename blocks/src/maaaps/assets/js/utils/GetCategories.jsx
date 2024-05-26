import { useSelect } from '@wordpress/data'
import { useEffect, useMemo } from '@wordpress/element'

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
        filteredCategories.forEach((category) => {
          const taxonomy = category.taxonomy

          if (!categories[taxonomy]) {
            categories[taxonomy] = []
          }

          categories[taxonomy].push(category)
        })
      }
    }

    return categories
  }, [records])

  return categories
}

export default function GetCategories(taxonomies = [], attributes, setAttributes) {
  const categoriesToExclude = [1]

  const categories = getAssociateTaxonomyCategories(taxonomies, categoriesToExclude)

  const selectedCategories = []
  for (const key in categories) {
    if (Object.hasOwnProperty.call(categories, key)) {
      const elements = categories[key]
      if (elements.length) {
        elements.forEach((element) => {
          selectedCategories.push(element.id)
        })
      }
    }
  }

  useEffect(() => {
    if (Object.keys(categories).length) {
      if (JSON.stringify(attributes.categories) !== JSON.stringify(categories)) {
        setAttributes({ categories, selectedCategories })
      }
    }
  }, [categories])
}
