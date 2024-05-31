import '../scss/editor.scss'

import { useBlockProps } from '@wordpress/block-editor'
import { useEffect } from '@wordpress/element'

import Controls from './components/Controls'
import Map from './components/Map'
import QueryData from './utils/QueryData'

export default function Edit({ attributes, setAttributes }) {
  const blockProps = useBlockProps()

  const fetchedDatas = QueryData(setAttributes, attributes.postType, attributes.selectedTaxonomies, attributes.selectedCategories)
  const resolved = fetchedDatas.resolved
  const posts = fetchedDatas.posts

  useEffect(() => {
    setAttributes({ blockId: blockProps.id })
  }, [])

  return (
    <>
      <Controls setAttributes={setAttributes} attributes={attributes} />
      {resolved && <section {...blockProps}>{posts.length ? <Map posts={posts} /> : null}</section>}
    </>
  )
}
