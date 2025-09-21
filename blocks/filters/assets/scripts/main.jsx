import { useEffect, useState } from '@wordpress/element'

import GlobalStateEventsHandler from '../../../../src/helpers/scripts/GlobalStateEventsHandler'
import FilterPosts from './utils/FilterPosts'

export default function Main({ blockId, filtersTerms, queriedPosts }) {
	// State management
	const [filters, setFilters] = useState({})
	const [filtersOpen, setFiltersOpen] = useState(false)
	const [searchValue, setSearchValue] = useState('')
	const [selectedPost, setSelectedPost] = useState({})
	const [posts, setPosts] = useState([])
	const [filtersCount, setFiltersCount] = useState(0)

	// Global state handlers
	GlobalStateEventsHandler(blockId, filtersOpen, setFiltersOpen, 'filtersOpen')
	GlobalStateEventsHandler(blockId, searchValue, setSearchValue, 'searchValue')
	GlobalStateEventsHandler(blockId, selectedPost, setSelectedPost, 'selectedPost')
	GlobalStateEventsHandler(blockId, posts, setPosts, 'posts')
	GlobalStateEventsHandler(blockId, filtersCount, setFiltersCount, 'filtersCount', () => {
		// Remove selectedPost if a filter is selected
		if (Object.keys(selectedPost).length) {
			document.dispatchEvent(
				new CustomEvent('mppps-selectedPost', {
					detail: {
						id: blockId,
						selectedPost: {}
					}
				})
			)
		}
		return false
	})

	const filtersList = filtersTerms
	const tempFilters = Object.keys(filters).length ? filters : filtersList

	useEffect(() => {
		setPosts(FilterPosts(queriedPosts, tempFilters, searchValue))
	}, [searchValue])

	return <Filters filtersOpen={filtersOpen} posts={queriedPosts} queriedPosts={queriedPosts} searchValue={searchValue} setFilters={setFilters} setFiltersCount={setFiltersCount} setFiltersOpen={setFiltersOpen} setPosts={setPosts} tempFilters={tempFilters} />
}
