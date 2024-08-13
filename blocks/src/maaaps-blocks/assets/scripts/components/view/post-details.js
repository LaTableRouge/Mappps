export default function renderPostDetails(blockId, parent) {
  const postChildBlocks = parent.querySelectorAll('.wp-block-mps-post-details')
  if (postChildBlocks.length) {
    document.addEventListener('mps-selected-post', async (e) => {
      await e
      const details = e.detail
      if (details.id === blockId) {
        const selectedPost = details.selectedPost
        if (Object.keys(selectedPost).length) {
          const id = selectedPost.id

          postChildBlocks.forEach((block) => {
            const isSelected = block.dataset.wpKey === `post-details-item-${id}`
            block.dataset.hidden = !isSelected
          })
        } else {
          postChildBlocks.forEach((block) => {
            block.dataset.hidden = true
          })
        }
      }
    })

    postChildBlocks.forEach((block) => {
      const closeButton = block.querySelector('.cta-wrapper__close')
      if (closeButton) {
        closeButton.addEventListener('click', (e) => {
          e.preventDefault()

          document.dispatchEvent(
            new CustomEvent('mps-selected-post', {
              detail: {
                id: blockId,
                selectedPost: {}
              }
            })
          )
        })
      }
    })
  }
}
