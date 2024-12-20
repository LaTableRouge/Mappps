import { useState } from '@wordpress/element'
import { __ } from '@wordpress/i18n'

import GlobalStateEventsHandler from '../../../../src/helpers/scripts/GlobalStateEventsHandler'

export default function Main({ blockId }) {
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState({})
  const [filtersCount, setFiltersCount] = useState(0)

  // Setup global state handlers
  GlobalStateEventsHandler(blockId, filtersOpen, setFiltersOpen, 'filtersOpen')
  GlobalStateEventsHandler(blockId, selectedPost, setSelectedPost, 'selectedPost')
  GlobalStateEventsHandler(blockId, filtersCount, setFiltersCount, 'filtersCount')

  const handleClick = (e) => {
    e.preventDefault()
    setFiltersOpen(!filtersOpen)

    if (Object.keys(selectedPost).length) {
      setSelectedPost({})
    }
  }

  const buttonLabel = filtersOpen ? __('Close filters', 'mappps') : __('Open filters', 'mappps')

  return (
    <button aria-label={buttonLabel} className="custom-button custom-button__with-icon filters-wrapper__toggle" title={buttonLabel} onClick={handleClick}>
      {__('Filters', 'mappps')}
      {filtersCount > 0 && <span className="counter">{filtersCount}</span>}
      <span className="icon-mappps-filter" />
    </button>
  )
}
