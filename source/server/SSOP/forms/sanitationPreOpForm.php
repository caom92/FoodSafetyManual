<?php

if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
    require_once dirname(__FILE__)."\\..\\..\\dao\\workplaceAreas.php";
    require_once dirname(__FILE__)."\\..\\..\\dao\\workplaceAreaHardware.php";
    require_once dirname(__FILE__)."\\..\\..\\dao\\ssopSanitationPreOpCorrectiveActions.php";
}
else {
    require_once dirname(__FILE__)."/../../dao/workplaceAreas.php";
    require_once dirname(__FILE__)."/../../dao/workplaceAreaHardware.php";
    require_once dirname(__FILE__)."/../../dao/ssopSanitationPreOpCorrectiveActions.php";
}

// Data is sent to the server from the client in the form of a JSON with
// the following format:
// {
//     zone_id:[uint]
// }
// we must decode it
$inputJSON = json_decode($_GET);

// arrays of data entries read from the data base tables 
$actionsList = [];
$areasList = [];

// interface to the workplace areas hardware table
$hardwareTable = null;

// attempt to connect to the data base and query the data from the workplace
// areas and the corrective actions
try {
    $dataBaseConnection = connectToDataBase();
    $areasTable = new WorkplaceAreas($dataBaseConnection);
    $hardwareTable = new WorkplaceAreaHardware($dataBaseConnection);
    $actionsTable = new SSOPSanitationPreOpCorrectiveActions($dataBaseConnection);
    $actionsList = $actionsTable->getAllItems();
    $areasList = $areasTable->searchItemsByZoneID($inputJSON["zone_id"]);
}
catch (Exception $e) {
    displayErrorPageAndExit($e->getCode(), $e->getMessage());
}

// Initialize the JSON to be sent to the client
$outputJSON = [
    "error_code" => 0,
    "error_message" => "",
    "data" => [
        "corrective_actions" => [],
        "areas" => []
    ]
];

// store the actions data to the output json
foreach ($actionsList as $action) {
    array_push($outputJSON["data"]["corrective_actions"], [
        "id" => $action["id"],
        "name" => $action["action_name"]
    ]);
}

// now we process the workplace areas data
foreach ($areasList as $area) {
    // create a temporal area JSON for each area element
    $areaInfoJSON = [
        "area_id" => $area["id"],
        "area_name" => $area["area_name"],
        "hardware" => []
    ];
    
    // Then, attempt to get all hardware pieces that belong to that area
    $hardwareList = [];
    try {
        $hardwareList = $hardwareTable->searchItemsByAreaID($area["id"]);
    }
    catch (Exception $e) {
        displayErrorPageAndExit($e->getCode(), $e->getMessage());
    }
    
    // Finally, add every item to the array of the corresponding area
    foreach ($hardwareList as $hardware) {
        array_push($areaInfoJSON["hardware"], [
            "id" => $hardware["id"],
            "name" => $hardware["hardware_name"]
        ]);
    }
    
    // Add each area to the areas array in the final JSON
    array_push($outputJSON["data"]["areas"], $areaInfoJSON);
}   

// Send the data to the client as a JSON with the following format
// {
//     error_code:[int],
//     error_message:[string],
//     data:[array<data>]
// }
// where data is:
// {
//     corrective_actions:[array<corrective_action>],
//     areas:[array<area>]
// }  
// where corrective_action is:
// {
//     id:[uint],
//     name:[string]
// }
// and area is:
// {
//     area_id:[uint],
//     area_name:[string],
//     hardware:[array<hardware>]
// }
// where hardware is: 
// {
//     id:[uint],
//     name:[string]
// }
echo json_encode($outputJSON);

?>