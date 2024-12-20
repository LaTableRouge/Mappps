import { createRoot } from 'react-dom/client'

import MobileToggles from '../../../../../mobile-toggles/assets/scripts/main'

export default function renderMobileToggles(blockId, parent) {
  const filtersChildBlock = parent.querySelector('.wp-block-mppps-mobile-toggles')
  if (filtersChildBlock) {
    const hasSidebar = !!parent.querySelector('.wp-block-mppps-sidebar')
    const hasFilters = !!parent.querySelector('.wp-block-mppps-filters')

    const root = createRoot(filtersChildBlock)
    root.render(<MobileToggles blockId={blockId} hasFilters={hasFilters} hasSidebar={hasSidebar} />)
  }
}
