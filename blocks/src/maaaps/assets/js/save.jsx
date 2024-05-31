import { useBlockProps } from '@wordpress/block-editor'

import { createInlineStyle } from './common/create-inline-style'

export default function Save({ attributes }) {
  const blockProps = useBlockProps.save()

  const { blockId, posts } = attributes

  const styleObject = {
    // aspectRatio: attributes.style.dimensions.aspectRatio
  }

  return (
    <section {...blockProps} id={blockId} data-posts={JSON.stringify(posts)}>
      <style className={`style--${blockId}`}>{createInlineStyle(styleObject, blockId)}</style>

      <div className="maaaps__leaflet"></div>
    </section>
  )
}
