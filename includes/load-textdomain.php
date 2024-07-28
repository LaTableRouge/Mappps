<?php

function mps_load_textdomain() {
    load_plugin_textdomain(
        'maaaps',
        false,
        MPS_BASE_NAME . '/lang/'
    );
}
add_action('init', 'mps_load_textdomain');
