<?php

namespace fsm\services;

require_once realpath(dirname(__FILE__).'/Service.php');

// Service that does nothing
class NullService implements Service
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
        return [];
    }
}

?>