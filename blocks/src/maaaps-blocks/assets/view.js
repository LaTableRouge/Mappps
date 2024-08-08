// https://wordpress.stackexchange.com/questions/415232/how-can-i-render-a-built-in-gutenberg-block-with-innerblocks-outside-of-the-bloc

// window.addEventListener('DOMContentLoaded', () => {
//   const blocks = document.querySelectorAll('.wp-block-mps-maaaps-blocks:not(.is-init)')
//   if (blocks.length) {
//     blocks.forEach((block) => {
//       block.classList.add('is-init')
//       const root = createRoot(block)
//       let innerBlocks = block.dataset.blocks
//       if (innerBlocks) {
//         innerBlocks = JSON.parse(block.dataset.blocks)
//         if (Object.keys(innerBlocks).length && innerBlocks.blocks.length) {
//           root.render(<Main blocks={innerBlocks.blocks} />)
//         }
//       }
//     })
//   }
// })

// TODO:
//  - Faire en sorte que le rendu back-office soit utilisable et rende bien avec les paramètres de personnalisation.
//    tout n'a pas besoin d'être dfonctionnel en back-office
//  - Faire un script global dans view.js contenant l'init de la map les filtres etc...
//  - Concernant le post-template prendre le fonctionnement de gutenberg avec le render.php
//  - Simplifier au mieux les scripts de composants secondaires.
