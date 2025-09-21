import { InnerBlocks, useBlockProps } from '@wordpress/block-editor'

import { AlterBlockProps } from './utils/AlterBlockProps'

export default function Save({ attributes }) {
	const blockProps = useBlockProps.save()
	const modifiedProps = AlterBlockProps(blockProps, attributes)

	return (
		<aside {...modifiedProps}>
			<InnerBlocks.Content />
		</aside>
	)
}
