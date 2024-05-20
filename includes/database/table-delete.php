<?php

function mps_delete_table() {
    global $wpdb;

    $wpdb->query('DROP TABLE IF EXISTS ' . MPS_TABLE_NAME);

    delete_option('plugin_name_db_version');
}

