import { useCallback, useState } from '@wordpress/element'

import GlobalStateEventsHandler from '../../../../src/helpers/scripts/GlobalStateEventsHandler'
import MapEdit from './components/MapEdit'
import MapFront from './components/MapFront'

export default function Main({ attributes, blockId, inEditor = false, queriedPosts }) {
  // State management
  const [isMobileView, setIsMobileView] = useState(false)
  const [popupOffset, setPopupOffset] = useState(0)
  const [posts, setPosts] = useState(false)
  const [selectedPost, setSelectedPost] = useState({})
  const [selectedSearchResult, setSelectedSearchResult] = useState({})

  // Global state handlers
  GlobalStateEventsHandler(blockId, posts, setPosts, 'posts')
  GlobalStateEventsHandler(blockId, selectedPost, setSelectedPost, 'selectedPost', () => {
    if (Object.keys(selectedPost).length) {
      document.dispatchEvent(
        new CustomEvent('mppps-filtersOpen', {
          detail: {
            id: blockId,
            filtersOpen: false
          }
        })
      )
    }
    return false
  })
  GlobalStateEventsHandler(blockId, selectedSearchResult, setSelectedSearchResult, 'selectedSearchResult')

  const handleResize = useCallback((node) => {
    if (!node) return

    const resizeObserver = new ResizeObserver(() => {
      const ancestorBlock = node.closest('.wp-block-mppps-mappps-blocks .responsive-wrapper')
      if (!ancestorBlock) return

      const isMobile = !!window.getComputedStyle(ancestorBlock).getPropertyValue('--is-mobile').length
      setIsMobileView(isMobile)

      const detailsPopup = ancestorBlock.querySelector('.wp-block-mppps-post-details')
      if (!detailsPopup) return

      const dir = window.getComputedStyle(detailsPopup, null).getPropertyValue('direction')

      if (isMobileView) {
        setPopupOffset(detailsPopup.clientHeight * -1)
      } else {
        if (dir === 'rtl') {
          setPopupOffset(detailsPopup.clientWidth * -1)
        } else {
          setPopupOffset(detailsPopup.clientWidth)
        }
      }
    })

    resizeObserver.observe(node)
  }, [])

  const mapProps = {
    boundsPadding: attributes.selectedBoundsPadding,
    cluster: attributes.isClustered,
    clusterSize: attributes.selectedMarkerClusterSize,
    isGeolocated: attributes.isGeolocated,
    isMobileView,
    markerOffset: popupOffset,
    markerSize: attributes.selectedMarkerSize,
    maxMarkerZoom: attributes.selectedMaxMarkerZoom,
    maxZoom: attributes.selectedMaxZoom,
    posts: posts || queriedPosts,
    selectedPost,
    selectedSearchResult,
    setSelectedPost,
    setSelectedSearchResult,
    tiles: attributes.selectedMapTiles
  }

  return (
    <div ref={handleResize}>
      {
        // This is a temporary fix. wp-scripts break things from leaflet marker cluster in gutenberg.
        // ticket: https://github.com/WordPress/gutenberg/issues/64446
      }
      {inEditor ? <MapEdit {...mapProps} /> : <MapFront {...mapProps} />}
    </div>
  )
}
