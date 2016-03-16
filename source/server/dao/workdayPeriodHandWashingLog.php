<?php

require_once dirname(__FILE__)."\\table.php";

// Data Access Object for the workday_period_hand_washing_log table
class WorkdayPeriodHandWashingLog extends Table
{
    // Creates an interface for interacting with the workday_period_hand_washing_log table in 
    // the specified data base
    function __construct($dataBaseConnection)
    {
        parent::__construct($dataBaseConnection, "workday_period_hand_washing_log");
    }
    
    // Returns the element which has the specified id in the table
    function findItemById($id)
    {
        return parent::joinSelect([
            "[><]workday_periods" => [
                "workday_period_id" => "id"
            ]
        ], [
            "workday_period_hand_washing_log.id",
            "workday_periods.start_time",
            "workday_periods.end_time",
            "workday_periods.period_name",
            "workday_period_hand_washing_log.washed_hands"
        ], [
            "id" => $id
        ]);
    }
    
    // Returns an array that stores every element in the table
    function getAllItems()
    {
        return parent::joinSelect([
            "[><]workday_periods" => [
                "workday_period_id" => "id"
            ]
        ], [
            "workday_period_hand_washing_log.id",
            "workday_periods.start_time",
            "workday_periods.end_time",
            "workday_periods.period_name",
            "workday_period_hand_washing_log.washed_hands"
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