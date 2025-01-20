import { createRoot } from 'react-dom/client'

import Filters from '../../../../../filters/assets/scripts/main'

export default function renderFilters(blockId, parent, queriedPosts, parentAttributes) {
  const filtersChildBlock = parent.querySelector('.wp-block-mppps-filters')
  if (filtersChildBlock) {
    const root = createRoot(filtersChildBlock)
    root.render(<Filters blockId={blockId} categories={parentAttributes.categories} queriedPosts={queriedPosts} taxonomies={parentAttributes.taxonomies} />)
  }
}
