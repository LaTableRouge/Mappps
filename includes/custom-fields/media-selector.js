document.addEventListener('DOMContentLoaded', function () {
  const mapppsMediaSelector = window.mapppsMediaSelector

  if (!mapppsMediaSelector) {
    return
  }

  function addMediaSelector() {
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

        setPictureFromId(textarea.innerText)
      }
    })
  }

  // Event listener for the "Select Image" button
  const openMediaSelector = (container, textarea) => {
    const button = container.querySelector('.media-selector-button')
    const preview = container.querySelector('.media-selector-preview')

    // Return early if the button or preview is not found
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
      })

      // Open the media library
      frame.open()
    })
  }

  const setPictureFromId = (pictureId) => {
    const restUrl = mapppsMediaSelector.restUrl + 'media/' + pictureId;

    fetch(restUrl, {
      method: 'GET',
      headers: {
        // WordPress REST API requires X-WP-Nonce header for authentication
        'X-WP-Nonce': mapppsMediaSelector.nonce
      }
    })
      .then(response => response.json()) // Convert response to JSON
      .then(attachment => {
        console.log('REST API response:', attachment);
        // Put the picture src in the preview

      })
      .catch(error => {
        console.log('REST API error:', error);
      });
  }

  addMediaSelector()


  // TODO :  add a remove button
  // TODO : in the setPictureFromId function, put the picture src in the preview (this function is called on load)
  // TODO mais vraiment s'il y a le temps et la motivation, changer tout le fichier en class
})
