export default function GetSelectedPostTerms(post = {}, taxonomyList = [], categoriesList = {}) {
  const postTerms = []

  if (Object.keys(categoriesList).length) {
    for (const taxonomy in categoriesList) {
      if (Object.hasOwnProperty.call(categoriesList, taxonomy)) {
        const associatedTaxonomy = taxonomyList.find((e) => e.slug === taxonomy)

        if (associatedTaxonomy) {
          const restBase = associatedTaxonomy.rest_base
          const name = associatedTaxonomy.name

          const categories = categoriesList[taxonomy].filter((category) => post[restBase].includes(category.id))

          if (categories.length && restBase) {
            postTerms.push({
              taxonomyName: name,
              categories: categories.map(({ link, name }) => ({ name, link }))
            })
          }
        }
      }
    }
  }

  return postTerms
}
