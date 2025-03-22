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
        <path d="M395.731 240.706h-193.783v542.588h193.783v-542.588zM473.246 240.706v542.588h348.807v-542.588h-348.807zM124.437 240.706c0-42.634 34.88-77.515 77.515-77.515h620.102c42.809 0 77.515 34.702 77.515 77.515v0 542.588c0 42.809-34.702 77.515-77.515 77.515v0h-620.102c-42.809 0-77.515-34.702-77.515-77.515v0-542.588zM240.706 279.462h116.269v77.515h-116.269v-77.515zM240.706 395.731h116.269v77.515h-116.269v-77.515zM240.706 512h116.269v77.515h-116.269v-77.515z"></path>
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
