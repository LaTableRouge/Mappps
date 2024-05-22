import '../scss/editor.scss'

import { useBlockProps } from '@wordpress/block-editor'
import { useEffect } from '@wordpress/element'

import Controls from './components/Controls'
import Map from './components/Map'
import GetTaxonomies from './utils/GetTaxonomies'
import QueryData from './utils/QueryData'

export default function Edit({ attributes, setAttributes }) {
  const blockProps = useBlockProps()

  useEffect(() => {
    setAttributes({ blockId: blockProps.id })
  }, [])

  const fetchedDatas = QueryData()
  const mounted = fetchedDatas.mounted
  const loading = fetchedDatas.loading
  const posts = fetchedDatas.posts

  const allTaxonomies = GetTaxonomies()

  return (
    <>
      <Controls allTaxonomies={allTaxonomies} setAttributes={setAttributes} attributes={attributes} />
      <section {...blockProps}>{posts.length ? <Map posts={posts} /> : null}</section>
    </>
  )
}
