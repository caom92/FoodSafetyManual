<?php

namespace espresso;

require_once "table.php";

// Data Access Object for the workday_periods table
class WorkdayPeriods extends Table
{
    // Default constructor
    function __construct()
    {
        parent::__construct("workday_periods");
    }

    
    // Returns the element which has the specified id name the table
    function findItemByName($name)
    {
        return select(["*"], ["period_name" => $name]);
    }
}

?>