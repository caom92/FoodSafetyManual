<?php
    require_once "workplaceAreas.php";
    require_once "workplaceAreaHardware.php";
    
    // Terminates the execution of the current script and generates an error 
    // message and code for the client to interpret
    function displayErrorPage($error) 
    {
        $resultingJSON = [
            "error_code" => $error[1],
            "error_message" => $error[0].": ".$error[2],
            "areas" => []
        ];
        echo json_encode($resultingJSON);
        exit;
    }
    
    // initialize all the variables related with the data base
    $dataBaseConnection = null;
    $areas = null;
    $hardware = null;
    $areasData = [];
    
    // attempt to connect to the data base and query the data from the workplace
    // areas
    try {
        $dataBaseConnection = \espresso\connectToDataBase();
        $areas = new \espresso\WorkplaceAreas($dataBaseConnection);
        $hardware = new \espresso\WorkplaceAreaHardware($dataBaseConnection);
        $areasData = $areas->getAllItems();
    }
    catch (Exception $e) {
        displayErrorPage($dataBaseConnection->error());
    }
    
    // Initialize the JSON to be sent to the client
    $resultingJSON = [
        "error_code" => 0,
        "error_message" => "",
        "areas" => []
    ];
    
    foreach ($areasData as $area) {
        // Add each area to the array
        array_push($resultingJSON["areas"], [
           "area_id" => $area["id"],
           "area_name" => $area["area_name"],
           "hardware" => []
        ]);
        
        // Then, attempt get all hardware pieces that belong to that area
        $items = [];
        try {
            $items = $hardware->findItemsByAreaId($area["id"]);
        }
        catch (Exception $e) {
            displayErrorPage($dataBaseConnection->error());
        }
        
        // Finally, add every item to the array of the corresponding area
        foreach ($items as $item) {
            array_push($resultingJSON["areas"]["hardware"], [
                "id" => $item["id"],
                "name" => $item["hardware_name`"]
            ]);
        }
    }   // Repeat this step for every area
    
    // Send the data to the client
    echo json_encode($resultingJSON);
    
    /*{
        error_code:[int],
        error_message:[string],
        areas[array<area>]
    }
    {
        area_id:[int],
        area_name:[string],
        hardware:[array<hardware>]
    }
    {
        id:[int],
        name:[string]
    }*/
?>