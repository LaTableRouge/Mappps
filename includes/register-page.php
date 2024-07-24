<?php

function mps_register_page() {
    $svgString = '<svg xmlns="http://www.w3.org/2000/svg" fill="black" width="20" height="20" viewBox="0 0 512 512"><path d="M336 96 176 32 0 96v384l176-64 160 64 176-64V32L336 96zM192 72.865l128 51.2v315.069l-128-51.199V72.865zM32 118.414l128-46.545v315.9L32 434.313V118.414zm448 275.172-128 46.546v-315.9l128-46.545v315.899z"/></svg>';
    // $svgPath = MPS_PATH . '/build/img/block-icon.svg';
    // if (file_exists($svgPath)) {
    // $svg = file_get_contents($svgPath);
    $svgString = 'data:image/svg+xml;base64,' . base64_encode($svgString);
    // }

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
