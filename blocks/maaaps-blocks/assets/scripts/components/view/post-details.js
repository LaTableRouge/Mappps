const toggleExpandedStatus = (parentElement, buttonElement, stateExpand) => {
  const icon = buttonElement.querySelector('[class^="icon-maaaps"]')
  if (icon) {
    if (!stateExpand) {
      stateExpand = icon.classList.contains('icon-maaaps-enlarge')
    }
    const state = stateExpand ? 'Shrink' : 'Expand'

    buttonElement.setAttribute('aria-label', buttonElement.dataset[`text${state}`])
    buttonElement.setAttribute('title', buttonElement.dataset[`text${state}`])

    icon.className = buttonElement.dataset[`icon${state}`]

    parentElement.dataset.expanded = stateExpand
  }
}

export default function renderPostDetails(blockId, parent) {
  const postChildBlocks = parent.querySelectorAll('.wp-block-mps-post-details')
  if (postChildBlocks.length) {
    document.addEventListener('mps-selectedPost', async (e) => {
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
            new CustomEvent('mps-selectedPost', {
              detail: {
                id: blockId,
                selectedPost: {}
              }
            })
          )

          toggleExpandedStatus(block, expandShrinkButton, false)
        })
      }

      const expandShrinkButton = block.querySelector('.cta-wrapper__expand')
      if (expandShrinkButton) {
        expandShrinkButton.addEventListener('click', (e) => {
          e.preventDefault()

          toggleExpandedStatus(block, expandShrinkButton)
        })
      }
    })
  }
}
