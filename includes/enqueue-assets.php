<?php

if (!defined('ABSPATH')) {
    exit;
} // Exit if accessed directly

// See: https://developer.wordpress.org/news/2024/03/26/how-to-use-wordpress-react-components-for-plugin-pages/

function mppps_enqueue_assets($admin_page) {
    if ($admin_page !== 'toplevel_page_mppps_admin') {
        return;
    }

    $asset_file = MPPPS_PATH . 'build/index.asset.php';

    if (!file_exists($asset_file)) {
        return;
    }

    $asset = include $asset_file;

    $handle = 'mppps_scripts';

    wp_enqueue_script(
        $handle,
        MPPPS_URL . 'build/index.js',
        $asset['dependencies'],
        $asset['version'],
        ['in_footer' => true]
    );

    wp_set_script_translations(
        $handle,
        'mappps',
        MPPPS_LANG_PATH
    );
}
add_action('admin_enqueue_scripts', 'mppps_enqueue_assets');
