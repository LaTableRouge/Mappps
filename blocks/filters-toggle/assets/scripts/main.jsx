import { useState } from '@wordpress/element'
import { __ } from '@wordpress/i18n'

import GlobalStateEventsHandler from '../../../../src/helpers/scripts/GlobalStateEventsHandler'

export default function Main({ blockId }) {
  const [filtersOpen, setFiltersOpen] = useState(false)
  GlobalStateEventsHandler(blockId, filtersOpen, setFiltersOpen, 'filtersOpen')
  const [selectedPost, setSelectedPost] = useState({})
  GlobalStateEventsHandler(blockId, selectedPost, setSelectedPost, 'selectedPost')
  const [filtersCount, setFiltersCount] = useState(0)
  GlobalStateEventsHandler(blockId, filtersCount, setFiltersCount, 'filtersCount')

  return (
    <>
      <button
        aria-label={filtersOpen ? __('Close filters', 'mappps') : __('Open filters', 'mappps')}
        className="custom-button custom-button__with-icon filters-wrapper__toggle"
        title={filtersOpen ? __('Close filters', 'mappps') : __('Open filters', 'mappps')}
        onClick={(e) => {
          e.preventDefault()

          setFiltersOpen(!filtersOpen)

          if (Object.keys(selectedPost).length) {
            setSelectedPost({})
          }
        }}
      >
        {__('Filters', 'mappps')}
        {!!filtersCount && <span className="counter">{filtersCount}</span>}
        <span className="icon-mappps-filter"></span>
      </button>
    </>
  )
}
