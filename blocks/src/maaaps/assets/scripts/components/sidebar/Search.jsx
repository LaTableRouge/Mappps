import { useState } from '@wordpress/element'
import { __ } from '@wordpress/i18n'
import { OpenStreetMapProvider } from 'leaflet-geosearch'

export default function Search({ limitedSearch, setSearchValue, setSelectedSearchResult }) {
  const [results, setResults] = useState([])
  const [showReset, setShowReset] = useState('none')
  const [showResults, setShowResults] = useState(false)

  const provider = new OpenStreetMapProvider()

  const resetForm = () => {
    setSelectedSearchResult({})
    setSearchValue('')
    setShowReset('none')
    setResults([])
    setShowResults(false)
  }

  return (
    <div
      className="sidebar__search-wrapper"
      onBlur={() => {
        // setShowResults(false)
      }}
    >
      <form
        className="search-wrapper__form"
        role="search"
        onReset={(e) => {
          // e.preventDefault()

          resetForm()
        }}
        onSubmit={async (e) => {
          e.preventDefault()

          const searchInputValue = e.target.s.value

          if (limitedSearch) {
            // Search only in posts
            setSelectedSearchResult({})
            setSearchValue(searchInputValue)
          } else {
            // Search worldwide
            const searchResults = await provider.search({ query: searchInputValue })

            setResults(searchResults)
            setShowResults(true)
            setSelectedSearchResult({})
            setSearchValue('')
          }
        }}
      >
        <input
          className="form__input"
          name="s"
          placeholder={__('Search...', 'maaaps')}
          type="search"
          onKeyUp={(e) => {
            e.preventDefault()

            if (e.target.value.length) {
              setShowReset('')
            } else {
              resetForm()
            }
          }}
        />

        <button aria-label={__('Clear', 'maaaps')} className="form__button form__button--reset" style={{ display: showReset }} type="reset">
          <span className="icon-maaaps-cross"></span>
          <span className="screen-reader-text">{__('Clear', 'maaaps')}</span>
        </button>

        <button aria-label={__('Search', 'maaaps')} className="form__button form__button--submit" type="submit">
          {/* <span className='icon-maaaps-search'></span> */}
          <span className="screen-reader-text">{__('Search', 'maaaps')}</span>
        </button>
      </form>

      {!limitedSearch && showResults && (
        <div className="search-wrapper__results">
          <ul>
            {results.map((result, index) => (
              <li
                key={index}
                onClick={() => {
                  setSelectedSearchResult(result)
                }}
              >
                <span>{result.label}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
