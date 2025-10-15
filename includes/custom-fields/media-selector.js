document.addEventListener('DOMContentLoaded', function () {
  console.log('Mappps media selector ready');

  // EXERCISE: Find all custom field name inputs with value "mappps_image"
  // This targets the "Name" column in WordPress custom fields
  console.log(document.querySelectorAll('input[value="mappps_image"]'))

  // EXERCISE: Main function to add media selectors to custom fields
  function addMediaSelector() {
    // Find all name inputs with value "mappps_image" and loop through them
    // These are the inputs in the "Name" column of WordPress custom fields
    const nameInputs = document.querySelectorAll('input[value="mappps_image"]');
    let mediaSelectorExists = false;

    if (!nameInputs.length) { return };

    nameInputs.forEach(nameInput => {
      console.log(nameInput.value);
      console.log(nameInput.id);
      const getTextArea = document.getElementById(`${nameInput.id.replace("key", "value")}`);
      console.log(getTextArea);
      if (!document.querySelectorAll('.media-selector-container').length) { return };
      const mediaSelectorDiv = document.createElement('div');
      mediaSelectorDiv.classList.add('media-selector-container');

      const mediaSelectorbutton = document.createElement('button');
      mediaSelectorbutton.classList.add('media-selector-button');
      mediaSelectorbutton.innerText = "Select Image";
      mediaSelectorbutton.setAttribute('data-id', buttonCounter);
      const mediaSelectorPreview = document.createElement('span');
      mediaSelectorPreview.classList.add('media-selector-preview');

      //NAMEINPIUT. closest tr en tant que sélecteur parent, avec le sélecteur parent tu get la textarea.
      const parentNodeTextArea = getTextArea.parentNode;
      console.log(parentNodeTextArea);
      // NE PAS SUPPRIMER LA TEXTAREA, juste la HIDE.
      parentNodeTextArea.replaceChild(mediaSelectorDiv, getTextArea);
      mediaSelectorDiv.append(mediaSelectorPreview, mediaSelectorbutton);
      openMediaSelector(mediaSelectorbutton);


      //KEEP LAST

      mediaSelectorExists = true;
    });


  }

  // Find the corresponding textarea in the "Value" column

  // - add security checks if the field does not exist or if the media selector already exists

  // Create custom media selector interface
  //  - Create the main container div
  //  - Create image preview area
  //  - Create "Select Image" button
  //  - Append the interface to the container
  const getMediaSelectorButtons = document.querySelectorAll('.media-selector-button');
  console.log(getMediaSelectorButtons)

  function updatePreview() {
    // Get the current image ID from the textarea
    // const imageId = input.value;
    // if (imageId && imageId !== '') {
    //   console.log('Updating preview for image ID:', imageId);

    //   // Use WordPress REST API to get attachment details
    //   // WordPress REST API endpoint: /wp-json/wp/v2/media/{id}
    //   const restUrl = mapppsMediaSelector.restUrl + 'media/' + imageId;
    //   console.log('REST API URL:', restUrl);

    //   // Fetch API call to WordPress REST API
    //   fetch(restUrl, {
    //     method: 'GET',
    //     headers: {
    //       // WordPress REST API requires X-WP-Nonce header for authentication
    //       'X-WP-Nonce': mapppsMediaSelector.nonce
    //     }
    //   })
    //     .then(response => response.json()) // Convert response to JSON
    //     .then(attachment => {
    //       console.log('REST API response:', attachment);

    //       // Extract image URL from REST API response and display it
    //       // Put the picture ID in the textarea

    //     })
    //     .catch(error => {
    //       console.log('REST API error:', error);
    //     });
    // } else {
    //   // No image selected, hide preview and remove button
    //   preview.innerHTML = '';
    //   removeButton.style.display = 'none';
    // }
  }
  // function handleButtonClick(event) {
  //   const mediaButton = event.target;
  // };
  // const buttonId = mediaButton.getAttribute('data-id');

  // Event listener for the "Select Image" button

  const openMediaSelector = (mediaSelectorbutton) => {
    mediaSelectorbutton.addEventListener('click', function (e) {
      e.preventDefault();
      console.log('Opening media library');

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
      });

      frame.on('select', function () {
        // Get the selected attachment object
        const attachment = frame.state().get('selection').first().toJSON();
        console.log('Selected attachment:', attachment);

        // Store the attachment ID in the textarea
        input.value = attachment.id;

        // Update the preview with the new image
        updatePreview();
      });

      // Open the media library
      frame.open();
    });
  }
  // Initial preview update (in case there's already an image ID)
  updatePreview();


  addMediaSelector();
});
