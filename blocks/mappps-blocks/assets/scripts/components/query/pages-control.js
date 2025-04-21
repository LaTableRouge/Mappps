/**
 * WordPress dependencies
 */
import { __experimentalNumberControl as NumberControl } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

export const PagesControl = ({ onChange, pages }) => {
  return (
    <NumberControl
      __next40pxDefaultSize
      help={__('Limit the pages you want to show, even if the query has more results. To show all pages use 0 (zero).')}
      label={__('Max pages to show')}
      min={0}
      value={pages}
      onChange={(newPages) => {
        if (isNaN(newPages) || newPages < 0) {
          return
        }
        onChange({ pages: newPages })
      }}
    />
  )
}

export default PagesControl
