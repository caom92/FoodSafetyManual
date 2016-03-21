<?php

require_once realpath("table.php");

// Data Access Object for the workday_periods table
class WorkdayPeriods extends Table
{
    // Creates an interface for interacting with the workday_periods table in 
    // the specified data base
    function __construct($dataBaseConnection)
    {
        parent::__construct($dataBaseConnection, "workday_periods");
    }

    
    // Returns a list of all the elements in the table
    function getAllItems() 
    {
        return parent::select("*");
    }
}

?>