<?php

namespace fsm\services;

// Interface that wraps an executable service into an object
interface Service
{
    // Returns an associative array of associative arrays which describe the 
    // user permission and input arguments values and formats that this service 
    // is expecting to recieve 
    function getRequirementsDescriptor();


    // Starts execution of the service
    function execute();
}

?>