<?php

/* For this script to work don't forget to go to php.ini file and uncomment the
line that says:

extension=php_fileinfo.dll
or
extension=php_fileinfo.so

and restart the server */
require_once realpath(dirname(__FILE__)."/../dao/CertificationPrograms.php");

// Data is sent to the server from the client in the form of a JSON with
// the following format:
// {
//     program_id:[uint]
// }
// we must decode it
$inputJSON = $_POST;

// initialize the json that will be sent to the client
$outputJSON = [];

// first, let's check the MIME type of the file
$fileInfo = new finfo(FILEINFO_MIME_TYPE);
$MIMEType = $fileInfo->file($_FILES["uploaded_file"]["tmp_name"]);

if ($MIMEType == "application/pdf") {
    // if the file is a PDF, then we can move it to a permanent location
    $newFilePath = realpath("../../../data/documents")."/";
    $newFileName = 
        basename($_FILES["uploaded_file"]["name"], ".pdf")."_".time().".pdf";
        
    move_uploaded_file(
        $_FILES["uploaded_file"]["tmp_name"], 
        $newFilePath.$newFileName
    );
    
    try {
        // attempt to connect to the database
        $dataBaseConnection = connectToDataBase();
        $programsTable = new CertificationPrograms($dataBaseConnection);
        
        // we need to update the data base to show this file
        $programsTable->updateItemDataByID($inputJSON["program_id"], [
            "file_name" => $newFileName
        ]);
    }
    catch (Exception $e) {
        displayErrorPageAndExit($e->getCode(), $e->getMessage());
    }
    
    // finally, let the client know that the upload was successfull
    $outputJSON = [
        "error_code" => 0,
        "error_message" => "&Eacute;xito",
        "data" => []
    ];
}
else {
    // if the file was not a PDF file, send an error message
    $outputJSON = [
        "error_code" => 1,
        "error_message" => 
            "El archivo que pretende subir no es un PDF válido",
        "data" => []
    ];
}

// Send the data to the client as a JSON with the following format
echo json_encode($outputJSON);

?>