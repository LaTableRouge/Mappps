export default function GetFilterCount(tempFilters = []) {
  tempFilters = Object.entries(tempFilters)

  return tempFilters
    .map(([key, taxonomy]) => {
      return taxonomy.categories.filter((e) => e.checked)
    })
    .flat().length
}
