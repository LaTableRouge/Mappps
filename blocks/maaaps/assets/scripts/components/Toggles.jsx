import { __ } from '@wordpress/i18n'

export default function Toggles({ displayFilters, hasSidebar, mobileIsMapDisplayed, selectedFiltersCounter, setFiltersOpen, setMobileIsMapDisplayed, setSelectedPost }) {
  return (
    <div className="maaaps__toggles-wrapper">
      {hasSidebar
        && (mobileIsMapDisplayed
          ? (
          <button
            aria-label={__('See the list', 'maaaps')}
            className="custom-button custom-button__only-icon toggles-wrapper__list"
            title={__('See the list', 'maaaps')}
            onClick={(e) => {
              e.preventDefault()
              setMobileIsMapDisplayed(false)
            }}
          >
            <span className="icon-maaaps-list"></span>
            <span className="screen-reader-text">{__('See the list', 'maaaps')}</span>
          </button>
            )
          : (
          <button
            aria-label={__('See the map', 'maaaps')}
            className="custom-button custom-button__only-icon toggles-wrapper__map"
            title={__('See the map', 'maaaps')}
            onClick={(e) => {
              e.preventDefault()
              setMobileIsMapDisplayed(true)
            }}
          >
            <span className="icon-maaaps-map"></span>
            <span className="screen-reader-text">{__('See the map', 'maaaps')}</span>
          </button>
            ))}

      {hasSidebar && displayFilters && (
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
