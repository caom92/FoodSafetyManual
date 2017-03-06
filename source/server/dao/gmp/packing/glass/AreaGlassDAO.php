<?php

// Namespace for the project's Data Access Objects
namespace fsm\database\gmp\packing\glass;

// Importing required classes
require_once realpath(dirname(__FILE__)."/../../../DataAccessObject.php");

use fsm\database as db;

// Data Access Object for the gmp_packing_glass_area_glass table
class AreaGlassDAO extends db\DataAccessObject
{
    // Creates an interface for interacting with the 
    // gmp_packing_glass_area_glass table in the specified data base
    function __construct()
    {
        parent::__construct("gmp_packing_glass_area_glass");
    }
}

?>