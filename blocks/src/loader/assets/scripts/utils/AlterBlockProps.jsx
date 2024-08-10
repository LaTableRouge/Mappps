export default function AlterBlockProps(blockProps = {}, attributes) {
  blockProps.style = {
    ...blockProps.style,
    '--spinner-size': `${attributes.selectedSpinnerSize}px`
  }
  return blockProps
}
