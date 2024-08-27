import { createRoot } from 'react-dom/client'

import MobileToggles from '../../../../../mobile-toggles/assets/scripts/main'

export default function renderMobileToggles(blockId, parent) {
  const filtersChildBlock = parent.querySelector('.wp-block-mps-mobile-toggles')
  if (filtersChildBlock) {
    const hasSidebar = !!parent.querySelector('.wp-block-mps-sidebar')
    const hasFilters = !!parent.querySelector('.wp-block-mps-filters')

    const root = createRoot(filtersChildBlock)
    root.render(<MobileToggles blockId={blockId} hasFilters={hasFilters} hasSidebar={hasSidebar} />)
  }
}
