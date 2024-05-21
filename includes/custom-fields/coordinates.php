<?php

function mps_register_coordinates_field() {
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
add_action('init', 'mps_register_coordinates_field');
