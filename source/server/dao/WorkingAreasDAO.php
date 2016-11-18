<?php

// Namespace for the project's Data Access Objects
namespace fsm\database;

// Importing required classes
require_once realpath(dirname(__FILE__)."/DataAccessObject.php");

// Data Access Object for the working_areas table
class WorkingAreasDAO extends DataAccessObject
{
    // Creates an interface for interacting with the 
    // working_areas table in the specified data base
    function __construct()
    {
        parent::__construct("working_areas");
    }


    // Returns an associative array containing the information of all the 
    // working areas that are related to the specified zone
    // [in]     zoneID: the ID of the zone whose areas are going to be
    //          retrieved
    function selectByZoneID($zoneID)
    {
        return parent::select(
            [ "$this->table.id", 'name' ],
            [ 'zone_id' => $zoneID ]
        );
    }
}

?>