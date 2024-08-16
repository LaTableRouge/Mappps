import { useEffect } from '@wordpress/element'

export default function GlobalEventsHandler({
  blockId,
  mobileIsMapDisplayed,
  searchValue,
  selectedSearchResult,
  setMobileIsMapDisplayed,
  setSearchValue,
  setSelectedSearchResult
}) {
  useEffect(() => {
    async function eventSelectedSearchResults(e) {
      await e
      const details = e.detail
      if (details.id === blockId) {
        setSelectedSearchResult(details.selectedSearchResult)
      }
    }

    async function eventSearchValue(e) {
      await e
      const details = e.detail
      if (details.id === blockId) {
        setSearchValue(details.searchValue)
      }
    }

    async function eventMobileMapDisplayed(e) {
      await e
      const details = e.detail
      if (details.id === blockId) {
        setMobileIsMapDisplayed(details.mobileIsMapDisplayed)
      }
    }

    document.addEventListener('mps-selected-search-result', eventSelectedSearchResults)
    document.addEventListener('mps-search-value', eventSearchValue)
    document.addEventListener('mps-mobile-map-displayed', eventMobileMapDisplayed)
    return () => {
      document.removeEventListener('mps-selected-search-result', eventSelectedSearchResults)
      document.removeEventListener('mps-search-value', eventSearchValue)
      document.removeEventListener('mps-mobile-map-displayed', eventMobileMapDisplayed)
    }
  }, [])

  useEffect(() => {
    document.dispatchEvent(
      new CustomEvent('mps-selected-search-result', {
        detail: {
          id: blockId,
          selectedSearchResult
        }
      })
    )
  }, [selectedSearchResult])

  useEffect(() => {
    document.dispatchEvent(
      new CustomEvent('mps-search-value', {
        detail: {
          id: blockId,
          searchValue
        }
      })
    )
  }, [searchValue])

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

  return null
}
