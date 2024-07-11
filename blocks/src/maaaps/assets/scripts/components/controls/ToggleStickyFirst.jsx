import { ToggleControl } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

export default function ToggleStickyFirst({ defaultValue, setAttributes }) {
  return (
    <ToggleControl
      checked={defaultValue}
      help={defaultValue ? __('Sticky posts will be displayed first in the sidebar', 'maaaps') : ''}
      label={__('Sticky first', 'maaaps')}
      onChange={(value) => {
        setAttributes({ putStickyFirst: value })
      }}
    />
  )
}
