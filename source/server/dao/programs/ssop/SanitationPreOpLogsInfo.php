<?php

// Namespace for the SSOP program's classes and functions
namespace espresso\dao\ssop;

// Importing required classes
require_once realpath("./../../DataBaseTable.php");
use espresso\dao\DataBaseTable;

// Data Access Object for the ssop_sanitation_pre_op_logs_info table
class SanitationPreOpLogsInfo extends DataBaseTable
{
    // Creates an interface for interacting with the 
    // ssop_sanitation_pre_op_logs_info table in the specified data base
    function __construct($dataBaseConnection)
    {
        parent::__construct($dataBaseConnection, 
            "ssop_sanitation_pre_op_logs_info");
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