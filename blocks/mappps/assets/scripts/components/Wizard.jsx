import { Placeholder, Spinner } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

import SelectCategories from './controls/SelectCategories'
import SelectPosts from './controls/SelectPosts'
import SelectPostType from './controls/SelectPostType'
import SelectTaxonomies from './controls/SelectTaxonomies'

export default function Wizard({ attributes, postTypes, setAttributes, setQueriedPosts }) {
	const selectedPostType = attributes.postType
	const selectedTaxonomies = attributes.selectedTaxonomies
	const taxonomies = attributes.taxonomies
	const selectedCategories = attributes.selectedCategories

	// Convert taxonomy slug into rest_base
	const sanitizedSelectedTaxonomies = []
	if (selectedTaxonomies.length && taxonomies.length) {
		selectedTaxonomies.forEach((slug) => {
			const foundTaxonomy = taxonomies.find((o) => o.slug === slug)
			if (foundTaxonomy) {
				sanitizedSelectedTaxonomies.push(foundTaxonomy.rest_base)
			}
		})
	}

	return (
		<>
			{postTypes.resolved ? (
				postTypes.types.length ? (
					<Placeholder
						className="mappps__wizard"
						instructions={__('Select the data source of the items to be displayed on the map.', 'mappps')}
						label={__('Data source', 'mappps')}
					>
						<SelectPostType postTypes={postTypes} setAttributes={setAttributes} setQueriedPosts={setQueriedPosts} />

						{!!selectedPostType && <SelectTaxonomies postType={selectedPostType} setAttributes={setAttributes} setQueriedPosts={setQueriedPosts} />}

						{!!selectedTaxonomies.length && <SelectCategories setAttributes={setAttributes} setQueriedPosts={setQueriedPosts} taxonomies={selectedTaxonomies} />}

						{!!selectedCategories.length && (
							<SelectPosts
								categories={selectedCategories}
								defaultValue={[]}
								postType={selectedPostType}
								setAttributes={setAttributes}
								setQueriedPosts={setQueriedPosts}
								taxonomies={sanitizedSelectedTaxonomies}
							/>
						)}
					</Placeholder>
				) : (
					__('No post types could be recovered.', 'mappps')
				)
			) : (
				<Spinner />
			)}
		</>
	)
}
