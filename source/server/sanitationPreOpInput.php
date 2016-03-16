<?php

require_once(__FILE__)."\\dao\\sanitationPreOpLog.php";

// initialize all the variables related with the data base
$dataBaseConnection = null;
$sanitationPreOp = null;

// attempt to connect to the data base and insert the input data, which 
// is read using the HTTP GET method
try {
    $dataBaseConnection = connectToDataBase();
    $sanitationPreOp = new SanitationPreOp($dataBaseConnection);
    $sanitationPreOp->addItems(json_decode($_GET));
}
catch (Exception $e) {
    displayErrorPageAndExit($e->getCode(), $e->getMessage());
}

// return a success code just to let the client know
echo json_encode([
    "error_code" => 0,
    "error_message" => "",
    "data" => []
]);

?>