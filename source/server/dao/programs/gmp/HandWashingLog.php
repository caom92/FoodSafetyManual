<?php

// Namespace for the GMP program's classes and functions
namespace espresso\dao\gmp;

// Importing required classes
require_once realpath("./../../DataBaseTable.php");
use espresso\dao\DataBaseTable;

// Data Access Object for the gmp_hand_washing_log table
class HandWashingLog extends DataBaseTable 
{
    // Creates an interface for interacting with the gmp_hand_washing_log 
    // table in the specified data base
    function __construct($dataBaseConnection)
    {
        parent::__construct($dataBaseConnection, "gmp_hand_washing_log");
    }
    
    
    // Inserts the data to the data base
    // [in]    items: an array of associative arrays which define the rows to
    //         be inserted, where the key is the column name
    // [out]   return: the ID of the last inserted item
    function saveItems($items)
    {
        return parent::insert($items);
    }
    
    
    // Returns a list of elements which are within the specified range of dates
    // and that are registered to the specified workplace area
    function searchItemsByAreaIDAndDateInterval($areaID, $startDate, $endDate)
    {
        return parent::join([
                "[><]gmp_hand_washing_daily_log" => [
                    "daily_log_id" => "id"
                ],
                "[><]users_profile_info" => [
                    "gmp_hand_washing_daily_log.user_profile_id" => "id"
                ],
                "[><]workplace_areas" => [
                    "gmp_hand_washing_daily_log.workplace_area_id" => "id"
                ],
                "[><]company_zones" => [
                    "workplace_areas.company_zone_id" => "id"
                ],
                "[><]gmp_hand_washing_workday_period_log" => [
                    "period_log_id" => "id"
                ],
                "[><]workday_periods" => [
                    "gmp_hand_washing_workday_period_log.workday_period_id" 
                        => "id"
                ]
            ], [
                "gmp_hand_washing_log.id",
                "users_profile_info.employee_id_num",
                "users_profile_info.full_name",
                "gmp_hand_washing_daily_log.date",
                "gmp_hand_washing_daily_log.time",
                "company_zones.zone_name",
                "workplace_areas.area_name",
                "gmp_hand_washing_daily_log.comment",
                "workday_periods.start_time",
                "workday_periods.end_time",
                "workday_periods.period_name",
                "gmp_hand_washing_workday_period_log.washed_hands"
            ], [
                "AND" => [
                    "gmp_hand_washing_daily_log.workplace_area_id" => $areaID,
                    "gmp_hand_washing_daily_log.date[>=]" => $startDate,
                    "gmp_hand_washing_daily_log.date[<=]" => $endDate
                ],
                "ORDER" => "gmp_hand_washing_daily_log.date"
            ]
        );
    }
}

?>