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
        <path d="M409.020 203.066c0-56.874 46.106-102.98 102.98-102.98s102.98 46.106 102.98 102.98c0 56.874-46.106 102.98-102.98 102.98s-102.98-46.106-102.98-102.98zM736.454 512c0 0 0 0 0 0 0-46.658 37.822-84.48 84.48-84.48s84.48 37.82 84.48 84.48c0 0 0 0 0 0 0 46.658-37.822 84.48-84.48 84.48s-84.48-37.822-84.48-84.48zM653.936 730.45c0-42.26 34.258-76.512 76.512-76.512s76.512 34.258 76.512 76.512c0 42.26-34.258 76.512-76.512 76.512s-76.512-34.258-76.512-76.512zM442.699 820.934c0-38.272 31.027-69.301 69.301-69.301s69.301 31.027 69.301 69.301c0 38.272-31.027 69.301-69.301 69.301s-69.301-31.027-69.301-69.301zM230.783 730.45c0-34.664 28.102-62.766 62.766-62.766s62.766 28.102 62.766 62.766c0 34.664-28.102 62.766-62.766 62.766s-62.766-28.102-62.766-62.766zM146.217 512c0-31.397 25.45-56.85 56.85-56.85s56.85 25.45 56.85 56.85c0 31.397-25.45 56.85-56.85 56.85s-56.85-25.45-56.85-56.85zM242.064 293.551c0 0 0 0 0 0 0-28.434 23.051-51.49 51.49-51.49s51.49 23.051 51.49 51.49c0 0 0 0 0 0 0 28.434-23.051 51.49-51.49 51.49s-51.49-23.051-51.49-51.49zM823.72 293.551c0 51.508-41.76 93.272-93.274 93.272-51.508 0-93.274-41.764-93.274-93.272 0-51.516 41.766-93.272 93.274-93.272 51.514 0 93.274 41.756 93.274 93.272z"></path>
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
