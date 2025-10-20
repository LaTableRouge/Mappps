<?php

declare(strict_types=1);

namespace Mappps\CustomFields;

if (!defined('ABSPATH')) {
    exit;
} // Exit if accessed directly

function register_image_field(): void {
    $post_types = get_post_types(['show_in_rest' => true]);
    foreach ($post_types as $post_type) {
        // Only register the meta field if the post type supports the editor, custom fields, and revisions.
        if (
            post_type_supports($post_type, 'editor')
            && post_type_supports($post_type, 'custom-fields')
        ) {
            register_meta(
                $post_type,
                'mappps_marker',
                [
                    'show_in_rest' => true,
                    'single' => true,
                    'type' => 'string',
                    'sanitize_callback' => 'wp_strip_all_tags',
                    'description' => __('Mappps custom image field for posts/pages', 'mappps')
                ]
            );
        }
    }
}
add_action('init', __NAMESPACE__ . '\register_image_field');

/**
 * Enqueue media selector scripts
 */
function enqueue_media_selector_scripts(): void {
    global $post;

    if (!$post) {
        return;
    }

    // Only add to post types that support custom fields
    if (!post_type_supports($post->post_type, 'custom-fields')) {
        return;
    }

    // Enqueue WordPress media scripts
    wp_enqueue_media();

    // Enqueue our custom script
    wp_enqueue_script(
        'mappps-media-selector',
        MPPPS_URL . 'includes/custom-fields/media-selector.js',
        [],
        '1.0.0',
        true
    );

    // Localize script with REST API URL
    wp_localize_script('mappps-media-selector', 'mapppsMediaSelector', [
        'restUrl' => rest_url('wp/v2/'),
        'nonce' => wp_create_nonce('wp_rest')
    ]);
}

/**
 * Add media selector to custom fields
 */
function add_media_selector_to_custom_fields(): void {
    // This function is no longer needed since we're using external JS file
    // The script is now enqueued properly via admin_enqueue_scripts
}
add_action('admin_enqueue_scripts', __NAMESPACE__ . '\enqueue_media_selector_scripts');

// AJAX handler removed - using REST API only
