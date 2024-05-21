import '../scss/editor.scss'

import { useBlockProps } from '@wordpress/block-editor'
import { useEffect } from '@wordpress/element'

import Map from './components/Map'
import FetchData from './utils/FetchData'

export default function Edit({ attributes, setAttributes }) {
  const blockProps = useBlockProps()

  useEffect(() => {
    setAttributes({ blockId: blockProps.id })
  }, [])

  const { aspectRatio } = attributes.style.dimensions

  const fetchedDatas = FetchData()
  const mounted = fetchedDatas.mounted
  const loading = fetchedDatas.loading
  const posts = fetchedDatas.posts

  let postsHTML = <></>
  if (posts.length) {
    postsHTML = fetchedDatas.posts.map((post, index) => (
      <div key={index}>
        <h2>{post.title.rendered}</h2>
        <div>lat: {post.meta.lat}</div>
        <div>lng: {post.meta.lng}</div>
      </div>
    ))
  } else {
    postsHTML = (
      <>
        <h1>No posts found</h1>
      </>
    )
  }

  return (
    <>
      <section {...blockProps}>
        <h1>ayaya</h1>
        {postsHTML}
        {posts.length ? <Map posts={posts} /> : null}
      </section>
    </>
  )
}
