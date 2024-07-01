import { useState } from '@wordpress/element'
import { __ } from '@wordpress/i18n'
import { OpenStreetMapProvider } from 'leaflet-geosearch'

import { sluggify } from '../../common/functions'

export default function Search({ setAttributes, limitedSearch, posts, setSelectedSearchResult, setFilteredPosts }) {
  const [results, setResults] = useState([])
  const [showReset, setShowReset] = useState('none')
  const [showResults, setShowResults] = useState(false)

  const provider = new OpenStreetMapProvider()

  const resetForm = () => {
    setSelectedSearchResult({})
    setFilteredPosts([])
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
        onSubmit={async (e) => {
          e.preventDefault()

          const searchInputValue = e.target.s.value

          if (limitedSearch) {
            // Search only in previously selected posts
            const searchValue = new RegExp(sluggify(searchInputValue), '')
            const filteredPosts = posts.filter((post) => post.slug.match(searchValue))

            setAttributes({ filteredPosts })
            setSelectedSearchResult({})
            setFilteredPosts(filteredPosts)
          } else {
            // Search worldwide
            const searchResults = await provider.search({ query: searchInputValue })

            setResults(searchResults)
            setShowResults(true)
            setSelectedSearchResult({})
            setFilteredPosts([])
          }
        }}
        onReset={(e) => {
          // e.preventDefault()

          resetForm()
        }}
      >
        <input
          type="search"
          name="s"
          className="form__input"
          placeholder={__('Search...', 'maaaps')}
          onKeyUp={(e) => {
            e.preventDefault()

            if (e.target.value.length) {
              setShowReset('')
            } else {
              resetForm()
            }
          }}
        />

        <button type="reset" aria-label={__('Clear', 'maaaps')} className="form__button form__button--reset" style={{ display: showReset }}>
          <span className="icon-maaaps-cross"></span>
          <span className="screen-reader-text">{__('Clear', 'maaaps')}</span>
        </button>

        <button type="submit" aria-label={__('Search', 'maaaps')} className="form__button form__button--submit">
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
