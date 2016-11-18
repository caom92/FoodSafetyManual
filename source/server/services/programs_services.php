<?php

namespace fsm\services\program;

require_once realpath(dirname(__FILE__).'/../dao/ProgramsDAO.php');
require_once realpath(dirname(__FILE__).'/../dao/ModulesDAO.php');

use fsm\database as db;


// Returns a list of all programs
function getAllPrograms() 
{
    $programs = new db\ProgramsDAO();
    return $programs->selectAll();
}


// Returns a list of all the modules of the specified program
function getAllModulesOfProgram() 
{
    $modules = new db\ModulesDAO();
    return $modules->selectByProgramID($_POST['program_id']);
}

?>