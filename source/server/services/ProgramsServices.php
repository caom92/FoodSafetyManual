<?php

namespace fsm\services;

require_once realpath(dirname(__FILE__).'/Service.php');
require_once realpath(dirname(__FILE__).'/../dao/ProgramsDAO.php');

use fsm\database as db;


// Service that returns a list of all programs
class ListAllProgramsService implements Service
{
    // Returns an associative array of associative arrays which describe the 
    // user permission and input arguments values and formats that this service 
    // is expecting to recieve 
    function getRequirementsDescriptor()
    {
        return [
            'logged_in' => [ 'Administrator' ]
        ];
    }


    // Starts execution of the service
    function execute()
    {
        $programs = new db\ProgramsDAO();
        return $programs->selectAll();
    }
}


// Service that lists all the programs and their modules
class ListAllProgramsAndModules implements Service
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
        $programsTable = new db\ProgramsDAO();
        $modulesTable = new db\ModulesDAO();
        
        $output = [];
        $programs = $programsTable->selectAll();

        foreach ($programs as $program) {
            $modules = $modulesTable->selectByProgramID($program['id']);
            $program['modules'] = $modules;
            array_push($output, $program);
        }

        return $output;
    }
}

?>