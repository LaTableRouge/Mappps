import { InspectorControls } from '@wordpress/block-editor'
import { PanelBody } from '@wordpress/components'
import { memo, useMemo } from '@wordpress/element'
import { __ } from '@wordpress/i18n'

import ColorMap from './controls/ColorMap'
import SelectCategories from './controls/SelectCategories'
import SelectPosts from './controls/SelectPosts'
import SelectPostType from './controls/SelectPostType'
import SelectTaxonomies from './controls/SelectTaxonomies'
import ToggleStickyFirst from './controls/ToggleStickyFirst'

function Controls({ attributes, postTypes, setAttributes, setQueriedPosts }) {
  if (!postTypes.resolved) {
    return false
  }

  const {
    displaySearch,
    isClustered,
    limitedSearch,
    postType: selectedPostType,
    putStickyFirst,
    selectedCategories,
    selectedPosts,
    selectedPrimaryColor,
    selectedSecondaryColor,
    selectedTaxonomies,
    taxonomies
  } = attributes

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
    <InspectorControls>
      <PanelBody initialOpen title={__('Data source', 'mappps')}>
        <SelectPostType defaultValue={selectedPostType} postTypes={postTypes} setAttributes={setAttributes} setQueriedPosts={setQueriedPosts} />

        {selectedPostType && <SelectTaxonomies defaultValue={selectedTaxonomies} postType={selectedPostType} setAttributes={setAttributes} setQueriedPosts={setQueriedPosts} />}

        {selectedTaxonomies.length > 0 && (
          <SelectCategories defaultValue={selectedCategories} setAttributes={setAttributes} setQueriedPosts={setQueriedPosts} taxonomies={selectedTaxonomies} />
        )}

        {selectedCategories.length > 0 && (
          <SelectPosts
            categories={selectedCategories}
            defaultValue={selectedPosts}
            postType={selectedPostType}
            setAttributes={setAttributes}
            setQueriedPosts={setQueriedPosts}
            taxonomies={sanitizedSelectedTaxonomies}
          />
        )}
        {selectedPosts.length > 0 && <ToggleStickyFirst defaultValue={putStickyFirst} setAttributes={setAttributes} />}
      </PanelBody>

      {selectedPosts.length > 0 && (
        <ColorMap
          defaultValues={{
            primary: selectedPrimaryColor,
            secondary: selectedSecondaryColor
          }}
          hasSearchColor={displaySearch && !limitedSearch}
          isClustered={isClustered}
          setAttributes={setAttributes}
        />
      )}
    </InspectorControls>
  )
}

export default memo(Controls)
