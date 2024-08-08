window.addEventListener('DOMContentLoaded', () => {
  const blocks = document.querySelectorAll('.wp-block-mps-maaaps-blocks:not(.is-init)')
  if (blocks.length) {
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
          // const totalPages = response.headers.get('x-wp-totalpages')

          response = await response.json()

          if (response.length) {
            if (window['mps-maaaps-blocks'] === undefined) {
              window['mps-maaaps-blocks'] = []
            }

            // THis is the "states" that'll store usefull data
            // unfortunately this block could not be rendered in full React.js
            // See the full React.js implementation here : https://github.com/LaTableRouge/Maaaps/blob/master/blocks/src/maaaps/assets/scripts/main.jsx
            window['mps-maaaps-blocks'].push({
              id,
              queriedPosts: response,
              selectedPost: {},
              selectedPostTerms: {},
              searchValue: '',
              selectedSearchResult: {},
              mobileIsMapDisplayed: true,
              filters: {},
              filtersOpen: false
            })
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
