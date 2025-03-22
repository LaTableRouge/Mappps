<?php

/**
 * Handle plugin translations
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
 * Load plugin text domain
 *
 * @since 1.0.0
 * @return void
 */
function load_textdomain(): void {
    load_plugin_textdomain(
        'mappps',
        false,
        MPPPS_BASE_NAME . '/lang'
    );
}
add_action('init', __NAMESPACE__ . '\load_textdomain');
