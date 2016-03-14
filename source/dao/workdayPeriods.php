<?php

namespace espresso;

require_once "table.php";

// Data Access Object for the workday_periods table
class WorkdayPeriods extends Table
{
    // Creates an interface for interacting with the workday_periods table in 
    // the specified data base
    function __construct($dataBaseConnection)
    {
        parent::__construct($dataBaseConnection, "workday_periods");
    }

    
    // Returns a list of elements which have the specified name
    function findItemsByName($name)
    {
        return select(["*"], ["period_name" => $name]);
    }
}

?>