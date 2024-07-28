<?php

// See: https://developer.wordpress.org/news/2024/03/26/how-to-use-wordpress-react-components-for-plugin-pages/

function mps_enqueue_assets($admin_page) {
    if ($admin_page !== 'toplevel_page_mps_admin') {
        return;
    }

    $asset_file = MPS_PATH . 'build/index.asset.php';

    if (!file_exists($asset_file)) {
        return;
    }

    $asset = include $asset_file;

    $handle = 'mps_scripts';

    wp_enqueue_script(
        $handle,
        MPS_URL . 'build/index.js',
        $asset['dependencies'],
        $asset['version'],
        ['in_footer' => true]
    );

    wp_set_script_translations(
        $handle,
        'maaaps',
        MPS_LANG_PATH
    );
}
add_action('admin_enqueue_scripts', 'mps_enqueue_assets');
