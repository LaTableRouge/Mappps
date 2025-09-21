export default function GetFilterCount(tempFilters = []) {
	tempFilters = Object.entries(tempFilters)

	return tempFilters
		.map(([taxonomy]) => {
			return taxonomy.categories.filter((e) => e.checked)
		})
		.flat().length
}
