import { ToggleControl } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

export default function ToggleStickyFirst({ defaultValue, setAttributes }) {
  return (
    <div style={{ marginTop: '16px' }}>
      <ToggleControl
        checked={defaultValue}
        help={defaultValue ? __('Sticky posts will be displayed first in the sidebar', 'mappps') : ''}
        label={__('Sticky first', 'mappps')}
        onChange={(value) => {
          setAttributes({ putStickyFirst: value })
        }}
      />
    </div>
  )
}
