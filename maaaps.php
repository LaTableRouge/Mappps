<?php
/**
 * Plugin Name: Maaaps
 * Plugin URI: https://github.com/MLNOP/Maaaps
 * Description: A plugin that dsiplay maps
 * Tags: leaflet, maps, openstreetmap
 * Author: LaTableRouge
 * Author URI: https://mlnop.fr/
 * Requires at least: 6.2
 * Tested up to: 6.3
 * Requires PHP: 8.0
 * Version: 0.0.1
 * Stable tag: 0.0.1
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

global $wpdb;
if (!function_exists('get_plugin_data')) {
    require_once ABSPATH . 'wp-admin/includes/plugin.php';
}
define('MPS_VITE_DEVELOPMENT', false);
define('MPS_PATH', plugin_dir_path(__FILE__));
define('MPS_REACT_PATH', MPS_PATH . 'blocks/build');
define('MPS_BASE_NAME', basename(dirname(__FILE__)));
define('MPS_TABLE_NAME', $wpdb->prefix . 'maaaps');

/*
* ====== DATABASE
* Create/Delete custom table
* Fill in the table with default settings
* Set up hook with uninstall/active plugin
*/
require MPS_PATH . 'includes/database/table-create.php';
require MPS_PATH . 'includes/database/table-delete.php';
require MPS_PATH . 'includes/database/table-fill.php';
register_activation_hook(__FILE__, 'mps_create_table');
register_activation_hook(__FILE__, 'mps_fill_table');
register_uninstall_hook(__FILE__, 'mps_delete_table');

require MPS_PATH . 'includes/load-textdomain.php';

/*
* ====== Pages
* Register pages
*/
require MPS_PATH . 'includes/register-page.php';

/*
* ====== Blocks
* Register une catégorie pour les blocks
* Enqueue les blocs react
*/
require MPS_PATH . 'includes/blocks/categories-register.php';
require MPS_PATH . 'includes/blocks/blocks-register.php';
