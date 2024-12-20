export default function GetFilterCount(filters = {}) {
  return Object.values(filters).reduce((count, { categories }) => count + categories.filter((category) => category.checked).length, 0)
}
