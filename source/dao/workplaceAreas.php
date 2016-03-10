<?php

namespace espresso;

require_once "companyDepartments.php";

// Data Access Object for the workplace_areas table
class WorkplaceAreas extends DAO
{
    // Default constructor
    function __construct()
    {
        parent::__construct("workplace_areas");
    }
    
    
    // Returns the element which has the specified id in the table
    function findById($id) 
    {
        return join([
            "[><]company_departments" => ["company_department_id" => "id"],
            "[><]company_zones" => [
                "company_departments.company_zone_id" => "id"
                ]
            ], [
                "workplace_areas.id",
                "company_zones.zone_name",
                "company_departments.department_name",
                "workplace_areas.area_name"
            ], [
                "id" => $id
            ]);
    }
    
    
    // Returns the element which has the specified name in the table
    function findByName($name) 
    {
        return join([
            "[><]company_departments" => ["company_department_id" => "id"],
            "[><]company_zones" => [
                "company_departments.company_zone_id" => "id"
                ]
            ], [
                "workplace_areas.id",
                "company_zones.zone_name",
                "company_departments.department_name",
                "workplace_areas.area_name"
            ], [
                "area_name" => $name
            ]);
    }
}

?>