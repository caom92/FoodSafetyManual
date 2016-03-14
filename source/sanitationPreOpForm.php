<?php
    require_once dirname(__FILE__)."\\dao\\workplaceAreas.php";
    require_once dirname(__FILE__)."\\dao\\workplaceAreaHardware.php";
    
    // initialize all the variables related with the data base
    $dataBaseConnection = null;
    $areas = null;
    $hardware = null;
    $areasData = [];
    
    // attempt to connect to the data base and query the data from the workplace
    // areas
    try {
        $dataBaseConnection = connectToDataBase();
        $areas = new WorkplaceAreas($dataBaseConnection);
        $hardware = new WorkplaceAreaHardware($dataBaseConnection);
        $areasData = $areas->getAllItems();
    }
    catch (Exception $e) {
        displayErrorPageAndExit($e->getCode(), $e->getMessage());
    }
    
    // Initialize the JSON to be sent to the client
    $resultingJSON = [
        "error_code" => 0,
        "error_message" => "",
        "data" => []
    ];
    
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
        array_push($resultingJSON["data"], $areaJSON);
    }   // Repeat this step for every area element
    
    // Send the data to the client as a JSON with the following format
    /*{
        error_code:[int],
        error_message:[string],
        data[array<area>]
    }
    where data is: {
        area_id:[int],
        area_name:[string],
        hardware:[array<hardware>]
    }
    where hardware is: {
        id:[int],
        name:[string]
    }*/
    echo json_encode($resultingJSON);
?>