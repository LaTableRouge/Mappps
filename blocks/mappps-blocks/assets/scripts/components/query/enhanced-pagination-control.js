/**
 * WordPress dependencies
 */
import { ToggleControl } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

/**
 * Internal dependencies
 */
import { useUnsupportedBlocks } from './utils.js'

export default function EnhancedPaginationControl({ clientId, enhancedPagination, setAttributes }) {
  const { hasUnsupportedBlocks } = useUnsupportedBlocks(clientId)
  const fullPageClientSideNavigation = window.__experimentalFullPageClientSideNavigation

  let help = __('Reload the full page—instead of just the posts list—when visitors navigate between pages.')
  if (fullPageClientSideNavigation) {
    help = __('Experimental full-page client-side navigation setting enabled.')
  } else if (hasUnsupportedBlocks) {
    help = __('Enhancement disabled because there are non-compatible blocks inside the Query block.')
  }

  return (
    <>
      <ToggleControl
        __nextHasNoMarginBottom
        checked={!enhancedPagination && !fullPageClientSideNavigation}
        disabled={hasUnsupportedBlocks || fullPageClientSideNavigation}
        help={help}
        label={__('Reload full page')}
        onChange={(value) => {
          setAttributes({
            enhancedPagination: !value
          })
        }}
      />
    </>
  )
}
