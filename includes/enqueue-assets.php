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

    $scripts_handle = 'mps_scripts';
    $styles_handle = 'mps_styles';

    wp_enqueue_script(
        $scripts_handle,
        MPS_URL . 'build/index.js',
        $asset['dependencies'],
        $asset['version'],
        ['in_footer' => true]
    );

    if (is_rtl()) {
        wp_enqueue_style(
            $styles_handle,
            MPS_URL . 'build/index-rtl.css',
            [],
            $asset['version'],
            'screen'
        );
    }else {
        wp_enqueue_style(
            $styles_handle,
            MPS_URL . 'build/index.css',
            [],
            $asset['version'],
            'screen'
        );
    }

    wp_set_script_translations(
        $scripts_handle,
        'maaaps',
        MPS_LANG_PATH
    );
}
add_action('admin_enqueue_scripts', 'mps_enqueue_assets');
