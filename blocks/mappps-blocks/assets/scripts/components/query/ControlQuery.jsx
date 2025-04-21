import { __experimentalToolsPanel as ToolsPanel } from '@wordpress/components'
import { memo, useEffect, useState } from '@wordpress/element'
import { __ } from '@wordpress/i18n'

import FormTokenAuthor from './controls/FormTokenAuthor'
// import FormTokenFormat from './controls/FormTokenFormat'
// import FormTokenParent from './controls/FormTokenParent'
import { FormTokenTaxonomy } from './controls/FormTokenTaxonomy'
import NumberOffset from './controls/NumberOffset'
import NumberPages from './controls/NumberPages'
import RangePerPage from './controls/RangePerPage'
import SelectOrder from './controls/SelectOrder'
import SelectPostType from './controls/SelectPostType'
import SelectSticky from './controls/SelectSticky'
import TextKeyword from './controls/TextKeyword'
import { buildTaxonomyTermsFromPosts } from './utils/CreateTaxonomyTermsFromPosts'
import GetPosts from './utils/GetRecords.jsx'
import { useToolsPanelDropdownMenuProps } from './utils/hooks.js'
import { isControlAllowed, useAllowedControls, useOrderByOptions, usePostTypes, useTaxonomies, useTerms } from './utils/utils.js'

function ControlQuery({ attributes, setAttributes, setQueriedPosts }) {
  // Initialize query state with proper structure
  const [query, setQueryState] = useState(attributes.query)
  const { author: authorIds, inherit, order, orderBy, postType, sticky, taxQuery } = query
  const { postTypeFormatSupportMap, postTypeRestBaseMap, postTypeRestNamespaceMap, postTypesSelectOptions, postTypesTaxonomiesMap } = usePostTypes()

  // Get taxonomies for the current post type
  const taxonomies = useTaxonomies(postType)

  // Get terms for the taxonomies
  const { resolved: termsResolved, terms } = useTerms(taxonomies?.map((tax) => tax.slug) || [])

  useEffect(() => {
    setAttributes({ query: query })
  }, [query])

  useEffect(() => {
    if (Object.keys(postTypeRestBaseMap).length && Object.keys(postTypeRestNamespaceMap).length) {
      setAttributes({
        postType: postType,
        postTypeRestBase: postTypeRestBaseMap[postType],
        postTypeRestNamespace: postTypeRestNamespaceMap[postType],
        taxonomies: taxonomies
      })
    }
  }, [postType, taxonomies])

  const { posts, resolved: postsResolved } = GetPosts(query)

  // Build taxonomy terms from posts when posts are resolved
  useEffect(() => {
    if (postsResolved && posts.length && termsResolved && Object.keys(terms).length) {
      const taxonomyTermsFromPosts = buildTaxonomyTermsFromPosts(taxonomies, terms, posts)
      setAttributes({ filtersTerms: taxonomyTermsFromPosts })
    }
  }, [postsResolved, termsResolved, taxonomies])

  useEffect(() => {
    if (postsResolved && posts.length) {
      setAttributes({ selectedPosts: posts.map((post) => post.id) })
      setQueriedPosts(posts)
    }
  }, [postsResolved])

  // Custom setQuery function that merges new parameters with existing ones
  const setQuery = (newQuery) => {
    setQueryState((prevQuery) => {
      const updatedQuery = {
        ...prevQuery,
        ...newQuery
      }

      return updatedQuery
    })
  }

  const allowedControls = useAllowedControls(attributes)
  const showSticky = postType === 'post'
  // const isPostTypeHierarchical = useIsPostTypeHierarchical(postType)
  const onPostTypeChange = (newValue) => {
    const updateQuery = { postType: newValue }
    // We need to dynamically update the `taxQuery` property,
    // by removing any not supported taxonomy from the query.
    const supportedTaxonomies = postTypesTaxonomiesMap[newValue]
    const updatedTaxQuery = Object.entries(taxQuery || {}).reduce((accumulator, [taxonomySlug, terms]) => {
      if (supportedTaxonomies.includes(taxonomySlug)) {
        accumulator[taxonomySlug] = terms
      }
      return accumulator
    }, {})
    updateQuery.taxQuery = Object.keys(updatedTaxQuery).length ? updatedTaxQuery : undefined

    if (newValue !== 'post') {
      updateQuery.sticky = ''
    }
    // We need to reset `parents` because they are tied to each post type.
    updateQuery.parents = []
    // Post types can register post format support with `add_post_type_support`.
    // But we need to reset the `format` property when switching to post types
    // that do not support post formats.
    const hasFormatSupport = postTypeFormatSupportMap[newValue]
    if (!hasFormatSupport) {
      updateQuery.format = []
    }

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
  const showOffSetControl = isControlAllowed(allowedControls, 'offset')
  const showPagesControl = isControlAllowed(allowedControls, 'pages')

  const showDisplayPanel = showPostCountControl || showOffSetControl || showPagesControl

  return (
    <>
      {showSettingsPanel && (
        <ToolsPanel
          dropdownMenuProps={dropdownMenuProps}
          label={__('Settings')}
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

      {!inherit && showDisplayPanel && (
        <ToolsPanel
          className="block-library-query-toolspanel__display"
          dropdownMenuProps={dropdownMenuProps}
          label={__('Display')}
          resetAll={() => {
            setQuery({
              offset: 0,
              pages: 0
            })
          }}
        >
          <RangePerPage defaultValue={query.perPage} offset={query.offset} onChange={setQuery} />
          <NumberOffset defaultValue={query.offset} onChange={setQuery} />
          <NumberPages defaultValue={query.pages} onChange={setQuery} />
        </ToolsPanel>
      )}

      {!inherit && showFiltersPanel && (
        <ToolsPanel
          className="block-library-query-toolspanel__filters" // unused but kept for backward compatibility
          dropdownMenuProps={dropdownMenuProps}
          label={__('Filters', 'mappps')}
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
          {showSearchControl && <TextKeyword defaultValue={query.search} setQuery={setQuery} />}
          {/* {showParentControl && <FormTokenParent defaultValue={query.parents} postType={query.postType} onChange={setQuery} />} */}
          {/* {showFormatControl && <FormTokenFormat defaultValue={query.format} onChange={setQuery} />} */}
        </ToolsPanel>
      )}
    </>
  )
}

export default memo(ControlQuery)
