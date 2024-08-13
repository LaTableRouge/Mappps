import { InnerBlocks, useBlockProps } from '@wordpress/block-editor'

import { sortObject } from './common/functions'
import AlterBlockProps from './utils/AlterBlockProps'

export default function Save({ attributes, clientId }) {
  const blockProps = useBlockProps.save()

  return (
    <section {...AlterBlockProps(blockProps, attributes)} data-attributes={JSON.stringify(sortObject(attributes))}>
      <div className="responsive-wrapper">
        <div className="block-editor-inner-blocks">
          <div className="block-editor-block-list__layout">
            <InnerBlocks.Content />
          </div>
        </div>
      </div>
    </section>
  )
}
