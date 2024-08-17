import { useState } from '@wordpress/element'

import GlobalStateEventsHandler from '../../../../src/helpers/scripts/GlobalStateEventsHandler'
import Search from './components/Search'

export default function Main({ attributes, blockId }) {
  const [selectedSearchResult, setSelectedSearchResult] = useState({})
  GlobalStateEventsHandler(blockId, selectedSearchResult, setSelectedSearchResult, 'selectedSearchResult')
  const [searchValue, setSearchValue] = useState('')
  GlobalStateEventsHandler(blockId, searchValue, setSearchValue, 'searchValue')
  const [mobileIsMapDisplayed, setMobileIsMapDisplayed] = useState(true)
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
