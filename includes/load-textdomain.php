<?php

if (!defined('ABSPATH')) {
    exit;
} // Exit if accessed directly

function mppps_load_textdomain() {
    load_plugin_textdomain(
        'mappps',
        false,
        MPPPS_BASE_NAME . '/lang'
    );
}
add_action('init', 'mppps_load_textdomain');
