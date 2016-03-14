<?php

require_once dirname(__FILE__)."\\dao\\workplaceAreas.php";
require_once dirname(__FILE__)."\\dao\\workdayPeriods.php";

// initialize all the variables related with the data base
$dataBaseConnection = null;
$areas = null;
$periods = null;
$periodsData = null;
$areasData = [];

// attempt to connect to the data base and query the data from the workplace
// areas and the workday periods
try {
    $dataBaseConnection = connectToDataBase();
    $areas = new WorkplaceAreas($dataBaseConnection);
    $periods = new WorkdayPeriods($dataBaseConnection);
    $periodsData = $periods->getAllItems();
    $areasData = $areas->getAllItems();
}
catch (Exception $e) {
    displayErrorPageAndExit($e->getCode(), $e->getMessage());
}

// Initialize the JSON to be sent to the client
$resultingJSON = [
    "error_code" => 0,
    "error_message" => "",
    "data" => [
        "areas" => [],
        "workday_periods" => []
    ]
];

// add each area info to the json
foreach ($areasData as $area) {
    array_push($resultingJSON["data"]["areas"], [
        "id" => $area["id"],
        "area_name" => $area["area_name"]
    ]);
}

// add each workday period info to the json
foreach ($periodsData as $period) {
    array_push($resultingJSON["data"]["workday_periods"], [
        "id" => $period["id"],
        "period_name" => $period["period_name"]
    ]);
}

// Send the data to the client as a JSON with the following format
/*{
    error_code:[int],
    error_message:[string],
    data:[array<area>]
}
where data is:
{
    areas:[array<area>],
    workday_periods:[array<period>]
} 
where area is:
{
    area_id:[uint],
    area_name:[string]
}
and period is: {
    id:[uint],
    period_name:[string]
}*/
echo json_encode($resultingJSON);

?>