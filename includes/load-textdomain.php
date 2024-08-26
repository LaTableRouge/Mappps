<?php

function mps_load_textdomain() {
    load_plugin_textdomain(
        'mappps',
        false,
        MPS_BASE_NAME . '/lang'
    );
}
add_action('init', 'mps_load_textdomain');
