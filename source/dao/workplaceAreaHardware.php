<?php

require_once dirname(__FILE__)."\\table.php";

// Data Access Object for the workplace_area_hardware table
class WorkplaceAreaHardware extends Table
{
    // Creates an interface for interacting with the workplace_area_hardware 
    // table in the specified data base
    function __construct($dataBaseConnection)
    {
        parent::__construct($dataBaseConnection, "workplace_area_hardware");
    }
    
    
    // Returns an array of elements that belong to a certain workplace area
    // identified by the specified ID
    function findItemsByAreaId($id)
    {
        return parent::joinSelect([
            "[><]workplace_areas" => [
                "workplace_area_id" => "id"
                ],
            "[><]company_departments" => [
                "workplace_areas.company_department_id" => "id"
                ],
            "[><]company_zones" => [
                "company_departments.company_zone_id" => "id"
                ]
        ], [
            "workplace_area_hardware.id",
            "company_zones.zone_name",
            "company_departments.department_name",
            "workplace_areas.area_name",
            "workplace_area_hardware.hardware_name"
        ], [
            "workplace_area_id" => $id
        ]);
    }
    
    
    // Returns the element which has the specified id in the table
    function findItemById($id)
    {
        return parent::joinSelect([
            "[><]workplace_areas" => [
                "workplace_area_id" => "id"
                ],
            "[><]company_departments" => [
                "workplace_areas.company_department_id" => "id"
                ],
            "[><]company_zones" => [
                "company_departments.company_zone_id" => "id"
                ]
        ], [
            "workplace_area_hardware.id",
            "company_zones.zone_name",
            "company_departments.department_name",
            "workplace_areas.area_name",
            "workplace_area_hardware.hardware_name"
        ], [
            "id" => $id
        ]);
    }
    
    
    // Returns a list of elements which have the specified name
    function findItemsByName($name)
    {
        return parent::joinSelect([
            "[><]workplace_areas" => [
                "workplace_area_id" => "id"
                ],
            "[><]company_departments" => [
                "workplace_areas.company_department_id" => "id"
                ],
            "[><]company_zones" => [
                "company_departments.company_zone_id" => "id"
                ]
        ], [
            "workplace_area_hardware.id",
            "company_zones.zone_name",
            "company_departments.department_name",
            "workplace_areas.area_name",
            "workplace_area_hardware.hardware_name"
        ], [
            "hardware_name" => $name
        ]);
    }
    
    
    // Returns an array of every registry in the table 
    function getAllItems()
    {
        return parent::joinSelect([
            "[><]workplace_areas" => [
                "workplace_area_id" => "id"
                ],
            "[><]company_departments" => [
                "workplace_areas.company_department_id" => "id"
                ],
            "[><]company_zones" => [
                "company_departments.company_zone_id" => "id"
                ]
        ], [
            "workplace_area_hardware.id",
            "company_zones.zone_name",
            "company_departments.department_name",
            "workplace_areas.area_name",
            "workplace_area_hardware.hardware_name"
        ]);
    }
}

?>