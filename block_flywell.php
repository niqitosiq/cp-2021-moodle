<?php

global $PAGE;

class block_flywell extends block_base {
  public function init() {
    $this->title = 'Flywell';
  }

  public function get_content() {
    global $PAGE;
    if ($this->content !== null) {
      return $this->content;
    }
 
    $this->content = new stdClass;
    global $PAGE;
    global $CFG;
    $PAGE->requires->js(new moodle_url($CFG->wwwroot . '/blocks/flywell/walker/public/bundle.js'));
    $PAGE->requires->css(new moodle_url($CFG->wwwroot . '/blocks/flywell/walker/public/bundle.css'));
    $this->content->text = '<div id="walker"></div>';
    // $this->content->text = file_get_contents(__DIR__.'/walker/public/index.html');
    $this->content->footer = 'Привет, мир на русском';
    return $this->content;
  }

}

?>