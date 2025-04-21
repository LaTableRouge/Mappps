import { PanelColorSettings } from '@wordpress/block-editor'
import { memo } from '@wordpress/element'
import { __ } from '@wordpress/i18n'

function ColorMap({ defaultValues, setAttributes }) {
  return (
    <PanelColorSettings
      colorSettings={[
        {
          value: defaultValues.primary,
          label: __('Primary', 'mappps'),
          onChange: (value) => {
            setAttributes({ selectedPrimaryColor: value })
          }
        },
        {
          value: defaultValues.secondary,
          label: __('Secondary', 'mappps'),
          onChange: (value) => {
            setAttributes({ selectedSecondaryColor: value })
          }
        }
      ].filter(Boolean)}
      title={__('Colors', 'mappps')}
    />
  )
}

export default memo(ColorMap)
