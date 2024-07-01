import { PanelColorSettings } from '@wordpress/block-editor'
import { __ } from '@wordpress/i18n'

export default function ColorMap(props) {
  const { setAttributes, defaultValues, isClustered, hasSearchColor } = props

  return (
    <PanelColorSettings
      title={__('Colors')}
      colorSettings={[
        {
          value: defaultValues.primary,
          label: __('Primary'),
          onChange: (value) => {
            setAttributes({ selectedPrimaryColor: value })
          }
        },
        {
          value: defaultValues.secondary,
          label: __('Secondary'),
          onChange: (value) => {
            setAttributes({ selectedSecondaryColor: value })
          }
        },
        {
          value: defaultValues.marker,
          label: __('Marker'),
          onChange: (value) => {
            setAttributes({ selectedMarkerColor: value })
          }
        },
        isClustered && {
          value: defaultValues.cluster,
          label: __('Cluster'),
          onChange: (value) => {
            setAttributes({ selectedClusterColor: value })
          }
        },
        hasSearchColor && {
          value: defaultValues.search,
          label: __('Search'),
          onChange: (value) => {
            setAttributes({ selectedSearchColor: value })
          }
        }
      ].filter(Boolean)}
    />
  )
}
