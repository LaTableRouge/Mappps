import { useEffect } from '@wordpress/element'

export default function GlobalEventsHandler({ blockId, searchValue, selectedPost, setSearchValue, setSelectedPost }) {
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

    document.addEventListener('mps-search-value', eventSearchValue)
    document.addEventListener('mps-selected-post', eventSelectedPost)
    return () => {
      document.removeEventListener('mps-selected-post', eventSelectedPost)
      document.removeEventListener('mps-search-value', eventSearchValue)
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

  return null
}
