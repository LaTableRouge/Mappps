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
require MPS_PATH . 'includes/custom-fields/coordinates.php';
require MPS_PATH . 'includes/blocks/categories-register.php';
require MPS_PATH . 'includes/blocks/blocks-register.php';

// function h5_create_custom_post_type() {
//     // Set UI labels for Custom Post Type
//     $labels = [
//         'name' => _x('Voitures', 'Post Type General Name'),
//         'singular_name' => _x('Voiture', 'Post Type Singular Name'),
//         'menu_name' => __('Voitures'),
//         'all_items' => __('Toutes les voitures'),
//         'view_item' => __('Voir les voitures'),
//         'add_new_item' => __('Ajouter une voiture'),
//         'add_new' => __('Ajouter'),
//         'edit_item' => __('Editer la voiture'),
//         'update_item' => __('Mettre à jour la voiture'),
//         'search_items' => __('Rechercher une voiture'),
//         'not_found' => __('Non trouvé'),
//         'not_found_in_trash' => __('Non trouvé dans la corbeille'),
//     ];

//     // Set other options for Custom Post Type
//     $args = [
//         'label' => __('Voitures'),
//         'description' => __('Voitures'),
//         'labels' => $labels,
//         // Features this CPT supports in Post Editor
//         'supports' => ['title', 'editor', 'excerpt', 'author', 'thumbnail', 'comments', 'revisions', 'custom-fields'],
//         // Possibilité d'associer ce cpt avec une/plusieurs taxonomy ou une/plusieurs custom taxonomies
//         //'taxonomies' => ['marques', 'couleurs'],
//         'taxonomies' => ['marques'],
//         /* A hierarchical CPT is like Pages and can have
//         * Parent and child items. A non-hierarchical CPT
//         * is like Posts.
//         */
//         'hierarchical' => true,
//         'public' => true,
//         'show_ui' => true,
//         'show_in_menu' => true,
//         'show_in_nav_menus' => true,
//         'show_in_admin_bar' => true,
//         'menu_icon' => 'NOM_DASHICON', // https://developer.wordpress.org/resource/dashicons/
//         'menu_position' => 5,
//         'has_archive' => true,
//         'exclude_from_search' => false,
//         'capability_type' => 'post',
//         'show_in_rest' => true,
//     ];

//     // Registering your Custom Post Type
//     register_post_type('voitures', $args);
// }

// // Hook into the 'init' action so that the function containing our post type registration is not unnecessarily executed.
// add_action('init', 'h5_create_custom_post_type', 0);

// /**
//  * Créer une taxonomy MARQUE pour un custom post type VOITURE
//  *
//  * @see register_post_type() for registering custom post types.
//  */
// function h5_custom_taxo_name() {
//     $labels = [
//         'name' => _x('Marques','taxonomy general name'),
//         'singular_name' => _x('Marque','taxonomy singular name'),
//         'search_items' => __('Chercher une marque'),
//         'all_items' => __('Toutes les marques'),
//         'edit_item' => __('Editer la marque'),
//         'update_item' => __('Mettre à jour la marque'),
//         'add_new_item' => __('Ajouter une marque'),
//         'new_item_name' => __('Nom de la nouvelle marque'),
//         'menu_name' => __('Marques'),
//     ];

//     $args = [
//         'hierarchical' => true,
//         'labels' => $labels,
//         'show_in_rest' => true,
//         'show_ui' => true,
//         'show_admin_column' => true,
//         'query_var' => true,
//         'rewrite' => ['slug' => 'marques'],
//     ];

//     register_taxonomy('marques','voitures', $args);
//     //Il est possible d'associer cette taxonomy à plusieurs CPT en déclarant d'autre cpt (motos ici)
//     //register_taxonomy( 'marques',['voitures', 'motos'], $args );
// }
// // hook into the init action and call h5_custom_taxo_name when it fires
// add_action('init', 'h5_custom_taxo_name', 0);
