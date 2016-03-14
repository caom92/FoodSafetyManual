<?php

namespace espresso;

require_once "table.php";

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
        return join([
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
            "sanitation_pre_op_log.date",
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
        return join([
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
            "sanitation_pre_op_log.date",
            "company_zones.zone_name",
            "company_departments.department_name",
            "workplace_areas.area_name",
            "workplace_area_hardware.hardware_name",
            "sanitation_pre_op_log.status",
            "sanitation_pre_op_corrective_actions.action_name",
            "sanitation_pre_op_log.comment"
        ], [
            "#date" => "DATE(".$id.")"
        ]);
    }
    
    
    // Returns an array that stores every element in the table
    function getAllItems()
    {
        return join([
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
            "sanitation_pre_op_log.date",
            "company_zones.zone_name",
            "company_departments.department_name",
            "workplace_areas.area_name",
            "workplace_area_hardware.hardware_name",
            "sanitation_pre_op_log.status",
            "sanitation_pre_op_corrective_actions.action_name",
            "sanitation_pre_op_log.comment"
        ]);
    }
}

?>