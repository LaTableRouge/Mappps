<?php

function mps_register_page() {
    $svgString = '';
    $svgPath = MPS_PATH . '/build/img/block-icon.svg';
    if (file_exists($svgPath)) {
        $svg = file_get_contents($svgPath);
        $svgString = 'data:image/svg+xml;base64,' . base64_encode($svg);
    }

    add_menu_page(
        __('Setup', 'maaaps'),
        __('Maaaps', 'maaaps'),
        'manage_options',
        MPS_BASE_NAME . '/templates/admin.php',
        '',
        $svgString
    );
}
add_action('admin_menu', 'mps_register_page');
