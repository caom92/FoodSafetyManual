<?php

namespace espresso;

require_once "dao.php";

// Data Access Object for the company_zones table
class CompanyZones extends DAO
{
    // Default constructor
    function __construct()
    {
        parent::__construct("company_zones", "cz");
    }
    
    
    // Returns the element which has the specified name in the table
    function findByName($name)
    {
        return select(["*"], ["zone_name" => $name]);
    }
}

?>