<?php
require(__DIR__.'/../../config.php');

header('Content-Type: application/json');
echo json_encode($DB->delete_records('flywellx', ['id' => $_GET['id']]), JSON_PRETTY_PRINT);