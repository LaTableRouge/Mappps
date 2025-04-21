import { InspectorControls } from '@wordpress/block-editor'
import { memo } from '@wordpress/element'

import ColorMap from './controls/ColorMap'
import ControlQuery from './query/ControlQuery'

function Controls({ attributes, isConfirmed, setAttributes, setIsConfirmed, setQueriedPosts }) {
  const { displaySearch, isClustered, limitedSearch, selectedPosts, selectedPrimaryColor, selectedSecondaryColor } = attributes

  return (
    <InspectorControls>
      <ControlQuery attributes={attributes} isConfirmed={isConfirmed} setAttributes={setAttributes} setIsConfirmed={setIsConfirmed} setQueriedPosts={setQueriedPosts} />
      {selectedPosts?.length > 0 && (
        <ColorMap
          defaultValues={{
            primary: selectedPrimaryColor,
            secondary: selectedSecondaryColor
          }}
          hasSearchColor={displaySearch && !limitedSearch}
          isClustered={isClustered}
          setAttributes={setAttributes}
        />
      )}
    </InspectorControls>
  )
}

export default memo(Controls)
