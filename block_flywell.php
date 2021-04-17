<?php

class block_flywell extends block_base {
  public function init() {
    $this->title = 'Flywell';
  }

  public function get_content() {
    if ($this->content !== null) {
      return $this->content;
    }
 
    $this->content = new stdClass;
    $this->content->text = '<div id="walker"></div><style>'.file_get_contents(__DIR__.'/walker/public/bundle.css').'</style><script>'.file_get_contents(__DIR__.'/walker/public/bundle.js').'</script>';
    $this->content->footer = 'Привет, мир на русском';
    return $this->content;
  }
}

?>