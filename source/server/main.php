<?php

// Import the controller
require_once realpath(dirname(__FILE__).'/Controller.php');
require_once realpath(dirname(__FILE__).'/services/services.php');

// Configure PHP to write the errors to a log file
ini_set("log_errors", true);
ini_set("error_log", fsm\LOG_FILE);

// Execute the controller
$controller = new fsm\Controller($serverServices + $sessionServices
    + $accountServices + $zoneServices + $programServices + $inventoryServices 
    + $authorizationServices + $gmpPackingPreopServices);
$controller->serveRemoteClient($_POST);

?>
