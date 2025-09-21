import { createRoot } from 'react-dom/client'

export default function renderSearchBar(blockId, parent) {
	const searchBarChildBlock = parent.querySelector('.wp-block-mppps-searchbar')
	if (searchBarChildBlock) {
		const attributes = JSON.parse(searchBarChildBlock.dataset.attributes)

		const root = createRoot(searchBarChildBlock)
		root.render(<SearchBar attributes={attributes} blockId={blockId} />)
	}
}
