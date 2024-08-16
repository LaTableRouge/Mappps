import { useEffect, useState } from '@wordpress/element'

import Filters from './components/Filters'
import CreateFilters from './utils/CreateFilters'
import FilterPosts from './utils/FilterPosts'
import GlobalEventsHandler from './utils/GlobalEventsHandler'

export default function Main({ blockId, categories, queriedPosts, taxonomies }) {
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [filters, setFilters] = useState({})
  const [searchValue, setSearchValue] = useState('')
  const [selectedPost, setSelectedPost] = useState({})
  const [posts, setPosts] = useState([])
  const [filtersCount, setFiltersCount] = useState(0)

  let filtersList = {}

  filtersList = CreateFilters(categories, taxonomies, queriedPosts)

  const tempFilters = Object.keys(filters).length ? filters : filtersList

  // TODO: change this to a more global function
  // ../../../../src/helpers/scripts/GlobalStateEventsHandler
  GlobalEventsHandler({
    blockId,
    searchValue,
    setSearchValue,
    selectedPost,
    setSelectedPost,
    posts,
    filtersCount,
    filtersOpen,
    setFiltersOpen
  })

  useEffect(() => {
    setPosts(FilterPosts(queriedPosts, tempFilters, searchValue))
  }, [searchValue])

  return (
    <>
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
