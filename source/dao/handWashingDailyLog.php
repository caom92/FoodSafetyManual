<?php

namespace espresso;

require_once "workdayPeriods.php";

// Data Access Object for hand_washing_daily_log table
class HandWashingDailyLog extends DAO
{
    // Default constructor
    function __construct()
    {
        parent::__construct("hand_washing_daily_log");
    }
    
    
    // Returns the element which has the specified id in the table
    function findById($id) 
    {
        return join([
            "[><]workday_periods" => ["workday_period_id" => "id"]
            ], [
                "hand_washing_daily_log.id",
                "hand_washing_daily_log.date",
                "workday_periods.period_name",
                "workday_periods.start_time",
                "workday_periods.end_time",
                "hand_washing_daily_log.washed_hands"
            ], [
                "hand_washing_daily_log.id" => $id
            ]);
    }
    
    
    // Returns the element which has the specified date in the table
    function findByDate($date) 
    {
        return join([
            "[><]workday_periods" => ["workday_period_id" => "id"]
            ], [
                "hand_washing_daily_log.id",
                "hand_washing_daily_log.date",
                "workday_periods.period_name",
                "workday_periods.start_time",
                "workday_periods.end_time",
                "hand_washing_daily_log.washed_hands"
            ], [
                "#hand_washing_daily_log.date" => "DATE(".$date.")"
            ]);
    }
}

?>