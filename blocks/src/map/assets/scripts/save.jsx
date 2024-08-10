import { useBlockProps } from '@wordpress/block-editor'

import AlterBlockProps from './utils/AlterBlockProps'

export default function Save({ attributes }) {
  const blockProps = useBlockProps.save()

  return <div {...AlterBlockProps(blockProps, attributes)} data-attributes={JSON.stringify(attributes)} />
}
