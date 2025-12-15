import { useEntityRecords } from '@wordpress/core-data'

// Get posts/records by Post Types, Taxonomies & Categories
export default function GetPosts(postType = '', taxonomies = [], categories = []) {
	let hasGlobResolved = false
	let resolvedCounter = 0
	const globRecords = []

	taxonomies.forEach((taxonomy) => {
		const args = {
			per_page: -1,
			status: 'publish',
			tax_relation: 'OR',
			_embed: ''
		}
		args[taxonomy] = categories

		const { hasResolved, records } = useEntityRecords('postType', postType, args)
		if (hasResolved) {
			resolvedCounter++
			let filteredRecords = []
			if (records.length) {
				// Put ACF/SCF coordinates fields and mappps_lat/mappps_lng meta fields in the corresponding meta fields
				filteredRecords = records.map((record) => {
					// Ensure meta object exists
					if (!record.meta) {
						record.meta = {}
					}

					// Use mappps_lat/mappps_lng meta fields if lat/lng are not available
					if ((!record.meta.lat || !record.meta.lng) && record.meta.mappps_lat && record.meta.mappps_lng) {
						record.meta.lat = Number(record.meta.mappps_lat)
						record.meta.lng = Number(record.meta.mappps_lng)
					}

					// Handle ACF/SCF coordinates fields
					if ('acf' in record) {
						if (!!record.acf.mappps_lat && !!record.acf.mappps_lng) {
							record.meta.lat = Number(record.acf.mappps_lat)
							record.meta.lng = Number(record.acf.mappps_lng)
						}
					}

					return record
				})

				filteredRecords = filteredRecords.filter((record) => !!record.meta.lat && !!record.meta.lng)
			}
			globRecords.push(...filteredRecords)
		}

		if (taxonomies.length === resolvedCounter) {
			hasGlobResolved = true
		}
	})

	return {
		resolved: hasGlobResolved,
		posts: [...new Set(globRecords)] // remove duplicates
	}
}
