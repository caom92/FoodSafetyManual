<?php

namespace fsm\services\server;

require_once realpath(dirname(__FILE__).'/../dao/DataAccessObject.php');
require_once realpath(dirname(__FILE__).'/../Email.php');
require_once realpath(dirname(__FILE__).'/../dao/LogsDAO.php');
require_once realpath(dirname(__FILE__).'/../dao/CapturedLogsDAO.php');


use fsm\database as db;


$serverServices = [
    'status' => [
        'requirements_desc' => [],
        'callback' => 'fsm\services\server\checkStatus'
    ],
    'send-bug-report' => [
        'requirements_desc' => [
            'logged_in' => 'any',
            'zone-selection' => [
                'type' => 'string'
            ],
            'procedure-selection' => [
                'type' => 'string'
            ],
            'browser-selection' => [
                'type' => 'array',
                'optional' => true,
                'values' => [
                    'type' => 'string'
                ]
            ],
            'severity-selection' => [
                'type' => 'string'
            ],
            'module-selection' => [
                'type' => 'string',
                'optional' => true
            ],
            'summary' => [
                'type' => 'string',
                'min_length' => 3,
                'max_length' => 512
            ],
            'steps' => [
                'type' => 'string',
                'min_length' => 3,
                'max_length' => 512,
                'optional' => true
            ],
            'expectation' => [
                'type' => 'string',
                'min_length' => 3,
                'max_length' => 512,
                'optional' => true
            ],
            'reality' => [
                'type' => 'string',
                'min_length' => 3,
                'max_length' => 512,
                'optional' => true
            ],
            'files' => [
                'name' => 'screenshot-attachment',
                'optional' => true,
                'format' => 'bitmap'
            ],
            'lang' => [
                'type' => 'lang'
            ],
        ],
        'callback' => 'fsm\services\server\mailBugReport'
    ],
    'list-programs-modules-logs' => [
        'requirements_desc' => [
            'logged_in' => ['Administrator']
        ],
        'callback' => 'fsm\services\server\getAllProgramsModulesAndLogs'
    ]
];

// Checks if the data base server is available for use
function checkStatus($request) 
{
    return isset(db\DataAccessObject::$dataBase);
}


// Sends a bug report by email
function mailBugReport($request) 
{   
    // Create the email body by pasting all the posted data into it
    $body = "Usuario: " . $_SESSION["login-name"] . "<br>"
        . "ID de empleado: " . $_SESSION["user_id"] . "<br>"
        . "Zona: " . $request["zone-selection"] . "<br>"
        . "Programa: " . $request["procedure-selection"] . "<br>"
        . "Modulo: " . $request['module-selection'] . "<br>"
        . "Navegadores: ";

    // paste browsers
    foreach ($request["browser-selection"] as $browser) {
        $body .= $browser . " ";
    }

    // continue with the rest of the body
    $body .= "\n" . "Severidad: " . $request["severity-selection"] . "<br>"
        . "Resumen: " . $request["summary"] . "<br>"
        . "Pasos para reproducirlo: " . $request["steps"] . "<br>"
        . "Salida esperada: " . $request["expectation"] . "<br>"
        . "Salida obtenida: " . $request["reality"] . "<br>";

    $subject = 'Jacobs Farm - Del Cabo: Bug report';

    // create the email with the information that we created so far 
    $bugReport = new fsm\Email([
            'email' => 'caom92@live.com',
            'name' => 'Carlos Oliva'
        ],
        $subject, $body, 'es'
    );

    // array where the invalid bitmaps are going to be stored
    $invalidImages = [];

    // attach the image files
    if (isset($_FILES)) {
        $length = count($_FILES["screenshot-attachment"]["tmp_name"]);

        // for each file to be attached ...
        for ($i = 0; $i < $length; $i++) {
            // attach it to the email
            $bugReport->addAttachment(
                $_FILES["screenshot-attachment"]["tmp_name"][$i], 
                $_FILES["screenshot-attachment"]["name"][$i]
            );
        }
    }

    // send the email
    $result = $bugReport->send();

    // if the email could not be sent, throw en exception
    if (strlen($result) > 0) {
        throw new \Exception($result);
    }

    // if the email could not be sent, throw en exception
    if (strlen($result) > 0) {
        throw new \Exception($result);
    }
    
    // return the invalid bitmap images 
    return $invalidImages;
}


// [***]
// Lists all the programs, their modules and their logs
function getAllProgramsModulesAndLogs($request)
{
    // first, connect to the data base and get the logs data
    $logs = new db\LogsDAO();
    $rows = $logs->selectAll();

    // then create the final storage where the programs are going to be stored
    $programs = [];

    // and create temporal storage for the programs and modules
    $program = [
        'id' => 0,
        'name' => '',
        'modules' => []
    ];
    $modules = [
        'id' => 0,
        'name' => '',
        'logs' => []
    ];
    $module = [
        'id' => 0,
        'name' => '',
        'logs' => []
    ];

    // then visit each row obtained from the data base ...
    foreach ($rows as $row) {
        // check if the program has changed
        $hasProgramChanged = $row['program_id'] != $program['id'];
        if ($hasProgramChanged) {
            // if it has, check if the program info is empty
            if ($program['id'] != 0) {
                // if it's not, store the current program info in the program 
                // info and this last one is stored in the final array
                array_push($program['modules'], $module);
                array_push($programs, $program);
            }

            // then store the current row's info in new temporal holders
            $log = [
                'id' => $row['log_id'],
                'name' => $row['log_name']
            ];
            $module = [
                'id' => $row['module_id'],
                'name' => $row['module_name'],
                'logs' => [ $log ]
            ];
            $program = [
                'id' => $row['program_id'],
                'name' => $row['program_name'],
                'modules' => []
            ];
        } else {
            // if the program haven't changed, check if the module has changed
            $hasModuleChanged = $row['module_id'] != $module['id'];
            if ($hasModuleChanged) {
                // if it has, then store the current module info in the 
                // program storage
                array_push($program['modules'], $module);
                $log = [
                    'id' => $row['log_id'],
                    'name' => $row['log_name']
                ];
                $module = [
                    'id' => $row['module_id'],
                    'name' => $row['module_name'],
                    'logs' => [ $log ]
                ];
            } else {
                // if nor the program nor the module have changed, 
                // simply add a new log to the module structure
                array_push($module['logs'], [
                    'id' => $row['log_id'],
                    'name' => $row['log_name']
                ]);
            }
        } // if ($hasProgramChanged)
    } // foreach ($rows as $row)

    // push the last entries of an array into the final array
    if ($module['id'] != 0) {
        array_push($program['modules'], $module);
    }

    if ($program['id'] != 0) {
        array_push($programs, $program);
    }

    return $programs;
}

?>