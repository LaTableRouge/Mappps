export default function renderLoader(parent) {
  const loaderChildBlock = parent.querySelector('.wp-block-mps-loader')
  if (loaderChildBlock) {
    loaderChildBlock.dataset.hasPosts = true
  }
}
