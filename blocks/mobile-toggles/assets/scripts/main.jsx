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
            aria-label={__('See the list', 'maaaps')}
            className="custom-button custom-button__only-icon toggles__list"
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
            className="custom-button custom-button__only-icon toggles__map"
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

      {hasFilters && (
        <button
          aria-label={__('Open filters', 'maaaps')}
          className="custom-button custom-button__only-icon toggles__filters"
          title={__('Open filters', 'maaaps')}
          onClick={(e) => {
            e.preventDefault()

            setFiltersOpen(true)

            if (Object.keys(selectedPost).length) {
              setSelectedPost({})
            }
          }}
        >
          <span className="icon-maaaps-filter"></span>
          <span className="screen-reader-text">{__('Open filters', 'maaaps')}</span>
          {!!filtersCount && <span className="counter">{filtersCount}</span>}
        </button>
      )}
    </>
  )
}
