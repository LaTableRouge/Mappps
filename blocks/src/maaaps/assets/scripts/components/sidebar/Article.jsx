import Excerpt from './article/Excerpt'
import Thumbnail from './article/Thumbnail'
import Title from './article/Title'

export default function Article({ post, postRef, selectedPost, setFiltersOpen, setMobileIsMapDisplayed, setSelectedPost }) {
  const title = post.title.rendered
  const excerpt = post.excerpt.rendered
  const sticky = post.sticky
  const id = post.id

  const embed = post._embedded
  const thumbnailInfos = {}
  if (embed) {
    const thumbnail = embed['wp:featuredmedia']
    if (thumbnail && thumbnail[0]) {
      const thumbnailDetails = thumbnail[0]?.media_details
      const thumbnailAlt = thumbnail[0]?.alt_text

      if (thumbnailDetails) {
        const thumbnailSizes = thumbnailDetails.sizes
        if (thumbnailSizes) {
          thumbnailInfos.url = thumbnailSizes.thumbnail.source_url
          thumbnailInfos.alt = thumbnailAlt
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

          // Show the map in mobile
          setMobileIsMapDisplayed(true)
        }
      }}
    >
      <Thumbnail height={60} title={thumbnailInfos.alt} url={thumbnailInfos.url} width={60} />
      <Title text={title} />
      <Excerpt text={excerpt} />
    </article>
  )
}
