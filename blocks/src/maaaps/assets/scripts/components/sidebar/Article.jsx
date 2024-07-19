import Excerpt from './article/Excerpt'
import Thumbnail from './article/Thumbnail'
import Title from './article/Title'

export default function Article({ post, postRef, selectedPost, setFiltersOpen, setSelectedPost }) {
  const title = post.title.raw
  const excerpt = post.excerpt
  const sticky = post.sticky
  const id = post.id

  const embed = post._embedded
  const thumbnailInfos = {}
  if (embed) {
    const thumbnail = embed['wp:featuredmedia']
    if (thumbnail && thumbnail[0]) {
      const thumbnailDetails = thumbnail[0]?.media_details
      const thumbnailTitle = thumbnail[0]?.title?.raw

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
      key={id}
      ref={postRef}
      className="articles-wrapper__article"
      data-selected={post === selectedPost}
      data-sticky={sticky}
      onClick={(e) => {
        e.preventDefault()

        if (post !== selectedPost) {
          setSelectedPost(post)
          // Close the filters
          setFiltersOpen(false)
        }
      }}
    >
      <Thumbnail height={60} title={thumbnailInfos.title} url={thumbnailInfos.url} width={60} />
      <Title text={title} />
      <Excerpt text={excerpt.raw} />
    </article>
  )
}
