import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor'
import { Button, Placeholder } from '@wordpress/components'
import { __ } from '@wordpress/i18n'
export default function MediaMarkerSearchIcon({ defaultValue, setAttributes }) {
  const handleSelect = (picture) => {
    setAttributes({
      selectedMarkerSearchIcon: {
        id: picture.id,
        width: picture.width,
        height: picture.height,
        url: picture.url,
        alt: picture.alt
      }
    })
  }

  const handleRemoveClick = () => {
    setAttributes({ selectedMarkerSearchIcon: {} })
  }

  return (
    <MediaUploadCheck>
      <MediaUpload
        allowedTypes={['image']}
        render={({ open }) => (
          <Placeholder icon="images-alt" instructions={__('Select a picture', 'mappps')} label={__('Search icon', 'mappps')}>
            {defaultValue.url && <img alt={defaultValue.alt} src={defaultValue.url} />}
            <Button isLarge isSecondary icon="edit" onClick={open}>
              {__('Select', 'mappps')}
            </Button>

            {defaultValue.url && (
              <Button isLarge isPrimary icon="dismiss" onClick={handleRemoveClick}>
                {__('Remove picture', 'mappps')}
              </Button>
            )}
          </Placeholder>
        )}
        value={defaultValue.id}
        onSelect={handleSelect}
      />
    </MediaUploadCheck>
  )
}
