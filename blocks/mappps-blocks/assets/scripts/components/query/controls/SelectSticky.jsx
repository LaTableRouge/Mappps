import { __experimentalToolsPanelItem as ToolsPanelItem, SelectControl } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

const stickyOptions = [
  { label: __('Include'), value: '' },
  { label: __('Ignore'), value: 'ignore' },
  { label: __('Exclude'), value: 'exclude' },
  { label: __('Only'), value: 'only' }
]

export default function SelectSticky({ defaultValue, onChange }) {
  return (
    <ToolsPanelItem isShownByDefault hasValue={() => !!defaultValue} label={__('Sticky posts', 'mappps')} onDeselect={() => onChange({ sticky: '' })}>
      <SelectControl
        __next40pxDefaultSize
        __nextHasNoMarginBottom
        help={__('Sticky posts always appear first, regardless of their publish date.', 'mappps')}
        label={__('Sticky posts', 'mappps')}
        options={stickyOptions}
        value={defaultValue}
        onChange={onChange}
      />
    </ToolsPanelItem>
  )
}
