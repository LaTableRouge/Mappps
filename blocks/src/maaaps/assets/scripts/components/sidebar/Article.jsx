import Excerpt from './Excerpt'
import Thumbnail from './Thumbnail'
import Title from './Title'

export default function Article({ post, selectedPost, setSelectedPost }) {
  const title = post.title.rendered
  const excerpt = post.excerpt
  const sticky = post.sticky
  const id = post.id

  const embed = post._embedded
  const thumbnailInfos = {}
  if (embed) {
    const thumbnail = embed['wp:featuredmedia']
    if (thumbnail && thumbnail[0]) {
      const thumbnailDetails = thumbnail[0]?.media_details
      const thumbnailTitle = thumbnail[0]?.title?.rendered

      if (thumbnailDetails) {
        const thumbnailSizes = thumbnailDetails.sizes
        if (thumbnailSizes) {
          thumbnailInfos.url = thumbnailSizes.thumbnail.source_url
          thumbnailInfos.title = thumbnailTitle
        }
      }
    }
  }

  return (
    <article
      className="articles-wrapper__article"
      data-id={id}
      data-sticky={sticky}
      onClick={(e) => {
        e.preventDefault()

        if (post !== selectedPost) {
          setSelectedPost(post)
        }
      }}
    >
      <Thumbnail title={thumbnailInfos.title} url={thumbnailInfos.url} />
      <Title text={title} />
      <Excerpt text={excerpt.raw} />
    </article>
  )
}