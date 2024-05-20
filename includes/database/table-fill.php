<?php

function mps_fill_table() {
    global $wpdb;

    $dbDatas = $wpdb->get_results('SELECT * FROM ' . MPS_TABLE_NAME);
    if (count($dbDatas) === 0) {
        $wpdb->insert(
            MPS_TABLE_NAME,
            [
                'id' => 1,
                'blocks' => json_encode([]),
            ]
        );
    }
}
