import Article from './sidebar/Article'
import Filters from './sidebar/Filters'
import Search from './sidebar/Search'

export default function Sidebar({
  displayFilters,
  displaySearch,
  filters,
  filtersList,
  limitedSearch,
  postRefs,
  posts,
  selectedPost,
  setFilters,
  setSearchValue,
  setSelectedPost,
  setSelectedSearchResult
}) {
  return (
    <aside className="maaaps__sidebar">
      <header className="sidebar__heading">
        {displaySearch && <Search limitedSearch={limitedSearch} setSearchValue={setSearchValue} setSelectedSearchResult={setSelectedSearchResult} />}

        {displayFilters && <Filters filters={filters} filtersList={filtersList} setFilters={setFilters} />}
      </header>

      <div className="sidebar__articles-wrapper">
        {posts.map((post, index) => (
          <Article key={index} post={post} postRef={postRefs.current[index]} selectedPost={selectedPost} setSelectedPost={setSelectedPost} />
        ))}
      </div>
    </aside>
  )
}
