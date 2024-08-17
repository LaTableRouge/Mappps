import { useCallback, useState } from '@wordpress/element'

import GlobalStateEventsHandler from '../../../../src/helpers/scripts/GlobalStateEventsHandler'
import Map from './components/Map'

export default function Main({ attributes, blockId, inEditor = false, queriedPosts }) {
  const [isMobileView, setIsMobileView] = useState(false)
  const [popupOffset, setPopupOffset] = useState(0)
  const [posts, setPosts] = useState(false)
  GlobalStateEventsHandler(blockId, posts, setPosts, 'posts')
  const [selectedPost, setSelectedPost] = useState({})
  GlobalStateEventsHandler(blockId, selectedPost, setSelectedPost, 'selectedPost', () => {
    // Close filters if a post is selected
    if (Object.keys(selectedPost).length) {
      document.dispatchEvent(
        new CustomEvent('mps-filtersOpen', {
          detail: {
            id: blockId,
            filtersOpen: false
          }
        })
      )
    }

    return false
  })
  const [selectedSearchResult, setSelectedSearchResult] = useState({})
  GlobalStateEventsHandler(blockId, selectedSearchResult, setSelectedSearchResult, 'selectedSearchResult')

  const wrapperRef = useCallback((node) => {
    if (!node) {
      return
    }
    const resizeObserver = new ResizeObserver(() => {
      const ancestorBlock = node.closest('.wp-block-mps-maaaps-blocks .responsive-wrapper')
      if (ancestorBlock) {
        const isMobile = !!window.getComputedStyle(ancestorBlock).getPropertyValue('--is-mobile').length
        setIsMobileView(isMobile)

        const detailsPopup = ancestorBlock.querySelector('.wp-block-mps-post-details')
        if (detailsPopup) {
          isMobileView ? setPopupOffset(node.clientHeight) : setPopupOffset(500)
        }
      }
    })
    resizeObserver.observe(node)
  }, [])

  return (
    <div ref={wrapperRef}>
      <Map
        boundsPadding={attributes.selectedBoundsPadding}
        cluster={attributes.isClustered}
        clusterSize={attributes.selectedMarkerClusterSize}
        inEditor={inEditor}
        isGeolocated={attributes.isGeolocated}
        isMobileView={isMobileView}
        markerOffset={popupOffset}
        markerSize={attributes.selectedMarkerSize}
        maxMarkerZoom={attributes.selectedMaxMarkerZoom}
        selectedPost={selectedPost}
        selectedSearchResult={selectedSearchResult}
        setSelectedPost={setSelectedPost}
        setSelectedSearchResult={setSelectedSearchResult}
        tiles={attributes.selectedMapTiles}
        maxZoom={attributes.selectedMaxZoom}
        // mobileIsMapDisplayed={mobileIsMapDisplayed} TODO: passer par le data-attr global du parent
        posts={posts || queriedPosts}
      />
    </div>
  )
}
