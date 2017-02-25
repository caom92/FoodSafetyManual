<?php

namespace fsm\services\program;


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
function getAllPrograms($scope, $request) 
{
    return $scope->programs->selectAll();
}


// Returns a list of all the modules of the specified program
function getAllModulesOfProgram($scope, $request) 
{
    return $scope->modules->selectByProgramID($request['program_id']);
}

?>