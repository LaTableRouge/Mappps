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

import { __experimentalToolsPanel as ToolsPanel, Button, Notice } from '@wordpress/components'
import { memo, useCallback, useEffect, useState } from '@wordpress/element'
import { __ } from '@wordpress/i18n'

// import FormTokenAuthor from './controls/FormTokenAuthor'
import { FormTokenTaxonomy } from './controls/FormTokenTaxonomy'
import RangePerPage from './controls/RangePerPage'
import SelectOrder from './controls/SelectOrder'
import SelectPostType from './controls/SelectPostType'
import SelectSticky from './controls/SelectSticky'
import TextKeyword from './controls/TextKeyword'
import GetPosts from './utils/GetRecords.jsx'
import { useToolsPanelDropdownMenuProps } from './utils/hooks.js'
import { isControlAllowed, useAllowedControls, useOrderByOptions, usePostTypes, useTaxonomies, useTerms } from './utils/utils.js'

function useQueryParams(paramName, paramValue, setAttributes) {
	useEffect(() => {
		setAttributes({ [paramName]: paramValue })
	}, [paramValue])
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
	// Only update when taxonomies or terms change, not when posts change
	useEffect(() => {
		if (termsResolved && Object.keys(terms).length && taxonomies?.length) {
			// Build filter terms based on all available terms, not just current search results
			// This ensures filtersTerms remain stable during searches
			const allTerms = {}
			taxonomies.forEach(({ name, rest_base: restBase, slug }) => {
				const associatedTerms = terms[slug]
				if (associatedTerms?.length > 1) {
					allTerms[restBase] = {
						name,
						slug,
						terms: associatedTerms
					}
				}
			})
			setAttributes({ filtersTerms: allTerms })
		}
	}, [termsResolved, taxonomies])

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
		</ToolsPanel>
	)
}

/**
 * Filters Panel Component
 * @param {Object} props - Component props
 * @returns {JSX.Element} Filters panel
 */
function FiltersPanel({ query, setQuery, showSearchControl, showTaxControl }) {
	const dropdownMenuProps = useToolsPanelDropdownMenuProps()
	const { search } = query

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
			{showSearchControl && <TextKeyword defaultValue={search} setQuery={setQuery} />}
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
	const { inherit, offset, order, orderBy, perPage, postType, sticky } = query

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

	// Handle sticky, order, and orderBy parameters
	useQueryParams('stickyParams', query.sticky, setAttributes)
	useQueryParams('orderParams', query.order, setAttributes)
	useQueryParams('orderByParams', query.orderBy, setAttributes)

	// Get post type related data and options
	const { onPostTypeChange, postTypesSelectOptions, taxonomies, terms, termsResolved } = usePostTypeData(postType, query, setQuery, setAttributes)

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
	const showSearchControl = isControlAllowed(allowedControls, 'search')
	const showFiltersPanel = showTaxControl || showSearchControl
	const showPostCountControl = isControlAllowed(allowedControls, 'postCount')
	const showDisplayPanel = showPostCountControl

	// Prepare options for panel components
	const panelOptions = {
		postTypesSelectOptions,
		orderByOptions,
		onPostTypeChange
	}

	return (
		<>
			{showSettingsPanel && (
				<SettingsPanel
					options={panelOptions}
					order={order}
					orderBy={orderBy}
					postType={postType}
					setQuery={setQuery}
					showOrderControl={showOrderControl}
					showPostTypeControl={showPostTypeControl}
					showStickyControl={showStickyControl}
					sticky={sticky}
				/>
			)}

			{!inherit && showDisplayPanel && <DisplayPanel offset={offset} perPage={perPage} setQuery={setQuery} />}

			{!inherit && showFiltersPanel && (
				<FiltersPanel query={query} setQuery={setQuery} showFormatControl={false} showParentControl={false} showSearchControl={showSearchControl} showTaxControl={showTaxControl} />
			)}

			<ConfirmButton isBusy={postsResolved === false} isConfirmed={isConfirmed} isWizard={isWizard} noResults={noResults} onConfirm={handleConfirmClick} />
		</>
	)
}

export default memo(ControlQuery)
