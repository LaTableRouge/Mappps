export function AlterBlockProps(blockProps = {}, attributes) {
  if (!attributes?.selectedSidebarSize) {
    return blockProps
  }

  return {
    ...blockProps,
    style: {
      ...blockProps.style,
      '--sidebar-size': attributes.selectedSidebarSize
    }
  }
}
