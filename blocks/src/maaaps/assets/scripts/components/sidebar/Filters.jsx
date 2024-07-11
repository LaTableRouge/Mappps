import { __ } from '@wordpress/i18n'

export default function Filters({ filters, filtersList, setFilters }) {
  const tempFilters = Object.keys(filters).length ? Object.entries(filters) : Object.entries(filtersList)

  const handleChange = (e) => {
    const isChecked = e.checked
    const tempFilters = filters.length ? filters : filtersList

    const searchedInfos = e.id.split('---')
    const searchedTaxonomy = searchedInfos[0]
    const searchedCategory = searchedInfos[1]
    if (searchedCategory) {
      const categoryIndex = tempFilters[searchedTaxonomy].categories.findIndex((category) => category.id === Number(searchedCategory))

      tempFilters[searchedTaxonomy].categories[categoryIndex].checked = isChecked
    } else {
      tempFilters[searchedTaxonomy].checked = isChecked
      const categories = tempFilters[searchedTaxonomy].categories

      tempFilters[searchedTaxonomy].categories = categories.map((category) => {
        category.checked = isChecked
        return category
      })
    }

    setFilters(tempFilters)
  }

  return (
    <details className="sidebar__filters-wrapper">
      <summary>{__('Filters', 'maaaps')}</summary>
      {!!tempFilters.length && (
        <form
          className="filters-wrapper__form"
          // onSubmit={(e) => {}}
        >
          <ul className="form__list">
            {tempFilters.map(([key, taxonomy], i) => (
              <li key={i} className="list__element">
                <label htmlFor={key}>
                  <span>{taxonomy.name}</span>
                  <input
                    checked={taxonomy.checked ?? false}
                    id={key}
                    name={taxonomy.slug}
                    type="checkbox"
                    onChange={(e) => {
                      handleChange(e.target)
                    }}
                  />
                </label>

                <ul className="list__sublist">
                  {taxonomy.categories.map((category, i) => (
                    <li key={i} className="list__element">
                      <label htmlFor={`${key}-${category.id}`}>
                        <span>{category.name}</span>
                        <input
                          checked={category.checked ?? false}
                          id={`${key}---${category.id}`}
                          name={category.id}
                          type="checkbox"
                          onChange={(e) => {
                            handleChange(e.target)
                          }}
                        />
                      </label>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>

          <button aria-label={__('Clear', 'maaaps')} className="form__button form__button--reset" type="reset">
            <span className="icon-maaaps-cross"></span>
            <span className="screen-reader-text">{__('Clear', 'maaaps')}</span>
          </button>

          <button aria-label={__('Search', 'maaaps')} className="form__button form__button--submit" type="submit">
            {/* <span className='icon-maaaps-search'></span> */}
            <span className="screen-reader-text">{__('Search', 'maaaps')}</span>
          </button>
        </form>
      )}
    </details>
  )
}
