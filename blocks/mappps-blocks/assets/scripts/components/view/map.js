import { createRoot } from 'react-dom/client'

import Map from '../../../../../map/assets/scripts/main'

export default function renderMap(blockId, parent, queriedPosts) {
  const mapChildBlock = parent.querySelector('.wp-block-mppps-map')
  if (mapChildBlock) {
    const attributes = JSON.parse(mapChildBlock.dataset.attributes)

    const root = createRoot(mapChildBlock)
    root.render(<Map attributes={attributes} blockId={blockId} queriedPosts={queriedPosts} />)
  }
}
