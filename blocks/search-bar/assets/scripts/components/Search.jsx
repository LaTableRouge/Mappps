import { memo, useCallback, useEffect, useRef, useState } from '@wordpress/element'
import { __ } from '@wordpress/i18n'
import { OpenStreetMapProvider } from 'leaflet-geosearch'

const provider = new OpenStreetMapProvider()

function Search({ limitedSearch, setMobileIsMapDisplayed, setSearchValue, setSelectedSearchResult }) {
	const [results, setResults] = useState([])
	const [showReset, setShowReset] = useState('none')
	const [showResults, setShowResults] = useState(false)
	const mobileMenuRef = useRef()

	const resetForm = useCallback(() => {
		setSelectedSearchResult({})
		setSearchValue('')
		setShowReset('none')
		setResults([])
		setShowResults(false)
	}, [setSearchValue, setSelectedSearchResult])

	const handleClickOutside = useCallback((e) => {
		if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
			setShowResults(false)
		}
	}, [])

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [handleClickOutside])

	const handleSubmit = useCallback(
		async (e) => {
			e.preventDefault()
			const searchInputValue = e.target.s.value

			if (!searchInputValue.length) return

			if (limitedSearch) {
				setSelectedSearchResult({})
				setSearchValue(searchInputValue)
			} else {
				const searchResults = await provider.search({ query: searchInputValue })
				setResults(searchResults)
				setShowResults(true)
				setSelectedSearchResult({})
				setSearchValue('')
			}
		},
		[limitedSearch, setSearchValue, setSelectedSearchResult]
	)

	const handleResultClick = useCallback(
		(result) => {
			setSelectedSearchResult(result)
			setMobileIsMapDisplayed(true)
			setShowResults(false)
		},
		[setMobileIsMapDisplayed, setSelectedSearchResult]
	)

	const handleKeyUp = useCallback(
		(e) => {
			e.preventDefault()
			if (e.target.value.length) {
				setShowReset('')
			} else {
				resetForm()
			}
		},
		[resetForm]
	)

	return (
		<div ref={mobileMenuRef} className="sidebar__search-wrapper">
			<form className="search-wrapper__form" role="search" onReset={resetForm} onSubmit={handleSubmit}>
				<input className="form__input" name="s" placeholder={__('Search...', 'mappps')} type="search" onKeyUp={handleKeyUp} />

				<button aria-label={__('Clear', 'mappps')} className="form__button form__button--reset" style={{ display: showReset }} title={__('Clear', 'mappps')} type="reset">
					<span className="icon-mappps-cross" />
					<span className="screen-reader-text">{__('Clear', 'mappps')}</span>
				</button>

				<button aria-label={__('Search', 'mappps')} className="form__button form__button--submit" title={__('Search', 'mappps')} type="submit">
					<span className="icon-mappps-search" />
					<span className="screen-reader-text">{__('Search', 'mappps')}</span>
				</button>
			</form>

			{!limitedSearch && showResults && (
				<div className="search-wrapper__results">
					<ul>
						{results.map((result, index) => (
							<li key={index} onClick={() => handleResultClick(result)}>
								<span>{result.label}</span>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	)
}

export default memo(Search)
