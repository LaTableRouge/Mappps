import { __ } from '@wordpress/i18n'

export default function addMediaSelector() {
	const nameInputs = document.querySelectorAll('input[value="mappps_marker"]')

	// Return early if no name inputs are found
	if (!nameInputs.length) {
		return
	}

	nameInputs.forEach((nameInput) => {
		const parentRow = nameInput.closest('tr')
		if (parentRow) {
			// Return early if the media selector container already exists
			if (parentRow.querySelector('.media-selector-container')) {
				return
			}

			const textarea = parentRow.querySelector('textarea')
			if (textarea) {
				textarea.style.display = 'none'

				const mediaSelectorDiv = document.createElement('div')
				mediaSelectorDiv.classList.add('media-selector-container')

				const buttonContainerDiv = document.createElement('div')
				buttonContainerDiv.classList.add('media-selector-container__button-wrapper')

				const mediaSelectorbutton = document.createElement('button')
				mediaSelectorbutton.classList.add('button-wrapper__button', 'button-wrapper__button--add', 'button', 'button-small')
				mediaSelectorbutton.setAttribute('aria-label', __('Select image', 'mappps'))
				mediaSelectorbutton.innerText = __('Select Image', 'mappps')

				const removePictureButton = document.createElement('button')
				removePictureButton.setAttribute('aria-label', __('Remove image', 'mappps'))
				removePictureButton.classList.add('button-wrapper__button', 'button-wrapper__button--remove', 'is-destructive', 'is-secondary', 'components-button', 'button-small')
				removePictureButton.innerText = __('Remove Image', 'mappps')

				const mediaSelectorPreview = document.createElement('img')
				mediaSelectorPreview.alt = __('Marker image preview', 'mappps')
				mediaSelectorPreview.style.width = '100px'
				mediaSelectorPreview.style.height = '100px'
				mediaSelectorPreview.classList.add('media-selector-container__preview')

				textarea.after(mediaSelectorDiv)
				mediaSelectorDiv.append(mediaSelectorPreview, buttonContainerDiv)
				buttonContainerDiv.append(mediaSelectorbutton, removePictureButton)

				openMediaSelector(parentRow, textarea)
				removeMedia(removePictureButton, mediaSelectorPreview, textarea)
			}

			setPictureFromStoredData(textarea)
		}
	})
}

// Event listener for the "Select Image" button
const openMediaSelector = (container, textarea) => {
	const button = container.querySelector('.button-wrapper__button--add')
	const preview = container.querySelector('.media-selector-container__preview')

	// Return early if the button or preview is not found
	if (!button || !preview) {
		return
	}

	button.addEventListener('click', function (e) {
		e.preventDefault()

		// wp.media is WordPress's built-in media library API
		const frame = wp.media({
			title: __('Select Image', 'mappps'),
			button: {
				text: __('Use this image', 'mappps')
			},
			multiple: false, // Only allow single image selection
			library: {
				type: 'image' // Only show images, not other media types
			}
		})

		frame.on('select', function () {
			// Get the selected attachment object
			const attachment = frame.state().get('selection').first().toJSON()

			// Create a complete picture object with all needed data
			const pictureObject = {
				id: attachment?.id ?? '',
				width: attachment?.media_details?.width ?? 0,
				height: attachment?.media_details?.height ?? 0,
				url: attachment?.source_url ?? attachment?.url ?? '',
				alt: attachment?.alt_text ?? ''
			}

			// Store the complete picture object as stringified JSON
			textarea.innerText = JSON.stringify(pictureObject)

			// Update the preview with the new image
			preview.src = pictureObject.url
		})

		// Open the media library
		frame.open()
	})
}

const setPictureFromStoredData = (textarea) => {
	const container = textarea.closest('tr')
	const preview = container.querySelector('.media-selector-container__preview')

	if (!preview) return

	try {
		// Try to parse the stored JSON object
		const pictureData = JSON.parse(textarea.innerText)

		if (pictureData && pictureData.url) {
			// Set the preview image from stored data
			preview.src = pictureData.url
			preview.alt = pictureData.alt || ''
		}
	} catch (error) {
		// If parsing fails, it might be just an ID (legacy data)
		console.warn('Could not parse stored data, might be legacy ID format:', error)
	}
}

function removeMedia(button, preview, textarea) {
	if (!button || !preview || !textarea) {
		return
	}

	button.addEventListener('click', (e) => {
		e.preventDefault()
		textarea.innerText = ''
		preview.src = ''
	})
}

// TODO : style essayer avec des icones
// TODO mais vraiment s'il y a le temps et la motivation, changer tout le fichier en class
