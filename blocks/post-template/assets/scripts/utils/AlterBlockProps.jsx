export default function AlterBlockProps(blockProps = {}, attributes) {
  if (!attributes?.bgHoverColor) {
    return blockProps
  }

  return {
    ...blockProps,
    style: {
      ...blockProps.style,
      '--bg-hover-color': attributes.bgHoverColor
    }
  }
}
