import { useCallback, useEffect, useRef, useState } from '@wordpress/element'
import { __ } from '@wordpress/i18n'
import { OpenStreetMapProvider } from 'leaflet-geosearch'

export default function Search({ limitedSearch, setMobileIsMapDisplayed, setSearchValue, setSelectedSearchResult }) {
  const [results, setResults] = useState([])
  const [showReset, setShowReset] = useState('none')
  const [showResults, setShowResults] = useState(false)

  // Close search results on click outside
  const mobileMenuRef = useRef()
  const closeOpenMenus = useCallback(
    (e) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setShowResults(false)
      }
    },
    [showResults]
  )
  useEffect(() => {
    document.addEventListener('mousedown', closeOpenMenus)
  }, [closeOpenMenus])

  const provider = new OpenStreetMapProvider()

  const resetForm = () => {
    setSelectedSearchResult({})
    setSearchValue('')
    setShowReset('none')
    setResults([])
    setShowResults(false)
  }

  return (
    <div ref={mobileMenuRef} className="sidebar__search-wrapper">
      <form
        className="search-wrapper__form"
        role="search"
        onReset={() => {
          // e.preventDefault()

          resetForm()
        }}
        onSubmit={(e) => {
          e.preventDefault()

          const searchInputValue = e.target.s.value

          if (!searchInputValue.length) {
            return false
          }

          if (limitedSearch) {
            // Search only in posts
            setSelectedSearchResult({})
            setSearchValue(searchInputValue)
          } else {
            // Search worldwide
            provider.search({ query: searchInputValue }).then(function (searchResults) {
              setResults(searchResults)
              setShowResults(true)
              setSelectedSearchResult({})
              setSearchValue('')
            })
          }
        }}
      >
        <input
          className="form__input"
          name="s"
          placeholder={__('Search...', 'mappps')}
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

        <button aria-label={__('Clear', 'mappps')} className="form__button form__button--reset" style={{ display: showReset }} title={__('Clear', 'mappps')} type="reset">
          <span className="icon-mappps-cross"></span>
          <span className="screen-reader-text">{__('Clear', 'mappps')}</span>
        </button>

        <button aria-label={__('Search', 'mappps')} className="form__button form__button--submit" title={__('Search', 'mappps')} type="submit">
          <span className="icon-mappps-search"></span>
          <span className="screen-reader-text">{__('Search', 'mappps')}</span>
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
                  setMobileIsMapDisplayed(true)
                  setShowResults(false)
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
