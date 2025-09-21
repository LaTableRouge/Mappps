import { createRoot } from 'react-dom/client'

export default function renderFilters(blockId, parent, queriedPosts, parentAttributes) {
	const filtersChildBlock = parent.querySelector('.wp-block-mppps-filters')
	if (filtersChildBlock) {
		const root = createRoot(filtersChildBlock)
		root.render(<Filters blockId={blockId} filtersTerms={parentAttributes.filtersTerms} queriedPosts={queriedPosts} />)
	}
}
