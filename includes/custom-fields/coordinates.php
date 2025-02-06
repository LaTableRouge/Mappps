<?php

declare(strict_types=1);

namespace Mappps\CustomFields;

if (!defined('ABSPATH')) {
    exit;
} // Exit if accessed directly

function register_coordinates_field(): void {
    $post_types = get_post_types(['show_in_rest' => true]);
    foreach ($post_types as $post_type) {
        // Only register the meta field if the post type supports the editor, custom fields, and revisions.
        if (
            post_type_supports( $post_type, 'editor' )
            && post_type_supports( $post_type, 'custom-fields' )
        ) {
            register_meta(
                $post_type,
                'lat',
                [
                    'show_in_rest' => true,
                    'single' => true,
                    'type' => 'number',
                    'sanitize_callback' => 'wp_strip_all_tags'
                ]
            );

            register_meta(
                $post_type,
                'lng',
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
add_action('init', __NAMESPACE__ . '\register_coordinates_field');
