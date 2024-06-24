import '../scss/editor.scss'

import { useBlockProps } from '@wordpress/block-editor'
import { useEffect } from '@wordpress/element'

import Controls from './components/Controls'
import Map from './components/Map'

// import GetPosts from './utils/GetPosts'

export default function Edit({ attributes, setAttributes }) {
  const blockProps = useBlockProps()

  useEffect(() => {
    setAttributes({ blockId: blockProps.id })
  }, [])

  return (
    <>
      <Controls setAttributes={setAttributes} attributes={attributes} />
      {!!attributes.selectedPosts.length && (
        <section {...blockProps}>
          <Map selectedPosts={attributes.selectedPosts} posts={attributes.posts} />
        </section>
      )}
    </>
  )
}
