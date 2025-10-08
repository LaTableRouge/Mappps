import { useBlockProps } from '@wordpress/block-editor'

import Loader from './components/Loader'
import AlterBlockProps from './utils/AlterBlockProps'

export default function Save({ attributes }) {
	const blockProps = useBlockProps.save()
	const alteredProps = AlterBlockProps(blockProps, attributes)

	return (
		<div {...alteredProps}>
			<Loader />
		</div>
	)
}
