import { useState } from '@wordpress/element'
import { __ } from '@wordpress/i18n'

import GlobalEventsHandler from './utils/GlobalEventsHandler'

export default function Main({ blockId }) {
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState({})
  const [filtersCount, setFiltersCount] = useState(0)

  // TODO: change this to a more global function
  // ../../../../src/helpers/scripts/GlobalStateEventsHandler
  GlobalEventsHandler({
    blockId,
    setFiltersCount,
    filtersOpen,
    setFiltersOpen,
    selectedPost
  })

  return (
    <>
      <button
        aria-label={filtersOpen ? __('Close filters', 'maaaps') : __('Open filters', 'maaaps')}
        className="custom-button custom-button__with-icon filters-wrapper__toggle"
        title={filtersOpen ? __('Close filters', 'maaaps') : __('Open filters', 'maaaps')}
        onClick={(e) => {
          e.preventDefault()

          setFiltersOpen(!filtersOpen)

          if (Object.keys(selectedPost).length) {
            setSelectedPost({})
          }
        }}
      >
        {__('Filters', 'maaaps')}
        {!!filtersCount && <span className="counter">{filtersCount}</span>}
        <span className="icon-maaaps-filter"></span>
      </button>
    </>
  )
}
