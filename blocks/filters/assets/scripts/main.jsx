import { useEffect, useState } from '@wordpress/element'

import GlobalStateEventsHandler from '../../../../src/helpers/scripts/GlobalStateEventsHandler'
import Filters from './components/Filters'
import CreateFilters from './utils/CreateFilters'
import FilterPosts from './utils/FilterPosts'

export default function Main({ blockId, categories, queriedPosts, taxonomies }) {
  const [filters, setFilters] = useState({})
  const [filtersOpen, setFiltersOpen] = useState(false)
  GlobalStateEventsHandler(blockId, filtersOpen, setFiltersOpen, 'filtersOpen')
  const [searchValue, setSearchValue] = useState('')
  GlobalStateEventsHandler(blockId, searchValue, setSearchValue, 'searchValue')
  const [selectedPost, setSelectedPost] = useState({})
  GlobalStateEventsHandler(blockId, selectedPost, setSelectedPost, 'selectedPost')
  const [posts, setPosts] = useState([])
  GlobalStateEventsHandler(blockId, posts, setPosts, 'posts')
  const [filtersCount, setFiltersCount] = useState(0)
  GlobalStateEventsHandler(blockId, filtersCount, setFiltersCount, 'filtersCount', () => {
    // Remove selectedPost if a filter is selected
    if (Object.keys(selectedPost).length) {
      document.dispatchEvent(
        new CustomEvent('mps-selectedPost', {
          detail: {
            id: blockId,
            selectedPost: {}
          }
        })
      )
    }

    return false
  })

  let filtersList = {}

  filtersList = CreateFilters(categories, taxonomies, queriedPosts)

  const tempFilters = Object.keys(filters).length ? filters : filtersList

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
