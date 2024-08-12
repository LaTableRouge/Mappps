import { useEffect } from '@wordpress/element'

export default function GlobalEventsHandler({ blockId, posts, selectedPost, selectedSearchResult, setPosts, setSelectedPost, setSelectedSearchResult }) {
  useEffect(() => {
    async function eventSelectedPost(e) {
      await e
      const details = e.detail
      if (details.id === blockId) {
        setSelectedPost(details.selectedPost)
      }
    }

    async function eventSelectedSearchResults(e) {
      await e
      const details = e.detail
      if (details.id === blockId) {
        setSelectedSearchResult(details.selectedSearchResult)
      }
    }

    document.addEventListener('mps-selected-post', eventSelectedPost)
    document.addEventListener('mps-selected-search-result', eventSelectedSearchResults)
    return () => {
      document.removeEventListener('mps-selected-post', eventSelectedPost)
      document.removeEventListener('mps-selected-search-result', eventSelectedSearchResults)
    }
  }, [])

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
      new CustomEvent('mps-selected-search-result', {
        detail: {
          id: blockId,
          selectedSearchResult
        }
      })
    )
  }, [selectedSearchResult])

  return null
}
