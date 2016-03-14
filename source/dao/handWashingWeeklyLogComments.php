<?php

require_once dirname(__FILE__)."\\table.php";

// Data Access Object for the hand_washing_weekly_log_comments table
class HandWashingWeeklyLogComments extends Table
{
    // Creates an interface for interacting with the 
    // hand_washing_weekly_log_comments table in the specified data base
    function __construct($dataBaseConnection)
    {
        parent::__construct($dataBaseConnection,
            "hand_washing_weekly_log_comments");
    }
    
    
    // Returns a list of elements which have the specified date
    function findItemsByDate($date) 
    {
        return parent::select("*", ["#start_date" => "DATE(".$date.")"]);
    }
}

?>