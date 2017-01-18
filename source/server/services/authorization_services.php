<?php

// Namespace for the services that correspond to the log authorization by the
// supervisor
namespace fsm\services\authorizations;

// Import the required files
require_once realpath(dirname(__FILE__).'/../dao/UsersDAO.php');

// Use the database namespace
use fsm\database as db;


// Returns a list of all the supervisors in the especified zone
function getSupervisorsOfZone()
{
    // first connect to the database and retrieve the supervisor list
    $users = new db\UsersDAO();
    $rows = $users->selectSupervisorsNameByZoneID($_POST['zone_id']);

    // temporal storage for the list of supervisors to return to the user
    $supervisors = [];

    // prepare the final supervisor list
    foreach ($rows as $row) {
        array_push($supervisors, [
            'id' => $row['id'],
            'full_name' => "{$row['first_name']} {$row['last_name']}"
        ]);
    }

    // return it to the user
    return $supervisors;
}

?>