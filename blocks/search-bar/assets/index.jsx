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
        <path d="M884.298 832.456l-146.603-146.816c45.549-57.392 73.073-130.885 73.073-210.804 0-188.106-152.49-340.596-340.596-340.596s-340.596 152.49-340.596 340.596c0 188.106 152.49 340.596 340.596 340.596 84.663 0 162.116-30.895 221.693-82.016l-0.459 0.383 145.58 145.752c6.080 6.292 14.602 10.205 24.027 10.205 18.445 0 33.398-14.954 33.398-33.398 0-9.409-3.89-17.909-10.152-23.977l-0.012-0.011zM197.573 475.394c0-0.051 0-0.108 0-0.172 0-150.982 122.395-273.378 273.378-273.378s273.378 122.395 273.378 273.378c0 150.924-122.297 273.282-273.199 273.378h-0.012c-150.93-0.073-273.283-122.308-273.547-273.184v-0.027z"></path>
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
