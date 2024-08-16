import { useEffect } from '@wordpress/element'

export default function GlobalEventsHandler({ blockId, selectedPost, selectedSearchResult, setPosts, setSelectedPost, setSelectedSearchResult }) {
  useEffect(() => {
    async function eventPosts(e) {
      await e
      const details = e.detail
      if (details.id === blockId) {
        setPosts(details.posts)
      }
    }

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

    document.addEventListener('mps-posts', eventPosts)
    document.addEventListener('mps-selected-post', eventSelectedPost)
    document.addEventListener('mps-selected-search-result', eventSelectedSearchResults)
    return () => {
      document.removeEventListener('mps-posts', eventPosts)
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

    // Close filters if a post is selected
    if (Object.keys(selectedPost).length) {
      document.dispatchEvent(
        new CustomEvent('mps-filters-open', {
          detail: {
            id: blockId,
            filtersOpen: false
          }
        })
      )
    }
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
