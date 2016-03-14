<?php

require_once dirname(__FILE__)."\\table.php";

// Data Access Object for the company_zones table
class CompanyZones extends Table
{
    // Creates an interface for interacting with the company_zones table in 
    // the specified data base
    function __construct($dataBaseConnection)
    {
        parent::__construct($dataBaseConnection, "company_zones", "cz");
    }
    
    
    // Returns a list of elements which have the specified name
    function findItemsByName($name)
    {
        return parent::select("*", ["zone_name" => $name]);
    }
}

?>