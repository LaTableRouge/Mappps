import '../styles/editor.scss'

import { useBlockProps } from '@wordpress/block-editor'
import { createRef, useRef, useState } from '@wordpress/element'

import { isColorLight, sortStickyPosts } from './common/functions'
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
    '--color-marker-active': attributes.selectedActiveMarkerColor,
    '--color-cluster': attributes.selectedClusterColor,
    '--color-marker-search': attributes.selectedSearchColor,
    '--color-marker-geolocation': attributes.selectedGeolocationColor,
    '--sidebar-size': attributes.selectedSidebarSize,
    '--color-button-primary': isColorLight(attributes.selectedPrimaryColor, 170) === 'light' ? 'var(--color-gray-700)' : 'var(--color-white)',
    '--color-button-secondary': isColorLight(attributes.selectedSecondaryColor, 170) === 'light' ? 'var(--color-gray-700)' : 'var(--color-white)'
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
  }

  if (attributes.displayFilters) {
    filtersList = CreateFilters(attributes.categories, attributes.taxonomies, posts)
    posts = FilterPosts(posts, filters, searchValue)
  }

  if (attributes.putStickyFirst) {
    posts = sortStickyPosts(posts)
  }

  // Create ref for markers & article (in the sidebar) for better association when clicking
  const markerRefs = useRef([])
  markerRefs.current = posts.map((_, i) => markerRefs.current[i] ?? createRef())

  const postRefs = useRef([])
  postRefs.current = posts.map((_, i) => postRefs.current[i] ?? createRef())

  // TODO:
  // offset map bound
  // style desktop & mobile
  // Marker cluster size fix
  // Search blur & z index

  return (
    <>
      <Controls attributes={attributes} queriedPosts={queriedPosts} setAttributes={setAttributes} setQueriedPosts={setQueriedPosts} />
      <section {...blockProps}>
        <div className="responsive-wrapper">
          {attributes.selectedDisplayType === 'full' && !!posts.length && (
            <Sidebar
              displayFilters={attributes.displayFilters}
              displaySearch={attributes.displaySearch}
              filters={filters}
              filtersList={filtersList}
              limitedSearch={attributes.limitedSearch}
              markerRefs={markerRefs}
              postRefs={postRefs}
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
              cluster={attributes.isClustered}
              clusterSize={attributes.selectedMarkerClusterSize}
              displaySearch={attributes.displaySearch}
              isGeolocated={attributes.isGeolocated}
              limitedSearch={attributes.limitedSearch}
              markerRefs={markerRefs}
              markerSize={attributes.selectedMarkerSize}
              maxMarkerZoom={attributes.selectedMaxMarkerZoom}
              maxZoom={attributes.selectedMaxZoom}
              mobileIsMapDisplayed={mobileIsMapDisplayed}
              postRefs={postRefs}
              posts={posts}
              selectedPost={selectedPost}
              selectedSearchResult={selectedSearchResult}
              setSelectedPost={setSelectedPost}
              setSelectedSearchResult={setSelectedSearchResult}
              tiles={attributes.selectedMapTiles}
            />
          )}
        </div>

        {!!posts.length && <Toggles mobileIsMapDisplayed={mobileIsMapDisplayed} setMobileIsMapDisplayed={setMobileIsMapDisplayed} />}
        <Loader hasPosts={!!queriedPosts.length} />
      </section>
    </>
  )
}
