<?php

namespace espresso;

require_once "table.php";

// Data Access Object for the workplace_area_hardware table
class WorkplaceAreaHardware extends Table
{
    // Default constructor
    function __construct()
    {
        parent::__construct("workplace_area_hardware");
    }
    
    
    // Returns the element which has the specified id in the table
    function findItemById($id)
    {
        return join([
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
    
    
    // Returns the element which has the specified name in the table
    function findItemByName($name)
    {
        return join([
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
}

?>