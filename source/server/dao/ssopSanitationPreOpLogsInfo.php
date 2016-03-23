<?php

if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
    require_once dirname(__FILE__)."\\table.php";
}
else {
    require_once dirname(__FILE__)."/table.php";
}


// Data Access Object for the ssop_sanitation_pre_op_logs_info table
class SSOPSanitationPreOpLogsInfo extends Table
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