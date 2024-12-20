export default function renderLoader(parent) {
  const loaderChildBlock = parent.querySelector('.wp-block-mppps-loader')
  if (loaderChildBlock) {
    loaderChildBlock.dataset.hasPosts = true
  }
}
