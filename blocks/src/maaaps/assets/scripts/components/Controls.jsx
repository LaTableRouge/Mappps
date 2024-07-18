import { InspectorControls } from '@wordpress/block-editor'
import { PanelBody } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

import ColorMap from './controls/ColorMap'
import InputMaxMarkerZoom from './controls/NumberMaxMarkerZoom'
import InputMaxZoom from './controls/NumberMaxZoom'
import SelectCategories from './controls/SelectCategories'
import SelectDisplayType from './controls/SelectDisplayType'
import SelectPosts from './controls/SelectPosts'
import SelectPostType from './controls/SelectPostType'
import SelectTaxonomies from './controls/SelectTaxonomies'
import SelectTiles from './controls/SelectTiles'
import ToggleFilters from './controls/ToggleFilters'
import ToggleGeolocation from './controls/ToggleGeolocation'
import ToggleLimitedSearch from './controls/ToggleLimitedSearch'
import ToggleMarkerCluster from './controls/ToggleMarkerCluster'
import ToggleSearch from './controls/ToggleSearch'
import ToggleStickyFirst from './controls/ToggleStickyFirst'
import UnitMarkerClusterSize from './controls/UnitMarkerClusterSize'
import UnitMarkerSize from './controls/UnitMarkerSize'
import UnitSidebarSize from './controls/UnitSidebarSize'

export default function Controls({ attributes, postTypes, setAttributes, setQueriedPosts }) {
  const selectedPostType = attributes.postType
  const selectedPosts = attributes.selectedPosts
  const selectedTaxonomies = attributes.selectedTaxonomies
  const taxonomies = attributes.taxonomies
  const selectedCategories = attributes.selectedCategories
  const mapTiles = attributes.mapTiles
  const selectedMapTiles = attributes.selectedMapTiles
  const isClustered = attributes.isClustered
  const isGeolocated = attributes.isGeolocated
  const selectedMarkerColor = attributes.selectedMarkerColor
  const selectedActiveMarkerColor = attributes.selectedActiveMarkerColor
  const selectedClusterColor = attributes.selectedClusterColor
  const selectedSearchColor = attributes.selectedSearchColor
  const selectedDisplayType = attributes.selectedDisplayType
  const selectedSidebarSize = attributes.selectedSidebarSize
  const putStickyFirst = attributes.putStickyFirst
  const selectedPrimaryColor = attributes.selectedPrimaryColor
  const selectedSecondaryColor = attributes.selectedSecondaryColor
  const displayFilters = attributes.displayFilters
  const displaySearch = attributes.displaySearch
  const limitedSearch = attributes.limitedSearch
  const selectedMaxZoom = attributes.selectedMaxZoom
  const selectedMaxMarkerZoom = attributes.selectedMaxMarkerZoom
  const selectedMarkerSize = attributes.selectedMarkerSize
  const selectedMarkerClusterSize = attributes.selectedMarkerClusterSize

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
      <PanelBody initialOpen={true} title={__('Data settings', 'maaaps')}>
        {!!postTypes.length && <SelectPostType defaultValue={selectedPostType} postTypes={postTypes} setAttributes={setAttributes} setQueriedPosts={setQueriedPosts} />}
        {!!selectedPostType && <SelectTaxonomies defaultValue={selectedTaxonomies} postType={selectedPostType} setAttributes={setAttributes} setQueriedPosts={setQueriedPosts} />}
        {!!selectedTaxonomies.length && (
          <SelectCategories defaultValue={selectedCategories} setAttributes={setAttributes} setQueriedPosts={setQueriedPosts} taxonomies={selectedTaxonomies} />
        )}
        {!!selectedCategories.length && (
          <SelectPosts
            categories={selectedCategories}
            defaultValue={selectedPosts}
            postType={selectedPostType}
            setAttributes={setAttributes}
            setQueriedPosts={setQueriedPosts}
            taxonomies={sanitizedSelectedTaxonomies}
          />
        )}
      </PanelBody>

      {!!selectedPosts.length && (
        <>
          <PanelBody initialOpen={false} title={__('Render settings', 'maaaps')}>
            <SelectDisplayType defaultValue={selectedDisplayType} setAttributes={setAttributes} />
            {selectedDisplayType === 'full' && (
              <>
                <ToggleFilters defaultValue={displayFilters} setAttributes={setAttributes} />
                <ToggleSearch defaultValue={displaySearch} setAttributes={setAttributes} />
                {displaySearch && <ToggleLimitedSearch defaultValue={limitedSearch} setAttributes={setAttributes} />}
                <UnitSidebarSize defaultValue={selectedSidebarSize} setAttributes={setAttributes} />
                <ToggleStickyFirst defaultValue={putStickyFirst} setAttributes={setAttributes} />
              </>
            )}
            <SelectTiles defaultValue={selectedMapTiles} options={mapTiles} setAttributes={setAttributes} />
            <ToggleMarkerCluster defaultValue={isClustered} setAttributes={setAttributes} />
            <ToggleGeolocation defaultValue={isGeolocated} setAttributes={setAttributes} />
            <InputMaxZoom defaultValue={selectedMaxZoom} setAttributes={setAttributes} />
            <InputMaxMarkerZoom defaultValue={selectedMaxMarkerZoom} max={selectedMaxZoom} setAttributes={setAttributes} />
            <UnitMarkerSize defaultValue={selectedMarkerSize} setAttributes={setAttributes} />
            <UnitMarkerClusterSize defaultValue={selectedMarkerClusterSize} setAttributes={setAttributes} />
          </PanelBody>
          <ColorMap
            defaultValues={{
              marker: selectedMarkerColor,
              markerActive: selectedActiveMarkerColor,
              cluster: selectedClusterColor,
              search: selectedSearchColor,
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
