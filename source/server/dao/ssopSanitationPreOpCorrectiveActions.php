<?php

if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
    require_once dirname(__FILE__)."\\table.php";
}
else {
    require_once dirname(__FILE__)."/table.php";
}

// Data Access Object for the ssop_sanitation_pre_op_corrective_actions table
class SSOPSanitationPreOpCorrectiveActions extends Table 
{
    // Creates an interface for interacting with the 
    // ssop_sanitation_pre_op_corrective_actions table in the specified data 
    // base
    function __construct($dataBaseConnection)
    {
        parent::__construct($dataBaseConnection, 
            "ssop_sanitation_pre_op_corrective_actions");
    }
    
    
    // Returns a list of all the elements stored in this table
    function getAllItems() 
    {
        return parent::select("*");
    }
}

?>