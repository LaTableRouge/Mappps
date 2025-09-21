import { useBlockProps } from '@wordpress/block-editor'
import { useSelect } from '@wordpress/data'

import Controls from './components/Controls'

export default function Edit({ attributes, context, setAttributes }) {
	const blockProps = useBlockProps()
	const blockId = context['mppps/blockId']

	const { hasGeolocation, hasSearch } = useSelect(
		(select) => {
			const returnValues = { hasSearch: false, hasGeolocation: false }

			const parentBlock = select('core/block-editor').getBlock(blockId)
			if (!parentBlock || !Object.keys(parentBlock).length) {
				return returnValues
			}

			const sidebarBlock = parentBlock.innerBlocks.find((block) => block.name === 'mppps/sidebar')
			if (!sidebarBlock || !Object.keys(sidebarBlock).length) {
				returnValues.hasSearch = false
			}

			const searchBarBlock = sidebarBlock.innerBlocks.find((block) => block.name === 'mppps/searchbar')
			returnValues.hasSearch = !!Object.keys(searchBarBlock).length

			const mapBlock = parentBlock.innerBlocks.find((block) => block.name === 'mppps/map')
			returnValues.hasGeolocation = mapBlock.attributes.isGeolocated

			return returnValues
		},
		[blockId]
	)

	return (
		<div {...blockProps}>
			<Controls attributes={attributes} hasGeolocation={hasGeolocation} hasSearch={hasSearch} setAttributes={setAttributes} />
		</div>
	)
}
