import Excerpt from './Excerpt'
import Thumbnail from './Thumbnail'
import Title from './Title'

export default function Article({ post }) {
  const title = post.title.rendered
  const excerpt = post.excerpt
  const sticky = post.sticky

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
    <article className="sidebar__article" data-sticky={sticky}>
      <Thumbnail title={thumbnailInfos.title} url={thumbnailInfos.url} />
      <div className="article__text-wrapper">
        <Title text={title} />
        <Excerpt text={excerpt.raw} />
      </div>
    </article>
  )
}
