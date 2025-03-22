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
        <path d="M673.783 303.994h-323.566c-114.693 0-208.006 93.314-208.006 208.006s93.314 208.006 208.006 208.006h323.566c114.693 0 208.006-93.314 208.006-208.006s-93.314-208.006-208.006-208.006zM673.783 673.783c-89.351 0-161.783-72.433-161.783-161.783s72.433-161.783 161.783-161.783c89.351 0 161.783 72.433 161.783 161.783v0c-0.098 89.311-72.473 161.685-161.774 161.783h-0.008z"></path>
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
