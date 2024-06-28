import '../scss/editor.scss'

import { useBlockProps } from '@wordpress/block-editor'
import { useEffect } from '@wordpress/element'

import Controls from './components/Controls'
import Map from './components/Map'
import Loader from './components/map/Loader'
import Sidebar from './components/Sidebar'

export default function Edit({ attributes, setAttributes }) {
  const blockProps = useBlockProps()

  useEffect(() => {
    setAttributes({ blockId: blockProps.id })
  }, [])

  let posts = []
  if (attributes.selectedPosts.length) {
    posts = attributes.posts.filter((post) => attributes.selectedPosts.includes(`${post.id}`))
  }

  if (attributes.filteredPosts.length) {
    posts = attributes.filteredPosts
  }

  return (
    <>
      <Controls setAttributes={setAttributes} attributes={attributes} />
      <section {...blockProps}>
        {attributes.selectedDisplayType === 'full' && !!posts.length && (
          <Sidebar posts={posts} setAttributes={setAttributes} displaySearch={attributes.displaySearch} limitedSearch={attributes.limitedSearch} />
        )}

        {!!posts.length && (
          <Map
            posts={posts}
            tiles={attributes.selectedMapTiles}
            cluster={attributes.isClustered}
            colors={{ marker: attributes.selectedMarkerColor, cluster: attributes.selectedClusterColor, search: attributes.selectedSearchColor }}
            selectedSearchResult={attributes.selectedSearchResult}
            displaySearch={attributes.displaySearch}
            limitedSearch={attributes.limitedSearch}
          />
        )}

        <Loader hasPosts={!!attributes.selectedPosts.length} />
      </section>
    </>
  )
}
