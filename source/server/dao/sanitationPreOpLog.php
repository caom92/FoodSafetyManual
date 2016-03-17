<?php

require_once dirname(__FILE__)."\\table.php";

// Data Access Object for the sanitation_pre_op_log table
class SanitationPreOpLog extends Table
{
    // Creates an interface for interacting with the sanitation_pre_op_log 
    // table in the specified data base
    function __construct($dataBaseConnection)
    {
        parent::__construct($dataBaseConnection, "sanitation_pre_op_log");
    }
    
    
    // Returns the element which has the specified id in the table
    function findItemById($id)
    {
        return parent::joinSelect([
            "[><]workplace_area_hardware" => [
                "workplace_hardware_id" => "id"
            ],
            "[><]workplace_areas" => [
                "workplace_area_hardware.workplace_area_id" => "id"
            ],
            "[><]company_departments" => [
                "workplace_areas.company_department_id" => "id"
            ],
            "[><]company_zones" => [
                "company_departments.company_zone_id" => "id"
            ],
            "[><]sanitation_pre_op_corrective_actions" => [
                "corrective_action_id" => "id"
            ]
        ], [
            "sanitation_pre_op_log.id",
            "sanitation_pre_op_log.date_time",
            "company_zones.zone_name",
            "company_departments.department_name",
            "workplace_areas.area_name",
            "workplace_area_hardware.hardware_name",
            "sanitation_pre_op_log.status",
            "sanitation_pre_op_corrective_actions.action_name",
            "sanitation_pre_op_log.comment"
        ], [
            "id" => $id
        ]);
    }
    
    
    // Returns a list of elements which have the specified name
    function findItemsByDate($date)
    {
        return parent::joinSelect([
            "[><]workplace_area_hardware" => [
                "workplace_hardware_id" => "id"
            ],
            "[><]workplace_areas" => [
                "workplace_area_hardware.workplace_area_id" => "id"
            ],
            "[><]company_departments" => [
                "workplace_areas.company_department_id" => "id"
            ],
            "[><]company_zones" => [
                "company_departments.company_zone_id" => "id"
            ],
            "[><]sanitation_pre_op_corrective_actions" => [
                "corrective_action_id" => "id"
            ]
        ], [
            "sanitation_pre_op_log.id",
            "sanitation_pre_op_log.date_time",
            "company_zones.zone_name",
            "company_departments.department_name",
            "workplace_areas.area_name",
            "workplace_area_hardware.hardware_name",
            "sanitation_pre_op_log.status",
            "sanitation_pre_op_corrective_actions.action_name",
            "sanitation_pre_op_log.comment"
        ], [
            "#date_time" => "DATE(".$date.")"
        ]);
    }
    
    
    // Returns an array that stores every element in the table
    function getAllItems()
    {
        return parent::joinSelect([
            "[><]workplace_area_hardware" => [
                "workplace_hardware_id" => "id"
            ],
            "[><]workplace_areas" => [
                "workplace_area_hardware.workplace_area_id" => "id"
            ],
            "[><]company_departments" => [
                "workplace_areas.company_department_id" => "id"
            ],
            "[><]company_zones" => [
                "company_departments.company_zone_id" => "id"
            ],
            "[><]sanitation_pre_op_corrective_actions" => [
                "corrective_action_id" => "id"
            ]
        ], [
            "sanitation_pre_op_log.id",
            "sanitation_pre_op_log.date_time",
            "company_zones.zone_name",
            "company_departments.department_name",
            "workplace_areas.area_name",
            "workplace_area_hardware.hardware_name",
            "sanitation_pre_op_log.status",
            "sanitation_pre_op_corrective_actions.action_name",
            "sanitation_pre_op_log.comment"
        ]);
    }
    
    
    // Inserts the data to the data base
    // [in]    items: an array of associative arrays which define the rows to
    //         be inserted, where the key is the column name
    // [out]   return: the ID of the last inserted item
    function addItems($items)
    {
        return parent::insert($items);
    }
}

?>