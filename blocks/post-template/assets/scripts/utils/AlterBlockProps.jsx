export default function AlterBlockProps(blockProps = {}, attributes) {
  blockProps.style = {
    ...blockProps.style,
    '--bg-hover-color': attributes.bgHoverColor
  }
  return blockProps
}
