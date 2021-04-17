<?php
require(__DIR__.'/../../config.php');

header('Content-Type: application/json');
$ans = $DB->get_record_sql('SELECT * FROM {flywellx} WHERE id = ?', [$_GET['id']]);

if ($ans) {
    $json = json_decode(file_get_contents('db'));
    $json->tries++;
} else {
    $DB->insert_record('flywellx', ['id'=>$_GET['id'], 'valuex'=>1]);
 }