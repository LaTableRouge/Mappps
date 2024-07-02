import '../scss/editor.scss'

import { useBlockProps } from '@wordpress/block-editor'
import { useEffect, useState } from '@wordpress/element'

import Controls from './components/Controls'
import Map from './components/Map'
import Loader from './components/map/Loader'
import Sidebar from './components/Sidebar'

export default function Edit({ attributes, setAttributes }) {
  // attributes are the states stored by Wordpress
  // They are defined in the block.json

  // BlockProps are the data that will be inserted into the main html tag of the block (style, data-attr, etc...)
  const blockProps = useBlockProps()
  blockProps.style = {
    ...blockProps.style,
    '--marker-size': attributes.selectedMarkerSize,
    '--cluster-size': attributes.selectedMarkerClusterSize,
    '--color-primary': attributes.selectedPrimaryColor,
    '--color-secondary': attributes.selectedSecondaryColor,
    '--color-marker': attributes.selectedMarkerColor,
    '--color-cluster': attributes.selectedClusterColor,
    '--color-search': attributes.selectedSearchColor,
    '--color-geolocation': attributes.selectedGeolocationColor
  }

  useEffect(() => {
    setAttributes({ blockId: blockProps.id })
  }, [])

  // States that aren't stored by Wordrpess
  // They are only usefull for the preview
  const [filteredPosts, setFilteredPosts] = useState([])
  const [selectedPost, setSelectedPost] = useState({})
  const [selectedSearchResult, setSelectedSearchResult] = useState({})

  let posts = []
  if (attributes.selectedPosts.length) {
    posts = attributes.posts.filter((post) => attributes.selectedPosts.includes(`${post.id}`))
  }

  if (filteredPosts.length) {
    posts = filteredPosts
  }

  // TODO avec RUDY:
  // Change view (avec fitbound & geolocation & ouverture du cluster on click etc....)
  // Reset view
  // Marker active

  return (
    <>
      <Controls attributes={attributes} setAttributes={setAttributes} />
      <section {...blockProps}>
        {attributes.selectedDisplayType === 'full' && !!posts.length && (
          <Sidebar
            displaySearch={attributes.displaySearch}
            limitedSearch={attributes.limitedSearch}
            posts={posts}
            selectedPost={selectedPost}
            setAttributes={setAttributes}
            setFilteredPosts={setFilteredPosts}
            setSelectedPost={setSelectedPost}
            setSelectedSearchResult={setSelectedSearchResult}
            title={attributes.title}
          />
        )}

        {!!posts.length && (
          <Map
            cluster={attributes.isClustered}
            clusterSize={attributes.selectedMarkerClusterSize}
            colors={{
              marker: attributes.selectedMarkerColor,
              cluster: attributes.selectedClusterColor,
              search: attributes.selectedSearchColor,
              geolocationMarker: attributes.selectedGeolocationColor
            }}
            displaySearch={attributes.displaySearch}
            isGeolocated={attributes.isGeolocated}
            limitedSearch={attributes.limitedSearch}
            markerSize={attributes.selectedMarkerSize}
            maxZoom={attributes.selectedMaxZoom}
            minZoom={attributes.selectedMinZoom}
            posts={posts}
            selectedPost={selectedPost}
            selectedSearchResult={selectedSearchResult}
            tiles={attributes.selectedMapTiles}
          />
        )}

        <Loader hasPosts={!!attributes.selectedPosts.length} />
      </section>
    </>
  )
}
