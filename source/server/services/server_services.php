<?php

namespace fsm\services\server;

require_once realpath(dirname(__FILE__).'/../dao/DataAccessObject.php');
require_once realpath(dirname(__FILE__).'/../Email.php');
require_once realpath(dirname(__FILE__).'/../dao/LogsDAO.php');
require_once realpath(dirname(__FILE__).'/../dao/CapturedLogsDAO.php');


use fsm\database as db;


// Checks if the data base server is available for use
function checkStatus() 
{
    return isset(db\DataAccessObject::$dataBase);
}


// Sends a bug report by email
function mailBugReport() 
{   
    // Create the email body by pasting all the posted data into it
    $body = "Usuario: " . $_SESSION["login-name"] . "<br>"
        . "ID de empleado: " . $_SESSION["user_id"] . "<br>"
        . "Zona: " . $_POST["zone-selection"] . "<br>"
        . "Programa: " . $_POST["procedure-selection"] . "<br>"
        . "Modulo: " . $_POST['module-selection'] . "<br>"
        . "Navegadores: ";

    // paste browsers
    foreach ($_POST["browser-selection"] as $browser) {
        $body .= $browser . " ";
    }

    // continue with the rest of the body
    $body .= "\n" . "Severidad: " . $_POST["severity-selection"] . "<br>"
        . "Resumen: " . $_POST["summary"] . "<br>"
        . "Pasos para reproducirlo: " . $_POST["steps"] . "<br>"
        . "Salida esperada: " . $_POST["expectation"] . "<br>"
        . "Salida obtenida: " . $_POST["reality"] . "<br>";

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
            // check if the file type corresponds to a valid supported 
            // bitmap file type
            $isValid = fsm\DataValidatorisBitmapFile(
                $_FILES["screenshot-attachment"]["tmp_name"][$i]
            );

            // if the file type is valid ...
            if ($isValid) {
                // attach it to the email
                $bugReport->addAttachment(
                    $_FILES["screenshot-attachment"]["tmp_name"][$i], 
                    $_FILES["screenshot-attachment"]["name"][$i]
                );
            } else {
                // if it is invalid, store it in the invalid bitmaps array
                array_push(
                    $invalidImages, 
                    $_FILES["screenshot-attachment"]["name"][$i]
                );
            }
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
function getAllProgramsModulesAndLogs()
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


// Returns true if a log of the especified ID was captured in the especified 
// date
function checkIfLogExistsByDate()
{
    $capturedLogs = new  db\CapturedLogsDAO();
    return $capturedLogs->hasByDateAndLogID(
        $_POST['log_id'], 
        $_POST['capture_date']
    );
}

?>