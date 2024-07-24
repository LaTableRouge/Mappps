import { InnerBlocks } from '@wordpress/block-editor'
import { createRef, useCallback, useRef, useState } from '@wordpress/element'

import { sortStickyPosts } from './common/functions'

// import CreateFilters from './utils/CreateFilters'
// import FilterPosts from './utils/FilterPosts'
// import GetFilterCount from './utils/GetFiltersCount'
// import GetSelectedPostTerms from './utils/GetSelectedPostTerms'

export default function Main({ attributes, inEditor = false, isSelected, queriedPosts }) {
  // NEED: queriedPosts

  // ----------States that aren't stored by Wordrpess
  // They are only usefull for the preview
  const [selectedPost, setSelectedPost] = useState({}) // a single post selected on click marker/post template
  const [selectedPostTerms, setSelectedPostTerms] = useState({}) // the associated terms of the selected post
  const [selectedSearchResult, setSelectedSearchResult] = useState({}) // OSM selected search result (ex: Paris)
  const [mobileIsMapDisplayed, setMobileIsMapDisplayed] = useState(true) // mobile toggle
  const [filters, setFilters] = useState({}) // filters object
  const [filtersOpen, setFiltersOpen] = useState(false) // filters open/close state
  const [searchValue, setSearchValue] = useState('') // search value
  const [popupOffset, setPopupOffset] = useState(0) // The height of the whole block
  const [isMobileView, setIsMobileView] = useState(false) // The height of the whole block
  const [wrapperHeight, setWrapperHeight] = useState(0) // The height of the whole block
  // ----------

  // ---------- Other variables
  let posts = []
  const filtersList = {}
  if (attributes.selectedPosts.length) {
    posts = queriedPosts.filter((post) => attributes.selectedPosts.includes(`${post.id}`))
  }

  // if (attributes.displayFilters) {
  //   filtersList = CreateFilters(attributes.categories, attributes.taxonomies, posts)
  //   posts = FilterPosts(posts, filters, searchValue)
  // }

  if (attributes.putStickyFirst) {
    posts = sortStickyPosts(posts)
  }

  const tempFilters = Object.keys(filters).length ? filters : filtersList
  // const filtersCount = GetFilterCount(tempFilters)

  // Get the terms of the selected post
  // useEffect(() => {
  //   if (Object.keys(selectedPost).length) {
  //     setSelectedPostTerms(GetSelectedPostTerms(selectedPost, attributes.taxonomies, attributes.categories))
  //   }
  // }, [selectedPost])
  // ----------

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
      setWrapperHeight(node.clientHeight)
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

  return (
    <div ref={wrapperRef}>
      <InnerBlocks
        template={[
          ['mps/loader', {}]
          // ['mps/sidebar', {}],
          // ['mps/map', {}]
        ]}
      />
    </div>
  )
}
