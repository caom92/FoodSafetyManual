<?php

namespace fsm\services;

require_once realpath(dirname(__FILE__).'/Service.php');


use fsm\database as db;



class ListAllProgramsService implements Service
{
    // Returns an associative array of associative arrays which describe the 
    // user permission and input arguments values and formats that this service 
    // is expecting to recieve 
    function getRequirementsDescriptor()
    {
        return [
            
        ];
    }


    // Starts execution of the service
    function execute()
    {
        
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