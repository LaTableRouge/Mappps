import { __ } from '@wordpress/i18n'

import Excerpt from './sidebar/article/Excerpt'
import GeolocationLink from './sidebar/article/GeolocationLink'
import Terms from './sidebar/article/Terms'
import Thumbnail from './sidebar/article/Thumbnail'
import Title from './sidebar/article/Title'

export default function Popups({ popupRef, postRefs, posts, selectedPost, selectedPostTerms, setSelectedPost }) {
  return (
    <div ref={popupRef} className="popups-wrapper">
      {posts.map((post, index) => {
        const title = post.title.raw
        const excerpt = post.excerpt
        const sticky = post.sticky
        const id = post.id

        const lat = post.meta.lat
        const lng = post.meta.lng

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
                thumbnailInfos.url = thumbnailSizes.medium.source_url
                thumbnailInfos.title = thumbnailTitle
              }
            }
          }
        }

        return (
          <article key={id} ref={postRefs.current[index]} className="popups-wrapper__article" data-selected={post === selectedPost} data-sticky={sticky}>
            <header className="article__header">
              <Thumbnail height={180} title={thumbnailInfos.title} url={thumbnailInfos.url} width={480} />

              <button
                aria-label={__('Close preview', 'maaaps')}
                className="header__close"
                title={__('Close preview', 'maaaps')}
                onClick={(e) => {
                  e.preventDefault()

                  setSelectedPost({})
                }}
              >
                <span className="icon-maaaps-cross"></span>
                <span className="screen-reader-text">{__('Close preview', 'maaaps')}</span>
              </button>
            </header>

            <div className="article__content">
              <Title text={title} />
              <Terms termList={selectedPostTerms} />
              <GeolocationLink lat={lat} lng={lng} />
              <Excerpt text={excerpt.raw} />
            </div>

            <footer className="article__footer">
              {/* eslint-disable-next-line react/jsx-no-target-blank */}
              <a href={post.link} target="_blank" title={__('Open in new tab', 'maaaps')}>
                {__('See more', 'maaaps')}
              </a>
            </footer>
          </article>
        )
      })}
    </div>
  )
}
