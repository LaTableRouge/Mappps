export default function GetFilterCount(tempFilters = {}) {
	return Object.entries(tempFilters)
		.map(([_key, taxonomy]) => {
			return taxonomy.categories.filter((e) => e.checked)
		})
		.flat().length
}
