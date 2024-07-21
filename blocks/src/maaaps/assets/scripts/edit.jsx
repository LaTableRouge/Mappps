import '../styles/editor.scss'

import { useBlockProps } from '@wordpress/block-editor'
import { createRef, useCallback, useEffect, useRef, useState } from '@wordpress/element'

import { isColorLight, sortStickyPosts } from './common/functions'
import Controls from './components/Controls'
import Filters from './components/Filters'
import Map from './components/Map'
import Loader from './components/map/Loader'
import Popups from './components/Popups'
import Sidebar from './components/Sidebar'
import Toggles from './components/Toggles'
import Wizard from './components/Wizard'
import CreateFilters from './utils/CreateFilters'
import FilterPosts from './utils/FilterPosts'
import GetFilterCount from './utils/GetFiltersCount'
import GetPostTypes from './utils/GetPostTypes'
import GetSelectedPostTerms from './utils/GetSelectedPostTerms'

export default function Edit({ attributes, setAttributes }) {
  // attributes are the states stored by Wordpress
  // They are defined in the block.json

  // ---------- BlockProps are the data that will be inserted into the main html tag of the block (style, data-attr, etc...)
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
  if (blockProps.style.aspectRatio) {
    if (blockProps.style.aspectRatio !== 'auto') {
      blockProps.style['--aspect-ratio'] = blockProps.style.aspectRatio
    }
    delete blockProps.style.aspectRatio
  }
  // ----------

  // ----------States that aren't stored by Wordrpess
  // They are only usefull for the preview
  const [selectedPost, setSelectedPost] = useState({}) // a single post selected on click marker/post template
  const [selectedPostTerms, setSelectedPostTerms] = useState({}) // the associated terms of the selected post
  const [queriedPosts, setQueriedPosts] = useState([]) // all posts fetched by the query
  const [selectedSearchResult, setSelectedSearchResult] = useState({}) // OSM selected search result (ex: Paris)
  const [mobileIsMapDisplayed, setMobileIsMapDisplayed] = useState(false) // mobile toggle
  const [filters, setFilters] = useState({}) // filters object
  const [filtersOpen, setFiltersOpen] = useState(false) // filters open/close state
  const [searchValue, setSearchValue] = useState('') // search value
  const [popupOffset, setPopupOffset] = useState(0) // The height of the whole block
  const [isMobileView, setIsMobileView] = useState(false) // The height of the whole block
  // ----------

  // ---------- Other variables
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

  const tempFilters = Object.keys(filters).length ? filters : filtersList
  const filtersCount = GetFilterCount(tempFilters)
  const postTypes = GetPostTypes()

  // Get the terms of the selected post
  useEffect(() => {
    if (Object.keys(selectedPost).length) {
      setSelectedPostTerms(GetSelectedPostTerms(selectedPost, attributes.taxonomies, attributes.categories))
    }
  }, [selectedPost])
  // ----------

  // TODO:
  // style desktop & mobile
  // Style rtl
  // Mobile popup expand

  // ---------- Refs
  // Create ref for markers & article (in the sidebar) for better association when clicking
  const markerRefs = useRef([])
  markerRefs.current = posts.map((_, i) => markerRefs.current[i] ?? createRef())
  const postRefs = useRef([])
  postRefs.current = posts.map((_, i) => postRefs.current[i] ?? createRef())

  // Check if the wrapper is in mobile view (container query check)
  const wrapperRef = useCallback((node) => {
    if (!node) {
      return
    }
    const resizeObserver = new ResizeObserver(() => {
      const isMobile = !!window.getComputedStyle(node).getPropertyValue('--is-mobile').length
      setIsMobileView(isMobile)
    })
    resizeObserver.observe(node)
  }, [])

  // Set the popup size for the marker offset (needed because cqw is not a px value)
  const popupRef = useCallback((node) => {
    if (!node) {
      return
    }
    const resizeObserver = new ResizeObserver(() => {
      isMobileView ? setPopupOffset(node.clientHeight) : setPopupOffset(node.clientWidth)
    })
    resizeObserver.observe(node)
  }, [])
  // ----------

  if (attributes.selectedPosts.length) {
    return (
      <section {...blockProps}>
        <Controls attributes={attributes} postTypes={postTypes.types} queriedPosts={queriedPosts} setAttributes={setAttributes} setQueriedPosts={setQueriedPosts} />

        <div
          ref={wrapperRef}
          className="responsive-wrapper"
          data-filters-open={filtersOpen}
          data-is-mobile={isMobileView}
          data-mobile-map-display={mobileIsMapDisplayed}
          data-selected-post={!!Object.keys(selectedPost).length}
        >
          {attributes.selectedDisplayType === 'full' && !!posts.length && (
            <Sidebar
              displayFilters={attributes.displayFilters}
              displaySearch={attributes.displaySearch}
              filtersOpen={filtersOpen}
              limitedSearch={attributes.limitedSearch}
              postRefs={postRefs}
              posts={posts}
              selectedFiltersCounter={filtersCount}
              selectedPost={selectedPost}
              setFiltersOpen={setFiltersOpen}
              setMobileIsMapDisplayed={setMobileIsMapDisplayed}
              setSearchValue={setSearchValue}
              setSelectedPost={setSelectedPost}
              setSelectedSearchResult={setSelectedSearchResult}
            />
          )}

          {!!posts.length && (
            <>
              <Map
                boundsPadding={attributes.selectedBoundsPadding}
                cluster={attributes.isClustered}
                clusterSize={attributes.selectedMarkerClusterSize}
                displaySearch={attributes.displaySearch}
                isGeolocated={attributes.isGeolocated}
                isMobileView={isMobileView}
                limitedSearch={attributes.limitedSearch}
                markerOffset={popupOffset}
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

              {attributes.displayFilters && <Filters filtersOpen={filtersOpen} setFilters={setFilters} setFiltersOpen={setFiltersOpen} tempFilters={tempFilters} />}

              <Popups popupRef={popupRef} postRefs={postRefs} posts={posts} selectedPost={selectedPost} selectedPostTerms={selectedPostTerms} setSelectedPost={setSelectedPost} />

              {isMobileView && (
                <Toggles
                  displayFilters={attributes.displayFilters}
                  mobileIsMapDisplayed={mobileIsMapDisplayed}
                  selectedFiltersCounter={filtersCount}
                  setFiltersOpen={setFiltersOpen}
                  setMobileIsMapDisplayed={setMobileIsMapDisplayed}
                  setSelectedPost={setSelectedPost}
                />
              )}
            </>
          )}
        </div>

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
