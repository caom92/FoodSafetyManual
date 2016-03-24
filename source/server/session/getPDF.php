<?php

if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
    require_once dirname(__FILE__)."\\..\\dao\\pdfFilePaths.php";
}
else {
    require_once dirname(__FILE__)."/../dao/pdfFilePaths.php";
}

// Data is sent to the server from the client in the form of a JSON with
// the following format:
// {
//     program_id:[uint]
//     title_name:[string]
// }
// we must decode it
$inputJSON = json_decode($_GET);

// the array of elements read from the data base table
$filesList = [];

try {
    // attempt to connect to the data base
    $dataBaseConnection = connectToDataBase();
    $filesTable = new PDFFilePaths($dataBaseConnection);
    
    // attempt to read the data from the data base 
    $filesList = $filesTable->searchItemsByProgramIDAndTitleName(
        $inputJSON["program_id"], $inputJSON["title_name"]);
}
catch (Exception $e) {
    displayErrorPageAndExit($e->getCode(), $e->getMessage());
}

if (count($filesList) != 0) {
    // if the element exists in the data base, we simply return the name of the 
    // file
    $outputJSON = [
        "error_code" => 0,
        "error_message" => "",
        "data" => [
            "file_name" => $filesList[0]["file_name"]
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
// }
echo json_encode($outputJSON);

?>