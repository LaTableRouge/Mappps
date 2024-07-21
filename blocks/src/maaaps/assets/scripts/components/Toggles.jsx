import { __ } from '@wordpress/i18n'

export default function Toggles({ displayFilters, mobileIsMapDisplayed, selectedFiltersCounter, setFiltersOpen, setMobileIsMapDisplayed, setSelectedPost }) {
  return (
    <div className="maaaps__toggles-wrapper">
      {mobileIsMapDisplayed
        ? (
        <button
          className="custom-button toggles-wrapper__list"
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
          className="custom-button toggles-wrapper__map"
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
          className="custom-button custom-button__only-icon toggles-wrapper__filters"
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
