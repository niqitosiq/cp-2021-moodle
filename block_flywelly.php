<?php

global $PAGE;

class block_flywelly extends block_base {
  public function init() {
    $this->title = 'flywelly';
    global $DB;
    global $USER;
    // $pos = $DB->get_record('flywelly_pos', ['userId' => $USER->id]);
    // if (!$pos) {
    //   $DB->insert_record('flywelly_pos', ['userId' => $USER->id, 'cell' => '0']);
    //   $DB->delete_records('flywelly_rolls', ['userId' => $USER->id]);
    //   $DB->insert_record('flywelly_rolls', ['userId' => $USER->id, 'rolls' => 0]);
    // }
  }

  protected function getTriesLeft () {
    // global $DB;
    // global $USER;
    // $tries = $DB->get_record('flywelly_rolls', ['userId' => $USER->id]);
    // if ($tries) return $tries;
    return 0;
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
    $triesLeft = $this->getTriesLeft();
    $PAGE->requires->js(new moodle_url($CFG->wwwroot . '/blocks/flywelly/walker/public/bundle.js'));
    $PAGE->requires->css(new moodle_url($CFG->wwwroot . '/blocks/flywelly/walker/public/bundle.css'));
    $this->content->text = '<div id="walker" data-user='. $USER->id .' tries-left='. $triesLeft .'></div>';
    // $this->content->text = file_get_contents(__DIR__.'/walker/public/index.html');
    $this->content->footer = '';
    return $this->content;
  }

}

?>