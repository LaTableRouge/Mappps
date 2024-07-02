/**
 * Let webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './scss/style.scss'

/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks'

import metadata from '../block.json'
/**
 * Internal dependencies
 */
import Edit from './js/edit'
import Save from './js/save'

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType(metadata.name, {
  icon: {
    src: (
      <svg height="20" version="1.1" viewBox="0 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M336 96l-160-64-176 64v384l176-64 160 64 176-64v-384l-176 64zM192 72.865l128 51.2v315.069l-128-51.199v-315.070zM32 118.414l128-46.545v315.9l-128 46.544v-315.899zM480 393.586l-128 46.546v-315.9l128-46.545v315.899z"
          fill="#000"
        ></path>
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
