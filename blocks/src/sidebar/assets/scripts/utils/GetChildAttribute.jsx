import { useSelect } from '@wordpress/data'
import { useEffect } from '@wordpress/element'

// Get all post types and filter them with an array of unwanted ones
export default function GetChildAttributes(setAttributes, clientId, returnKey) {
  const childBlocks = useSelect((select) => select('core/block-editor').getBlocks(clientId))

  useEffect(() => {
    const childValues = childBlocks.map(({ attributes, name }) => ({ name, attributes }))

    const returnObject = {}
    returnObject[returnKey] = childValues

    setAttributes(returnObject)
  }, [childBlocks])
}
