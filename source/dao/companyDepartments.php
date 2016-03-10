<?php

namespace espresso;

require_once "companyZones.php";

// Data Access Object for the company_departments table
class CompanyDepartments extends DAO
{
    // Default constructor
    function __construct()
    {
        parent::__construct("company_departments");
    }
    
    // Returns the element which has the specified id in the table
    function findById($id)
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
    
    
    // Returns the element which has the specified name in the table
    function findByName($name)
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
}

?>