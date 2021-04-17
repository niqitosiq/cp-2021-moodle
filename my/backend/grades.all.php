<?php
global $CFG;

require(__DIR__.'/../../config.php');
require_once($CFG->libdir . '/gradelib.php');

header('Content-Type: application/json');
echo json_encode($DB->get_records('grade_grades'), JSON_PRETTY_PRINT);