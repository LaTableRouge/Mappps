import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import 'leaflet-defaulticon-compatibility'
import 'leaflet/dist/leaflet.css'
import '@changey/react-leaflet-markercluster/dist/styles.min.css'
import 'leaflet-gesture-handling/dist/leaflet-gesture-handling.css'

import { createRoot } from 'react-dom/client'

import Map from '../../map/assets/scripts/main'
import SearchBar from '../../search-bar/assets/scripts/main'

window.addEventListener('DOMContentLoaded', () => {
  const blocks = document.querySelectorAll('.wp-block-mps-maaaps-blocks:not(.is-init)')
  if (blocks.length) {
    // if (window['mps-maaaps-blocks'] === undefined) {
    //   window['mps-maaaps-blocks'] = {
    //     blocks: [],
    //     eventsNames: [
    //       'setSelectedPosts',
    //       'setSelectedPostTerms',
    //       'setSearchValue',
    //       'setSelectedSearchResult',
    //       'setMobileIsMapDisplayed',
    //       'setFilters',
    //       'setSelectedPosts',
    //       'setFiltersOpen'
    //     ]
    //   }
    // }

    // if (typeof window['mps-maaaps-blocks'].getBlock !== 'function') {
    //   window['mps-maaaps-blocks'].getBlock = (blockId) => {
    //     const block = window['mps-maaaps-blocks'].blocks.find((block) => block.id === blockId)
    //     const index = window['mps-maaaps-blocks'].blocks.findIndex((block) => block.id === blockId)

    //     return {
    //       block,
    //       index
    //     }
    //   }
    // }

    blocks.forEach((block) => {
      block.classList.add('is-init')

      const id = block.id
      const attributes = JSON.parse(block.dataset.attributes)
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
            // THis is the "states" that'll store usefull data
            // unfortunately this block could not be rendered in full React.js
            // See the full React.js implementation here : https://github.com/LaTableRouge/Maaaps/blob/master/blocks/src/maaaps/assets/scripts/main.jsx
            // window['mps-maaaps-blocks'].blocks.push({
            //   id,
            //   queriedPosts: response,
            //   selectedPost: {},
            //   selectedPostTerms: {},
            //   searchValue: '',
            //   selectedSearchResult: {},
            //   mobileIsMapDisplayed: true,
            //   filters: {},
            //   filtersOpen: false,
            //   posts: response,
            //   map: false
            // })

            // Map rendering
            const mapChildBlock = block.querySelector('.wp-block-mps-map')
            if (mapChildBlock) {
              mapChildBlock.classList.add('is-init')

              const attributes = JSON.parse(mapChildBlock.dataset.attributes)

              const root = createRoot(mapChildBlock)
              root.render(<Map attributes={attributes} blockId={id} posts={response} />)
            }

            // SearchBar rendering
            const searchBarChildBlock = block.querySelector('.wp-block-mps-searchbar')
            if (searchBarChildBlock) {
              searchBarChildBlock.classList.add('is-init')

              const attributes = JSON.parse(searchBarChildBlock.dataset.attributes)

              const root = createRoot(searchBarChildBlock)
              root.render(<SearchBar attributes={attributes} blockId={id} />)
            }

            const postChildBlocks = block.querySelectorAll('.wp-block-mps-post-template')
            if (postChildBlocks.length) {
              postChildBlocks.forEach((block) => {
                block.addEventListener('click', (e) => {
                  e.preventDefault()

                  let postID = block.dataset.wpKey
                  if (postID.length) {
                    postID = postID.replace('post-template-item-', '')
                  }

                  const selectedPost = response.find((post) => post.id === Number(postID))
                  if (selectedPost) {
                    document.dispatchEvent(
                      new CustomEvent('mps-selected-post', {
                        detail: {
                          id,
                          selectedPost
                        }
                      })
                    )
                  }
                })
              })
            }

            // Loader rendering (!! always in last !!)
            const loaderChildBlock = block.querySelector('.wp-block-mps-loader')
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
