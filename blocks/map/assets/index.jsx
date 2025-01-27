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
        <path d="M119.489 266.68l245.32-98.132v588.765l-245.32 98.132z"></path>
        <path d="M413.868 144.026l245.32 147.191v564.235l-245.32-122.656z"></path>
        <path d="M708.255 291.216l196.255-147.191v588.765l-196.255 147.191z"></path>
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
