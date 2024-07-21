import { useState } from '@wordpress/element'
import { __ } from '@wordpress/i18n'

import Excerpt from './sidebar/article/Excerpt'
import Terms from './sidebar/article/Terms'
import Thumbnail from './sidebar/article/Thumbnail'
import Title from './sidebar/article/Title'

export default function Popups({ isMobileView, popupRef, postRefs, posts, selectedPost, selectedPostTerms, setSelectedPost }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div ref={popupRef} className="popups-wrapper" data-expanded={isExpanded}>
      {posts.map((post, index) => {
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
          console.log(thumbnail)
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
          <article key={id} ref={postRefs.current[index]} className="popups-wrapper__article" data-selected={post === selectedPost} data-sticky={sticky}>
            <div className="article__scroll-wrapper">
              <header className="article__header">
                {/* eslint-disable-next-line react/jsx-no-target-blank */}
                <a href={post.link} target="_blank" title={__('Open in new tab', 'maaaps')}>
                  <Thumbnail height={180} title={thumbnailInfos.alt} url={thumbnailInfos.url} width={480} />
                </a>

                <div className="header__cta-wrapper">
                  {isMobileView && (
                    <button
                      aria-label={isExpanded ? __('Shrink', 'maaaps') : __('Expand', 'maaaps')}
                      className="custom-button custom-button__only-icon cta-wrapper__expand"
                      title={isExpanded ? __('Shrink', 'maaaps') : __('Expand', 'maaaps')}
                      onClick={(e) => {
                        e.preventDefault()

                        setIsExpanded(!isExpanded)
                      }}
                    >
                      <span className={isExpanded ? 'icon-maaaps-shrink' : 'icon-maaaps-enlarge'}></span>
                      <span className="screen-reader-text">{__('Expand/Shrink', 'maaaps')}</span>
                    </button>
                  )}

                  {/* eslint-disable-next-line react/jsx-no-target-blank */}
                  <a className="custom-button custom-button__only-icon cta-wrapper__new-tab" href={post.link} target="_blank" title={__('Open in new tab', 'maaaps')}>
                    <span className="icon-maaaps-new-tab"></span>
                    <span className="screen-reader-text">{__('Open in new tab', 'maaaps')}</span>
                  </a>

                  <a
                    className="custom-button custom-button__only-icon cta-wrapper__map"
                    href={`https://maps.google.com/maps?daddr=${lat},${lng}&amp;ll=`}
                    rel="noreferrer"
                    target="_blank"
                    title={__('View itinerary', 'maaaps')}
                  >
                    <span className="icon-maaaps-map"></span>
                    <span className="screen-reader-text">{__('View itinerary', 'maaaps')}</span>
                  </a>

                  <button
                    aria-label={__('Close preview', 'maaaps')}
                    className="custom-button custom-button__only-icon cta-wrapper__close"
                    title={__('Close preview', 'maaaps')}
                    onClick={(e) => {
                      e.preventDefault()

                      setSelectedPost({})
                    }}
                  >
                    <span className="icon-maaaps-cross"></span>
                    <span className="screen-reader-text">{__('Close preview', 'maaaps')}</span>
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
