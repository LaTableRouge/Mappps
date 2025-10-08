import { Placeholder } from '@wordpress/components'
import { memo } from '@wordpress/element'
import { __ } from '@wordpress/i18n'

import ControlQuery from './query/ControlQuery'

function Wizard({ attributes, isConfirmed, setAttributes, setIsConfirmed, setQueriedPosts }) {
	return (
		<Placeholder
			className="mappps-blocks__wizard"
			instructions={__('Select the data source of the items to be displayed on the map.', 'mappps')}
			label={__('Data source', 'mappps')}
		>
			<ControlQuery
				attributes={attributes}
				isConfirmed={isConfirmed}
				isWizard={true}
				setAttributes={setAttributes}
				setIsConfirmed={setIsConfirmed}
				setQueriedPosts={setQueriedPosts}
			/>
		</Placeholder>
	)
}

export default memo(Wizard)
