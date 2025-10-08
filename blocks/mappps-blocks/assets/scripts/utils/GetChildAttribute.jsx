import { useSelect } from '@wordpress/data'
import { useEffect, useMemo } from '@wordpress/element'

export default function GetChildAttributes(setAttributes, clientId) {
	const childBlocks = useSelect((select) => select('core/block-editor').getBlocks(clientId), [clientId])

	const childValues = useMemo(() => childBlocks.map((block) => block), [childBlocks])

	useEffect(() => {
		setAttributes({ childValues })
	}, [childValues, setAttributes])
}
