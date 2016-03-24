<?php

if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
    require_once dirname(__FILE__)."\\table.php";
}
else {
    require_once dirname(__FILE__)."/table.php";
}

// Data Access Object for the ssop_sanitation_pre_op_log table
class SSOPSanitationPreOpLog extends Table
{
    // Creates an interface for interacting with the ssop_sanitation_pre_op_log 
    // table in the specified data base
    function __construct($dataBaseConnection)
    {
        parent::__construct($dataBaseConnection, "ssop_sanitation_pre_op_log");
    }
    
    
    // Returns a list of elements which are within the specified range of dates
    // and that are registered to the specified workplace zone
    function searchItemsByZoneIDAndDateInterval($zoneID, $start, $end)
    {
        return parent::join([
            "[><]ssop_sanitation_pre_op_logs_info" => [
                "log_info_id" => "id"
            ],
            "[><]users_profile_info" => [
                "ssop_sanitation_pre_op_logs_info.user_profile_id" => "id"
            ],
            "[><]ssop_sanitation_pre_op_hardware_logs" => [
                "hardware_log_id" => "id"
            ],
            "[><]workplace_area_hardware" => [
                "ssop_sanitation_pre_op_hardware_logs.hardware_id" => "id"
            ],
            "[><]workplace_areas" => [
                "workplace_area_hardware.workplace_area_id" => "id"
            ],
            "[><]company_zones" => [
                "workplace_areas.company_zone_id" => "id"
            ],
            "[><]ssop_sanitation_pre_op_corrective_actions" => [
                "ssop_sanitation_pre_op_hardware_logs.corrective_action_id" 
                    => "id"
            ]
        ], [
            "ssop_sanitation_pre_op_log.id",
            "users_profile_info.employee_id_num",
            "users_profile_info.full_name",
            "ssop_sanitation_pre_op_logs_info.date",
            "ssop_sanitation_pre_op_hardware_logs.time",
            "company_zones.zone_name",
            "workplace_areas.area_name",
            "workplace_area_hardware.hardware_name",
            "ssop_sanitation_pre_op_hardware_logs.status",
            "ssop_sanitation_pre_op_corrective_actions.action_name",
            "ssop_sanitation_pre_op_hardware_logs.comment"
        ], [
            "AND" => [
                "company_zone_id" => $zoneID,
                "date[>=]" => $start,
                "date[<=]" => $end
            ],
            "ORDER" => ["date", "area_name"]
        ]);
    }
    
    
    // Inserts the data to the data base
    // [in]    items: an array of associative arrays which define the rows to
    //         be inserted, where the key is the column name
    // [out]   return: the ID of the last inserted item
    function saveItems($items)
    {
        return parent::insert($items);
    }
}

?>