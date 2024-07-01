import '../scss/editor.scss'

import { useBlockProps } from '@wordpress/block-editor'
import { useEffect, useState } from '@wordpress/element'

import Controls from './components/Controls'
import Map from './components/Map'
import Loader from './components/map/Loader'
import Sidebar from './components/Sidebar'

export default function Edit({ attributes, setAttributes }) {
  const blockProps = useBlockProps()
  blockProps.style = {
    ...blockProps.style,
    '--color-primary': attributes.selectedPrimaryColor,
    '--color-secondary': attributes.selectedSecondaryColor,
    '--color-marker': attributes.selectedMarkerColor,
    '--color-cluster': attributes.selectedClusterColor,
    '--color-search': attributes.selectedSearchColor,
    '--color-geolocation': attributes.selectedGeolocationColor
  }

  useEffect(() => {
    setAttributes({ blockId: blockProps.id })
  }, [])

  const [filteredPosts, setFilteredPosts] = useState([])
  const [selectedPost, setSelectedPost] = useState({})
  const [selectedSearchResult, setSelectedSearchResult] = useState({})

  let posts = []
  if (attributes.selectedPosts.length) {
    posts = attributes.posts.filter((post) => attributes.selectedPosts.includes(`${post.id}`))
  }

  if (filteredPosts.length) {
    posts = filteredPosts
  }

  return (
    <>
      <Controls setAttributes={setAttributes} attributes={attributes} />
      <section {...blockProps}>
        {attributes.selectedDisplayType === 'full' && !!posts.length && (
          <Sidebar
            posts={posts}
            setAttributes={setAttributes}
            selectedPost={selectedPost}
            setSelectedPost={setSelectedPost}
            setFilteredPosts={setFilteredPosts}
            setSelectedSearchResult={setSelectedSearchResult}
            displaySearch={attributes.displaySearch}
            limitedSearch={attributes.limitedSearch}
          />
        )}

        {!!posts.length && (
          <Map
            posts={posts}
            tiles={attributes.selectedMapTiles}
            cluster={attributes.isClustered}
            colors={{
              marker: attributes.selectedMarkerColor,
              cluster: attributes.selectedClusterColor,
              search: attributes.selectedSearchColor,
              geolocationMarker: attributes.selectedGeolocationColor
            }}
            selectedSearchResult={selectedSearchResult}
            selectedPost={selectedPost}
            displaySearch={attributes.displaySearch}
            limitedSearch={attributes.limitedSearch}
            isGeolocated={attributes.isGeolocated}
          />
        )}

        <Loader hasPosts={!!attributes.selectedPosts.length} />
      </section>
    </>
  )
}
