import { useBlockProps } from '@wordpress/block-editor'

export default function Save({ attributes }) {
  const blockProps = useBlockProps.save()

  const { blockId } = attributes

  return (
    <section {...blockProps} id={blockId}>
      <h1>ayaya</h1>
      {/* <Map></Map> */}
    </section>
  )
}
