<?php

require_once realpath("table.php");

// Data Access Object for the daily_hand_washing_log table
class DailyHandWashingLog extends Table
{
    // Creates an interface for interacting with the daily_hand_washing_log 
    // table in the specified data base
    function __construct($dataBaseConnection)
    {
        parent::__construct($dataBaseConnection, "daily_hand_washing_log");
    }
    
    
    // Returns a list of elements which are within the specified range of dates
    // and that are registered to the specified workplace area
    function searchItemsByAreaIDAndDateInterval($areaID, $start, $end)
    {
        return parent::join([
            "[><]workplace_areas" => [
                "workplace_area_id" => "id"
                ],
            "[><]company_zones" => [
                "workplace_areas.company_zone_id" => "id"
                ],
            "[><]users" => [
                "user_id" => "id"
                ],
            "[><]users_company_info" => [
                "users.company_info_id" => "id"
                ],
            "[><]workday_period_hand_washing_log" => [
                "period_log_id" => "id"
                ],
            "[><]workday_periods" => [
                "workday_period_hand_washing_log.workday_period_id" => "id"
                ]
        ], [
            "daily_hand_washing_log.id",
            "daily_hand_washing_log.date",
            "daily_hand_washing_log.time",
            "company_zones.zone_name",
            "workplace_areas.area_name",
            "users_company_info.employee_id", 
            "users_company_info.full_name",
            "daily_hand_washing_log.comment",
            "workday_periods.start_time",
            "workday_periods.end_time",
            "workday_periods.period_name",
            "workday_period_hand_washing_log.washed_hands"
        ], [
            "AND" => [
                "workplace_area_id" => $areaID,
                "date[>=]" => $start,
                "date[<=]" => $end
            ],
            "ORDER" => "date"
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