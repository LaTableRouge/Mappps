/**
 * The script that'll be called when the block is rendered on the front-end
 */
window.addEventListener('DOMContentLoaded', () => {
  const blocks = document.querySelectorAll('.wp-block-mps-maaaps:not(.is-init)')
  if (blocks.length) {
    blocks.forEach((block) => {
      let postIDs = block.dataset.posts
      if (postIDs) {
        postIDs = JSON.parse(postIDs)
        if (postIDs.length) {
          block.classList.add('is-init')

          const args = {
            per_page: 100,
            include: postIDs
          }

          fetch(`http://local.wp-preview.com/wp-json/wp/v2/posts?${new URLSearchParams(args)}`).then(async (response) => {
            // const totalPages = response.headers.get('x-wp-totalpages')

            response = await response.json()

            if (response.length) {
              console.log(response)
            }
          })
        }
      }
    })
  }
})
