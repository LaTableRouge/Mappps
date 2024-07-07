import '../styles/editor.scss'

import { InnerBlocks, useBlockProps } from '@wordpress/block-editor'
import { useState } from '@wordpress/element'

import Controls from './components/Controls'
// import Sidebar from './components/Sidebar'
import Wizard from './components/Wizard'
import GetPostTypes from './utils/GetPostTypes'

export default function Edit({ attributes, setAttributes }) {
  // BlockProps are the data that will be inserted into the main html tag of the block (style, data-attr, etc...)
  const blockProps = useBlockProps()

  // attributes are the states stored by Wordpress
  // They are defined in the block.json

  // States that aren't stored by Wordrpess
  // They are only usefull for the preview
  const [queriedPosts, setQueriedPosts] = useState([])

  // Child block change listener : https://wordpress.stackexchange.com/questions/406384/how-to-output-child-block-attributes-on-a-parent-block

  // TODO avec RUDY:
  // Change view (avec fitbound & geolocation & ouverture du cluster on click etc....)
  // Reset view
  // Marker active

  // TODO:
  // Refacto en blocks séparés
  // -- Maaaps
  // ---- Leaflet map
  // ------ Popup
  // ---- Sidebar
  // ------ Title
  // ------ Filters
  // ------ Search
  // ------ List
  // -------- List element
  // -------- List element detail

  const postTypes = GetPostTypes()

  return (
    <section {...blockProps}>
      {!attributes.selectedPosts.length
        ? (
        <Wizard attributes={attributes} postTypes={postTypes} setAttributes={setAttributes} setQueriedPosts={setQueriedPosts} />
          )
        : (
        <>
          <Controls attributes={attributes} postTypes={postTypes} queriedPosts={queriedPosts} setAttributes={setAttributes} setQueriedPosts={setQueriedPosts} />
          <InnerBlocks
            template={[
              ['mps/loader', {}],
              ['mps/sidebar', {}],
              ['mps/map', {}]
            ]}
          />
        </>
          )}
    </section>
  )
}
