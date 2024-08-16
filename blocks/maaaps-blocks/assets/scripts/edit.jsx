import '../styles/editor.scss'

import { InnerBlocks, useBlockProps } from '@wordpress/block-editor'
import { useSelect } from '@wordpress/data'
import { useCallback, useEffect, useState } from '@wordpress/element'

import Controls from './components/Controls'
import Wizard from './components/Wizard'
import AlterBlockProps from './utils/AlterBlockProps'
import GetPostTypes from './utils/GetPostTypes'

export default function Edit({ attributes, clientId, isSelected, setAttributes }) {
  const blockProps = useBlockProps()

  const [wrapperHeight, setWrapperHeight] = useState(0)
  const [queriedPosts, setQueriedPosts] = useState([])

  const postTypes = GetPostTypes()

  // Get usefull attributes from child blocks
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

  // Set an unique block ID
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
            template={[['mps/loader'], ['mps/sidebar', {}], ['mps/map', {}], ['mps/post-details', {}], ['mps/filters', {}], ['mps/mobile-toggles', {}]]}
            templateLock="all"
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
