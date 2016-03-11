<?php

namespace espresso;

require_once "table.php";

// Data Access Object for the sanitation_pre_op_corrective_actions table
class SanitationPreOpCorrectiveActions extends Table 
{
    // Default constructor
    function __construct()
    {
        parent::__construct("sanitation_pre_op_corrective_actions");
    }
    
    
    // Returns the element which has the specified name in the table
    function findItemByName($name)
    {
        return select(["*"], ["action_name" => $name]);
    }
}

?>