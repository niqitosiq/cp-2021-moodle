<?php

global $PAGE;

class block_flywell extends block_base {
  public function init() {
    $this->title = 'Flywell';
    global $DB;
    global $USER;
    $DB->execute('DROP TABLE IF EXISTS "x_tries"');
    print_r($DB->execute('CREATE TABLE IF NOT EXISTS "x_tries" ("userId" INTEGER, "tries" INTEGER)'));
    // $res = $DB->get_record('x_tries', ['userId' => '1']);
    // if (!$res) {
    //   $DB->insert_record('x_tries', ['userId' => $USER->id, 'tries' => 5]);
    // } 
  }

  protected function getTriesLeft () {
    // global $DB;
    // global $USER;
    // $res = $DB->get_record('x_tries', ['id' => $USER->id]);
    // if ($res) return $res;
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
    $PAGE->requires->js(new moodle_url($CFG->wwwroot . '/blocks/flywell/walker/public/bundle.js'));
    $PAGE->requires->css(new moodle_url($CFG->wwwroot . '/blocks/flywell/walker/public/bundle.css'));
    $this->content->text = '<div id="walker" data-user='. $USER->id .' tries-left='. $triesLeft .'></div>';
    // $this->content->text = file_get_contents(__DIR__.'/walker/public/index.html');
    $this->content->footer = '';
    return $this->content;
  }

}

?>