import { useBlockProps } from '@wordpress/block-editor'

import { sortObject } from '../../../../src/helpers/scripts/functions'
import AlterBlockProps from './utils/AlterBlockProps'

export default function Save({ attributes }) {
  const blockProps = useBlockProps.save()

  return <div {...AlterBlockProps(blockProps, attributes)} data-attributes={JSON.stringify(sortObject(attributes))} />
}