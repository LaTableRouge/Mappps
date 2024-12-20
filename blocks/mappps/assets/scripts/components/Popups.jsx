import { useState } from '@wordpress/element'
import { __ } from '@wordpress/i18n'

import Excerpt from './sidebar/article/Excerpt'
import Terms from './sidebar/article/Terms'
import Thumbnail from './sidebar/article/Thumbnail'
import Title from './sidebar/article/Title'

export default function Popups({ isMobileView, popupRef, posts, selectedPost, selectedPostTerms, setSelectedPost }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div ref={popupRef} className="popups-wrapper" data-expanded={isExpanded}>
      {posts.map((post) => {
        const title = post.title.rendered
        const excerpt = post.excerpt.rendered
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
            const thumbnailAlt = thumbnail[0]?.alt_text

            if (thumbnailDetails) {
              const thumbnailSizes = thumbnailDetails.sizes
              if (thumbnailSizes) {
                thumbnailInfos.url = thumbnailSizes.medium.source_url
                thumbnailInfos.alt = thumbnailAlt
              }
            }
          }
        }

        return (
          <article key={id} className="popups-wrapper__article" data-selected={post === selectedPost} data-sticky={sticky}>
            <div className="article__scroll-wrapper">
              <header className="article__header">
                {/* eslint-disable-next-line react/jsx-no-target-blank */}
                <a href={post.link} target="_blank" title={__('Open in new tab', 'mappps')}>
                  <Thumbnail height={180} title={thumbnailInfos.alt} url={thumbnailInfos.url} width={480} />
                </a>

                <div className="header__cta-wrapper">
                  {isMobileView && (
                    <button
                      aria-label={isExpanded ? __('Shrink', 'mappps') : __('Expand', 'mappps')}
                      className="custom-button custom-button__only-icon cta-wrapper__expand"
                      title={isExpanded ? __('Shrink', 'mappps') : __('Expand', 'mappps')}
                      onClick={(e) => {
                        e.preventDefault()

                        setIsExpanded(!isExpanded)
                      }}
                    >
                      <span className={isExpanded ? 'icon-mappps-shrink' : 'icon-mappps-enlarge'}></span>
                      <span className="screen-reader-text">{__('Expand/Shrink', 'mappps')}</span>
                    </button>
                  )}

                  {/* eslint-disable-next-line react/jsx-no-target-blank */}
                  <a className="custom-button custom-button__only-icon cta-wrapper__new-tab" href={post.link} target="_blank" title={__('Open in new tab', 'mappps')}>
                    <span className="icon-mappps-new-tab"></span>
                    <span className="screen-reader-text">{__('Open in new tab', 'mappps')}</span>
                  </a>

                  <a
                    className="custom-button custom-button__only-icon cta-wrapper__map"
                    href={`https://maps.google.com/maps?daddr=${lat},${lng}&amp;ll=`}
                    rel="noreferrer"
                    target="_blank"
                    title={__('View itinerary', 'mappps')}
                  >
                    <span className="icon-mappps-map"></span>
                    <span className="screen-reader-text">{__('View itinerary', 'mappps')}</span>
                  </a>

                  <button
                    aria-label={__('Close preview', 'mappps')}
                    className="custom-button custom-button__only-icon cta-wrapper__close"
                    title={__('Close preview', 'mappps')}
                    onClick={(e) => {
                      e.preventDefault()

                      setSelectedPost({})

                      setIsExpanded(false)
                    }}
                  >
                    <span className="icon-mappps-cross"></span>
                    <span className="screen-reader-text">{__('Close preview', 'mappps')}</span>
                  </button>
                </div>
              </header>

              <div className="article__content">
                <Title text={title} />
                <Terms termList={selectedPostTerms} />
                <Excerpt text={excerpt} />
              </div>
            </div>
          </article>
        )
      })}
    </div>
  )
}
