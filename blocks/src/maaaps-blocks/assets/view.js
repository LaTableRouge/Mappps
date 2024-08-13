import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import 'leaflet-defaulticon-compatibility'
import 'leaflet/dist/leaflet.css'
import '@changey/react-leaflet-markercluster/dist/styles.min.css'
import 'leaflet-gesture-handling/dist/leaflet-gesture-handling.css'

import { createRoot } from 'react-dom/client'

import Filters from '../../filters/assets/scripts/main'
import Map from '../../map/assets/scripts/main'
import SearchBar from '../../search-bar/assets/scripts/main'

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
            // Filters rendering
            const filtersChildBlock = parentBlock.querySelector('.wp-block-mps-filters')
            if (filtersChildBlock) {
              const root = createRoot(filtersChildBlock)
              root.render(<Filters blockId={blockId} categories={attributes.categories} queriedPosts={response} taxonomies={attributes.taxonomies} />)
            }

            // Map rendering
            const mapChildBlock = parentBlock.querySelector('.wp-block-mps-map')
            if (mapChildBlock) {
              const attributes = JSON.parse(mapChildBlock.dataset.attributes)

              const root = createRoot(mapChildBlock)
              root.render(<Map attributes={attributes} blockId={blockId} queriedPosts={response} />)
            }

            // SearchBar rendering
            const searchBarChildBlock = parentBlock.querySelector('.wp-block-mps-searchbar')
            if (searchBarChildBlock) {
              const attributes = JSON.parse(searchBarChildBlock.dataset.attributes)

              const root = createRoot(searchBarChildBlock)
              root.render(<SearchBar attributes={attributes} blockId={blockId} />)
            }

            const postChildBlocks = parentBlock.querySelectorAll('.wp-block-mps-post-template')
            if (postChildBlocks.length) {
              document.addEventListener('mps-posts', async (e) => {
                await e
                const details = e.detail
                if (details.id === blockId) {
                  const filteredPosts = details.posts
                  if (filteredPosts.length) {
                    const filteredPostsIDs = filteredPosts.map(({ id }) => id)

                    postChildBlocks.forEach((block) => {
                      let postID = block.dataset.wpKey
                      if (postID.length) {
                        postID = postID.replace('post-template-item-', '')
                      }

                      block.dataset.hidden = !filteredPostsIDs.includes(Number(postID))
                    })
                  }
                }
              })

              postChildBlocks.forEach((childBlock) => {
                childBlock.addEventListener('click', (e) => {
                  e.preventDefault()

                  let postID = childBlock.dataset.wpKey
                  if (postID.length) {
                    postID = postID.replace('post-template-item-', '')
                  }

                  const selectedPost = response.find((post) => post.id === Number(postID))
                  if (selectedPost) {
                    document.dispatchEvent(
                      new CustomEvent('mps-selected-post', {
                        detail: {
                          id: blockId,
                          selectedPost
                        }
                      })
                    )

                    const associatedDetails = parentBlock.querySelector(`.wp-block-mps-post-details[data-wp-key="post-details-item-${postID}"]`)
                    if (associatedDetails) {
                      associatedDetails.dataset.hidden = false
                    }
                    const otherDetails = parentBlock.querySelectorAll(`.wp-block-mps-post-details:not([data-wp-key="post-details-item-${postID}"])`)
                    if (otherDetails.length) {
                      otherDetails.forEach((detail) => {
                        detail.dataset.hidden = true
                      })
                    }
                  }
                })
              })
            }

            // Loader rendering (!! always in last !!)
            const loaderChildBlock = parentBlock.querySelector('.wp-block-mps-loader')
            if (loaderChildBlock) {
              loaderChildBlock.dataset.hasPosts = true
            }
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
