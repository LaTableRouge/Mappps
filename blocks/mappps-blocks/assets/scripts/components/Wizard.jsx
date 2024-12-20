import { Placeholder, Spinner } from '@wordpress/components'
import { memo, useMemo } from '@wordpress/element'
import { __ } from '@wordpress/i18n'

import SelectCategories from './controls/SelectCategories'
import SelectPosts from './controls/SelectPosts'
import SelectPostType from './controls/SelectPostType'
import SelectTaxonomies from './controls/SelectTaxonomies'

function Wizard({ attributes, postTypes, setAttributes, setQueriedPosts }) {
  if (!postTypes.resolved) {
    return <Spinner />
  }

  if (!postTypes.types.length) {
    return __('No post types could be recovered.', 'mappps')
  }

  const { postType: selectedPostType, selectedCategories, selectedTaxonomies, taxonomies } = attributes

  const sanitizedSelectedTaxonomies = useMemo(() => {
    if (!selectedTaxonomies.length || !taxonomies.length) return []

    return selectedTaxonomies
      .map((slug) => {
        const foundTaxonomy = taxonomies.find((o) => o.slug === slug)
        return foundTaxonomy?.rest_base
      })
      .filter(Boolean)
  }, [selectedTaxonomies, taxonomies])

  return (
    <Placeholder instructions={__('Select the data source of the items to be displayed on the map.', 'mappps')} label={__('Data source', 'mappps')}>
      <SelectPostType postTypes={postTypes} setAttributes={setAttributes} setQueriedPosts={setQueriedPosts} />

      {selectedPostType && <SelectTaxonomies postType={selectedPostType} setAttributes={setAttributes} setQueriedPosts={setQueriedPosts} />}

      {selectedTaxonomies.length > 0 && <SelectCategories setAttributes={setAttributes} setQueriedPosts={setQueriedPosts} taxonomies={selectedTaxonomies} />}

      {selectedCategories.length > 0 && (
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
  )
}

export default memo(Wizard)
