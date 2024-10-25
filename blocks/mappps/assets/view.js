import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import 'leaflet-defaulticon-compatibility'
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet-gesture-handling/dist/leaflet-gesture-handling.css'

import { createRoot } from '@wordpress/element'

import Main from './scripts/main'

window.addEventListener('DOMContentLoaded', () => {
  const blocks = document.querySelectorAll('.wp-block-mps-mappps:not(.is-init)')
  if (blocks.length) {
    blocks.forEach((block) => {
      block.classList.add('is-init')
      const root = createRoot(block)
      const attributes = JSON.parse(block.dataset.attributes)
      const postIDs = attributes.selectedPosts
      const restNamespace = attributes.postTypeRestNamespace
      const restBase = attributes.postTypeRestBase

      if (postIDs.length && restBase && restNamespace) {
        // root.render(<Main attributes={attributes} queriedPosts={[]} />)

        const args = {
          per_page: postIDs.length,
          include: postIDs,
          _embed: ''
        }

        fetch(`${fw_data.rest_url}${restNamespace}/${restBase}?${new URLSearchParams(args)}`).then(async (response) => {
          // const totalPages = response.headers.get('x-wp-totalpages')

          response = await response.json()

          if (response.length) {
            root.render(<Main attributes={attributes} queriedPosts={response} />)
          }
        })
      }
    })
  }
})
