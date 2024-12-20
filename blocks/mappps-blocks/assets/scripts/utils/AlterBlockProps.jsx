import { isColorLight } from '../../../../../src/helpers/scripts/functions'

export default function AlterBlockProps(blockProps = {}, attributes) {
  if (!attributes) {
    return blockProps
  }

  const { selectedPrimaryColor, selectedSecondaryColor, sharedAttributes } = attributes

  const style = {
    ...blockProps.style,
    '--color-primary': selectedPrimaryColor,
    '--color-secondary': selectedSecondaryColor,
    '--color-button-primary': isColorLight(selectedPrimaryColor, 170) === 'light' ? 'var(--color-gray-700)' : 'var(--color-white)',
    '--color-button-secondary': isColorLight(selectedSecondaryColor, 170) === 'light' ? 'var(--color-gray-700)' : 'var(--color-white)',
    '--sidebar-size': sharedAttributes?.selectedSidebarSize,
    '--details-size': sharedAttributes?.selectedDetailsSize
  }

  // Handle aspect ratio
  if (blockProps.style?.aspectRatio && blockProps.style.aspectRatio !== 'auto') {
    style['--aspect-ratio'] = blockProps.style.aspectRatio
  }

  return {
    ...blockProps,
    style
  }
}
