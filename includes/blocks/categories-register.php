<?php

/**
 * Register block categories
 *
 * @package Mappps
 * @subpackage Blocks
 */

declare(strict_types=1);

namespace Mappps\Blocks;

// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Register custom block category
 *
 * @since 1.0.0
 * @param array    $categories Array of block categories
 * @return array Modified block categories
 */
function register_block_category(array $categories): array {
    $category_slugs = wp_list_pluck($categories, 'slug');

    if (in_array('mappps', $category_slugs, true)) {
        return $categories;
    }

    return array_merge(
        [
            [
                'slug' => 'mappps',
                'title' => __('Mappps - Blocks', 'mappps'),
                'icon' => null,
            ],
        ],
        $categories
    );
}
add_filter('block_categories_all', __NAMESPACE__ . '\register_block_category', 10);
