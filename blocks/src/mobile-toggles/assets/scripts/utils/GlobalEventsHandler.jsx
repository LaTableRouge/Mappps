import { useEffect } from '@wordpress/element'

export default function GlobalEventsHandler({ blockId, filtersCount, filtersOpen, mobileIsMapDisplayed, selectedPost, setFiltersCount, setFiltersOpen, setMobileIsMapDisplayed }) {
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

    async function eventMobileMapDisplayed(e) {
      await e
      const details = e.detail
      if (details.id === blockId) {
        setMobileIsMapDisplayed(details.mobileIsMapDisplayed)
      }
    }

    document.addEventListener('mps-filters-count', eventFiltersCount)
    document.addEventListener('mps-filters-open', eventFiltersOpen)
    document.addEventListener('mps-mobile-map-displayed', eventMobileMapDisplayed)
    return () => {
      document.removeEventListener('mps-filters-count', eventFiltersCount)
      document.removeEventListener('mps-filters-open', eventFiltersOpen)
      document.removeEventListener('mps-mobile-map-displayed', eventMobileMapDisplayed)
    }
  }, [])

  useEffect(() => {
    document.dispatchEvent(
      new CustomEvent('mps-filters-count', {
        detail: {
          id: blockId,
          filtersCount
        }
      })
    )
  }, [filtersCount])

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

  useEffect(() => {
    document.dispatchEvent(
      new CustomEvent('mps-mobile-map-displayed', {
        detail: {
          id: blockId,
          mobileIsMapDisplayed
        }
      })
    )
  }, [mobileIsMapDisplayed])

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

  return null
}
