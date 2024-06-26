import { PanelColorSettings } from '@wordpress/block-editor'
import { __ } from '@wordpress/i18n'

export default function ColorMap(props) {
  const { setAttributes, defaultValues, isClustered } = props

  return (
    <PanelColorSettings
      title={__('Colors')}
      colorSettings={[
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
        }
      ].filter(Boolean)}
    />
  )
}
