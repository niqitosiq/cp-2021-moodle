<?php
require(__DIR__.'/../../config.php');

header('Content-Type: application/json');
echo json_encode(['msg' => $DB->get_record_sql('SELECT * FROM {user} WHERE id = ?', [$_GET['id']])], JSON_PRETTY_PRINT);