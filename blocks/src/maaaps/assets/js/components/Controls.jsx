import { InspectorControls } from '@wordpress/block-editor'
import { PanelBody } from '@wordpress/components'

import GetPostTypes from '../utils/GetPostTypes'
import SelectCategories from './controls/SelectCategories'
import SelectPosts from './controls/SelectPosts'
import SelectPostType from './controls/SelectPostType'
import SelectTaxonomies from './controls/SelectTaxonomies'
import SelectTiles from './controls/SelectTiles'

export default function Controls(props) {
  const { setAttributes, attributes } = props

  const postTypes = GetPostTypes()
  const selectedPostType = attributes.postType
  const selectedPosts = attributes.posts
  const selectedTaxonomies = attributes.selectedTaxonomies
  const taxonomies = attributes.taxonomies
  const selectedCategories = attributes.selectedCategories
  const mapTiles = attributes.mapTiles
  const selectedMapTiles = attributes.selectedMapTiles

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
    <InspectorControls>
      <PanelBody>
        {!!postTypes.length && <SelectPostType postTypes={postTypes} defaultValue={selectedPostType} setAttributes={setAttributes} />}
        {!!selectedPostType && <SelectTaxonomies setAttributes={setAttributes} postType={selectedPostType} defaultValue={selectedTaxonomies} />}
        {!!selectedTaxonomies.length && <SelectCategories setAttributes={setAttributes} taxonomies={selectedTaxonomies} defaultValue={selectedCategories} />}
        {!!selectedCategories.length && (
          <SelectPosts
            setAttributes={setAttributes}
            postType={selectedPostType}
            taxonomies={sanitizedSelectedTaxonomies}
            categories={selectedCategories}
            defaultValue={selectedPosts}
          />
        )}
        {!!selectedPosts.length && <SelectTiles setAttributes={setAttributes} options={mapTiles} defaultValue={selectedMapTiles} />}
      </PanelBody>
    </InspectorControls>
  )
}
