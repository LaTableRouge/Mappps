/**
 * WordPress dependencies
 */
import { SelectControl } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

const stickyOptions = [
  { label: __('Include'), value: '' },
  { label: __('Ignore'), value: 'ignore' },
  { label: __('Exclude'), value: 'exclude' },
  { label: __('Only'), value: 'only' }
]

export default function StickyControl({ onChange, value }) {
  return (
    <SelectControl
      __next40pxDefaultSize
      __nextHasNoMarginBottom
      help={__('Sticky posts always appear first, regardless of their publish date.')}
      label={__('Sticky posts')}
      options={stickyOptions}
      value={value}
      onChange={onChange}
    />
  )
}
