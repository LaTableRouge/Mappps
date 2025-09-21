import '../styles/editor.scss'

import { useBlockProps } from '@wordpress/block-editor'
import { useSelect } from '@wordpress/data'

export default function Edit({ attributes, context }) {
	const blockId = context['mppps/blockId']
	const blockProps = useBlockProps()

	const { hasFilters, hasSidebar } = useSelect(
		(select) => {
			const parentBlock = select('core/block-editor').getBlock(blockId)

			if (!parentBlock || !Object.keys(parentBlock).length) {
				return { hasSidebar: false, hasFilters: false }
			}

			const sidebarBlock = parentBlock.innerBlocks.find((block) => block.name === 'mppps/sidebar')
			const filtersBlock = parentBlock.innerBlocks.find((block) => block.name === 'mppps/filters')

			return {
				hasSidebar: sidebarBlock && Object.keys(sidebarBlock).length,
				hasFilters: filtersBlock && Object.keys(filtersBlock).length
			}
		},
		[blockId]
	)

	return (
		<div {...blockProps}>
			<Main attributes={attributes} blockId={blockId} hasFilters={hasFilters} hasSidebar={hasSidebar} />
		</div>
	)
}
