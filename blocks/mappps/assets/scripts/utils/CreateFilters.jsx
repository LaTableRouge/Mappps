export default function CreateFilters(categories, taxonomies, posts) {
	const filtersObject = {}

	if (taxonomies.length && Object.keys(categories).length && posts.length) {
		taxonomies.forEach(({ name, rest_base, slug }) => {
			const associatedCategories = categories[slug]

			posts.forEach((post) => {
				const postAssociatedCategories = post[rest_base]
				if (postAssociatedCategories.length && associatedCategories && associatedCategories.length) {
					associatedCategories.forEach((category) => {
						if (postAssociatedCategories.includes(category.id)) {
							if (!filtersObject[rest_base]) {
								filtersObject[rest_base] = {
									name,
									slug
								}
							}

							if (!filtersObject[rest_base].categories) {
								filtersObject[rest_base].categories = []
							}

							if (!filtersObject[rest_base].categories.includes(category)) {
								filtersObject[rest_base].categories.push(category)
							}
						}
					})
				}
			})
		})
	}

	return filtersObject
}
