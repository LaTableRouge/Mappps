export default function AlterBlockProps(blockProps = {}, attributes) {
  blockProps.style = {
    ...blockProps.style,
    '--details-size': attributes.selectedDetailsSize
  }
  return blockProps
}
