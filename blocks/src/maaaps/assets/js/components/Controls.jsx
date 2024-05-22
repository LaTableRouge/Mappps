import { InspectorControls } from '@wordpress/block-editor'
import { PanelBody } from '@wordpress/components'

import GetPostTypes from '../utils/GetPostTypes'
import SelectPostType from './controls/SelectPostType'
import SelectTaxonomy from './controls/SelectTaxonomy'

export default function Controls(props) {
  const { setAttributes, attributes, allTaxonomies } = props

  const postTypes = GetPostTypes()

  return (
    <InspectorControls>
      <PanelBody>
        {!!postTypes.length && <SelectPostType postTypes={postTypes} setAttributes={setAttributes} />}
        {!!attributes.taxonomies.length && <SelectTaxonomy allTaxonomies={allTaxonomies} taxonomies={attributes.taxonomies} setAttributes={setAttributes} />}
      </PanelBody>
    </InspectorControls>
  )
}
