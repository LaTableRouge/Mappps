export default function GetFilterCount(tempFilters = []) {
  tempFilters = Object.entries(tempFilters)

  return (
    tempFilters
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .map(([key, taxonomy]) => {
        return taxonomy.categories.filter((e) => e.checked)
      })
      .flat().length
  )
}
