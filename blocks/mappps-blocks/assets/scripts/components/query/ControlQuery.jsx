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

import { memo, useCallback, useEffect, useState } from '@wordpress/element'
import { __ } from '@wordpress/i18n'

// import FormTokenFormat from './controls/FormTokenFormat'
// import FormTokenParent from './controls/FormTokenParent'
// import NumberOffset from './controls/NumberOffset'
// import NumberPages from './controls/NumberPages'
import { buildTaxonomyTermsFromPosts } from './utils/CreateTaxonomyTermsFromPosts'
import GetPosts from './utils/GetRecords.jsx'
import { useToolsPanelDropdownMenuProps } from './utils/hooks.js'
import { isControlAllowed, useAllowedControls, useOrderByOptions, usePostTypes, useTaxonomies, useTerms } from './utils/utils.js'

/**
 * Custom hook for managing sticky parameters
 * @param {string} sticky - Sticky value
 * @param {Function} setAttributes - Function to update block attributes
 */
function useStickyParams(sticky, setAttributes) {
	useEffect(() => {
		setAttributes({ stickyParams: sticky })
	}, [sticky])
}

/**
 * Custom hook for managing post type and taxonomies
 * @param {string} postType - Current post type
 * @param {Object} query - Current query
 * @returns {Object} Post type related data and options
 */
function usePostTypeData(postType, query, setQuery, setAttributes) {
	const { postTypeRestBaseMap, postTypeRestNamespaceMap, postTypesSelectOptions, postTypesTaxonomiesMap } = usePostTypes()

	// Get taxonomies for the current post type
	const taxonomies = useTaxonomies(postType)

	// Get terms for the taxonomies
	const { resolved: termsResolved, terms } = useTerms(taxonomies?.map((tax) => tax.slug) || [])

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

	// Handle post type change
	const onPostTypeChange = (newValue) => {
		const updateQueryObj = { postType: newValue }

		// Update taxonomies based on new post type
		const supportedTaxonomies = postTypesTaxonomiesMap[newValue]
		const updatedTaxQuery = Object.entries(query.taxQuery || {}).reduce((accumulator, [taxonomySlug, terms]) => {
			if (supportedTaxonomies.includes(taxonomySlug)) {
				accumulator[taxonomySlug] = terms
			}
			return accumulator
		}, {})
		updateQueryObj.taxQuery = Object.keys(updatedTaxQuery).length ? updatedTaxQuery : undefined

		// Reset sticky posts for non-post types
		if (newValue !== 'post') {
			updateQueryObj.sticky = ''
		}

		setQuery(updateQueryObj)
	}

	return {
		postTypeRestBaseMap,
		postTypeRestNamespaceMap,
		postTypesSelectOptions,
		postTypesTaxonomiesMap,
		taxonomies,
		termsResolved,
		terms,
		onPostTypeChange
	}
}

/**
 * Custom hook for managing posts and taxonomy terms
 * @param {Object} query - Current query
 * @param {Object} taxonomies - Current taxonomies
 * @param {Object} terms - Current terms
 * @param {boolean} termsResolved - Whether terms are resolved
 * @param {Function} setAttributes - Function to update block attributes
 * @returns {Object} Posts and resolved state
 */
function usePostsAndTerms(query, taxonomies, terms, termsResolved, setAttributes) {
	// Get posts based on current query
	const { posts, resolved: postsResolved } = GetPosts(query)

	// Build and update taxonomy terms from posts
	useEffect(() => {
		if (postsResolved && termsResolved && Object.keys(terms).length) {
			const taxonomyTermsFromPosts = buildTaxonomyTermsFromPosts(taxonomies, terms, posts)
			setAttributes({ filtersTerms: taxonomyTermsFromPosts })
		}
	}, [postsResolved, termsResolved, taxonomies])

	return { posts, postsResolved }
}

/**
 * Settings Panel Component
 * @param {Object} props - Component props
 * @returns {JSX.Element} Settings panel
 */
function SettingsPanel({ options, order, orderBy, postType, setQuery, showOrderControl, showPostTypeControl, showStickyControl, sticky }) {
	const { onPostTypeChange, orderByOptions, postTypesSelectOptions } = options
	const dropdownMenuProps = useToolsPanelDropdownMenuProps()

	return (
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
	)
}

/**
 * Display Panel Component
 * @param {Object} props - Component props
 * @returns {JSX.Element} Display panel
 */
function DisplayPanel({ offset, perPage, setQuery }) {
	const dropdownMenuProps = useToolsPanelDropdownMenuProps()

	return (
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
	)
}

/**
 * Filters Panel Component
 * @param {Object} props - Component props
 * @returns {JSX.Element} Filters panel
 */
function FiltersPanel({ query, setQuery, showAuthorControl, showSearchControl, showTaxControl }) {
	const dropdownMenuProps = useToolsPanelDropdownMenuProps()
	const {
		author: authorIds,
		search
		// taxQuery,
		// parents,
		// format
	} = query

	return (
		<ToolsPanel
			className="block-library-query-toolspanel__filters"
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
			{/* {showParentControl && <FormTokenParent defaultValue={parents} postType={query.postType} onChange={setQuery} />} */}
			{/* {showFormatControl && <FormTokenFormat defaultValue={format} onChange={setQuery} />} */}
		</ToolsPanel>
	)
}

/**
 * Confirm Button Component
 * @param {Object} props - Component props
 * @returns {JSX.Element} Confirm button
 */
function ConfirmButton({ isBusy, isConfirmed, isDisabled, isWizard, noResults, onConfirm }) {
	return (
		<div className="mappps-query-confirm-container" style={{ marginTop: '16px', marginBottom: '16px', textAlign: 'center' }}>
			{noResults && isConfirmed && (
				<Notice isDismissible={false} status="error">
					<p>{__('No results found. Please check the query settings and the lat/lng fields inside the post/record itself.', 'mappps')}</p>
				</Notice>
			)}
			{!isWizard && (
				<Notice isDismissible={false} status="info">
					<p>{__('If your post/record is not displayed, please check the query settings and the lat/lng fields inside the post/record itself.', 'mappps')}</p>
				</Notice>
			)}

			<Button disabled={isDisabled} isBusy={isBusy} variant="primary" onClick={onConfirm}>
				{isConfirmed ? __('Query settings applied', 'mappps') : __('Apply query settings', 'mappps')}
			</Button>
		</div>
	)
}

/**
 * Main ControlQuery Component
 * @param {Object} props - Component props
 * @returns {JSX.Element} ControlQuery component
 */
function ControlQuery({ attributes, isConfirmed, isWizard, setAttributes, setIsConfirmed, setQueriedPosts }) {
	// Initialize query state with default values
	const [query, setQueryState] = useState(attributes.query)
	const [noResults, setNoResults] = useState(false)

	// Destructure query parameters for easier access
	const {
		// author: authorIds,
		inherit,
		offset,
		order,
		orderBy,
		perPage,
		postType,
		// search,
		sticky
		// taxQuery
	} = query

	const setQuery = (newQuery) => {
		setQueryState((prevQuery) => ({
			...prevQuery,
			...newQuery
		}))
		// Reset confirmation when query changes
		setIsConfirmed(false)
	}

	// Update block attributes when query changes
	useEffect(() => {
		setAttributes({ query: query })
	}, [query])

	// Handle sticky parameters
	useStickyParams(query.sticky, setAttributes)

	// Get post type related data and options
	const {
		// postTypeRestBaseMap,
		// postTypeRestNamespaceMap,
		onPostTypeChange,
		// postTypesTaxonomiesMap,
		postTypesSelectOptions,
		taxonomies,
		terms,
		termsResolved
	} = usePostTypeData(postType, query, setQuery, setAttributes)

	// Get posts and terms
	const { posts, postsResolved } = usePostsAndTerms(query, taxonomies, terms, termsResolved, setAttributes)

	// Update selected posts and queried posts only when confirmed
	useEffect(() => {
		if (isConfirmed && postsResolved) {
			setAttributes({ selectedPosts: posts.map((post) => post.id) })
			setQueriedPosts(posts)
		}

		if (postsResolved && isConfirmed) {
			setNoResults(posts.length === 0)
		}
	}, [postsResolved, isConfirmed])

	// Handle confirm button click
	const handleConfirmClick = useCallback(() => {
		setIsConfirmed(true)
	}, [setIsConfirmed])

	// Get allowed controls based on block attributes
	const allowedControls = useAllowedControls(attributes)

	// Determine which controls to show
	const showSticky = postType === 'post'
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
	const showPostCountControl = isControlAllowed(allowedControls, 'postCount')
	// const showOffSetControl = isControlAllowed(allowedControls, 'offset')
	// const showPagesControl = isControlAllowed(allowedControls, 'pages')
	const showDisplayPanel = showPostCountControl

	// Prepare options for panel components
	const panelOptions = {
		postTypesSelectOptions,
		orderByOptions,
		onPostTypeChange
	}

	return (
		<>
			{showSettingsPanel && <SettingsPanel options={panelOptions} order={order} orderBy={orderBy} postType={postType} setQuery={setQuery} showOrderControl={showOrderControl} showPostTypeControl={showPostTypeControl} showStickyControl={showStickyControl} sticky={sticky} />}

			{!inherit && !isWizard && showDisplayPanel && <DisplayPanel offset={offset} perPage={perPage} setQuery={setQuery} />}

			{!inherit && !isWizard && showFiltersPanel && <FiltersPanel query={query} setQuery={setQuery} showAuthorControl={showAuthorControl} showFormatControl={false} showParentControl={false} showSearchControl={showSearchControl} showTaxControl={showTaxControl} />}

			<ConfirmButton isBusy={postsResolved === false} isConfirmed={isConfirmed} isWizard={isWizard} noResults={noResults} onConfirm={handleConfirmClick} />
		</>
	)
}

export default memo(ControlQuery)
