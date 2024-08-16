import '../styles/editor.scss'

import { useBlockProps } from '@wordpress/block-editor'
import { useSelect } from '@wordpress/data'

import Main from './main'

export default function Edit({ attributes, context, setAttributes }) {
  const blockId = context['mps/blockId']

  const blockProps = useBlockProps()

  let hasSidebar = false
  let hasFilters = false

  const parentBlock = useSelect((select) => select('core/block-editor').getBlock(blockId))
  if (parentBlock && Object.keys(parentBlock).length) {
    hasSidebar = parentBlock.innerBlocks.find((block) => block.name === 'mps/sidebar')
    hasFilters = parentBlock.innerBlocks.find((block) => block.name === 'mps/filters')
  }

  return (
    <div {...blockProps}>
      <Main attributes={attributes} blockId={blockId} hasFilters={hasFilters} hasSidebar={hasSidebar} />
    </div>
  )
}
