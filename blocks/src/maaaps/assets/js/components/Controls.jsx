import { InspectorControls } from '@wordpress/block-editor'
import { PanelBody } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

import GetPostTypes from '../utils/GetPostTypes'
import ColorMap from './controls/ColorMap'
import SelectCategories from './controls/SelectCategories'
import SelectPosts from './controls/SelectPosts'
import SelectPostType from './controls/SelectPostType'
import SelectTaxonomies from './controls/SelectTaxonomies'
import SelectTiles from './controls/SelectTiles'
import ToggleGeolocation from './controls/ToggleGeolocation'
import ToggleMarkerCluster from './controls/ToggleMarkerCluster'

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
  const isClustered = attributes.isClustered
  const isGeolocated = attributes.isGeolocated
  const selectedMarkerColor = attributes.selectedMarkerColor
  const selectedClusterColor = attributes.selectedClusterColor

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
      <PanelBody title={__('Data settings', 'maaaps')} initialOpen={true}>
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
      </PanelBody>

      {!!selectedPosts.length && (
        <>
          <PanelBody title={__('Render settings', 'maaaps')} initialOpen={false}>
            <SelectTiles setAttributes={setAttributes} options={mapTiles} defaultValue={selectedMapTiles} />
            <ToggleMarkerCluster setAttributes={setAttributes} defaultValue={isClustered} />
            <ToggleGeolocation setAttributes={setAttributes} defaultValue={isGeolocated} />
          </PanelBody>
          <ColorMap setAttributes={setAttributes} defaultValues={{ marker: selectedMarkerColor, cluster: selectedClusterColor }} isClustered={isClustered} />
        </>
      )}
    </InspectorControls>
  )
}
