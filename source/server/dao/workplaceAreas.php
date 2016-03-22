<?php

require_once dirname(__FILE__)."\\table.php";

// Data Access Object for the workplace_areas table
class WorkplaceAreas extends Table
{
    // Creates an interface for interacting with the workplace_areas table in 
    // the specified data base
    function __construct($dataBaseConnection)
    {
        parent::__construct($dataBaseConnection, "workplace_areas");
    }
    
    
    // Returns a list of elements which are associated with the company zone of 
    // the especified ID in the data base
    function searchItemsByZoneID($zoneID)
    {
        return parent::join([
            "[><]company_zones" => ["company_zone_id" => "id"], 
            ], [
                "workplace_areas.id",
                "company_zones.zone_name",
                "workplace_areas.area_name"
            ], 
            ["company_zone_id" => $zoneID]);
    }
}

?>