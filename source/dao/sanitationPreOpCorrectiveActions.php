<?php

namespace espresso;

require_once "table.php";

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
    
    
    // Returns a list of elements which have the specified name
    function findItemsByName($name)
    {
        return select(["*"], ["action_name" => $name]);
    }
}

?>