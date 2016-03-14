<?php

namespace espresso;

require_once "table.php";

// Data Access Object for the company_departments table
class CompanyDepartments extends Table
{
    // Creates an interface for interacting with the company_departments table 
    // in the specified data base
    function __construct($dataBaseConnection)
    {
        parent::__construct($dataBaseConnection, "company_departments");
    }
    
    // Returns the element which has the specified id in the table
    function findItemById($id)
    {
        return join([
            "[><]company_zones" => ["company_zone_id" => "id"]
            ], [
                "company_departments.id", 
                "company_zones.zone_name", 
                "company_departments.department_name"
            ], [
                "company_departments.id" => $id
            ]);
    }
    
    
    // Returns a list of elements which have the specified name
    function findItemsByName($name)
    {   
        return join([
            "[><]company_zones" => ["company_zone_id" => "id"]
            ], [
                "company_departments.id", 
                "company_zones.zone_name", 
                "company_departments.department_name"
            ], [
                "company_departments.department_name" => $name
            ]);
    }
    
    
    // Returns an array that stores every element in the table
    function getAllItems()
    {
        return join([
            "[><]company_zones" => ["company_zone_id" => "id"]
            ], [
                "company_departments.id", 
                "company_zones.zone_name", 
                "company_departments.department_name"
            ]);
    }
}

?>