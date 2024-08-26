import { __ } from '@wordpress/i18n'

export default function Toggles({ displayFilters, hasSidebar, mobileIsMapDisplayed, selectedFiltersCounter, setFiltersOpen, setMobileIsMapDisplayed, setSelectedPost }) {
  return (
    <div className="mappps__toggles-wrapper">
      {hasSidebar
        && (mobileIsMapDisplayed
          ? (
          <button
            aria-label={__('See the list', 'mappps')}
            className="custom-button custom-button__only-icon toggles-wrapper__list"
            title={__('See the list', 'mappps')}
            onClick={(e) => {
              e.preventDefault()
              setMobileIsMapDisplayed(false)
            }}
          >
            <span className="icon-mappps-list"></span>
            <span className="screen-reader-text">{__('See the list', 'mappps')}</span>
          </button>
            )
          : (
          <button
            aria-label={__('See the map', 'mappps')}
            className="custom-button custom-button__only-icon toggles-wrapper__map"
            title={__('See the map', 'mappps')}
            onClick={(e) => {
              e.preventDefault()
              setMobileIsMapDisplayed(true)
            }}
          >
            <span className="icon-mappps-map"></span>
            <span className="screen-reader-text">{__('See the map', 'mappps')}</span>
          </button>
            ))}

      {hasSidebar && displayFilters && (
        <button
          aria-label={__('Open filters', 'mappps')}
          className="custom-button custom-button__only-icon toggles-wrapper__filters"
          title={__('Open filters', 'mappps')}
          onClick={(e) => {
            e.preventDefault()
            setFiltersOpen(true)
            setSelectedPost({})
          }}
        >
          <span className="icon-mappps-filter"></span>
          <span className="screen-reader-text">{__('Open filters', 'mappps')}</span>
          {!!selectedFiltersCounter && <span className="counter">{selectedFiltersCounter}</span>}
        </button>
      )}
    </div>
  )
}
