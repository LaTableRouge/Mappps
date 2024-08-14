import { useEffect } from '@wordpress/element'

export default function GlobalEventsHandler({ blockId, filtersOpen, selectedPost, setFiltersCount, setFiltersOpen }) {
  useEffect(() => {
    async function eventFiltersCount(e) {
      await e
      const details = e.detail
      if (details.id === blockId) {
        setFiltersCount(details.filtersCount)
      }
    }

    async function eventFiltersOpen(e) {
      await e
      const details = e.detail
      if (details.id === blockId) {
        setFiltersOpen(details.filtersOpen)
      }
    }

    document.addEventListener('mps-filters-count', eventFiltersCount)
    document.addEventListener('mps-filters-open', eventFiltersOpen)
    return () => {
      document.removeEventListener('mps-filters-count', eventFiltersCount)
      document.removeEventListener('mps-filters-open', eventFiltersOpen)
    }
  }, [])

  useEffect(() => {
    document.dispatchEvent(
      new CustomEvent('mps-filters-open', {
        detail: {
          id: blockId,
          filtersOpen
        }
      })
    )
  }, [filtersOpen])

  useEffect(() => {
    document.dispatchEvent(
      new CustomEvent('mps-selected-post', {
        detail: {
          id: blockId,
          selectedPost
        }
      })
    )
  }, [selectedPost])

  return null
}
