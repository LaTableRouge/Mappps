<?php

/**
 * Handle plugin links
 *
 * @package Mappps
 */

declare(strict_types=1);

namespace Mappps;

// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Add a settings link on the plugins list page.
 *
 * @param array $actions Existing plugin action links.
 * @param string $plugin_file The plugin file.
 * @return array Modified plugin action links.
 */

function add_settings_link(array $actions, string $plugin_file): array {
    if ($plugin_file === plugin_basename(\MPPPS_BASE_FILE)) {
        $url = admin_url('admin.php?page=mppps_admin');
        $actions[] = sprintf(
            '<a href="%s" aria-label="%s">%s</a>',
            esc_url($url),
            esc_attr__('Go to Mappps settings page', 'mappps'),
            esc_html__('Settings', 'mappps')
        );
    }

    return $actions;
}
add_filter('plugin_action_links', __NAMESPACE__ . '\add_settings_link', 10, 2);

/**
 * Add extra links under the plugin description on the plugins page.
 *
 * @param array  $links Existing row meta links.
 * @param string $file  Current plugin file.
 * @return array Modified row meta links.
 */
function plugin_row_meta(array $links, string $file): array {
    if ($file === plugin_basename(\MPPPS_BASE_FILE)) {
        $extra_links = [
            sprintf(
                '<a href="%s" target="_blank" rel="noopener noreferrer" aria-label="%s">%s</a>',
                esc_url('https://wordpress.org/plugins/mappps/#developers'),
                esc_attr__('View Mappps changelog on WordPress.org (opens in a new tab)', 'mappps'),
                esc_html__('Changelog', 'mappps')
            ),
        ];
        $links = array_merge($links, $extra_links);
    }

    return $links;
}
add_filter('plugin_row_meta', __NAMESPACE__ . '\plugin_row_meta', 10, 2);
