import { useBlockProps } from '@wordpress/block-editor'

import Loader from './components/Loader'
import AlterBlockProps from './utils/AlterBlockProps'

export default function Save({ attributes }) {
  const blockProps = useBlockProps.save()

  return (
    <section {...AlterBlockProps(blockProps, attributes)} data-attributes={JSON.stringify(attributes)}>
      <Loader />
    </section>
  )
}
