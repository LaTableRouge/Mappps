import Article from './sidebar/Article'
import Filters from './sidebar/Filters'
import Popup from './sidebar/Popup'
import Search from './sidebar/Search'

export default function Sidebar({
  displayFilters,
  displaySearch,
  filters,
  filtersList,
  filtersOpen,
  limitedSearch,
  popupRef,
  postRefs,
  posts,
  selectedPost,
  selectedPostTerms,
  setFilters,
  setFiltersOpen,
  setSearchValue,
  setSelectedPost,
  setSelectedSearchResult
}) {
  return (
    <aside className="maaaps__sidebar">
      <header className="sidebar__heading">
        {displaySearch && <Search limitedSearch={limitedSearch} setSearchValue={setSearchValue} setSelectedSearchResult={setSelectedSearchResult} />}

        {displayFilters && (
          <Filters
            filters={filters}
            filtersList={filtersList}
            filtersOpen={filtersOpen}
            setFilters={setFilters}
            setFiltersOpen={setFiltersOpen}
            setSelectedPost={setSelectedPost}
          />
        )}
      </header>

      <div className="sidebar__articles-wrapper">
        {posts.map((post, index) => (
          <Article key={index} post={post} postRef={postRefs.current[index]} selectedPost={selectedPost} setFiltersOpen={setFiltersOpen} setSelectedPost={setSelectedPost} />
        ))}
      </div>
      <div ref={popupRef} className="sidebar__popups-wrapper">
        {posts.map((post, index) => (
          <Popup key={index} post={post} postRef={postRefs.current[index]} selectedPost={selectedPost} selectedPostTerms={selectedPostTerms} setSelectedPost={setSelectedPost} />
        ))}
      </div>
    </aside>
  )
}
