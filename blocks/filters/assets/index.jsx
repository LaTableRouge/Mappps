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
        <path d="M512 120c-216.5 0-392 54.848-392 122.5v73.5l294 294v245c0 27.065 43.88 49 98 49s98-21.935 98-49v-245l294-294v-73.5c0-67.652-175.502-122.5-392-122.5zM192.259 226.288c18.334-10.462 44.083-20.38 74.478-28.699 67.334-18.436 154.431-28.59 245.263-28.59s177.929 10.155 245.263 28.59c30.395 8.318 56.144 18.249 74.48 28.699 12.088 6.892 18.624 12.725 21.666 16.211-3.042 3.487-9.58 9.318-21.666 16.211-18.336 10.462-44.085 20.38-74.48 28.699-67.332 18.436-154.431 28.59-245.263 28.59s-177.929-10.155-245.263-28.59c-30.395-8.318-56.144-18.249-74.478-28.699-12.088-6.894-18.624-12.725-21.668-16.211 3.044-3.487 9.58-9.318 21.668-16.211z"></path>
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
