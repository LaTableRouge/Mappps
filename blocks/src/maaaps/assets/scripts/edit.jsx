import '../styles/editor.scss'

import { InnerBlocks, useBlockProps } from '@wordpress/block-editor'
import { useEffect, useState } from '@wordpress/element'

import Controls from './components/Controls'
// import Sidebar from './components/Sidebar'
import Toggles from './components/Toggles'

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
  // const [selectedPost, setSelectedPost] = useState({})
  const [queriedPosts, setQueriedPosts] = useState([])
  // const [selectedSearchResult, setSelectedSearchResult] = useState({})
  const [mobileIsMapDisplayed, setMobileIsMapDisplayed] = useState(false)

  // const [height, setHeight] = useState(0)
  // const ref = useRef(null)

  // useEffect(() => {
  //   setHeight(ref.current.clientHeight)
  // })

  let posts = []
  if (attributes.selectedPosts.length) {
    posts = queriedPosts.filter((post) => attributes.selectedPosts.includes(`${post.id}`))
  }

  if (filteredPosts.length) {
    posts = filteredPosts
  }

  // Child block change listener : https://wordpress.stackexchange.com/questions/406384/how-to-output-child-block-attributes-on-a-parent-block

  // TODO avec RUDY:
  // Change view (avec fitbound & geolocation & ouverture du cluster on click etc....)
  // Reset view
  // Marker active

  // TODO:
  // Refacto en blocks séparés
  // -- Maaaps
  // ---- Leaflet map
  // ------ Popup
  // ---- Sidebar
  // ------ Title
  // ------ Filters
  // ------ Search
  // ------ List
  // -------- List element
  // -------- List element detail

  return (
    <section {...blockProps}>
      <Controls attributes={attributes} queriedPosts={queriedPosts} setAttributes={setAttributes} setQueriedPosts={setQueriedPosts} />
      {!!posts.length && (
        <InnerBlocks
          template={[
            ['mps/loader', {}],
            ['mps/sidebar', {}],
            ['mps/map', {}]
          ]}
        />
      )}

      {/* <div className="responsive-wrapper" ref={ref} style={{'--maaaps-height': `${height}px`}}> */}
      {attributes.selectedDisplayType === 'full' && !!posts.length && (
        <></>
        // <Sidebar
        //   displaySearch={attributes.displaySearch}
        //   limitedSearch={attributes.limitedSearch}
        //   posts={posts}
        //   selectedPost={selectedPost}
        //   setAttributes={setAttributes}
        //   setFilteredPosts={setFilteredPosts}
        //   setSelectedPost={setSelectedPost}
        //   setSelectedSearchResult={setSelectedSearchResult}
        //   title={attributes.title}
        // />
      )}

      {/* {!!posts.length && (
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
            mobileIsMapDisplayed={mobileIsMapDisplayed}
            posts={posts}
            selectedPost={selectedPost}
            selectedSearchResult={selectedSearchResult}
            tiles={attributes.selectedMapTiles}
          />
        )} */}
      {/* </div> */}

      <Toggles mobileIsMapDisplayed={mobileIsMapDisplayed} setMobileIsMapDisplayed={setMobileIsMapDisplayed} />

      {/* <Loader hasPosts={!!queriedPosts.length} /> */}
    </section>
  )
}
