import { memo, useCallback, useState } from '@wordpress/element'
import { __ } from '@wordpress/i18n'

import GlobalStateEventsHandler from '../../../../src/helpers/scripts/GlobalStateEventsHandler'

function Main({ blockId, hasFilters, hasSidebar }) {
  const [mobileIsMapDisplayed, setMobileIsMapDisplayed] = useState(true)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState({})
  const [filtersCount, setFiltersCount] = useState(0)

  GlobalStateEventsHandler(blockId, mobileIsMapDisplayed, setMobileIsMapDisplayed, 'mobileIsMapDisplayed')
  GlobalStateEventsHandler(blockId, filtersOpen, setFiltersOpen, 'filtersOpen')
  GlobalStateEventsHandler(blockId, selectedPost, setSelectedPost, 'selectedPost')
  GlobalStateEventsHandler(blockId, filtersCount, setFiltersCount, 'filtersCount')

  const handleMapToggle = useCallback(
    (e) => {
      e.preventDefault()
      setMobileIsMapDisplayed(!mobileIsMapDisplayed)
    },
    [mobileIsMapDisplayed]
  )

  const handleFiltersToggle = useCallback(
    (e) => {
      e.preventDefault()
      setFiltersOpen(true)

      if (Object.keys(selectedPost).length) {
        setSelectedPost({})
      }
    },
    [selectedPost]
  )

  if (!hasSidebar && !hasFilters) return null

  return (
    <>
      {hasSidebar && (
        <button
          aria-label={mobileIsMapDisplayed ? __('See the list', 'mappps') : __('See the map', 'mappps')}
          className={`custom-button custom-button__only-icon toggles__${mobileIsMapDisplayed ? 'list' : 'map'}`}
          title={mobileIsMapDisplayed ? __('See the list', 'mappps') : __('See the map', 'mappps')}
          onClick={handleMapToggle}
        >
          <span className={`icon-mappps-${mobileIsMapDisplayed ? 'list' : 'map'}`} />
          <span className="screen-reader-text">{mobileIsMapDisplayed ? __('See the list', 'mappps') : __('See the map', 'mappps')}</span>
        </button>
      )}

      {hasFilters && (
        <button
          aria-label={__('Open filters', 'mappps')}
          className="custom-button custom-button__only-icon toggles__filters"
          title={__('Open filters', 'mappps')}
          onClick={handleFiltersToggle}
        >
          <span className="icon-mappps-filter" />
          <span className="screen-reader-text">{__('Open filters', 'mappps')}</span>
          {!!filtersCount && <span className="counter">{filtersCount}</span>}
        </button>
      )}
    </>
  )
}

export default memo(Main)
