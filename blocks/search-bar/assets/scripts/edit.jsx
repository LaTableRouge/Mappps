import '../styles/editor.scss'

import { useBlockProps } from '@wordpress/block-editor'

export default function Edit({ attributes, context, setAttributes }) {
	const blockProps = useBlockProps()
	const blockId = context['mppps/blockId']

	return (
		<div {...blockProps}>
			<Controls attributes={attributes} setAttributes={setAttributes} />
			<Main attributes={attributes} blockId={blockId} />
		</div>
	)
}
