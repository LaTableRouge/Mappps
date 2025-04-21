import React, { useCallback, useState } from 'react'

import { useAllowedControls } from '../hooks/useAllowedControls'

function ControlQuery({ attributes, clientId, postTypes, setAttributes, setQueriedPosts }) {
  const name = 'mappps/query'

  // Initialize query state with proper structure
  const [query, setQueryState] = useState({
    inherit: false,
    postType: 'post',
    order: 'desc',
    orderBy: 'date',
    sticky: '',
    offset: 0,
    pages: 0,
    perPage: 0,
    author: '',
    parents: [],
    search: '',
    taxQuery: null,
    format: []
  })

  // Custom setQuery function that merges new parameters with existing ones
  const setQuery = useCallback((newQuery) => {
    setQueryState((prevQuery) => ({
      ...prevQuery,
      ...newQuery
    }))
  }, [])

  console.log(query)

  const { author: authorIds, format, inherit, offset, order, orderBy, pages, parents, perPage, postType, sticky, taxQuery } = query
  const allowedControls = useAllowedControls(attributes)

  return (
    <div>
      {/* Render your component content here */}
    </div>
  )
}

export default ControlQuery
