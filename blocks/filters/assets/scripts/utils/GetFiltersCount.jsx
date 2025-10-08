export default function GetFilterCount(filters = {}) {
	return Object.values(filters).reduce((count, { terms }) => count + terms.filter((term) => term.checked).length, 0)
}
