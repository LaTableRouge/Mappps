import '../styles/editor.scss'

import { InnerBlocks, useBlockProps } from '@wordpress/block-editor'
import { useCallback, useState } from '@wordpress/element'

import Controls from './components/Controls'
import Wizard from './components/Wizard'
import AlterBlockProps from './utils/AlterBlockProps'
import GetPostTypes from './utils/GetPostTypes'

export default function Edit({ attributes, clientId, isSelected, setAttributes }) {
  // Child block change listener : https://wordpress.stackexchange.com/questions/406384/how-to-output-child-block-attributes-on-a-parent-block

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

  // ---------- attributes are the states stored by Wordpress
  // They are defined in the block.json
  // ----------

  // ---------- BlockProps are the data that will be inserted into the main html tag of the block (style, data-attr, etc...)
  const blockProps = useBlockProps()
  // ----------

  // ----------States that aren't stored by Wordrpess
  // They are only usefull for the preview
  const [wrapperHeight, setWrapperHeight] = useState(0) // The height of the whole block
  // ----------

  // ---------- Other variables
  const postTypes = GetPostTypes()
  // Check if the wrapper is in mobile view (container query check)
  const wrapperRef = useCallback((node) => {
    if (!node) {
      return
    }
    const resizeObserver = new ResizeObserver(() => {
      setWrapperHeight(node.clientHeight)
    })
    resizeObserver.observe(node)
  }, [])
  // ----------

  if (attributes.selectedPosts.length) {
    return (
      <section {...AlterBlockProps(blockProps, attributes)}>
        <Controls attributes={attributes} postTypes={postTypes} setAttributes={setAttributes} />

        <div ref={wrapperRef} className="responsive-wrapper" style={{ '--wrapper-height': `${wrapperHeight}px` }}>
          <InnerBlocks
            template={[
              ['mps/loader', {}],
              ['mps/sidebar', {}]
              // ['mps/map', {}]
            ]}
          />
        </div>
      </section>
    )
  } else {
    return (
      <section {...AlterBlockProps(blockProps, attributes)}>
        <Wizard attributes={attributes} postTypes={postTypes} setAttributes={setAttributes} />
      </section>
    )
  }
}
