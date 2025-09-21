import { useDebounce } from '@wordpress/compose'
import { store as coreStore } from '@wordpress/core-data'
import { useSelect } from '@wordpress/data'
import { useEffect, useMemo, useState } from '@wordpress/element'
import { __ } from '@wordpress/i18n'

import { getEntitiesInfo, mapToIHasNameAndId } from '../utils/utils'

const EMPTY_ARRAY = []
const BASE_QUERY = {
	order: 'asc',
	_fields: 'id,title',
	context: 'view'
}

export default function FormTokenParent({ defaultValue, onChange, postType }) {
	const [search, setSearch] = useState('')
	const [value, setValue] = useState(EMPTY_ARRAY)
	const [suggestions, setSuggestions] = useState(EMPTY_ARRAY)
	const debouncedSearch = useDebounce(setSearch, 250)
	const { searchHasResolved, searchResults } = useSelect(
		(select) => {
			if (!search) {
				return { searchResults: EMPTY_ARRAY, searchHasResolved: true }
			}
			const { getEntityRecords, hasFinishedResolution } = select(coreStore)
			const selectorArgs = [
				'postType',
				postType,
				{
					...BASE_QUERY,
					search,
					orderby: 'relevance',
					exclude: defaultValue,
					per_page: 20
				}
			]
			return {
				searchResults: getEntityRecords(...selectorArgs),
				searchHasResolved: hasFinishedResolution('getEntityRecords', selectorArgs)
			}
		},
		[search, postType, defaultValue]
	)
	const currentParents = useSelect(
		(select) => {
			if (!defaultValue?.length) {
				return EMPTY_ARRAY
			}
			const { getEntityRecords } = select(coreStore)
			return getEntityRecords('postType', postType, {
				...BASE_QUERY,
				include: defaultValue,
				per_page: defaultValue.length
			})
		},
		[defaultValue, postType]
	)
	// Update the `value` state only after the selectors are resolved
	// to avoid emptying the input when we're changing parents.
	useEffect(() => {
		if (!defaultValue?.length) {
			setValue(EMPTY_ARRAY)
		}
		if (!currentParents?.length) {
			return
		}
		const currentParentsInfo = getEntitiesInfo(mapToIHasNameAndId(currentParents, 'title.rendered'))
		// Returns only the existing entity ids. This prevents the component
		// from crashing in the editor, when non existing ids are provided.
		const sanitizedValue = defaultValue.reduce((accumulator, id) => {
			const entity = currentParentsInfo.mapById[id]
			if (entity) {
				accumulator.push({
					id,
					value: entity.name
				})
			}
			return accumulator
		}, [])
		setValue(sanitizedValue)
	}, [defaultValue, currentParents])

	const entitiesInfo = useMemo(() => {
		if (!searchResults?.length) {
			return EMPTY_ARRAY
		}
		return getEntitiesInfo(mapToIHasNameAndId(searchResults, 'title.rendered'))
	}, [searchResults])
	// Update suggestions only when the query has resolved.
	useEffect(() => {
		if (!searchHasResolved) {
			return
		}
		setSuggestions(entitiesInfo.names)
	}, [entitiesInfo.names, searchHasResolved])

	const getIdByValue = (entitiesMappedByName, entity) => {
		const id = entity?.id || entitiesMappedByName?.[entity]?.id
		if (id) {
			return id
		}
	}
	const onParentChange = (newValue) => {
		const ids = Array.from(
			newValue.reduce((accumulator, entity) => {
				// Verify that new values point to existing entities.
				const id = getIdByValue(entitiesInfo.mapByName, entity)
				if (id) {
					accumulator.add(id)
				}
				return accumulator
			}, new Set())
		)
		setSuggestions(EMPTY_ARRAY)
		onChange({ parents: ids })
	}
	return (
		<ToolsPanelItem hasValue={() => !!defaultValue?.length} label={__('Parents', 'mappps')} onDeselect={() => onChange({ parents: [] })}>
			<FormTokenField __next40pxDefaultSize __nextHasNoMarginBottom __experimentalShowHowTo={false} label={__('Parents', 'mappps')} suggestions={suggestions} value={value} onChange={onParentChange} onInputChange={debouncedSearch} />
		</ToolsPanelItem>
	)
}
