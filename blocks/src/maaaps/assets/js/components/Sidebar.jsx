import Article from './sidebar/Article'
import Search from './sidebar/Search'

export default function Sidebar({ posts, setAttributes, displaySearch, limitedSearch, selectedPost, setSelectedPost, setSelectedSearchResult, setFilteredPosts }) {
  return (
    <aside className="maaaps__sidebar">
      {displaySearch && (
        <Search posts={posts} setAttributes={setAttributes} limitedSearch={limitedSearch} setSelectedSearchResult={setSelectedSearchResult} setFilteredPosts={setFilteredPosts} />
      )}

      {posts.map((post, index) => (
        <Article post={post} key={index} selectedPost={selectedPost} setSelectedPost={setSelectedPost} />
      ))}
    </aside>
  )
}
