import { InnerBlocks, useBlockProps } from '@wordpress/block-editor'

import AlterBlockProps from './utils/AlterBlockProps'

export default function Save({ attributes }) {
  const blockProps = useBlockProps.save()

  const { posts } = attributes
  return (
    <section {...AlterBlockProps(blockProps, attributes)} data-posts={JSON.stringify(posts)}>
      <div className="responsive-wrapper">
        <InnerBlocks.Content />
      </div>
    </section>
  )
}
