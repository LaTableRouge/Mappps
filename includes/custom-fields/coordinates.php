<?php

declare(strict_types=1);

if (!defined('ABSPATH')) {
    exit;
} // Exit if accessed directly

function mppps_register_coordinates_field(): void {
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

            register_meta(
                $post_type,
                'routing_coordinates',
                [
                    'show_in_rest' => true,
                    'single' => true,
                    'type' => 'array',
                    'show_in_rest' => [
                        'schema' => [
                            'type' => 'array',
                            'items' => [
                                'type' => 'array',
                                'items' => [
                                    'type' => 'number',
                                ],
                            ],
                        ],
                        'prepare_callback' => function ( $value ) {
                            return !empty($value) ? json_decode($value, true) : null;
                        },
                    ],
                ]
            );
        }
    }

}
add_action('init', 'mppps_register_coordinates_field');
