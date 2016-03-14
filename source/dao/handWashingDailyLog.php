<?php

require_once dirname(__FILE__)."table.php";

// Data Access Object for hand_washing_daily_log table
class HandWashingDailyLog extends Table
{
    // Creates an interface for interacting with the hand_washing_daily_log 
    // table in the specified data base
    function __construct($dataBaseConnection)
    {
        parent::__construct($dataBaseConnection, "hand_washing_daily_log");
    }
    
    
    // Returns the element which has the specified id in the table
    function findItemById($id) 
    {
        return parent::joinSelect([
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
    
    
    // Returns a list of elements which have the specified name
    function findItemsByDate($date) 
    {
        return parent::joinSelect([
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
    
    
    // Returns an array that stores every element in the table
    function getAllItems()
    {
        return parent::joinSelect([
            "[><]workday_periods" => ["workday_period_id" => "id"]
            ], [
                "hand_washing_daily_log.id",
                "hand_washing_daily_log.date",
                "workday_periods.period_name",
                "workday_periods.start_time",
                "workday_periods.end_time",
                "hand_washing_daily_log.washed_hands"
            ]);
    }
}

?>