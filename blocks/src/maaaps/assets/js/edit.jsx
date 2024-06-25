import '../scss/editor.scss'

import { useBlockProps } from '@wordpress/block-editor'
import { useEffect } from '@wordpress/element'

import Controls from './components/Controls'
import Loader from './components/Loader'
import Map from './components/Map'

export default function Edit({ attributes, setAttributes }) {
  const blockProps = useBlockProps()

  useEffect(() => {
    setAttributes({ blockId: blockProps.id })
  }, [])

  return (
    <>
      <Controls setAttributes={setAttributes} attributes={attributes} />
      <section {...blockProps}>
        {!!attributes.selectedPosts.length && <Map selectedPosts={attributes.selectedPosts} posts={attributes.posts} />}

        <Loader hasPosts={!!attributes.selectedPosts.length} />
      </section>
    </>
  )
}
