<?php

require_once dirname(__FILE__)."\\..\\..\\..\\external\\medoo\\medoo.php";

// Database connection information
const HOST = "localhost";
const DATA_BASE = "del_cabo";
const USER = "super";
const PASSWORD = "awesomesupersecretcode";

// Attempts to connect to the database and returns the connection if
// succeeded
function connectToDataBase()
{
    return new medoo([
        "database_type" => "mysql",
        "database_name" => DATA_BASE,
        "server" => HOST,
        "username" => USER,
        "password" => PASSWORD,
        "charset" => "utf8",
        "option" => [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_EMULATE_PREPARES => false
        ] 
    ]);
}


// Terminates the execution of the current script and generates an error 
// JSON packet for the client to interpret
// [in]    code: an integer value that identifies the kind of error that
//         occurred
// [in]    message: a user-friendly message that describes the error that
//         occurred 
function displayErrorPageAndExit($code, $message)
{
    echo json_encode([
        "error_code" => ($code == 0) ? 1 : $code,
        "error_message" => $message,
        "data" => []
    ]);
    exit;
}

?>