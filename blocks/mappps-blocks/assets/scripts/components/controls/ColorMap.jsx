import { PanelColorSettings } from '@wordpress/block-editor'
import { memo } from '@wordpress/element'
import { __ } from '@wordpress/i18n'

function ColorMap({ defaultValues, setAttributes }) {
  return (
    <PanelColorSettings
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
        }
      ].filter(Boolean)}
      title={__('Colors')}
    />
  )
}

export default memo(ColorMap)
