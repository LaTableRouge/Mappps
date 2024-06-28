import Article from './sidebar/Article'
import Search from './sidebar/Search'

export default function Sidebar({ posts, setAttributes, displaySearch, limitedSearch }) {
  return (
    <aside className="maaaps__sidebar">
      {displaySearch && <Search posts={posts} setAttributes={setAttributes} limitedSearch={limitedSearch} />}

      {posts.map((post, index) => (
        <Article post={post} key={index} />
      ))}
    </aside>
  )
}
