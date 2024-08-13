import { store as blockEditorStore } from '@wordpress/block-editor'
import { useSelect } from '@wordpress/data'

export default function GetBlocks(clientId) {
  const { blocks } = useSelect((select) => {
    const { getBlocks } = select(blockEditorStore)

    return {
      blocks: getBlocks(clientId)
    }
  })

  return blocks
}
