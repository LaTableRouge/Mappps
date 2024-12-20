export default function renderPostDetails(blockId, parent) {
  const postChildBlocks = parent.querySelectorAll('.wp-block-mppps-post-details')
  if (postChildBlocks.length) {
    document.addEventListener('mppps-selectedPost', async (e) => {
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
            new CustomEvent('mppps-selectedPost', {
              detail: {
                id: blockId,
                selectedPost: {}
              }
            })
          )

          const expandShrinkButton = block.querySelector('.cta-wrapper__expand')
          if (expandShrinkButton) {
            const icon = block.querySelector('[class^="icon-mappps"]')
            if (icon) {
              expandShrinkButton.setAttribute('aria-label', expandShrinkButton.dataset.textExpand)
              expandShrinkButton.setAttribute('title', expandShrinkButton.dataset.textExpand)

              icon.className = expandShrinkButton.dataset.iconExpand

              block.dataset.expanded = false
            }
          }
        })
      }

      const expandShrinkButton = block.querySelector('.cta-wrapper__expand')
      if (expandShrinkButton) {
        expandShrinkButton.addEventListener('click', (e) => {
          e.preventDefault()

          const icon = expandShrinkButton.querySelector('[class^="icon-mappps"]')
          if (icon) {
            const stateExpand = icon.classList.contains('icon-mappps-enlarge')
            const state = stateExpand ? 'Shrink' : 'Expand'

            expandShrinkButton.setAttribute('aria-label', expandShrinkButton.dataset[`text${state}`])
            expandShrinkButton.setAttribute('title', expandShrinkButton.dataset[`text${state}`])

            icon.className = expandShrinkButton.dataset[`icon${state}`]

            const parentElement = expandShrinkButton.closest('.wp-block-mppps-post-details')
            if (parentElement) {
              parentElement.dataset.expanded = stateExpand
            }
          }
        })
      }
    })
  }
}
