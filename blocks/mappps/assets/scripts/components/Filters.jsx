import { __ } from '@wordpress/i18n'

export default function Filters({ filtersOpen, setFilters, setFiltersOpen, tempFilters }) {
  const handleChange = (e, filtersList) => {
    const tempFilters = { ...filtersList } // reconstruct a new object to not alter the one passed by the parameters
    const isChecked = e.checked

    const searchedInfos = e.id.split('---')
    const searchedTaxonomy = searchedInfos[0]
    const searchedCategory = searchedInfos[1]
    if (searchedCategory) {
      const categoryIndex = tempFilters[searchedTaxonomy].categories.findIndex((category) => category.id === Number(searchedCategory))

      tempFilters[searchedTaxonomy].categories[categoryIndex].checked = isChecked
    } else {
      const categories = tempFilters[searchedTaxonomy].categories

      tempFilters[searchedTaxonomy].categories = categories.map((category) => {
        category.checked = isChecked
        return category
      })
    }

    setFilters(tempFilters)
  }

  const resetFilters = () => {
    for (const key in tempFilters) {
      if (Object.hasOwnProperty.call(tempFilters, key)) {
        const taxonomy = tempFilters[key]
        taxonomy.checked = false

        let categories = taxonomy.categories
        categories = categories.map((category) => {
          if (category.checked) {
            category.checked = false
          }
          return category
        })
      }
    }

    setFilters(tempFilters)
  }

  const isTaxonomyChecked = (taxonomy) => {
    const checkedCategories = taxonomy.categories.filter((e) => e.checked)
    return checkedCategories.length === taxonomy.categories.length
  }

  return (
    <>
      {!!Object.keys(tempFilters).length && (
        <form
          className="filters-form"
          data-open={filtersOpen}
          onReset={(e) => {
            resetFilters()
          }}
          onSubmit={(e) => {
            e.preventDefault()

            setFiltersOpen(false)
          }}
        >
          <div className="filters-form__header">
            <div className="header__title">{__('Filters', 'mappps')}</div>
            <button
              aria-label={__('Close filters', 'mappps')}
              className="custom-button custom-button__only-icon header__close"
              title={__('Close filters', 'mappps')}
              type="button"
              onClick={(e) => {
                e.preventDefault()

                setFiltersOpen(false)
              }}
            >
              <span className="icon-mappps-cross"></span>
              <span className="screen-reader-text">{__('Close filters', 'mappps')}</span>
            </button>
          </div>

          <ul className="filters-form__list">
            {Object.entries(tempFilters).map(([key, taxonomy], i) => (
              <li key={i} className="list__element">
                <label htmlFor={key}>
                  <input
                    checked={isTaxonomyChecked(taxonomy)}
                    id={key}
                    name={key}
                    type="checkbox"
                    onChange={(e) => {
                      handleChange(e.target, tempFilters)
                      // e.preventDefault()
                    }}
                  />
                  <span>{taxonomy.name}</span>
                </label>

                <ul className="list__sublist">
                  {taxonomy.categories.map((category, i) => (
                    <li key={i} className="list__element">
                      <label htmlFor={`${key}---${category.id}`}>
                        <input
                          checked={category.checked ?? false}
                          id={`${key}---${category.id}`}
                          name={`${key}---${category.id}`}
                          type="checkbox"
                          onChange={(e) => {
                            handleChange(e.target, tempFilters)
                            // e.preventDefault()
                          }}
                        />
                        <span>{category.name}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>

          <div className="filters-form__footer">
            <button aria-label={__('Reset', 'mappps')} className="custom-button footer__reset" title={__('Reset', 'mappps')} type="reset">
              {__('Reset', 'mappps')}
              {/* <span className="icon-mappps-cross"></span>
              <span className="screen-reader-text">{__('Reset', 'mappps')}</span> */}
            </button>

            <button aria-label={__('Filter', 'mappps')} className="custom-button footer__submit" title={__('Filter', 'mappps')} type="submit">
              {__('Filter', 'mappps')}
              {/* <span className='icon-mappps-filter'></span> */}
              {/* <span className="screen-reader-text">{__('Filter', 'mappps')}</span> */}
            </button>
          </div>
        </form>
      )}
    </>
  )
}
