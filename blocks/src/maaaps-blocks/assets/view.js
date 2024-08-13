import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import 'leaflet-defaulticon-compatibility'
import 'leaflet/dist/leaflet.css'
import '@changey/react-leaflet-markercluster/dist/styles.min.css'
import 'leaflet-gesture-handling/dist/leaflet-gesture-handling.css'

import Filters from './scripts/components/view/filters'
import Loader from './scripts/components/view/loader'
import Map from './scripts/components/view/map'
import PostDetails from './scripts/components/view/post-details'
import PostTemplate from './scripts/components/view/post-template'
import SearchBar from './scripts/components/view/search-bar'

window.addEventListener('DOMContentLoaded', () => {
  const blocks = document.querySelectorAll('.wp-block-mps-maaaps-blocks:not(.is-init)')
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
            const resizeObserver = new ResizeObserver(() => {
              parentBlock.style.setProperty('--wrapper-height', `${parentBlock.clientHeight}px`)
            })
            resizeObserver.observe(parentBlock)

            // Filters rendering
            Filters(blockId, parentBlock, response, attributes)

            // Map rendering
            Map(blockId, parentBlock, response)

            // SearchBar rendering
            SearchBar(blockId, parentBlock)

            // Post Template rendering
            PostTemplate(blockId, parentBlock, response)

            // Post Details rendering
            PostDetails(blockId, parentBlock)

            // Loader rendering (!! always in last !!)
            Loader(parentBlock)
          }
        })
      }
    })
  }
})

// TODO:
//  - Faire en sorte que le rendu back-office soit utilisable et rende bien avec les paramètres de personnalisation.
//    tout n'a pas besoin d'être fonctionnel en back-office
//  - Faire un script global dans view.js contenant l'init de la map les filtres etc...
//  - Concernant le post-template prendre le fonctionnement de gutenberg avec le render.php
//  - Simplifier au mieux les scripts de composants secondaires.
