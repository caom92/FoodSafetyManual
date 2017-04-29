<?php

// Namespace for the project's Data Access Objects
namespace fsm\database\gmp\packing\finishedProduct;

// Importing required classes
require_once realpath(dirname(__FILE__)."/../../../InsertableDAO.php");

use fsm\database as db;


// Data Access Object for the gmp_packing_finished_production_areas table
class ProductionAreasDAO extends db\InsertableDAO
{
    // Creates an interface for interacting with the 
    // gmp_packing_finished_production_areas table in the specified data base
    function __construct()
    {
        parent::__construct('gmp_packing_finished_product_production_areas');
    }


    // Returns an associative which contains a list of production areas 
    // associated to the zone with the especified ID
    function selectByZoneID($zoneID)
    {
        return parent::select(
            [ "id", "name" ],
            [ "zone_id" => $zoneID ]
        );
    }
}

?>