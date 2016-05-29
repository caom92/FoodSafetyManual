<?php

// Namespace for the GMP program's classes and functions
namespace espresso\dao\gmp;

// Importing required classes
require_once realpath("./../../DataBaseTable.php");
use espresso\dao\DataBaseTable;

// Data Access Object for the gmp_hand_washing_workday_period_log table
class HandWashingWorkdayPeriodLog extends DataBaseTable
{
    // Creates an interface for interacting with the 
    // gmp_workday_period_hand_washing_log table in the specified data base
    function __construct($dataBaseConnection)
    {
        parent::__construct($dataBaseConnection, 
            "gmp_hand_washing_workday_period_log");
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