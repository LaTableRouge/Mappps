import { InnerBlocks, useBlockProps } from '@wordpress/block-editor'

import { sortObject } from '../../../../src/helpers/scripts/functions'
import AlterBlockProps from './utils/AlterBlockProps'

export default function Save({ attributes, clientId }) {
  const blockProps = useBlockProps.save()

  return (
    <section {...AlterBlockProps(blockProps, attributes)} data-attributes={JSON.stringify(sortObject(attributes))}>
      <div className="responsive-wrapper">
        <InnerBlocks.Content />
      </div>
    </section>
  )
}
