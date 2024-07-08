export default function Filters({ categories, selectedFilters, setSelectedFilters, taxonomies }) {
  const handleClick = (value) => {
    const object = {
      category: {
        name: 'Categories',
        id: 'category',
        categories: {
          35: {
            name: 'OYOYO'
          }
        }
      }
    }

    setSelectedFilters(object)
  }

  return (
    <div>
      <button value={35} onClick={(e) => handleClick(e.target.value)}>
        OYOYO
      </button>
      <button value="post_tag" onClick={(e) => handleClick(e.target.value)}>
        post_tag
      </button>
    </div>
  )
}
