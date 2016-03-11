<?php

namespace espresso;

require_once "table.php";

// Data Access Object for the certification_programs table
class CertificationPrograms extends Table
{
    // Default constructor
    function __construct()
    {
        parent::__construct("certification_programs");
    }
    
    
    // Returns the elements from the table which have the specified name
    function findItemByName($name)
    {
        return select(["*"], ["certification_program_name" => $name]);
    }
}

?>