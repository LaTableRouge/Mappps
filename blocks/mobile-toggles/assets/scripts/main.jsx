import { useState } from '@wordpress/element'
import { __ } from '@wordpress/i18n'

import GlobalStateEventsHandler from '../../../../src/helpers/scripts/GlobalStateEventsHandler'

export default function Main({ attributes, blockId, hasFilters, hasSidebar }) {
  const [mobileIsMapDisplayed, setMobileIsMapDisplayed] = useState(true)
  GlobalStateEventsHandler(blockId, mobileIsMapDisplayed, setMobileIsMapDisplayed, 'mobileIsMapDisplayed')
  const [filtersOpen, setFiltersOpen] = useState(false)
  GlobalStateEventsHandler(blockId, filtersOpen, setFiltersOpen, 'filtersOpen')
  const [selectedPost, setSelectedPost] = useState({})
  GlobalStateEventsHandler(blockId, selectedPost, setSelectedPost, 'selectedPost')
  const [filtersCount, setFiltersCount] = useState(0)
  GlobalStateEventsHandler(blockId, filtersCount, setFiltersCount, 'filtersCount')

  return (
    <>
      {hasSidebar
        && (mobileIsMapDisplayed
          ? (
          <button
            aria-label={__('See the list', 'mappps')}
            className="custom-button custom-button__only-icon toggles__list"
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
            className="custom-button custom-button__only-icon toggles__map"
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

      {hasFilters && (
        <button
          aria-label={__('Open filters', 'mappps')}
          className="custom-button custom-button__only-icon toggles__filters"
          title={__('Open filters', 'mappps')}
          onClick={(e) => {
            e.preventDefault()

            setFiltersOpen(true)

            if (Object.keys(selectedPost).length) {
              setSelectedPost({})
            }
          }}
        >
          <span className="icon-mappps-filter"></span>
          <span className="screen-reader-text">{__('Open filters', 'mappps')}</span>
          {!!filtersCount && <span className="counter">{filtersCount}</span>}
        </button>
      )}
    </>
  )
}
