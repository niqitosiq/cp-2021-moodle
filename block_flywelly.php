<?php

global $PAGE;

class block_flywelly extends block_base {
  public function init() {
    $this->title = 'flywelly';
  }

  protected function getTriesLeft ($uid) {
    global $DB;
    $ans = $DB->get_records('grade_grades', ['userid' => $uid]);
    $sum = 0;
    foreach ($ans as $f) {
        $sum += $f->rawgrade;
    }
    $res = $sum / 40;
    return intval($res);
    return 1;
  }

  public function get_content() {
    global $PAGE;
    if ($this->content !== null) {
      return $this->content;
    }
    
    global $USER;
    $this->content = new stdClass;
    global $PAGE;
    global $CFG;
    $triesLeft = $this->getTriesLeft($USER->id);
    $PAGE->requires->js(new moodle_url($CFG->wwwroot . '/blocks/flywelly/walker/public/bundle.js'));
    $PAGE->requires->css(new moodle_url($CFG->wwwroot . '/blocks/flywelly/walker/public/bundle.css'));
    $this->content->text = '<div id="walker" data-user='. $USER->id .' tries-left='. $triesLeft .'></div>';
    // $this->content->text = file_get_contents(__DIR__.'/walker/public/index.html');
    $this->content->footer = '';
    return $this->content;
  }

}

?>