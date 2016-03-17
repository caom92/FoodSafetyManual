<?php

require_once dirname(__FILE__)."\\dao\\workplaceAreas.php";
require_once dirname(__FILE__)."\\dao\\workplaceAreaHardware.php";
require_once dirname(__FILE__).
    "\\dao\\sanitationPreOpCorrectiveActions.php";

// initialize all the variables related with the data base
$dataBaseConnection = null;
$areas = null;
$hardware = null;
$actions = null;
$actionsData = [];
$areasData = [];

// attempt to connect to the data base and query the data from the workplace
// areas and the corrective actions
try {
    $dataBaseConnection = connectToDataBase();
    $areas = new WorkplaceAreas($dataBaseConnection);
    $hardware = new WorkplaceAreaHardware($dataBaseConnection);
    $actions = new SanitationPreOpCorrectiveActions($dataBaseConnection);
    $actionsData = $actions->getAllItems();
    $areasData = $areas->getAllItems();
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

foreach ($actionsData as $action) {
    array_push($outputJSON["data"]["corrective_actions"], [
        "id" => $action["id"],
        "name" => $action["action_name"]
    ]);
}

foreach ($areasData as $area) {
    // create a temporal area JSON for each area element
    $areaJSON = [
        "area_id" => $area["id"],
        "area_name" => $area["area_name"],
        "hardware" => []
    ];
    
    // Then, attempt to get all hardware pieces that belong to that area
    $items = [];
    try {
        $items = $hardware->findItemsByAreaId($area["id"]);
    }
    catch (Exception $e) {
        displayErrorPageAndExit($e->getCode(), $e->getMessage());
    }
    
    // Finally, add every item to the array of the corresponding area
    foreach ($items as $item) {
        array_push($areaJSON["hardware"], [
            "id" => $item["id"],
            "name" => $item["hardware_name"]
        ]);
    }
    
    // Add each area to the areas array in the final JSON
    array_push($outputJSON["data"]["areas"], $areaJSON);
}   // Repeat this step for every area element

// Send the data to the client as a JSON with the following format
/*{
    error_code:[int],
    error_message:[string],
    data:[array<area>]
}
where data is:
{
    corrective_actions:[array<corrective_action>],
    areas:[array<area>]
} 
where corrective_action is:
{
    id:[uint],
    name:[string]
}
and area is:
{
    area_id:[uint],
    area_name:[string],
    hardware:[array<hardware>]
}
where hardware is: {
    id:[uint],
    name:[string]
}*/
echo json_encode($outputJSON);

?>