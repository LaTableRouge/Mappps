import { __ } from '@wordpress/i18n'

/**
 * MediaSelector class for handling WordPress media library integration
 * Provides functionality to select, preview, and manage images in custom fields
 */
export default class MediaSelector {
	/**
	 * Initialize the MediaSelector and set up all media selector instances
	 * @param {string|string[]} fieldNames - Field name(s) to target for media selection
	 * @param {Object} options - Configuration options for the media selector
	 */
	static init(fieldNames = 'mappps_marker', options = {}) {
		// Normalize fieldNames to array
		const fields = Array.isArray(fieldNames) ? fieldNames : [fieldNames]

		// Initialize existing fields
		fields.forEach((fieldName) => {
			const nameInputs = document.querySelectorAll(`input[value="${fieldName}"]`)

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
						new MediaSelector(parentRow, textarea, fieldName, options)
					}
				}
			})
		})

		// Set up MutationObserver to watch for new fields
		MediaSelector.setupObserver(fields, options)
	}

	/**
	 * Set up MutationObserver to watch for new custom field rows
	 * @param {string[]} fieldNames - Field names to watch for
	 * @param {Object} options - Configuration options
	 */
	static setupObserver(fieldNames, options) {
		// Find the custom fields container (usually a table or div)
		const customFieldsContainer = document.querySelector('.postbox-container #list-table') || document.body

		const observer = new MutationObserver(function (mutationsList) {
			mutationsList.forEach(function (mutation) {
				mutation.addedNodes.forEach(function (addedNode) {
					// Check if the added node is a table row or contains table rows
					if (addedNode.nodeType === Node.ELEMENT_NODE) {
						let rowsToCheck = []

						// If it's a table row, check it directly
						if (addedNode.tagName === 'TR') {
							rowsToCheck.push(addedNode)
						}
						// If it's a container, find all table rows within it
						else {
							rowsToCheck = addedNode.querySelectorAll('tr')
						}

						rowsToCheck.forEach((row) => {
							fieldNames.forEach((fieldName) => {
								const nameInput = row.querySelector(`input[value="${fieldName}"]`)
								if (nameInput) {
									// Check if media selector already exists
									if (!row.querySelector('.media-selector-container')) {
										const textarea = row.querySelector('textarea')
										if (textarea) {
											console.log(`New ${fieldName} field detected, initializing media selector`)
											new MediaSelector(row, textarea, fieldName, options)
										}
									}
								}
							})
						})
					}
				})
			})
		})

		// Start observing
		observer.observe(customFieldsContainer, {
			subtree: true,
			childList: true
		})

		// Store observer reference for potential cleanup
		MediaSelector._observer = observer
	}

	/**
	 * Stop the MutationObserver
	 */
	static stopObserver() {
		if (MediaSelector._observer) {
			MediaSelector._observer.disconnect()
			MediaSelector._observer = null
		}
	}

	/**
	 * Create a new MediaSelector instance
	 * @param {HTMLElement} container - The parent row element
	 * @param {HTMLTextAreaElement} textarea - The textarea element to store data
	 * @param {string} fieldName - The field name this selector is for
	 * @param {Object} options - Configuration options
	 */
	constructor(container, textarea, fieldName = 'mappps_marker', options = {}) {
		this.container = container
		this.textarea = textarea
		this.fieldName = fieldName
		this.options = {
			previewSize: '100px',
			mediaLibraryTitle: __('Select Image', 'mappps'),
			mediaLibraryButtonText: __('Use this image', 'mappps'),
			selectButtonText: __('Select Image', 'mappps'),
			removeButtonText: __('Remove Image', 'mappps'),
			previewAltText: __('Image preview', 'mappps'),
			selectButtonAriaLabel: __('Select image', 'mappps'),
			removeButtonAriaLabel: __('Remove image', 'mappps'),
			mediaTypes: ['image'],
			allowMultiple: false,
			...options
		}

		// DOM elements
		this.mediaSelectorDiv = null
		this.buttonContainerDiv = null
		this.selectButton = null
		this.removeButton = null
		this.preview = null

		this.init()
	}

	/**
	 * Initialize the media selector by creating DOM elements and setting up event listeners
	 */
	init() {
		this.hideTextarea()
		this.createMediaSelectorElements()
		this.setupEventListeners()
		this.loadStoredData()
	}

	/**
	 * Hide the original textarea
	 */
	hideTextarea() {
		this.textarea.style.display = 'none'
	}

	/**
	 * Create all necessary DOM elements for the media selector
	 */
	createMediaSelectorElements() {
		// Create main container
		this.mediaSelectorDiv = document.createElement('div')
		this.mediaSelectorDiv.classList.add('media-selector-container')
		this.mediaSelectorDiv.setAttribute('data-field-name', this.fieldName)

		// Create button container
		this.buttonContainerDiv = document.createElement('div')
		this.buttonContainerDiv.classList.add('media-selector-container__button-wrapper')

		// Create select button
		this.selectButton = document.createElement('button')
		this.selectButton.classList.add('button-wrapper__button', 'button-wrapper__button--add', 'button', 'button-small')
		this.selectButton.setAttribute('aria-label', this.options.selectButtonAriaLabel)
		this.selectButton.innerText = this.options.selectButtonText

		// Create remove button
		this.removeButton = document.createElement('button')
		this.removeButton.setAttribute('aria-label', this.options.removeButtonAriaLabel)
		this.removeButton.classList.add('button-wrapper__button', 'button-wrapper__button--remove', 'is-destructive', 'is-secondary', 'components-button', 'button-small')
		this.removeButton.innerText = this.options.removeButtonText

		// Create preview image
		this.preview = document.createElement('img')
		this.preview.alt = this.options.previewAltText
		this.preview.style.width = this.options.previewSize
		this.preview.style.height = this.options.previewSize
		this.preview.classList.add('media-selector-container__preview')

		// Assemble the DOM structure
		this.textarea.after(this.mediaSelectorDiv)
		this.mediaSelectorDiv.append(this.preview, this.buttonContainerDiv)
		this.buttonContainerDiv.append(this.selectButton, this.removeButton)
	}

	/**
	 * Set up all event listeners
	 */
	setupEventListeners() {
		this.setupSelectButtonListener()
		this.setupRemoveButtonListener()
	}

	/**
	 * Set up the select button and the preview click event listener
	 */
	setupSelectButtonListener() {
		if (!this.selectButton || !this.preview) {
			return
		}

		;[this.selectButton, this.preview].forEach((button) => {
			button.addEventListener('click', (e) => {
				e.preventDefault()
				this.openMediaLibrary()
			})
		})
	}

	/**
	 * Set up the remove button click event listener
	 */
	setupRemoveButtonListener() {
		if (!this.removeButton || !this.preview || !this.textarea) {
			return
		}

		this.removeButton.addEventListener('click', (e) => {
			e.preventDefault()
			this.clearMedia()
		})
	}

	/**
	 * Open the WordPress media library
	 */
	openMediaLibrary() {
		// wp.media is WordPress's built-in media library API
		const frame = wp.media({
			title: this.options.mediaLibraryTitle,
			button: {
				text: this.options.mediaLibraryButtonText
			},
			multiple: this.options.allowMultiple,
			library: {
				type: this.options.mediaTypes.join(',')
			}
		})

		frame.on('select', () => {
			this.handleMediaSelection(frame)
		})

		// Open the media library
		frame.open()
	}

	/**
	 * Handle the media selection from the WordPress media library
	 * @param {Object} frame - The WordPress media frame object
	 */
	handleMediaSelection(frame) {
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
		this.textarea.innerText = JSON.stringify(pictureObject)

		// Update the preview with the new image
		this.preview.src = pictureObject.url
	}

	/**
	 * Clear the selected media
	 */
	clearMedia() {
		this.textarea.innerText = ''
		this.preview.src = ''
	}

	/**
	 * Load and display stored media data
	 */
	loadStoredData() {
		if (!this.preview) return

		try {
			// Try to parse the stored JSON object
			const pictureData = JSON.parse(this.textarea.innerText)

			if (pictureData && pictureData.url) {
				// Set the preview image from stored data
				this.preview.src = pictureData.url
				this.preview.alt = pictureData.alt || ''
			}
		} catch (error) {
			// If parsing fails, it might be just an ID (legacy data)
			console.warn('Could not parse stored data, might be legacy ID format:', error)
		}
	}

	/**
	 * Get the current media data
	 * @returns {Object|null} The current media data or null if none
	 */
	getMediaData() {
		try {
			return JSON.parse(this.textarea.innerText)
		} catch (error) {
			// If parsing fails, it might be just an ID (legacy data)
			console.warn('Could not parse stored data, might be legacy ID format:', error)
			return null
		}
	}

	/**
	 * Set media data programmatically
	 * @param {Object} mediaData - The media data to set
	 */
	setMediaData(mediaData) {
		this.textarea.innerText = JSON.stringify(mediaData)
		if (this.preview && mediaData.url) {
			this.preview.src = mediaData.url
			this.preview.alt = mediaData.alt || ''
		}
	}

	/**
	 * Check if media is currently selected
	 * @returns {boolean} True if media is selected
	 */
	hasMedia() {
		const data = this.getMediaData()
		return data && data.url && data.url.length > 0
	}

	/**
	 * Destroy the media selector instance
	 */
	destroy() {
		// Remove event listeners
		if (this.selectButton) {
			this.selectButton.replaceWith(this.selectButton.cloneNode(true))
		}
		if (this.removeButton) {
			this.removeButton.replaceWith(this.removeButton.cloneNode(true))
		}

		// Remove DOM elements
		if (this.mediaSelectorDiv) {
			this.mediaSelectorDiv.remove()
		}

		// Show textarea again
		this.textarea.style.display = ''

		// Clear references
		this.mediaSelectorDiv = null
		this.buttonContainerDiv = null
		this.selectButton = null
		this.removeButton = null
		this.preview = null
	}
}
