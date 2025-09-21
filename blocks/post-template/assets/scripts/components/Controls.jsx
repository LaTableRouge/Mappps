import { memo } from '@wordpress/element'

function Controls({ attributes, setAttributes }) {
	return (
		<InspectorControls>
			<ColorMap defaultValue={attributes.bgHoverColor} setAttributes={setAttributes} />
		</InspectorControls>
	)
}

export default memo(Controls)
