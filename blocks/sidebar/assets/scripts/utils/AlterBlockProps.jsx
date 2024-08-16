export default function AlterBlockProps(blockProps = {}, attributes) {
  blockProps.style = {
    ...blockProps.style,
    '--sidebar-size': attributes.selectedSidebarSize
  }
  return blockProps
}
