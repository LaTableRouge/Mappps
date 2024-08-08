import { createRoot } from 'react-dom/client'

import Search from './scripts/components/Search'

window.addEventListener('DOMContentLoaded', () => {
  const blocks = document.querySelectorAll('.wp-block-mps-searchbar:not(.is-init)')
  if (blocks.length) {
    blocks.forEach((block) => {
      block.classList.add('is-init')
      const root = createRoot(block)
      const attributes = JSON.parse(block.dataset.attributes)
      const limitedSearch = attributes.limitedSearch

      root.render(<Search limitedSearch={limitedSearch} />)
    })
  }
})
