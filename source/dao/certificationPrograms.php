<?php

namespace espresso;

require_once "dao.php";

// Data Access Object for the certification_programs table
class CertificationPrograms extends DAO
{
    // Default constructor
    function __construct()
    {
        parent::__construct("certification_programs");
    }
    
    
    // Returns the elements from the table which have the specified name
    function findByName($name)
    {
        return select(["*"], ["certification_program_name" => $name]);
    }
}

?>