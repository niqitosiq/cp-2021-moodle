<?php

// Disable moodle specific debug messages and any errors in output.
if (!defined('NO_DEBUG_DISPLAY')) {
    define('NO_DEBUG_DISPLAY', true);
}

require_once('config.php');
require_once('lib/filelib.php');

if (empty($relativepath)) {
    $relativepath = get_file_argument();
}
$forcedownload = optional_param('forcedownload', 0, PARAM_BOOL);
$preview = optional_param('preview', null, PARAM_ALPHANUM);
// Offline means download the file from the repository and serve it, even if it was an external link.
// The repository may have to export the file to an offline format.
$offline = optional_param('offline', 0, PARAM_BOOL);
$embed = optional_param('embed', 0, PARAM_BOOL);
file_pluginfile($relativepath, $forcedownload, $preview, $offline, $embed);