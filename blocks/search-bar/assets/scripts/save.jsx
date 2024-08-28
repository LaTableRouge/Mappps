import { useBlockProps } from '@wordpress/block-editor'

import { sortObject } from '../../../../src/helpers/scripts/functions'

export default function Save({ attributes }) {
  const blockProps = useBlockProps.save()

  return <div {...blockProps} data-attributes={JSON.stringify(sortObject(attributes))} />
}
