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

    if (!nameInputs.length) { return };
    if (document.querySelectorAll('.media-selector-container').length) { return };
    nameInputs.forEach(nameInput => {

      const getTextArea = document.getElementById(`${nameInput.id.replace("key", "value")}`);
      const mediaSelectorDiv = document.createElement('div');
      mediaSelectorDiv.classList.add('media-selector-container');

      const mediaSelectorbutton = document.createElement('button');
      mediaSelectorbutton.classList.add('media-selector-button');
      mediaSelectorbutton.innerText = "Select Image";
      const mediaSelectorPreview = document.createElement('img');
      mediaSelectorPreview.classList.add('media-selector-preview');


      const textAreaContainer = getTextArea.closest("td");

      const hideTextArea = () => {
        textAreaContainer.querySelector("textarea").style.display = "none";

      };
      hideTextArea();

      textAreaContainer.appendChild(mediaSelectorDiv);
      mediaSelectorDiv.append(mediaSelectorPreview, mediaSelectorbutton);
      openMediaSelector(mediaSelectorbutton);


    });


  }

  // Find the corresponding textarea in the "Value" column

  // - add security checks if the field does not exist or if the media selector already exists

  // Create custom media selector interface
  //  - Create the main container div
  //  - Create image preview area
  //  - Create "Select Image" button
  //  - Append the interface to the container
  let textAreaId = null;
  let imageId = null;
  function updatePreview() {
    //  Get the current image ID from the textarea

    imageId = document.getElementById(`${textAreaId}`).value;
    if (imageId && imageId !== '') {
      console.log('Updating preview for image ID:', imageId);

      // Use WordPress REST API to get attachment details
      // WordPress REST API endpoint: /wp-json/wp/v2/media/{id}
      const restUrl = mapppsMediaSelector.restUrl + 'media/' + imageId;
      console.log('REST API URL:', restUrl);

      // Fetch API call to WordPress REST API
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

          // Extract image URL from REST API response and display it
          // Put the picture ID in the textarea

        })
        .catch(error => {
          console.log('REST API error:', error);
        });
    } else {
      // No image selected, hide preview and remove button
      preview.innerHTML = '';
      removeButton.style.display = 'none';
    }
  }


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


        // Store the attachment ID in the textarea

        const getClosestTextarea = mediaSelectorbutton.closest('td').querySelector('textarea');
        getClosestTextarea.innerText = attachment.id;
        let textAreaId = getClosestTextarea.id;
        let imageID = document.getElementById(`${textAreaId}`).value;
        // Update the preview with the new image
        updatePreview(imageID);
      });

      // Open the media library
      frame.open();
    });
  }
  // Initial preview update (in case there's already an image ID)
  updatePreview();


  addMediaSelector();
});
