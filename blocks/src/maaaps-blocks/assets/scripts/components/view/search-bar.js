import { createRoot } from 'react-dom/client'

import SearchBar from '../../../../../search-bar/assets/scripts/main'

export default function renderSearchBar(blockId, parent) {
  const searchBarChildBlock = parent.querySelector('.wp-block-mps-searchbar')
  if (searchBarChildBlock) {
    const attributes = JSON.parse(searchBarChildBlock.dataset.attributes)

    const root = createRoot(searchBarChildBlock)
    root.render(<SearchBar attributes={attributes} blockId={blockId} />)
  }
}
