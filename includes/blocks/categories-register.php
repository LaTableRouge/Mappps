<?php

if (!defined('ABSPATH')) {
    exit;
} // Exit if accessed directly

function mppps_category($categories, $post) {
    $category_slugs = wp_list_pluck($categories, 'slug');

    return in_array('mappps', $category_slugs, true) ? $categories : array_merge(
        [
            [
                'slug' => 'mappps',
                'title' => __('Mappps - Blocks', 'mappps'),
                'icon' => null, // Pour la gestion de l'icone de la catégorie voir editor.js
            ],
        ],
        $categories
    );
}
add_filter('block_categories_all', 'mppps_category', 10, 2);
