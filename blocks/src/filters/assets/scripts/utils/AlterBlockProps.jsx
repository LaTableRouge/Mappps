export default function AlterBlockProps(blockProps = {}, attributes) {
  blockProps.style = {
    ...blockProps.style,
    '--filter-size': attributes.selectedFiltersSize
  }
  return blockProps
}
