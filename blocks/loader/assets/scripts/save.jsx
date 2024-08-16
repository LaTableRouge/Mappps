import { useBlockProps } from '@wordpress/block-editor'

import Loader from './components/Loader'
import AlterBlockProps from './utils/AlterBlockProps'

export default function Save({ attributes }) {
  const blockProps = useBlockProps.save()

  return (
    <div {...AlterBlockProps(blockProps, attributes)}>
      <Loader />
    </div>
  )
}
