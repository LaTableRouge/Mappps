<?php
/**
 * Plugin Name: Maaaps
 * Plugin URI: https://github.com/LaTableRouge/Maaaps
 * Description: A plugin that dsiplay maps
 * Tags: leaflet, maps, openstreetmap
 * Author: LaTableRouge
 * Author URI: https://mlnop.fr/
 * Requires at least: 6.2
 * Tested up to: 6.3
 * Requires PHP: 8.0
 * Version: 0.0.6
 * Stable tag: 0.0.6
 * Text Domain: maaaps
 * Domain Path: /lang
 * License: GPLv2 or later
 */

/*
This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version
2 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
with this program. If not, visit: https://www.gnu.org/licenses/

Copyright 2024 Monzilla Media. All rights reserved.
*/

if (!function_exists('get_plugin_data')) {
    require_once ABSPATH . 'wp-admin/includes/plugin.php';
}
define('MPS_PATH', plugin_dir_path(__FILE__));
define('MPS_URL', plugin_dir_url(__FILE__));
define('MPS_REACT_PATH', MPS_PATH . 'blocks/build');
define('MPS_LANG_PATH', MPS_PATH . 'lang');
define('MPS_BASE_NAME', basename(dirname(__FILE__)));

/*
* ====== Admin page
* Register page
* Enqueue assets
*/
require MPS_PATH . 'includes/register-page.php';
require MPS_PATH . 'includes/enqueue-assets.php';

/*
* ====== Blocks
* Register a new block category
* Enqueue react blocks
*/
require MPS_PATH . 'includes/custom-fields/coordinates.php';
require MPS_PATH . 'includes/blocks/categories-register.php';
require MPS_PATH . 'includes/blocks/blocks-register.php';
