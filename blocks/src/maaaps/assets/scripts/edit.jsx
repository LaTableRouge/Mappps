import '../styles/editor.scss'

import { useBlockProps } from '@wordpress/block-editor'
import { createRef, useEffect, useRef, useState } from '@wordpress/element'

import { isColorLight, sortStickyPosts } from './common/functions'
import Controls from './components/Controls'
import Map from './components/Map'
import Loader from './components/map/Loader'
import Sidebar from './components/Sidebar'
import Toggles from './components/Toggles'
import Wizard from './components/Wizard'
import CreateFilters from './utils/CreateFilters'
import FilterPosts from './utils/FilterPosts'
import GetPostTypes from './utils/GetPostTypes'
import GetSelectedPostTerms from './utils/GetSelectedPostTerms'

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
    '--popup-size': attributes.selectedPopupsSize,
    '--filter-size': attributes.selectedFiltersSize,
    '--color-button-primary': isColorLight(attributes.selectedPrimaryColor, 170) === 'light' ? 'var(--color-gray-700)' : 'var(--color-white)',
    '--color-button-secondary': isColorLight(attributes.selectedSecondaryColor, 170) === 'light' ? 'var(--color-gray-700)' : 'var(--color-white)'
  }

  // States that aren't stored by Wordrpess
  // They are only usefull for the preview

  const [selectedPost, setSelectedPost] = useState({}) // a single post selected on click marker/post template
  const [selectedPostTerms, setSelectedPostTerms] = useState({}) // the associated terms of the selected post
  const [queriedPosts, setQueriedPosts] = useState([]) // all posts fetched by the query
  const [selectedSearchResult, setSelectedSearchResult] = useState({}) // OSM selected search result (ex: Paris)
  const [mobileIsMapDisplayed, setMobileIsMapDisplayed] = useState(false) // mobile toggle
  const [filters, setFilters] = useState({}) // filters object
  const [filtersOpen, setFiltersOpen] = useState(false) // filters open/close state
  const [searchValue, setSearchValue] = useState('') // search value
  const [wrapperMaxHeight, setWrapperMaxHeight] = useState(0) // The height of the whole block
  const [popupWidth, setPopupWidth] = useState(0) // The height of the whole block
  const wrapperRef = useRef(null)
  const popupRef = useRef(null)

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

  useEffect(() => {
    console.log('wrapper Ref')
    setWrapperMaxHeight(wrapperRef.current.clientHeight)
  }, [wrapperRef])

  useEffect(() => {
    if (popupRef.current) {
      setPopupWidth(popupRef.current.clientWidth)
    }
  })

  useEffect(() => {
    if (Object.keys(selectedPost).length) {
      setSelectedPostTerms(GetSelectedPostTerms(selectedPost, attributes.taxonomies, attributes.categories))
    }
  }, [selectedPost])

  const postTypes = GetPostTypes()
  if (attributes.selectedPosts.length) {
    return (
      <section {...blockProps}>
        <Controls attributes={attributes} postTypes={postTypes.types} queriedPosts={queriedPosts} setAttributes={setAttributes} setQueriedPosts={setQueriedPosts} />
        <div ref={wrapperRef} className="responsive-wrapper" style={{ '--max-height': `${wrapperMaxHeight}px` }}>
          {attributes.selectedDisplayType === 'full' && !!posts.length && (
            <Sidebar
              displayFilters={attributes.displayFilters}
              displaySearch={attributes.displaySearch}
              filters={filters}
              filtersList={filtersList}
              filtersOpen={filtersOpen}
              limitedSearch={attributes.limitedSearch}
              markerRefs={markerRefs}
              popupRef={popupRef}
              postRefs={postRefs}
              posts={posts}
              selectedPost={selectedPost}
              selectedPostTerms={selectedPostTerms}
              setFilters={setFilters}
              setFiltersOpen={setFiltersOpen}
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
              markerOffset={popupWidth}
              markerRefs={markerRefs}
              markerSize={attributes.selectedMarkerSize}
              maxMarkerZoom={attributes.selectedMaxMarkerZoom}
              maxZoom={attributes.selectedMaxZoom}
              mobileIsMapDisplayed={mobileIsMapDisplayed}
              postRefs={postRefs}
              posts={posts}
              selectedPost={selectedPost}
              selectedSearchResult={selectedSearchResult}
              setFiltersOpen={setFiltersOpen}
              setSelectedPost={setSelectedPost}
              setSelectedSearchResult={setSelectedSearchResult}
              tiles={attributes.selectedMapTiles}
            />
          )}
        </div>

        {!!posts.length && <Toggles mobileIsMapDisplayed={mobileIsMapDisplayed} setMobileIsMapDisplayed={setMobileIsMapDisplayed} />}
        <Loader hasPosts={!!queriedPosts.length} />
      </section>
    )
  } else {
    return (
      <section {...blockProps}>
        <Wizard attributes={attributes} postTypes={postTypes} setAttributes={setAttributes} setQueriedPosts={setQueriedPosts} />
      </section>
    )
  }
}
