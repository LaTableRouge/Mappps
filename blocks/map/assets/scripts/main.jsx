import { useCallback, useState } from '@wordpress/element'

import Map from './components/Map'
import GlobalEventsHandler from './utils/GlobalEventsHandler'

export default function Main({ attributes, blockId, queriedPosts }) {
  const [isMobileView, setIsMobileView] = useState(false)
  const [popupOffset, setPopupOffset] = useState(0)
  const [posts, setPosts] = useState(false)
  const [selectedPost, setSelectedPost] = useState({})
  const [selectedSearchResult, setSelectedSearchResult] = useState({})

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

  // TODO: change this to a more global function
  // ../../../../src/helpers/scripts/GlobalStateEventsHandler
  GlobalEventsHandler({
    blockId,
    setPosts,
    selectedPost,
    setSelectedPost,
    selectedSearchResult,
    setSelectedSearchResult
  })

  return (
    <div ref={wrapperRef}>
      <Map
        boundsPadding={attributes.selectedBoundsPadding}
        cluster={attributes.isClustered}
        clusterSize={attributes.selectedMarkerClusterSize}
        isGeolocated={attributes.isGeolocated}
        isMobileView={isMobileView}
        markerOffset={popupOffset}
        markerSize={attributes.selectedMarkerSize}
        maxMarkerZoom={attributes.selectedMaxMarkerZoom}
        maxZoom={attributes.selectedMaxZoom}
        // mobileIsMapDisplayed={mobileIsMapDisplayed} TODO: passer par le data-attr global du parent
        posts={posts || queriedPosts}
        selectedPost={selectedPost}
        selectedSearchResult={selectedSearchResult}
        setSelectedPost={setSelectedPost}
        setSelectedSearchResult={setSelectedSearchResult}
        tiles={attributes.selectedMapTiles}
      />
    </div>
  )
}
