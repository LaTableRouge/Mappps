import { InspectorControls } from '@wordpress/block-editor'
import { PanelBody } from '@wordpress/components'

import GetPostTypes from '../utils/GetPostTypes'
import SelectCategories from './controls/SelectCategories'
import SelectPosts from './controls/SelectPosts'
import SelectPostType from './controls/SelectPostType'
import SelectTaxonomies from './controls/SelectTaxonomies'

export default function Controls(props) {
  const { setAttributes, attributes } = props

  const postTypes = GetPostTypes()
  const selectedPostType = attributes.postType
  const selectedPosts = attributes.posts
  const selectedTaxonomies = attributes.selectedTaxonomies
  const selectedCategories = attributes.selectedCategories

  return (
    <InspectorControls>
      <PanelBody>
        {!!postTypes.length && <SelectPostType postTypes={postTypes} defaultValue={selectedPostType} setAttributes={setAttributes} />}
        {!!selectedPostType && <SelectTaxonomies setAttributes={setAttributes} postType={selectedPostType} defaultValue={selectedTaxonomies} />}
        {!!selectedTaxonomies.length && <SelectCategories setAttributes={setAttributes} taxonomies={selectedTaxonomies} defaultValue={selectedCategories} />}
        {!!selectedCategories.length && (
          <SelectPosts setAttributes={setAttributes} postType={selectedPostType} taxonomies={selectedTaxonomies} categories={selectedCategories} defaultValue={selectedPosts} />
        )}
      </PanelBody>
    </InspectorControls>
  )
}
