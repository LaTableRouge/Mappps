import { useEffect, useState } from '@wordpress/element'
import { __ } from '@wordpress/i18n'

import Filters from './components/Filters'
import CreateFilters from './utils/CreateFilters'
import FilterPosts from './utils/FilterPosts'
import GlobalEventsHandler from './utils/GlobalEventsHandler'

export default function Main({ blockId, categories, queriedPosts, taxonomies }) {
  const [filtersOpen, setFiltersOpen] = useState(false) // filters open/close state
  const [filters, setFilters] = useState({}) // filters object
  const [searchValue, setSearchValue] = useState('') // search value
  const [selectedPost, setSelectedPost] = useState({}) // a single post selected on click marker/post template
  const [posts, setPosts] = useState([])
  const [filtersCount, setFiltersCount] = useState(0)

  let filtersList = {}

  filtersList = CreateFilters(categories, taxonomies, queriedPosts)

  const tempFilters = Object.keys(filters).length ? filters : filtersList

  GlobalEventsHandler({
    blockId,
    searchValue,
    setSearchValue,
    selectedPost,
    setSelectedPost
  })

  useEffect(() => {
    document.dispatchEvent(
      new CustomEvent('mps-posts', {
        detail: {
          id: blockId,
          posts
        }
      })
    )
  }, [posts])

  useEffect(() => {
    setPosts(FilterPosts(queriedPosts, tempFilters, searchValue))
  }, [searchValue])

  return (
    <>
      <button
        aria-label={filtersOpen ? __('Close filters', 'maaaps') : __('Open filters', 'maaaps')}
        className="custom-button custom-button__with-icon filters-wrapper__toggle"
        title={filtersOpen ? __('Close filters', 'maaaps') : __('Open filters', 'maaaps')}
        onClick={(e) => {
          e.preventDefault()

          setFiltersOpen(!filtersOpen)
          setSelectedPost({})
        }}
      >
        {__('Filters', 'maaaps')}
        {!!filtersCount && <span className="counter">{filtersCount}</span>}
        <span className="icon-maaaps-filter"></span>
      </button>

      <Filters
        filtersOpen={filtersOpen}
        posts={queriedPosts}
        queriedPosts={queriedPosts}
        searchValue={searchValue}
        setFilters={setFilters}
        setFiltersCount={setFiltersCount}
        setFiltersOpen={setFiltersOpen}
        setPosts={setPosts}
        tempFilters={tempFilters}
      />
    </>
  )
}
