import { InnerBlocks, useBlockProps } from '@wordpress/block-editor'

import AlterBlockProps from './utils/AlterBlockProps'

export default function Save({ attributes }) {
  const blockProps = useBlockProps.save()

  return (
    <section {...AlterBlockProps(blockProps, attributes)} data-attributes={JSON.stringify(attributes)} id={attributes.blockId}>
      <div className="responsive-wrapper">
        <InnerBlocks.Content />
      </div>
    </section>
  )
}
