<?php

require_once realpath("table.php");

// Data Access Object for the workday_period_hand_washing_log table
class WorkdayPeriodHandWashingLog extends Table
{
    // Creates an interface for interacting with the workday_period_hand_washing_log table in 
    // the specified data base
    function __construct($dataBaseConnection)
    {
        parent::__construct($dataBaseConnection, 
            "workday_period_hand_washing_log");
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