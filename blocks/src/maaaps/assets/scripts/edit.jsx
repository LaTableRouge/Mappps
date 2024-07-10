import '../styles/editor.scss'

import { useBlockProps } from '@wordpress/block-editor'
import { createRef, useRef, useState } from '@wordpress/element'

import Controls from './components/Controls'
import Map from './components/Map'
import Loader from './components/map/Loader'
import Sidebar from './components/Sidebar'
import Toggles from './components/Toggles'
import CreateFilters from './utils/CreateFilters'
import FilterPosts from './utils/FilterPosts'

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

  // States that aren't stored by Wordrpess
  // They are only usefull for the preview
  const [selectedPost, setSelectedPost] = useState({}) // a single post selected on click marker/post template
  const [queriedPosts, setQueriedPosts] = useState([]) // all posts fetched by the query
  const [selectedSearchResult, setSelectedSearchResult] = useState({}) // OSM selected search result (ex: Paris)
  const [mobileIsMapDisplayed, setMobileIsMapDisplayed] = useState(false) // mobile toggle
  const [filters, setFilters] = useState({}) // filters object
  const [searchValue, setSearchValue] = useState('') // search value

  let posts = []
  let filtersList = {}
  if (attributes.selectedPosts.length) {
    posts = queriedPosts.filter((post) => attributes.selectedPosts.includes(`${post.id}`))
    filtersList = CreateFilters(attributes.categories, attributes.taxonomies, posts)
    posts = FilterPosts(posts, filters, searchValue)
  }

  const markerRefs = useRef([])
  markerRefs.current = posts.map((_, i) => markerRefs.current[i] ?? createRef())

  const articleRefs = useRef([])
  articleRefs.current = posts.map((_, i) => articleRefs.current[i] ?? createRef())

  // TODO avec RUDY:
  // Marker active
  // offset map bound
  // Sidebar size
  // Filters

  return (
    <>
      <Controls attributes={attributes} queriedPosts={queriedPosts} setAttributes={setAttributes} setQueriedPosts={setQueriedPosts} />
      <section {...blockProps}>
        <div className="responsive-wrapper">
          {attributes.selectedDisplayType === 'full' && !!posts.length && (
            <Sidebar
              articleRefs={articleRefs}
              displaySearch={attributes.displaySearch}
              filters={filters}
              filtersList={filtersList}
              limitedSearch={attributes.limitedSearch}
              markerRefs={markerRefs}
              posts={posts}
              selectedPost={selectedPost}
              setFilters={setFilters}
              setSearchValue={setSearchValue}
              setSelectedPost={setSelectedPost}
              setSelectedSearchResult={setSelectedSearchResult}
              title={attributes.title}
            />
          )}

          {!!posts.length && (
            <Map
              articleRefs={articleRefs}
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
              markerRefs={markerRefs}
              markerSize={attributes.selectedMarkerSize}
              maxMarkerZoom={attributes.selectedMaxMarkerZoom}
              maxZoom={attributes.selectedMaxZoom}
              mobileIsMapDisplayed={mobileIsMapDisplayed}
              posts={posts}
              selectedPost={selectedPost}
              selectedSearchResult={selectedSearchResult}
              setSelectedPost={setSelectedPost}
              tiles={attributes.selectedMapTiles}
            />
          )}
        </div>

        <Toggles mobileIsMapDisplayed={mobileIsMapDisplayed} setMobileIsMapDisplayed={setMobileIsMapDisplayed} />

        <Loader hasPosts={!!queriedPosts.length} />
      </section>
    </>
  )
}
