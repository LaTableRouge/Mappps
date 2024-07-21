import { __ } from '@wordpress/i18n'

export default function Toggles({ displayFilters, mobileIsMapDisplayed, selectedFiltersCounter, setFiltersOpen, setMobileIsMapDisplayed, setSelectedPost }) {
  return (
    <div className="maaaps__toggles-wrapper">
      {mobileIsMapDisplayed
        ? (
        <button
          className="toggles-wrapper__button toggles-wrapper__button--list"
          onClick={(e) => {
            e.preventDefault()
            setMobileIsMapDisplayed(false)
          }}
        >
          {__('See the list', 'maaaps')}
        </button>
          )
        : (
        <button
          className="toggles-wrapper__button toggles-wrapper__button--map"
          onClick={(e) => {
            e.preventDefault()
            setMobileIsMapDisplayed(true)
          }}
        >
          {__('See the map', 'maaaps')}
        </button>
          )}

      {displayFilters && (
        <button
          aria-label={__('Open filters', 'maaaps')}
          className="toggles-wrapper__button toggles-wrapper__button--filters"
          title={__('Open filters', 'maaaps')}
          onClick={(e) => {
            e.preventDefault()
            setFiltersOpen(true)
            setSelectedPost({})
          }}
        >
          <span className="icon-maaaps-filter"></span>
          <span className="screen-reader-text">{__('Open filters', 'maaaps')}</span>
          {!!selectedFiltersCounter && <span className="counter">{selectedFiltersCounter}</span>}
        </button>
      )}
    </div>
  )
}
