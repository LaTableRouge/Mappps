import { createRoot } from 'react-dom/client'

import FiltersToggle from '../../../../../filters-toggle/assets/scripts/main'

export default function renderFiltersToggle(blockId, parent) {
  const filtersChildBlock = parent.querySelector('.wp-block-mppps-filters-toggle')
  if (filtersChildBlock) {
    const root = createRoot(filtersChildBlock)
    root.render(<FiltersToggle blockId={blockId} />)
  }
}
