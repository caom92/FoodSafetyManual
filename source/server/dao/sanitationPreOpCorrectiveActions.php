<?php

require_once dirname(__FILE__)."\\table.php";

// Data Access Object for the sanitation_pre_op_corrective_actions table
class SanitationPreOpCorrectiveActions extends Table 
{
    // Creates an interface for interacting with the 
    // sanitation_pre_op_corrective_actions table in the specified data base
    function __construct($dataBaseConnection)
    {
        parent::__construct($dataBaseConnection, 
            "sanitation_pre_op_corrective_actions");
    }
    
    
    // Returns a list of all the elements stored in this table
    function getAllItems() 
    {
        return parent::select("*");
    }
}

?>