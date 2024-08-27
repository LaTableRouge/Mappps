<?php

if (!defined('ABSPATH')) {
    exit;
} // Exit if accessed directly

function mppps_register_react_blocks() {
    /**
     * Registers the blocks using the metadata loaded from the `block.json` files.
     * Behind the scenes, it registers also all assets so they can be enqueued
     * through the block editor in the corresponding context.
     *
     * @see https://developer.wordpress.org/reference/functions/register_block_type/
     */
    $blocks = [];
    $blocks = glob(MPPPS_REACT_PATH . '/**/block.json');

    if (!empty($blocks)) {
        foreach ($blocks as $block) {
            if (file_exists($block)) {

                // Get all the block metadata
                $metadata = wp_json_file_decode($block, ['associative' => true]);
                if (!is_array($metadata) || empty($metadata['name'])) {
                    continue;
                }

                // Register the block
                $metadata['file'] = wp_normalize_path(realpath($block));
                register_block_type($metadata['file']);

                // Handle translation for the block
                $scriptEditorHandle = generate_block_asset_handle($metadata['name'], 'editorScript');
                $scriptHandle = generate_block_asset_handle($metadata['name'], 'viewScript');
                $handles = [];
                if (is_array($scriptEditorHandle)) {
                    array_merge($handles, $scriptEditorHandle);
                } else {
                    $handles[] = $scriptEditorHandle;
                }
                if (is_array($scriptHandle)) {
                    array_merge($handles, $scriptHandle);
                } else {
                    $handles[] = $scriptHandle;
                }

                if (!empty($handles)) {
                    foreach ($handles as $handle) {
                        wp_set_script_translations(
                            $handle,
                            'mappps',
                            get_template_directory() . '/lang'
                        );
                        wp_localize_script(
                            $handle,
                            'fw_data',
                            [
                                'url' => get_site_url(),
                                'rest_url' => get_rest_url(null, ''),
                            ]
                        );
                    }
                }
            }
        }
    }
}
add_action('init', 'mppps_register_react_blocks');
