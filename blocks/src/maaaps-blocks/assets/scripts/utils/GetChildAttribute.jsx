import { useSelect } from '@wordpress/data'
import { useEffect } from '@wordpress/element'

export default function GetChildAttributes(setAttributes, clientId) {
  const childBlocks = useSelect((select) => select('core/block-editor').getBlocks(clientId))

  useEffect(() => {
    const childValues = childBlocks.map((block) => {
      // const { attributes, name, innerBlocks, originalContent } = block
      return block
    })

    setAttributes({ childValues })
  }, [childBlocks])
}
