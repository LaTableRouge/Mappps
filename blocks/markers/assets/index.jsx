/**
 * Let webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './styles/style.scss'

import { registerBlockType } from '@wordpress/blocks'

import metadata from '../block.json'
import Edit from './scripts/edit'
import Save from './scripts/save'

/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */

/**
 * Internal dependencies
 */

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType(metadata.name, {
	icon: {
		src: (
			<svg height="1024" version="1.1" viewBox="0 0 1024 1024" width="1024" xmlns="http://www.w3.org/2000/svg">
				<path d="M511.999 128.022c-158.714 0-291.83 127.996-291.83 291.83 0 66.559 46.078 163.837 133.117 286.712 66.559 87.037 133.117 158.714 133.117 163.837l25.596 25.596 25.596-25.596c5.122-5.122 66.559-71.677 133.117-163.837 92.155-122.874 133.117-220.152 133.117-286.712 0-163.837-133.117-291.83-291.83-291.83zM511.999 522.248c-56.317 0-107.515-46.078-107.515-107.515s46.078-107.515 107.515-107.515 107.515 46.078 107.515 107.515-51.199 107.515-107.515 107.515z"></path>
			</svg>
		)
	},
	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save: Save
})
