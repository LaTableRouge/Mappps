import { useSelect } from '@wordpress/data'
import { useEffect } from '@wordpress/element'

export default function GetChildAttributes(setAttributes, clientId, returnKey) {
  const childBlocks = useSelect((select) => select('core/block-editor').getBlocks(clientId))

  useEffect(() => {
    const childValues = childBlocks.map((block) => {
      const { attributes, name } = block
      return { name, attributes }
    })

    const returnObject = {}
    returnObject[returnKey] = childValues

    setAttributes(returnObject)
  }, [childBlocks])
}
