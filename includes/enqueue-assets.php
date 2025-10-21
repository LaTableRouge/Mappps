<?php

declare(strict_types=1);

namespace Mappps;

if (!defined('ABSPATH')) {
    exit;
} // Exit if accessed directly

// See: https://developer.wordpress.org/news/2024/03/26/how-to-use-wordpress-react-components-for-plugin-pages/

function enqueue_assets(string $admin_page): void {
    global $post;

    $asset_file = MPPPS_PATH . 'build/index.asset.php';

    if (!file_exists($asset_file)) {
        return;
    }

    $asset = include $asset_file;

    $scripts_handle = 'mppps_scripts';
    $styles_handle = 'mppps_styles';

    wp_enqueue_script(
        $scripts_handle,
        MPPPS_URL . 'build/index.js',
        $asset['dependencies'],
        $asset['version'],
        ['in_footer' => true]
    );

    if (is_rtl()) {
        wp_enqueue_style(
            $styles_handle,
            MPPPS_URL . 'build/index-rtl.css',
            [],
            $asset['version'],
            'screen'
        );
    }else {
        wp_enqueue_style(
            $styles_handle,
            MPPPS_URL . 'build/index.css',
            [],
            $asset['version'],
            'screen'
        );
    }

    wp_set_script_translations(
        $scripts_handle,
        'mappps',
        MPPPS_LANG_PATH
    );

    wp_localize_script($scripts_handle, 'mappps_admin_args', [
        'is_admin_page' => $admin_page === 'toplevel_page_mppps_admin' ? 'true' : 'false',
        'supports_custom_fields' => $post && post_type_supports($post->post_type, 'custom-fields') ? 'true' : 'false'
    ]);
}
add_action('admin_enqueue_scripts', __NAMESPACE__ . '\enqueue_assets');
