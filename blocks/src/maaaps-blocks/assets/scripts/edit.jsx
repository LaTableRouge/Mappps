import '../styles/editor.scss'

import { InnerBlocks, useBlockProps } from '@wordpress/block-editor'
import { useSelect } from '@wordpress/data'
import { useCallback, useEffect, useState } from '@wordpress/element'

import Controls from './components/Controls'
import Wizard from './components/Wizard'
import AlterBlockProps from './utils/AlterBlockProps'
import GetPostTypes from './utils/GetPostTypes'

export default function Edit({ attributes, clientId, isSelected, setAttributes }) {
  // Child block change listener : https://wordpress.stackexchange.com/questions/406384/how-to-output-child-block-attributes-on-a-parent-block

  const innerBlocks = useSelect((select) => select('core/block-editor').getBlock(clientId).innerBlocks)

  useEffect(() => {
    let innerBlocksAttributes = {}
    if (innerBlocks.length) {
      innerBlocks.forEach(({ attributes, name }) => {
        if (name === 'mps/sidebar' || name === 'mps/post-details') {
          innerBlocksAttributes = { ...innerBlocksAttributes, ...attributes }
        }
      })
    }

    setAttributes({ sharedAttributes: innerBlocksAttributes })
  }, [innerBlocks])

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
    const listViewExpandButton = document.querySelector(`.block-editor-list-view-tree tr[data-block="${attributes.blockId}"] .block-editor-list-view__expander`)

    if (posts.length) {
      document.dispatchEvent(
        new CustomEvent('mps-queried-posts', {
          detail: {
            id: attributes.blockId,
            posts
          }
        })
      )

      // Enable the possibility to toggle between child blocks
      if (listViewExpandButton) {
        listViewExpandButton.removeAttribute('style')
      }
    } else {
      // Disable the possibility to toggle between child blocks
      if (listViewExpandButton) {
        listViewExpandButton.style.pointerEvents = 'none'
      }
    }
  }, [posts])

  if (attributes.selectedPosts.length) {
    return (
      <section {...AlterBlockProps(blockProps, attributes)}>
        <Controls attributes={attributes} postTypes={postTypes} setAttributes={setAttributes} setQueriedPosts={setQueriedPosts} />

        <div
          ref={wrapperRef}
          className={`responsive-wrapper in-editor ${isSelected ? ' is-selected' : ''}`}
          data-has-posts={!!queriedPosts.length}
          style={{ '--wrapper-height': `${wrapperHeight}px` }}
        >
          <InnerBlocks
            template={[
              ['mps/loader', {}],
              ['mps/sidebar', {}],
              ['mps/map', {}],
              ['mps/post-details', {}]
            ]}
          />
        </div>
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
