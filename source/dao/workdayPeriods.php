<?php

namespace espresso;

require_once "dao.php";

// Data Access Object for the workday_periods table
class WorkdayPeriods extends DAO
{
    // Default constructor
    function __construct()
    {
        parent::__construct("workday_periods");
    }

    
    // Returns the element which has the specified id name the table
    function findByName($name)
    {
        return select(["*"], ["period_name" => $name]);
    }
}

?>