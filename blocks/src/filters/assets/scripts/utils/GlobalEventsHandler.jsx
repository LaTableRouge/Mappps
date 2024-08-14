import { useEffect } from '@wordpress/element'

export default function GlobalEventsHandler({ blockId, filtersCount, filtersOpen, posts, searchValue, selectedPost, setFiltersOpen, setSearchValue, setSelectedPost }) {
  useEffect(() => {
    async function eventSearchValue(e) {
      await e
      const details = e.detail
      if (details.id === blockId) {
        setSearchValue(details.searchValue)
      }
    }

    async function eventSelectedPost(e) {
      await e
      const details = e.detail
      if (details.id === blockId) {
        setSelectedPost(details.selectedPost)
      }
    }

    async function eventFiltersOpen(e) {
      await e
      const details = e.detail
      if (details.id === blockId) {
        setFiltersOpen(details.filtersOpen)
      }
    }

    document.addEventListener('mps-search-value', eventSearchValue)
    document.addEventListener('mps-selected-post', eventSelectedPost)
    document.addEventListener('mps-filters-open', eventFiltersOpen)
    return () => {
      document.removeEventListener('mps-selected-post', eventSelectedPost)
      document.removeEventListener('mps-search-value', eventSearchValue)
      document.removeEventListener('mps-filters-open', eventFiltersOpen)
    }
  }, [])

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
      new CustomEvent('mps-posts', {
        detail: {
          id: blockId,
          posts
        }
      })
    )
  }, [posts])

  useEffect(() => {
    document.dispatchEvent(
      new CustomEvent('mps-filters-count', {
        detail: {
          id: blockId,
          filtersCount
        }
      })
    )
  }, [posts])

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
