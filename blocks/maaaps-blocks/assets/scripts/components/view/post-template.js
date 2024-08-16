export default function renderPostTemplate(blockId, parent, queriedPosts) {
  const postChildBlocks = parent.querySelectorAll('.wp-block-mps-post-template')
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

        const selectedPost = queriedPosts.find((post) => post.id === Number(postID))
        if (selectedPost) {
          document.dispatchEvent(
            new CustomEvent('mps-selected-post', {
              detail: {
                id: blockId,
                selectedPost
              }
            })
          )

          document.dispatchEvent(
            new CustomEvent('mps-mobile-map-displayed', {
              detail: {
                id: blockId,
                mobileIsMapDisplayed: true
              }
            })
          )
        }
      })
    })
  }
}
