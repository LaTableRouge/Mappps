import '../scss/editor.scss'

import { useBlockProps } from '@wordpress/block-editor'
import { useEffect } from '@wordpress/element'

import Controls from './components/Controls'
import Map from './components/Map'
import Loader from './components/map/Loader'

export default function Edit({ attributes, setAttributes }) {
  const blockProps = useBlockProps()

  useEffect(() => {
    setAttributes({ blockId: blockProps.id })
  }, [])

  return (
    <>
      <Controls setAttributes={setAttributes} attributes={attributes} />
      <section {...blockProps}>
        {!!attributes.selectedPosts.length && (
          <Map
            selectedPosts={attributes.selectedPosts}
            posts={attributes.posts}
            tiles={attributes.selectedMapTiles}
            cluster={attributes.isClustered}
            colors={{ marker: attributes.selectedMarkerColor, cluster: attributes.selectedClusterColor }}
          />
        )}

        <Loader hasPosts={!!attributes.selectedPosts.length} />
      </section>
    </>
  )
}
