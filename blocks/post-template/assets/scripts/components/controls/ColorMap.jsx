import { PanelColorSettings } from '@wordpress/block-editor'
import { __ } from '@wordpress/i18n'

export default function ColorMap({ defaultValue, setAttributes }) {
  return (
    <PanelColorSettings
      colorSettings={[
        {
          value: defaultValue,
          label: __('Hover'),
          onChange: (value) => {
            setAttributes({ bgHoverColor: value })
          }
        }
      ].filter(Boolean)}
      title={__('Colors')}
    />
  )
}
