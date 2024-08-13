import { useCallback, useState } from '@wordpress/element'

import Map from './components/Map'
import GlobalEventsHandler from './utils/GlobalEventsHandler'

export default function Main({ attributes, blockId, queriedPosts }) {
  const [isMobileView, setIsMobileView] = useState(false)
  const [posts, setPosts] = useState(false)

  // ---------- Refs
  const wrapperRef = useCallback((node) => {
    if (!node) {
      return
    }
    const resizeObserver = new ResizeObserver(() => {
      const ancestorBlock = node.closest('.wp-block-mps-maaaps-blocks')
      if (ancestorBlock) {
        const isMobile = !!window.getComputedStyle(ancestorBlock).getPropertyValue('--is-mobile').length
        setIsMobileView(isMobile)
      }
    })
    resizeObserver.observe(node)
  }, [])
  // ----------

  const [selectedPost, setSelectedPost] = useState({}) // a single post selected on click marker/post template
  const [selectedSearchResult, setSelectedSearchResult] = useState({}) // OSM selected search result (ex: Paris)

  GlobalEventsHandler({ blockId, setPosts, selectedPost, setSelectedPost, selectedSearchResult, setSelectedSearchResult })

  return (
    <div ref={wrapperRef}>
      <Map
        boundsPadding={attributes.selectedBoundsPadding}
        cluster={attributes.isClustered}
        clusterSize={attributes.selectedMarkerClusterSize}
        isGeolocated={attributes.isGeolocated}
        isMobileView={isMobileView}
        // markerOffset={popupOffset} TODO
        markerSize={attributes.selectedMarkerSize}
        maxMarkerZoom={attributes.selectedMaxMarkerZoom}
        maxZoom={attributes.selectedMaxZoom}
        // mobileIsMapDisplayed={mobileIsMapDisplayed} TODO: passer par le data-attr global du parent
        posts={posts || queriedPosts}
        selectedPost={selectedPost}
        selectedSearchResult={selectedSearchResult}
        // setFiltersOpen={setFiltersOpen}
        setSelectedPost={setSelectedPost}
        setSelectedSearchResult={setSelectedSearchResult}
        tiles={attributes.selectedMapTiles}
      />
    </div>
  )
}
