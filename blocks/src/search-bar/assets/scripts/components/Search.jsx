import { useCallback, useEffect, useRef, useState } from '@wordpress/element'
import { __ } from '@wordpress/i18n'
import { OpenStreetMapProvider } from 'leaflet-geosearch'

export default function Search({ limitedSearch }) {
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
    setShowReset('none')
    setResults([])
    setShowResults(false)
  }

  return (
    <div ref={mobileMenuRef} className="sidebar__search-wrapper">
      <form
        className="search-wrapper__form"
        role="search"
        onReset={(e) => {
          // e.preventDefault()

          resetForm()
        }}
        onSubmit={(e) => {
          e.preventDefault()

          const searchInputValue = e.target.s.value

          if (!searchInputValue.length) {
            return false
          }

          if (!limitedSearch) {
            // Search worldwide
            provider.search({ query: searchInputValue }).then(function (searchResults) {
              setResults(searchResults)
              setShowResults(true)
            })
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

        <button aria-label={__('Clear', 'maaaps')} className="form__button form__button--reset" style={{ display: showReset }} title={__('Clear', 'maaaps')} type="reset">
          <span className="icon-maaaps-cross"></span>
          <span className="screen-reader-text">{__('Clear', 'maaaps')}</span>
        </button>

        <button aria-label={__('Search', 'maaaps')} className="form__button form__button--submit" title={__('Search', 'maaaps')} type="submit">
          <span className="icon-maaaps-search"></span>
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
