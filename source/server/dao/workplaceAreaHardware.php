<?php

require_once realpath(dirname(__FILE__)."/DataBaseTable.php");

// Data Access Object for the workplace_area_hardware table
class WorkplaceAreaHardware extends DataBaseTable
{
    // Creates an interface for interacting with the workplace_area_hardware 
    // table in the specified data base
    function __construct($dataBaseConnection)
    {
        parent::__construct($dataBaseConnection, "workplace_area_hardware");
    }
    
    
    // Returns an array of elements that belong to a certain workplace area
    // identified by the specified ID
    function searchItemsByAreaID($areaID)
    {
        return parent::join([
                "[><]workplace_areas" => [
                    "workplace_area_id" => "id"
                ],
                "[><]company_zones" => [
                    "workplace_areas.company_zone_id" => "id"
                ]
            ], [
                "workplace_area_hardware.id",
                "company_zones.zone_name",
                "workplace_areas.area_name",
                "workplace_area_hardware.hardware_name"
            ], [
                "workplace_area_id" => $areaID
            ]
        );
    }
}

?>