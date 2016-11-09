<?php

namespace fsm\services;

require_once realpath(dirname(__FILE__).'/Service.php');
require_once realpath(dirname(__FILE__).'/../dao/DataAccessObject.php');

use fsm\database as db;


// Service for checking if the data base server is available for use 
class CheckServerStatusService implements Service
{
    // Returns an associative array of associative arrays which describe the 
    // user permission and input arguments values and formats that this service 
    // is expecting to recieve 
    function getRequirementsDescriptor()
    {
        return [];
    }


    // Starts execution of the service
    function execute()
    {
        return isset(db\DataAccessObject::$dataBase);
    }
}

?>