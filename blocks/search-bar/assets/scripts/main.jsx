import { useState } from '@wordpress/element'

import Search from './components/Search'
import GlobalEventsHandler from './utils/GlobalEventsHandler'

export default function Main({ attributes, blockId }) {
  const [selectedSearchResult, setSelectedSearchResult] = useState({})
  const [searchValue, setSearchValue] = useState('')
  const [mobileIsMapDisplayed, setMobileIsMapDisplayed] = useState(true)

  // TODO: change this to a more global function
  // ../../../../src/helpers/scripts/GlobalStateEventsHandler
  GlobalEventsHandler({ blockId, selectedSearchResult, setSelectedSearchResult, searchValue, setSearchValue, mobileIsMapDisplayed, setMobileIsMapDisplayed })

  return (
    <Search
      limitedSearch={attributes.limitedSearch}
      setMobileIsMapDisplayed={setMobileIsMapDisplayed}
      setSearchValue={setSearchValue}
      setSelectedSearchResult={setSelectedSearchResult}
    />
  )
}
