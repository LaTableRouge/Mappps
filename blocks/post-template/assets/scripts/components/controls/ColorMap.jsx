import { PanelColorSettings } from '@wordpress/block-editor'
import { memo, useCallback } from '@wordpress/element'
import { __ } from '@wordpress/i18n'

function ColorMap({ defaultValue, setAttributes }) {
  const handleColorChange = useCallback(
    (value) => {
      setAttributes({ bgHoverColor: value })
    },
    [setAttributes]
  )

  const colorSettings = [
    {
      value: defaultValue,
      label: __('Hover'),
      onChange: handleColorChange
    }
  ].filter(Boolean)

  return <PanelColorSettings colorSettings={colorSettings} title={__('Colors')} />
}

export default memo(ColorMap)
