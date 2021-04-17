<?php
global $CFG;
require(__DIR__.'/../../config.php');

$user = $_GET['id'];

header('Content-Type: application/json');
echo json_encode(['pos' => file_get_contents(__DIR__ . "storage/$user")], JSON_PRETTY_PRINT);