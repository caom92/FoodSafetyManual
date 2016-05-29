<?php

// Import external classes
require_once realpath("./../dao/CertificationPrograms.php");

// Alias the namespaces for ease of writing
use espresso as core;
use espresso\dao as dao;

// Data is sent to the server from the client in the form of a JSON with
// the following format:
// {
//     program_id:[uint]
// }
// we must decode it
$inputJSON = json_decode($_GET);

// the array of elements read from the data base table
$programsList = [];

try {
    // attempt to connect to the data base
    $dataBaseConnection = dao\connectToDataBase();
    $programsTable = new dao\CertificationPrograms($dataBaseConnection);
    
    // attempt to read the data from the data base 
    $programsList = $programsTable->searchItemsByID($inputJSON["program_id"]);
}
catch (PDOException $e) {
    core\displayErrorPageAndExit(1, $e->getMessage());
}
/*catch (Exception $e) {
    core\displayErrorPageAndExit($e->getCode(), $e->getMessage());
}*/

if (count($programsList) != 0) {
    // if the element exists in the data base, we simply return the name of the 
    // file
    $outputJSON = [
        "error_code" => 0,
        "error_message" => "",
        "data" => [
            "full_name" => $programsList[0]["certification_program_name"],
            "description" => $programsList[0]["description"],
            "pdf_src" => $programsList[0]["file_name"],
            "html_src" => $programsList[0]["url"]
        ]
    ];
}
else {
    // otherwise, send an error message
    $outputJSON = [
        "error_code" => 1,
        "error_message" => 
            "El archivo PDF que busca no existe en la base de datos",
        "data" => []
    ];
}

// Send the data to the client as a JSON with the following format
// {
//     error_code:[int],
//     error_message:[string],
//     data:[data]
// }
// where data is:
// {
//     fine_name:[string]
//     description:[string]
//     pdf_src:[string]
//     html_src:[string]
// }
echo json_encode($outputJSON);

?>