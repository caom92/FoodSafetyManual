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
    
    
    // Returns the element which has the specified id in the table
    function findItemById($id) 
    {
        return parent::joinSelect([
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
    
    
    // Returns a list of elements which have the specified name
    function findItemsByName($name) 
    {
        return parent::joinSelect([
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
    
    
    // Returns an array that stores every element in the table
    function getAllItems()
    {
        return parent::joinSelect([
            "[><]company_departments" => ["company_department_id" => "id"],
            "[><]company_zones" => [
                "company_departments.company_zone_id" => "id"
                ]
            ], [
                "workplace_areas.id",
                "company_zones.zone_name",
                "company_departments.department_name",
                "workplace_areas.area_name"
            ]);
    }
}

?>