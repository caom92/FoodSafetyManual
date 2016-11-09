<?php

namespace fsm\services;

require_once realpath(dirname(__FILE__).'/Service.php');
require_once realpath(dirname(__FILE__).'/../dao/DAO.php');

use fsm\database as db;


// Service that lists the hardware of the specified workplace area
class ListWorkplaceAreaHardware implements Service
{
    // Returns an associative array of associative arrays which describe the 
    // user permission and input arguments values and formats that this service 
    // is expecting to recieve 
    function getRequirementsDescriptor()
    {
        return [
            'logged_in' => ['Administrator']
        ];
    }


    // Starts execution of the service
    function execute()
    {
        
    }
}

?>