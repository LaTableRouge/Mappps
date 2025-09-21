export default function AlterBlockProps(blockProps = {}, attributes) {
	const { selectedFiltersSize } = attributes

	return {
		...blockProps,
		style: {
			...blockProps.style,
			'--filter-size': selectedFiltersSize
		}
	}
}
