<?php

// Import the controller
require_once realpath(dirname(__FILE__).'/Controller.php');

// Configure PHP to write the errors to a log file
ini_set("log_errors", true);
ini_set("error_log", "../".fsm\LOG_FILE);

// Execute the controller
fsm\Controller::execute();

?>