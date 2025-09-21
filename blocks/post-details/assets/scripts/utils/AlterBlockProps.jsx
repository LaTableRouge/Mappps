export default function AlterBlockProps(blockProps = {}, attributes) {
	if (!attributes?.selectedDetailsSize) {
		return blockProps
	}

	return {
		...blockProps,
		style: {
			...blockProps.style,
			'--details-size': attributes.selectedDetailsSize
		}
	}
}
