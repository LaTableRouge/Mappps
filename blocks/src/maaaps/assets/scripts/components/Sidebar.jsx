import Article from './sidebar/Article'
import Filters from './sidebar/Filters'
import Search from './sidebar/Search'

export default function Sidebar({ displaySearch, filters, filtersList, limitedSearch, posts, selectedPost, setFilters, setSearchValue, setSelectedPost, setSelectedSearchResult }) {
  return (
    <aside className="maaaps__sidebar">
      <header className="sidebar__heading">
        {displaySearch && <Search limitedSearch={limitedSearch} setSearchValue={setSearchValue} setSelectedSearchResult={setSelectedSearchResult} />}

        <Filters filters={filters} filtersList={filtersList} setFilters={setFilters} />
      </header>

      <div className="sidebar__articles-wrapper">
        {posts.map((post, index) => (
          <Article key={index} post={post} selectedPost={selectedPost} setSelectedPost={setSelectedPost} />
        ))}
      </div>
    </aside>
  )
}
