import { memo, useState } from '@wordpress/element'

import GlobalStateEventsHandler from '../../../../src/helpers/scripts/GlobalStateEventsHandler'
import Search from './components/Search'

function Main({ attributes, blockId }) {
	const [selectedSearchResult, setSelectedSearchResult] = useState({})
	const [searchValue, setSearchValue] = useState('')
	const [mobileIsMapDisplayed, setMobileIsMapDisplayed] = useState(true)

	GlobalStateEventsHandler(blockId, selectedSearchResult, setSelectedSearchResult, 'selectedSearchResult')
	GlobalStateEventsHandler(blockId, searchValue, setSearchValue, 'searchValue')
	GlobalStateEventsHandler(blockId, mobileIsMapDisplayed, setMobileIsMapDisplayed, 'mobileIsMapDisplayed')

	return (
		<Search
			limitedSearch={attributes.limitedSearch}
			setMobileIsMapDisplayed={setMobileIsMapDisplayed}
			setSearchValue={setSearchValue}
			setSelectedSearchResult={setSelectedSearchResult}
		/>
	)
}

export default memo(Main)
