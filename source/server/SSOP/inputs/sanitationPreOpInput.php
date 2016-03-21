<?php

require_once realpath("../../dao/sanitationPreOpLog.php");

// Data is sent to the server from the client in the form of a JSON with
// the following format:
// {
//     date:[date]
//     time:[time]
//     user_id:[uint]
//     hardware_id:[uint]
//     status:[bool]
//     corrective_action_id:[uint]
//     comment:[string]
// }

// attempt to connect to the data base and insert the input data, which 
// is read using the HTTP GET method
try {
    $dataBaseConnection = connectToDataBase();
    $sanitationPreOpTable = new SanitationPreOp($dataBaseConnection);
    $sanitationPreOpTable->saveItems(json_decode($_GET));
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