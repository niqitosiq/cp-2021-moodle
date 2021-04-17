<?php
global $CFG;

require(__DIR__.'/../../config.php');
require_once($CFG->libdir . '/gradelib.php');

header('Content-Type: application/json');
$ans = $DB->get_records('grade_grades', ['userid' => $_GET['id']]);

$sum = 0;
foreach ($ans as $f) {
    $sum += $f->rawgrade;
}
$res = $sum / 40;
echo json_encode(["dices" => intval($res), "rating" => $sum], JSON_PRETTY_PRINT);