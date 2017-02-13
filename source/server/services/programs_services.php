<?php

namespace fsm\services\program;

require_once realpath(dirname(__FILE__).'/../dao/ProgramsDAO.php');
require_once realpath(dirname(__FILE__).'/../dao/ModulesDAO.php');

use fsm\database as db;


$programServices = [
    'list-programs' => [
        'requirements_desc' => [
            'logged_in' => [ 'Administrator' ]
        ],
        'callback' => 'fsm\services\program\getAllPrograms'
    ],
    'get-modules-of-program' => [
        'requirements_desc' => [
            'logged_in' => [ 'Administrator' ],
            'program_id' => [
                'type' => 'int',
                'min' => 1
            ]
        ],
        'callback' => 'fsm\services\program\getAllModulesOfProgram'
    ]
];

// Returns a list of all programs
function getAllPrograms($request) 
{
    $programs = new db\ProgramsDAO();
    return $programs->selectAll();
}


// Returns a list of all the modules of the specified program
function getAllModulesOfProgram($request) 
{
    $modules = new db\ModulesDAO();
    return $modules->selectByProgramID($request['program_id']);
}

?>