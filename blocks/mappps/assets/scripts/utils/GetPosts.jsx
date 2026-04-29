import { useSelect } from '@wordpress/data'

// Get posts/records by Post Types, Taxonomies & Categories
export default function GetPosts(postType = '', taxonomies = [], categories = []) {
	let hasGlobResolved = false

	const { globRecords, resolvedCounter } = useSelect(
		(select) => {
			const { getEntityRecords, hasFinishedResolution } = select('core')
			const records = []
			let currentResolvedCounter = 0

			taxonomies.forEach((taxonomy) => {
				const args = {
					per_page: -1,
					status: 'publish',
					tax_relation: 'OR',
					_embed: ''
				}
				args[taxonomy] = categories

				const taxonomyRecords = getEntityRecords('postType', postType, args)
				const taxonomyResolved = hasFinishedResolution('getEntityRecords', ['postType', postType, args])

				if (taxonomyResolved) {
					currentResolvedCounter++

					if (taxonomyRecords && taxonomyRecords.length) {
						records.push(...taxonomyRecords)
					}
				}
			})

			return { globRecords: records, resolvedCounter: currentResolvedCounter }
		},
		[postType, categories, taxonomies]
	)

	if (taxonomies.length === resolvedCounter) {
		hasGlobResolved = true
	}

	let filteredGlobRecords = []
	if (globRecords && globRecords.length) {
		// Put ACF/SCF coordinates fields and mappps_lat/mappps_lng meta fields in the corresponding meta fields.
		filteredGlobRecords = globRecords.map((record) => {
			// Ensure meta object exists.
			const normalizedMeta = record.meta ? { ...record.meta } : {}

			// Use mappps_lat/mappps_lng meta fields if lat/lng are not available.
			if ((!normalizedMeta.lat || !normalizedMeta.lng) && normalizedMeta.mappps_lat && normalizedMeta.mappps_lng) {
				normalizedMeta.lat = Number(normalizedMeta.mappps_lat)
				normalizedMeta.lng = Number(normalizedMeta.mappps_lng)
			}

			// Handle ACF/SCF coordinates fields.
			if ('acf' in record && record.acf?.mappps_lat && record.acf?.mappps_lng) {
				normalizedMeta.lat = Number(record.acf.mappps_lat)
				normalizedMeta.lng = Number(record.acf.mappps_lng)
			}

			return {
				...record,
				meta: normalizedMeta
			}
		})

		filteredGlobRecords = filteredGlobRecords.filter((record) => !!record.meta.lat && !!record.meta.lng)
	}

	return {
		resolved: hasGlobResolved,
		posts: [...new Set(filteredGlobRecords)] // remove duplicates
	}
}
