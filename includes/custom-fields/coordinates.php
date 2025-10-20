<?php

declare(strict_types=1);

namespace Mappps\CustomFields;

if (!defined('ABSPATH')) {
    exit;
} // Exit if accessed directly

function register_coordinates_field(): void {
    $post_types = get_post_types(['show_in_rest' => true]);
    $meta_fields = ['lat', 'lng'];

    foreach ($post_types as $post_type) {
        // Only register the meta field if the post type supports the editor, custom fields, and revisions.
        if (
            post_type_supports( $post_type, 'editor' )
            && post_type_supports( $post_type, 'custom-fields' )
        ) {
            foreach ($meta_fields as $meta_field) {
                register_meta(
                    $post_type,
                    $meta_field,
                    [
                        'show_in_rest' => true,
                        'single' => true,
                        'type' => 'number',
                        'sanitize_callback' => 'wp_strip_all_tags'
                    ]
                );
            }
        }
    }

}
add_action('init', __NAMESPACE__ . '\register_coordinates_field');
