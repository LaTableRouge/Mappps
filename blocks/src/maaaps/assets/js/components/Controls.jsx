import { InspectorControls } from '@wordpress/block-editor'
import { PanelBody } from '@wordpress/components'

import GetPostTypes from '../utils/GetPostTypes'
import SelectCategories from './controls/SelectCategories'
import SelectPostType from './controls/SelectPostType'
import SelectTaxonomies from './controls/SelectTaxonomies'

export default function Controls(props) {
  const { setAttributes, attributes } = props

  const postTypes = GetPostTypes()
  const selectedPostType = attributes.postType

  return (
    <InspectorControls>
      <PanelBody>
        {!!postTypes.length && <SelectPostType postTypes={postTypes} defaultValue={selectedPostType} setAttributes={setAttributes} />}
        <SelectTaxonomies setAttributes={setAttributes} attributes={attributes} />
        <SelectCategories setAttributes={setAttributes} attributes={attributes} />
      </PanelBody>
    </InspectorControls>
  )
}
