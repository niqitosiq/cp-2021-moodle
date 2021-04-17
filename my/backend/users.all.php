<?php
require(__DIR__.'/../../config.php');

header('Content-Type: application/json');
echo json_encode($DB->get_records('user'), JSON_PRETTY_PRINT);