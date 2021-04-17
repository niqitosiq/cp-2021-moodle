<?php
global $CFG;
require(__DIR__.'/../../config.php');

function file_force_contents($dir, $contents){
    $parts = explode('/', $dir);
    $file = array_pop($parts);
    $dir = '';
    foreach($parts as $part)
        if(!is_dir($dir .= "/$part")) mkdir($dir, 0744);
    file_put_contents("$dir/$file", $contents);
}

$user = $_GET['id'];
$pos = $_GET['pos'];

file_force_contents(__DIR__ . "storage/$user", $pos);

header('Content-Type: application/json');
echo json_encode(['msg' => 'ok'], JSON_PRETTY_PRINT);