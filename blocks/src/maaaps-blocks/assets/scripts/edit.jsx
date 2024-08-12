import '../styles/editor.scss'

import { InnerBlocks, useBlockProps } from '@wordpress/block-editor'
import { useCallback, useEffect, useState } from '@wordpress/element'

import Controls from './components/Controls'
import Loader from './components/Loader'
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
  const [queriedPosts, setQueriedPosts] = useState([]) // all posts fetched by the query
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

  useEffect(() => {
    setAttributes({ blockId: clientId })
  }, [clientId])

  let posts = []
  if (attributes.selectedPosts.length) {
    posts = queriedPosts.filter((post) => attributes.selectedPosts.includes(`${post.id}`))
  }

  useEffect(() => {
    if (posts.length) {
      document.dispatchEvent(
        new CustomEvent('mps-posts', {
          detail: {
            id: attributes.blockId,
            posts
          }
        })
      )
    }
  }, [posts])

  if (attributes.selectedPosts.length) {
    return (
      <section {...AlterBlockProps(blockProps, attributes)}>
        <Controls attributes={attributes} postTypes={postTypes} setAttributes={setAttributes} setQueriedPosts={setQueriedPosts} />

        <div ref={wrapperRef} className="responsive-wrapper" style={{ '--wrapper-height': `${wrapperHeight}px` }}>
          <InnerBlocks
            template={[
              ['mps/loader', {}],
              ['mps/sidebar', {}],
              ['mps/map', {}]
            ]}
          />
        </div>
        <Loader hasPosts={!!queriedPosts.length} isSelected={isSelected} />
      </section>
    )
  } else {
    return (
      <section {...AlterBlockProps(blockProps, attributes)}>
        <Wizard attributes={attributes} postTypes={postTypes} setAttributes={setAttributes} setQueriedPosts={setQueriedPosts} />
      </section>
    )
  }
}
