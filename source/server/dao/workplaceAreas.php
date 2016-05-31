<?php

// Namespace for the project's Data Access Objects
namespace espresso\dao;

// Importing required classes
require_once realpath(dirname(__FILE__)."/DataBaseTable.php");

// Data Access Object for the workplace_areas table
class WorkplaceAreas extends DataBaseTable
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
                "[><]company_zones" => [ "company_zone_id" => "id" ], 
            ], [
                "workplace_areas.id",
                "company_zones.zone_name",
                "workplace_areas.area_name"
            ], 
            [ "company_zone_id" => $zoneID ]
        );
    }
}

?>