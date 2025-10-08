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
				// Put ACF/SCF coordinates fields in the corresponding meta fields
				filteredRecords = records.map((record) => {
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
