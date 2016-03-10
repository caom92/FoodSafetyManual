<?php

namespace espresso;

require_once "dao.php";

// Data Access Object for the hand_washing_weekly_log_comments table
class HandWashingWeeklyLogComments extends DAO
{
    function __construct()
    {
        parent::__construct("hand_washing_weekly_log_comments");
    }
    
    
    // Returns the element which has the specified date in the table
    function findByDate($date) 
    {
        return select(["*"], ["#start_date" => "DATE(".$date.")"]);
    }
}

?>