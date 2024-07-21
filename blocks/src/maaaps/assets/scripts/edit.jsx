import '../styles/editor.scss'

import { useBlockProps } from '@wordpress/block-editor'
import { useState } from '@wordpress/element'

import { isColorLight } from './common/functions'
import Controls from './components/Controls'
import Wizard from './components/Wizard'
import Main from './main'
import GetPostTypes from './utils/GetPostTypes'

export default function Edit({ attributes, setAttributes }) {
  // attributes are the states stored by Wordpress
  // They are defined in the block.json

  // ---------- BlockProps are the data that will be inserted into the main html tag of the block (style, data-attr, etc...)
  const blockProps = useBlockProps()
  blockProps.style = {
    ...blockProps.style,
    '--marker-size': attributes.selectedMarkerSize,
    '--cluster-size': attributes.selectedMarkerClusterSize,
    '--color-primary': attributes.selectedPrimaryColor,
    '--color-secondary': attributes.selectedSecondaryColor,
    '--color-marker': attributes.selectedMarkerColor,
    '--color-marker-active': attributes.selectedActiveMarkerColor,
    '--color-cluster': attributes.selectedClusterColor,
    '--color-marker-search': attributes.selectedSearchColor,
    '--color-marker-geolocation': attributes.selectedGeolocationColor,
    '--sidebar-size': attributes.selectedSidebarSize,
    '--popup-size': attributes.selectedPopupsSize,
    '--filter-size': attributes.selectedFiltersSize,
    '--color-button-primary': isColorLight(attributes.selectedPrimaryColor, 170) === 'light' ? 'var(--color-gray-700)' : 'var(--color-white)',
    '--color-button-secondary': isColorLight(attributes.selectedSecondaryColor, 170) === 'light' ? 'var(--color-gray-700)' : 'var(--color-white)'
  }
  if (blockProps.style.aspectRatio) {
    if (blockProps.style.aspectRatio !== 'auto') {
      blockProps.style['--aspect-ratio'] = blockProps.style.aspectRatio
    }
    delete blockProps.style.aspectRatio
  }
  // ----------

  // ----------States that aren't stored by Wordrpess
  // They are only usefull for the preview
  const [queriedPosts, setQueriedPosts] = useState([]) // all posts fetched by the query
  // ----------

  // ---------- Other variables
  const postTypes = GetPostTypes()
  // ----------

  // TODO:
  // style desktop & mobile
  // Style rtl
  // Mobile popup expand

  if (attributes.selectedPosts.length) {
    return (
      <section {...blockProps}>
        <Controls attributes={attributes} postTypes={postTypes} queriedPosts={queriedPosts} setAttributes={setAttributes} setQueriedPosts={setQueriedPosts} />

        <Main attributes={attributes} queriedPosts={queriedPosts} />
      </section>
    )
  } else {
    return (
      <section {...blockProps}>
        <Wizard attributes={attributes} postTypes={postTypes} setAttributes={setAttributes} setQueriedPosts={setQueriedPosts} />
      </section>
    )
  }
}
