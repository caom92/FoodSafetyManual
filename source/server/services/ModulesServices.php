<?php

namespace fsm\services;

require_once realpath(dirname(__FILE__).'/Service.php');
require_once realpath(dirname(__FILE__).'/../dao/ModulesDAO.php');

use fsm\database as db;

// Service that returns a list of all the modules of the specified program
class ListModulesOfProgramService implements Service
{
    // Returns an associative array of associative arrays which describe the 
    // user permission and input arguments values and formats that this service 
    // is expecting to recieve 
    function getRequirementsDescriptor()
    {
        return [
            'logged_in' => [ 'Administrator' ],
            'program_id' => [
                'type' => 'int'
            ]
        ];
    }


    // Starts execution of the service
    function execute()
    {
        $modules = new db\ModulesDAO();
        return $modules->selectByProgramID($_POST['program_id']);
    }
}

?>