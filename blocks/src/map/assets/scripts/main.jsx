import { useCallback, useState } from '@wordpress/element'

import Map from './components/Map'

export default function Main({ attributes, queriedPosts }) {
  const [isMobileView, setIsMobileView] = useState(false)

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

  return (
    <div ref={wrapperRef}>
      <Map
        boundsPadding={attributes.selectedBoundsPadding}
        cluster={attributes.isClustered}
        clusterSize={attributes.selectedMarkerClusterSize}
        // displaySearch={attributes.displaySearch}
        isGeolocated={attributes.isGeolocated}
        // isMobileView={isMobileView}
        // limitedSearch={attributes.limitedSearch}
        markerSize={attributes.selectedMarkerSize}
        maxMarkerZoom={attributes.selectedMaxMarkerZoom}
        maxZoom={attributes.selectedMaxZoom}
        // mobileIsMapDisplayed={mobileIsMapDisplayed} TODO: passer par le data-attr global du parent
        queriedPosts={queriedPosts}
        // selectedPost={selectedPost}
        // selectedSearchResult={selectedSearchResult}
        // setFiltersOpen={setFiltersOpen}
        // setSelectedPost={setSelectedPost}
        // setSelectedSearchResult={setSelectedSearchResult}
        tiles={attributes.selectedMapTiles}
      />
    </div>
  )
}
