import Article from './sidebar/Article'

export default function Sidebar({ posts }) {
  return (
    <aside className="maaaps__sidebar">
      {posts.map((post, index) => (
        <Article post={post} key={index} />
      ))}
    </aside>
  )
}
