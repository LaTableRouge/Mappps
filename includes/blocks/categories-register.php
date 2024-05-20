<?php

function mps_category($categories, $post) {
    $category_slugs = wp_list_pluck($categories, 'slug');

    return in_array('maaaps', $category_slugs, true) ? $categories : array_merge(
        [
            [
                'slug' => 'maaaps',
                'title' => __('Maaaps - Blocks', 'maaaps'),
                'icon' => null, // Pour la gestion de l'icone de la catégorie voir editor.js
            ],
        ],
        $categories
    );
}
add_filter('block_categories_all', 'mps_category', 10, 2);
