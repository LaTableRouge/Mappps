import { useState } from '@wordpress/element'

import Search from './components/Search'
import GlobalEventsHandler from './utils/GlobalEventsHandler'

export default function Main({ attributes, blockId }) {
  const [selectedSearchResult, setSelectedSearchResult] = useState({}) // OSM selected search result (ex: Paris)
  const [searchValue, setSearchValue] = useState('') // search value
  const [mobileIsMapDisplayed, setMobileIsMapDisplayed] = useState(true) // mobile toggle

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
