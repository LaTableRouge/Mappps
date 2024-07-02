import Article from './sidebar/Article'
import Search from './sidebar/Search'

export default function Sidebar({ displaySearch, limitedSearch, posts, selectedPost, setAttributes, setFilteredPosts, setSelectedPost, setSelectedSearchResult }) {
  return (
    <aside className="maaaps__sidebar">
      {displaySearch && (
        <Search limitedSearch={limitedSearch} posts={posts} setAttributes={setAttributes} setFilteredPosts={setFilteredPosts} setSelectedSearchResult={setSelectedSearchResult} />
      )}

      {posts.map((post, index) => (
        <Article key={index} post={post} selectedPost={selectedPost} setSelectedPost={setSelectedPost} />
      ))}
    </aside>
  )
}
