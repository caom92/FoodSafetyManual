<?php

namespace fsm\services\gmp\packing\preop;

require_once realpath(dirname(__FILE__).
    '/../../../../../dao/logs/gmp/packing/preop/CorrectiveActionsDAO.php');

use fsm\database\gmp\packing\preop as preop;


// Lists all the corrective actions
function getAllCorrectiveActions() 
{
    $correctiveActions = new preop\CorrectiveActionsDAO();
    return $correctiveActions->selectAll();
}


// Adds a new entry to the pre-op log
function registerLogEntry()
{

}

?>