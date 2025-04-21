import {
  __experimentalToggleGroupControl as ToggleGroupControl,
  __experimentalToggleGroupControlOption as ToggleGroupControlOption,
  __experimentalToolsPanelItem as ToolsPanelItem,
  __experimentalVStack as VStack,
  Notice
} from '@wordpress/components'
import { __ } from '@wordpress/i18n'

export default function ToggleInherit({ defaultValue, setQuery }) {
  const hasInheritanceWarning = defaultValue

  return (
    <ToolsPanelItem isShownByDefault hasValue={() => !defaultValue} label={__('Query type')} onDeselect={() => setQuery({ inherit: true })}>
      <VStack spacing={4}>
        <ToggleGroupControl
          __next40pxDefaultSize
          __nextHasNoMarginBottom
          isBlock
          help={
            defaultValue
              ? __('Display a list of posts or custom post types based on the current template (like in a archive page).', 'mappps')
              : __('Display a list of posts or custom post types based on specific criteria.', 'mappps')
          }
          label={__('Query type', 'mappps')}
          value={defaultValue ? 'default' : 'custom'}
          onChange={(value) => {
            setQuery({
              defaultValue: value === 'default'
            })
          }}
        >
          <ToggleGroupControlOption label={__('Inherit')} value="default" />
          <ToggleGroupControlOption label={__('Custom')} value="custom" />
        </ToggleGroupControl>
        {hasInheritanceWarning && (
          <Notice isDismissible={false} status="warning">
            {__('Cannot inherit the current template query when placed inside the singular content (e.g., post, page, 404, blank).', 'mappps')}
          </Notice>
        )}
      </VStack>
    </ToolsPanelItem>
  )
}
