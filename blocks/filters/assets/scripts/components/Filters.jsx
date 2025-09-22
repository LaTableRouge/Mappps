import { __ } from '@wordpress/i18n'

import FilterPosts from '../utils/FilterPosts'
import GetFilterCount from '../utils/GetFiltersCount'

export default function Filters({ filtersOpen, posts, queriedPosts, searchValue, setFilters, setFiltersCount, setFiltersOpen, setPosts, tempFilters }) {
	const handleTaxonomyChange = (e, taxonomy) => {
		const updatedFilters = { ...tempFilters }
		const isChecked = e.checked

		updatedFilters[taxonomy].terms = updatedFilters[taxonomy].terms.map((category) => ({
			...category,
			checked: isChecked
		}))

		updateFilters(updatedFilters)
	}

	const handleCategoryChange = (e, taxonomy, categoryId) => {
		const updatedFilters = { ...tempFilters }
		const categoryIndex = updatedFilters[taxonomy].terms.findIndex((category) => category.id === Number(categoryId))

		if (categoryIndex !== -1) {
			updatedFilters[taxonomy].terms[categoryIndex].checked = e.checked
			updateFilters(updatedFilters)
		}
	}

	const updateFilters = (filters) => {
		setFilters(filters)
		setPosts(FilterPosts(posts, filters, searchValue))
		setFiltersCount(GetFilterCount(filters))
	}

	const handleReset = () => {
		const resetFilters = Object.entries(tempFilters).reduce((acc, [key, taxonomy]) => {
			acc[key] = {
				...taxonomy,
				checked: false,
				categories: taxonomy.terms.map((category) => ({
					...category,
					checked: false
				}))
			}
			return acc
		}, {})

		setFilters(resetFilters)
		setFiltersCount(0)
		setPosts(FilterPosts(queriedPosts, resetFilters, searchValue))
	}

	const handleClose = (e) => {
		e.preventDefault()
		setFiltersOpen(false)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		setFiltersOpen(false)
	}

	if (!Object.keys(tempFilters).length) {
		return null
	}

	const isTaxonomyChecked = (taxonomy) => {
		return taxonomy.terms.every((category) => category.checked)
	}

	// Check if there's only one taxonomy
	const taxonomyCount = Object.keys(tempFilters).length
	const hasOnlyOneTaxonomy = taxonomyCount === 1

	return (
		<form className="filters-form" data-open={filtersOpen} onReset={handleReset} onSubmit={handleSubmit}>
			<div className="filters-form__header">
				<div className="header__title">{__('Filters', 'mappps')}</div>
				<button
					aria-label={__('Close filters', 'mappps')}
					className="custom-button custom-button__only-icon header__close"
					title={__('Close filters', 'mappps')}
					type="button"
					onClick={handleClose}
				>
					<span className="icon-mappps-cross" />
					<span className="screen-reader-text">{__('Close filters', 'mappps')}</span>
				</button>
			</div>

			<ul className="filters-form__list">
				{Object.entries(tempFilters).map(([taxonomy, data], index) => (
					<li key={index} className="list__element">
						{/* Only show taxonomy checkbox if there's more than one taxonomy */}
						{!hasOnlyOneTaxonomy ? (
							<label htmlFor={taxonomy}>
								<input checked={isTaxonomyChecked(data)} id={taxonomy} name={taxonomy} type="checkbox" onChange={(e) => handleTaxonomyChange(e.target, taxonomy)} />
								<span>{data.name}</span>
							</label>
						) : (
							<div>
								<span>{data.name}</span>
							</div>
						)}

						<ul className="list__sublist">
							{data.terms.map((category, catIndex) => (
								<li key={catIndex} className="list__element">
									<label htmlFor={`${taxonomy}---${category.id}`}>
										<input
											checked={category.checked ?? false}
											id={`${taxonomy}---${category.id}`}
											name={`${taxonomy}---${category.id}`}
											type="checkbox"
											onChange={(e) => handleCategoryChange(e.target, taxonomy, category.id)}
										/>
										<span>{category.name}</span>
									</label>
								</li>
							))}
						</ul>
					</li>
				))}
			</ul>

			<div className="filters-form__footer">
				<button aria-label={__('Reset', 'mappps')} className="custom-button footer__reset" title={__('Reset', 'mappps')} type="reset">
					{__('Reset', 'mappps')}
				</button>

				<button aria-label={__('Filter', 'mappps')} className="custom-button footer__submit" title={__('Filter', 'mappps')} type="submit">
					{__('Filter', 'mappps')}
				</button>
			</div>
		</form>
	)
}
