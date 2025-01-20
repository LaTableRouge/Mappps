import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import 'leaflet-defaulticon-compatibility'
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet-gesture-handling/dist/leaflet-gesture-handling.css'
import './styles/view.scss'

import Filters from './scripts/components/view/filters'
import FiltersToggle from './scripts/components/view/filters-toggle'
import Loader from './scripts/components/view/loader'
import Map from './scripts/components/view/map'
import MobileToggles from './scripts/components/view/mobile-toggles'
import PostDetails from './scripts/components/view/post-details'
import PostTemplate from './scripts/components/view/post-template'
import SearchBar from './scripts/components/view/search-bar'

window.addEventListener('DOMContentLoaded', () => {
  const blocks = document.querySelectorAll('.wp-block-mppps-mappps-blocks:not(.is-init)')
  if (blocks.length) {
    blocks.forEach((parentBlock) => {
      parentBlock.classList.add('is-init')

      const attributes = JSON.parse(parentBlock.dataset.attributes)
      const blockId = attributes.blockId
      const postIDs = attributes.selectedPosts
      const restNamespace = attributes.postTypeRestNamespace
      const restBase = attributes.postTypeRestBase

      if (postIDs.length && restBase && restNamespace) {
        const args = {
          per_page: postIDs.length,
          include: postIDs,
          _embed: ''
        }

        fetch(`${fw_data.rest_url}${restNamespace}/${restBase}?${new URLSearchParams(args)}`).then(async (response) => {
          response = await response.json()

          if (response.length) {
            // Put ACF/SCF coordinates fields in the corresponding meta fields
            const records = response.map((record) => {
              if ('acf' in record) {
                if (!!record.acf.mappps_lat && !!record.acf.mappps_lng) {
                  record.meta.lat = Number(record.acf.mappps_lat)
                  record.meta.lng = Number(record.acf.mappps_lng)
                }
              }

              return record
            })

            const resizeObserver = new ResizeObserver(() => {
              parentBlock.style.setProperty('--wrapper-height', `${parentBlock.clientHeight}px`)
            })
            resizeObserver.observe(parentBlock)

            document.addEventListener('mppps-mobileIsMapDisplayed', async (e) => {
              await e
              const details = e.detail
              if (details.id === blockId) {
                parentBlock.setAttribute('data-mobile-map-display', details.mobileIsMapDisplayed)
              }
            })

            document.addEventListener('mppps-filtersOpen', async (e) => {
              await e
              const details = e.detail
              if (details.id === blockId) {
                parentBlock.setAttribute('data-filters-open', details.filtersOpen)
              }
            })

            // Filters rendering
            Filters(blockId, parentBlock, records, attributes)

            // Filters toggle rendering
            FiltersToggle(blockId, parentBlock)

            // Map rendering
            Map(blockId, parentBlock, records)

            // SearchBar rendering
            SearchBar(blockId, parentBlock)

            // Post Template rendering
            PostTemplate(blockId, parentBlock, records)

            // Post Details rendering
            PostDetails(blockId, parentBlock)

            // Post Details rendering
            MobileToggles(blockId, parentBlock)

            // Loader rendering (!! always in last !!)
            Loader(parentBlock)
          }
        })
      }
    })
  }
})
