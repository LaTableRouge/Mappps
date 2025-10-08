import { InnerBlocks, useBlockProps } from '@wordpress/block-editor'

import AlterBlockProps from './utils/AlterBlockProps'

export default function Save({ attributes }) {
	const blockProps = useBlockProps.save()

	return (
		<article {...AlterBlockProps(blockProps, attributes)}>
			<InnerBlocks.Content />
		</article>
	)
}
