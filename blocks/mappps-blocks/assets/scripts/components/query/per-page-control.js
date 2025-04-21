/**
 * WordPress dependencies
 */
import { RangeControl } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

const MIN_POSTS_PER_PAGE = 1
const MAX_POSTS_PER_PAGE = 100

const PerPageControl = ({ offset = 0, onChange, perPage }) => {
  return (
    <RangeControl
      __next40pxDefaultSize
      __nextHasNoMarginBottom
      label={__('Items per page')}
      max={MAX_POSTS_PER_PAGE}
      min={MIN_POSTS_PER_PAGE}
      value={parseInt(perPage, 10)}
      onChange={(newPerPage) => {
        if (isNaN(newPerPage) || newPerPage < MIN_POSTS_PER_PAGE || newPerPage > MAX_POSTS_PER_PAGE) {
          return
        }
        onChange({ perPage: newPerPage, offset })
      }}
    />
  )
}

export default PerPageControl
