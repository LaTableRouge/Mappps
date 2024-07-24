import { InspectorControls } from '@wordpress/block-editor'
import { PanelBody } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

import ColorMap from './controls/ColorMap'
import SelectCategories from './controls/SelectCategories'
import SelectPosts from './controls/SelectPosts'
import SelectPostType from './controls/SelectPostType'
import SelectTaxonomies from './controls/SelectTaxonomies'

export default function Controls({ attributes, postTypes, setAttributes, setQueriedPosts }) {
  const selectedPostType = attributes.postType
  const selectedPosts = attributes.selectedPosts
  const selectedTaxonomies = attributes.selectedTaxonomies
  const taxonomies = attributes.taxonomies
  const selectedCategories = attributes.selectedCategories
  const isClustered = attributes.isClustered
  const selectedPrimaryColor = attributes.selectedPrimaryColor
  const selectedSecondaryColor = attributes.selectedSecondaryColor
  const displaySearch = attributes.displaySearch
  const limitedSearch = attributes.limitedSearch

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

  if (!postTypes.resolved) {
    return false
  }

  return (
    <InspectorControls>
      <PanelBody initialOpen={true} title={__('Data settings', 'maaaps')}>
        {!!postTypes.types.length && <SelectPostType defaultValue={selectedPostType} postTypes={postTypes} setAttributes={setAttributes} />}
        {!!selectedPostType && <SelectTaxonomies defaultValue={selectedTaxonomies} postType={selectedPostType} setAttributes={setAttributes} />}
        {!!selectedTaxonomies.length && <SelectCategories defaultValue={selectedCategories} setAttributes={setAttributes} taxonomies={selectedTaxonomies} />}
        {!!selectedCategories.length && (
          <SelectPosts
            categories={selectedCategories}
            defaultValue={selectedPosts}
            postType={selectedPostType}
            setAttributes={setAttributes}
            taxonomies={sanitizedSelectedTaxonomies}
          />
        )}
      </PanelBody>

      {!!selectedPosts.length && (
        <>
          <ColorMap
            defaultValues={{
              primary: selectedPrimaryColor,
              secondary: selectedSecondaryColor
            }}
            hasSearchColor={displaySearch && !limitedSearch}
            isClustered={isClustered}
            setAttributes={setAttributes}
          />
        </>
      )}
    </InspectorControls>
  )
}
