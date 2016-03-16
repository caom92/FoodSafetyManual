<?php

require_once dirname(__FILE__)."table.php";

// Data Access Object for the daily_hand_washing_log table
class DailyHandWashingLog extends Table
{
    // Creates an interface for interacting with the daily_hand_washing_log t-able in 
    // the specified data base
    function __construct($dataBaseConnection)
    {
        parent::__construct($dataBaseConnection, "daily_hand_washing_log");
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
                ],
            "[><]users" => [
                "user_id" => "id"
                ],
            "[><]users_company_info" => [
                "company_info_id" => "id"
                ],
            "[><]company_departments (departments)" => [
                "users_company_info.company_department_id" => "id"
                ],
            "[><]company_zones (zones)" => [
                "departments.company_zone_id" => "id"
                ],
            "[><]workday_period_hand_washing_log" => [
                "period_log_id" => "id"
                ],
            "[><]workday_periods" => [
                "workday_period_hand_washing_log.workday_period_id" => "id"
                ]
        ], [
            "daily_hand_washing_log.id",
            "company_zones.zone_name",
            "company_departments.department_name",
            "workplace_areas.area_name",
            "zones.zone_name",
            "departments.department_name",
            "users_company_info.employee_id", 
            "users_company_info.full_name",
            "workday_periods.start_time",
            "workday_periods.end_time",
            "workday_period_hand_washing_log.washed_hands"
        ], [
            "id" => $id
        ]);
    }
    
    
    // Returns a list of elements which have the specified date
    function findItemByDate($date)
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
                ],
            "[><]users" => [
                "user_id" => "id"
                ],
            "[><]users_company_info" => [
                "company_info_id" => "id"
                ],
            "[><]company_departments (departments)" => [
                "users_company_info.company_department_id" => "id"
                ],
            "[><]company_zones (zones)" => [
                "departments.company_zone_id" => "id"
                ],
            "[><]workday_period_hand_washing_log" => [
                "period_log_id" => "id"
                ],
            "[><]workday_periods" => [
                "workday_period_hand_washing_log.workday_period_id" => "id"
                ]
        ], [
            "daily_hand_washing_log.id",
            "company_zones.zone_name",
            "company_departments.department_name",
            "workplace_areas.area_name",
            "zones.zone_name",
            "departments.department_name",
            "users_company_info.employee_id", 
            "users_company_info.full_name",
            "workday_periods.start_time",
            "workday_periods.end_time",
            "workday_period_hand_washing_log.washed_hands"
        ], [
            "#date" => "DATE(".$date.")"
        ]);
    }
    
    
    // Returns an array that stores every element in the table
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
                ],
            "[><]users" => [
                "user_id" => "id"
                ],
            "[><]users_company_info" => [
                "company_info_id" => "id"
                ],
            "[><]company_departments (departments)" => [
                "users_company_info.company_department_id" => "id"
                ],
            "[><]company_zones (zones)" => [
                "departments.company_zone_id" => "id"
                ],
            "[><]workday_period_hand_washing_log" => [
                "period_log_id" => "id"
                ],
            "[><]workday_periods" => [
                "workday_period_hand_washing_log.workday_period_id" => "id"
                ]
        ], [
            "daily_hand_washing_log.id",
            "company_zones.zone_name",
            "company_departments.department_name",
            "workplace_areas.area_name",
            "zones.zone_name",
            "departments.department_name",
            "users_company_info.employee_id", 
            "users_company_info.full_name",
            "workday_periods.start_time",
            "workday_periods.end_time",
            "workday_period_hand_washing_log.washed_hands"
        ]);
    }
}

?>