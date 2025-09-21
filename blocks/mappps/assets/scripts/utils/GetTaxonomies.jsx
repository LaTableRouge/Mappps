import { useSelect } from '@wordpress/data'

// Get all the taxonomies by post types
export default function GetTaxonomies(postType = '') {
	let fetchedTaxonomies = useSelect(
		(select) => {
			const { getTaxonomies } = select('core')
			return getTaxonomies({ type: postType })
		},
		[postType]
	)

	let resolved = false

	if (fetchedTaxonomies !== null) {
		resolved = true
	}

	if (fetchedTaxonomies && fetchedTaxonomies.length) {
		fetchedTaxonomies = fetchedTaxonomies.map(({ name, rest_base, slug }) => ({ slug, name, rest_base }))
	}

	return { taxonomies: fetchedTaxonomies, resolved }
}
