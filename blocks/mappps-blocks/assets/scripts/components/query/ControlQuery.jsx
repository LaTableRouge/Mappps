/**
 * ControlQuery Component
 *
 * A WordPress block editor component that provides a comprehensive interface for
 * configuring and managing post queries. It allows users to set various query parameters
 * such as post type, order, filters, and display settings.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.attributes - Block attributes
 * @param {Function} props.setAttributes - Function to update block attributes
 * @param {Function} props.setQueriedPosts - Function to update queried posts
 *
 * @example
 * <ControlQuery
 *   attributes={blockAttributes}
 *   setAttributes={updateAttributes}
 *   setQueriedPosts={updateQueriedPosts}
 * />
 */

import { __experimentalToolsPanel as ToolsPanel, Button } from '@wordpress/components'
import { memo, useCallback, useEffect, useState } from '@wordpress/element'
import { __ } from '@wordpress/i18n'

// Import control components
import FormTokenAuthor from './controls/FormTokenAuthor'
// import FormTokenFormat from './controls/FormTokenFormat'
// import FormTokenParent from './controls/FormTokenParent'
import { FormTokenTaxonomy } from './controls/FormTokenTaxonomy'
// import NumberOffset from './controls/NumberOffset'
// import NumberPages from './controls/NumberPages'
import RangePerPage from './controls/RangePerPage'
import SelectOrder from './controls/SelectOrder'
import SelectPostType from './controls/SelectPostType'
import SelectSticky from './controls/SelectSticky'
import TextKeyword from './controls/TextKeyword'
// Import utilities and hooks
import { buildTaxonomyTermsFromPosts } from './utils/CreateTaxonomyTermsFromPosts'
import GetPosts from './utils/GetRecords.jsx'
import { useToolsPanelDropdownMenuProps } from './utils/hooks.js'
import { isControlAllowed, useAllowedControls, useOrderByOptions, usePostTypes, useTaxonomies, useTerms } from './utils/utils.js'

function ControlQuery({ attributes, isConfirmed, isWizard, setAttributes, setIsConfirmed, setQueriedPosts }) {
  // Initialize query state with default values
  const [query, setQueryState] = useState(attributes.query)

  // Destructure query parameters for easier access
  const { author: authorIds, inherit, offset, order, orderBy, perPage, postType, search, sticky, taxQuery } = query

  // Get post type related data and options
  const {
    // postTypeFormatSupportMap,
    postTypeRestBaseMap,
    postTypeRestNamespaceMap,
    postTypesSelectOptions,
    postTypesTaxonomiesMap
  } = usePostTypes()

  // Get taxonomies for the current post type
  const taxonomies = useTaxonomies(postType)

  // Get terms for the taxonomies
  const { resolved: termsResolved, terms } = useTerms(taxonomies?.map((tax) => tax.slug) || [])

  // Update block attributes when query changes
  useEffect(() => {
    setAttributes({ query: query })
  }, [query])

  // Update block attributes when post type or taxonomies change
  useEffect(() => {
    if (Object.keys(postTypeRestBaseMap).length && Object.keys(postTypeRestNamespaceMap).length) {
      setAttributes({
        postType: postType,
        postTypeRestBase: postTypeRestBaseMap[postType],
        postTypeRestNamespace: postTypeRestNamespaceMap[postType]
      })
    }
  }, [postType])

  // Get posts based on current query
  const { posts, resolved: postsResolved } = GetPosts(query)

  // Build and update taxonomy terms from posts
  useEffect(() => {
    if (postsResolved && posts?.length && termsResolved && Object.keys(terms).length) {
      const taxonomyTermsFromPosts = buildTaxonomyTermsFromPosts(taxonomies, terms, posts)
      setAttributes({ filtersTerms: taxonomyTermsFromPosts })
    }
  }, [postsResolved, termsResolved, taxonomies])

  // Update selected posts and queried posts only when confirmed
  useEffect(() => {
    if (isConfirmed && postsResolved && posts.length) {
      setAttributes({ selectedPosts: posts.map((post) => post.id) })
      setQueriedPosts(posts)
    }
  }, [postsResolved, isConfirmed])

  // Update sticky parameters when sticky value changes
  useEffect(() => {
    setAttributes({ stickyParams: sticky })
  }, [sticky])

  /**
   * Updates the query state by merging new parameters with existing ones
   * @param {Object} newQuery - New query parameters to merge
   */
  const setQuery = (newQuery) => {
    setQueryState((prevQuery) => ({
      ...prevQuery,
      ...newQuery
    }))
    // Reset confirmation when query changes
    setIsConfirmed(false)
  }

  // Handle confirm button click
  const handleConfirm = useCallback(() => {
    setIsConfirmed(true)
  }, [])

  // Get allowed controls based on block attributes
  const allowedControls = useAllowedControls(attributes)

  // Determine which controls to show
  const showSticky = postType === 'post'
  // const isPostTypeHierarchical = useIsPostTypeHierarchical(postType)
  const onPostTypeChange = (newValue) => {
    const updateQuery = { postType: newValue }

    // Update taxonomies based on new post type
    const supportedTaxonomies = postTypesTaxonomiesMap[newValue]
    const updatedTaxQuery = Object.entries(taxQuery || {}).reduce((accumulator, [taxonomySlug, terms]) => {
      if (supportedTaxonomies.includes(taxonomySlug)) {
        accumulator[taxonomySlug] = terms
      }
      return accumulator
    }, {})
    updateQuery.taxQuery = Object.keys(updatedTaxQuery).length ? updatedTaxQuery : undefined

    // Reset sticky posts for non-post types
    if (newValue !== 'post') {
      updateQuery.sticky = ''
    }

    // Reset parents and format
    // updateQuery.parents = []
    // Post types can register post format support with `add_post_type_support`.
    // But we need to reset the `format` property when switching to post types
    // that do not support post formats.
    // const hasFormatSupport = postTypeFormatSupportMap[newValue]
    // if (!hasFormatSupport) {
    //   updateQuery.format = []
    // }

    setQuery(updateQuery)
  }

  const orderByOptions = useOrderByOptions(postType)
  const showPostTypeControl = !inherit && isControlAllowed(allowedControls, 'postType')
  const showOrderControl = !inherit && isControlAllowed(allowedControls, 'order')
  const showStickyControl = !inherit && showSticky && isControlAllowed(allowedControls, 'sticky')
  const showSettingsPanel = showPostTypeControl || showOrderControl || showStickyControl
  const showTaxControl = !!taxonomies?.length && isControlAllowed(allowedControls, 'taxQuery')
  const showAuthorControl = isControlAllowed(allowedControls, 'author')
  const showSearchControl = isControlAllowed(allowedControls, 'search')
  // const showParentControl = isControlAllowed(allowedControls, 'parents') && isPostTypeHierarchical

  // const postTypeHasFormatSupport = postTypeFormatSupportMap[postType]
  // const showFormatControl = useSelect(
  //   (select) => {
  //     // Check if the post type supports post formats and if the control is allowed.
  //     if (!postTypeHasFormatSupport || !isControlAllowed(allowedControls, 'format')) {
  //       return false
  //     }

  //     const themeSupports = select(coreStore).getThemeSupports()

  //     // If there are no supported formats, getThemeSupports still includes the default 'standard' format,
  //     // and in this case the control should not be shown since the user has no other formats to choose from.
  //     return themeSupports.formats && themeSupports.formats.length > 0 && themeSupports.formats.some((type) => type !== 'standard')
  //   },
  //   [allowedControls, postTypeHasFormatSupport]
  // )

  const showFiltersPanel = showTaxControl || showAuthorControl || showSearchControl
  const dropdownMenuProps = useToolsPanelDropdownMenuProps()

  const showPostCountControl = isControlAllowed(allowedControls, 'postCount')
  // const showOffSetControl = isControlAllowed(allowedControls, 'offset')
  // const showPagesControl = isControlAllowed(allowedControls, 'pages')

  const showDisplayPanel = showPostCountControl

  return (
    <>
      {showSettingsPanel && (
        <ToolsPanel
          dropdownMenuProps={dropdownMenuProps}
          label={__('Query global settings', 'mappps')}
          resetAll={() => {
            setQuery({
              postType: 'post',
              order: 'desc',
              orderBy: 'date',
              sticky: '',
              inherit: false
            })
          }}
        >
          {showPostTypeControl && <SelectPostType defaultValue={postType} options={postTypesSelectOptions} onChange={onPostTypeChange} />}

          {showOrderControl && <SelectOrder defaultValue={{ orderBy, order }} options={orderByOptions} onChange={setQuery} />}

          {showStickyControl && <SelectSticky defaultValue={sticky} onChange={setQuery} />}
        </ToolsPanel>
      )}

      {!inherit && !isWizard && showDisplayPanel && (
        <ToolsPanel
          className="block-library-query-toolspanel__display"
          dropdownMenuProps={dropdownMenuProps}
          label={__('Query display settings', 'mappps')}
          resetAll={() => {
            setQuery({
              offset: 0,
              pages: 0
            })
          }}
        >
          <RangePerPage defaultValue={perPage} offset={offset} onChange={setQuery} />
          {/* <NumberOffset defaultValue={offset} onChange={setQuery} /> */}
          {/* <NumberPages defaultValue={pages} onChange={setQuery} /> */}
        </ToolsPanel>
      )}

      {!inherit && !isWizard && showFiltersPanel && (
        <ToolsPanel
          className="block-library-query-toolspanel__filters" // unused but kept for backward compatibility
          dropdownMenuProps={dropdownMenuProps}
          label={__('Query filters settings', 'mappps')}
          resetAll={() => {
            setQuery({
              author: '',
              parents: [],
              search: '',
              taxQuery: null,
              format: []
            })
          }}
        >
          {showTaxControl && <FormTokenTaxonomy query={query} onChange={setQuery} />}
          {showAuthorControl && <FormTokenAuthor defaultValue={authorIds} onChange={setQuery} />}
          {showSearchControl && <TextKeyword defaultValue={search} setQuery={setQuery} />}
          {/* {showParentControl && <FormTokenParent defaultValue={query.parents} postType={query.postType} onChange={setQuery} />} */}
          {/* {showFormatControl && <FormTokenFormat defaultValue={query.format} onChange={setQuery} />} */}
        </ToolsPanel>
      )}

      {/* Confirm button */}
      <div className="mappps-query-confirm-container" style={{ marginTop: '16px', marginBottom: '16px', textAlign: 'center' }}>
        <Button disabled={postsResolved === false || posts.length === 0} isBusy={postsResolved === false} variant="primary" onClick={handleConfirm}>
          {isConfirmed ? __('Query settings applied', 'mappps') : __('Apply query settings', 'mappps')}
        </Button>
      </div>
    </>
  )
}

export default memo(ControlQuery)
