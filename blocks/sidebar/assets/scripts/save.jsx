import { InnerBlocks, useBlockProps } from '@wordpress/block-editor'

export default function Save({ attributes }) {
  const blockProps = useBlockProps.save()

  return (
    <aside {...blockProps}>
      <InnerBlocks.Content />
    </aside>
  )
}
