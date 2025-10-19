document.addEventListener('DOMContentLoaded', function () {
	console.log('Mappps media selector ready')

	// EXERCISE: Find all custom field name inputs with value "mappps_image"
	// This targets the "Name" column in WordPress custom fields
	console.log(document.querySelectorAll('input[value="mappps_image"]'))
	// EXERCISE: Main function to add media selectors to custom fields
	function addMediaSelector() {
		// Find all name inputs with value "mappps_image" and loop through them
		// These are the inputs in the "Name" column of WordPress custom fields
		const nameInputs = document.querySelectorAll('input[value="mappps_image"]')

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
					const mediaSelectorDiv = document.createElement('div')
					mediaSelectorDiv.classList.add('media-selector-container')

					const mediaSelectorbutton = document.createElement('button')
					mediaSelectorbutton.classList.add('media-selector-button')
					mediaSelectorbutton.innerText = 'Select Image'

					const mediaSelectorPreview = document.createElement('img')
					mediaSelectorPreview.classList.add('media-selector-preview')

					textarea.after(mediaSelectorDiv)
					mediaSelectorDiv.append(mediaSelectorPreview, mediaSelectorbutton)

					openMediaSelector(parentRow, textarea)
				}
			}
		})
	}

	// Event listener for the "Select Image" button
	const openMediaSelector = (container, textarea) => {
		const button = container.querySelector('.media-selector-button')
		const preview = container.querySelector('.media-selector-preview')

		if (!button || !preview) {
			return
		}

		button.addEventListener('click', function (e) {
			e.preventDefault()
			console.log('Opening media library')

			// wp.media is WordPress's built-in media library API
			const frame = wp.media({
				title: 'Select Image',
				button: {
					text: 'Use this image'
				},
				multiple: false, // Only allow single image selection
				library: {
					type: 'image' // Only show images, not other media types
				}
			})

			frame.on('select', function () {
				// Get the selected attachment object
				const attachment = frame.state().get('selection').first().toJSON()

				// Store the attachment ID in the textarea
				textarea.innerText = attachment?.id ?? ''

				// Update the preview with the new image
				preview.src = attachment?.url ?? ''

				// Use WordPress REST API to get attachment details
				// WordPress REST API endpoint: /wp-json/wp/v2/media/{id}
				// const restUrl = mapppsMediaSelector.restUrl + 'media/' + imageId;
				// console.log('REST API URL:', restUrl);

				// // Fetch API call to WordPress REST API
				// fetch(restUrl, {
				//   method: 'GET',
				//   headers: {
				//     // WordPress REST API requires X-WP-Nonce header for authentication
				//     'X-WP-Nonce': mapppsMediaSelector.nonce
				//   }
				// })
				//   .then(response => response.json()) // Convert response to JSON
				//   .then(attachment => {
				//     console.log('REST API response:', attachment);

				//     // Extract image URL from REST API response and display it
				//     // Put the picture ID in the textarea

				//   })
				//   .catch(error => {
				//     console.log('REST API error:', error);
				//   });
			})

			// Open the media library
			frame.open()
		})
	}

	addMediaSelector()
})
