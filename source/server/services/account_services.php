<?php

namespace fsm\services\account;

require_once realpath(dirname(__FILE__).'/../dao/UsersDAO.php');
require_once realpath(dirname(__FILE__).'/../dao/ZonesDAO.php');
require_once realpath(dirname(__FILE__).'/../dao/PrivilegesDAO.php');
require_once realpath(dirname(__FILE__).'/../dao/RolesDAO.php');
require_once realpath(dirname(__FILE__).'/../dao/UsersLogsPrivilegesDAO.php');
require_once realpath(dirname(__FILE__).'/../data_validations.php');

use fsm\database as db;
use fsm\validations as val;


// Returns a list of all the active users
function getAllUsersAccountInfo() 
{
    $users = new db\UsersDAO();
    return $users->selectAll();
}


// Returns the profile info of the specified user
function getUserAccountInfo() 
{
    $users = new db\UsersDAO();
    $userInfo = $users->getByIdentifier($_POST['employee_num']);

    return [
        'id' => $userInfo['user_id'],
        'role_id' => $userInfo['role_id'],
        'role_name' => $userInfo['role_name'],
        'employee_num' => $userInfo['employee_num'],
        'first_name' => $userInfo['first_name'],
        'last_name' => $userInfo['last_name'],
        'email' => $userInfo['email'],
        'login_name' => $userInfo['login_name']
    ];
}


// Checks if the log in name is duplicated
function isLogInNameDuplicated() 
{
    // first we connect to the database
    $users = new db\UsersDAO();

    // then we check if the name is duplicated
    return $users->hasByLogInName($_POST['login_name']);
}


// Checks if the email is duplicated
function isEmailDuplicated() 
{
    // first we connect to the database
    $users = new db\UsersDAO();

    // then we check if the name is duplicated
    return $users->hasByEmail($_POST['email']);
}


// Checks if the employee ID number is duplicated
function isEmployeeNumDuplicated() 
{
    // first we connect to the database
    $users = new db\UsersDAO();

    // then we check if the name is duplicated
    return $users->hasByEmployeeNum($_POST['employee_num']);
}


// Changes the log in name of the user
function editLogInName() 
{
    // first we connect to the database
    $users = new db\UsersDAO();

    // then we check if the name is duplicated and if the password is valid
    $isNameDuplicated = $users->hasByLogInName($_POST['new_username']);
    $isPasswordValid = password_verify(
        $_POST['password'],
        $_SESSION['login_password']
    );
    
    if ($isNameDuplicated) {
        throw new \Exception(
            'Failed to update user name; new name is already taken.'
        );
    }

    if (!$isPasswordValid) {
        throw new \Exception(
            'Failed to update user name; the password is incorrect.'
        );
    }
    
    // if the password is not duplicated and the password is valid, then
    // update the user name
    $users->updateLogInNameByUserID(
        $_SESSION['user_id'],
        $_POST['new_username']
    );

    return [];
}


// Changes the user's email address
function editEmail() 
{
    // connect to the data base
    $users = new db\UsersDAO();

    // check if the new email is duplicated and if the password is valid
    $isEmailDuplicated = $users->hasByEmail($_POST['new_email']);
    $isPasswordValid = password_verify(
        $_POST['password'], 
        $_SESSION['login_password']
    );

    if ($isEmailDuplicated) {
        throw new \Exception(
            'Failed to update user email; address is already taken.'
        );
    }

    if (!$isPasswordValid) {
        throw new \Exception(
            'Failed to update user email; the password is incorrect.'
        );
    }

    // update the email address in the data base
    $users->updateEmailByUserID($_SESSION['user_id'], $_POST['new_email']);

    return [];
}


// Changes the user log in password
function editPassword() 
{
    // first, connect to the data base
    $users = new db\UsersDAO();

    // check if the password is valid
    $isPasswordValid = password_verify(
        $_POST['password'], 
        $_SESSION['login_password']
    );

    if (!$isPasswordValid) {
        throw new \Exception(
            'Password could not be changed; authentication credentials '. 
            'where incorrect.'
        );
    }

    // obtain the hash of the new password
    $newPasswd = password_hash($_POST['new_password'], \PASSWORD_BCRYPT);

    // store the new password in the data base 
    $users->updatePasswordByUserID(
        $_SESSION['user_id'], 
        $newPasswd
    );

    // save the new password in the session storage
    $_SESSION['login_password'] = $newPasswd;
}


// Toggles the activation of the specified account
function toggleAccountActivation() 
{
    $users = new db\UsersDAO();
    $users->toggleActivationByID($_POST['user_id']);
    return [];
}


// Returns a list of all the user privileges
function getAllUserPrivileges()
{
    $privileges = new db\PrivilegesDAO();
    return $privileges->selectAll();
}


// Returns a list of all the user roles
function getAllUserRoles()
{
    $roles = new db\RolesDAO();
    return $roles->selectAll();
}


// Creates a new user account
function addNewUserAccount()
{
    // first, connect to the data base
    $users = new db\UsersDAO();
    $roles = new db\RolesDAO();
    $userPrivileges = new db\UsersLogsPrivilegesDAO();

    // then, hash the password
    $hashedPassword = password_hash(
        $_POST['login_password'],
        \PASSWORD_BCRYPT
    );

    // get the role name
    $roleName = $roles->getNameByID($_POST['role_id']);

    // user data to store in the data base
    $userData = [
        'is_active' => TRUE,
        'role_id' => $_POST['role_id'],
        'employee_num' => $_POST['employee_num'],
        'first_name' => $_POST['first_name'],
        'last_name' => $_POST['last_name'],
        'email' => $_POST['email'],
        'login_name' => $_POST['login_name'],
        'login_password' => $hashedPassword
    ];

    // check the user role
    $isManager = $roleName == 'Manager';
    $isSupervisor = $roleName == 'Supervisor';
    $isEmployee = $roleName == 'Employee';

    // check if the user role requires a zone to be specified
    $isZoneRequired = 
        $isManager ||
        $isSupervisor ||
        $isEmployee;
        

    if ($isZoneRequired) {
        // check if the zone ID was provided
        if (val\isInteger($_POST['zone_id'])) {
            // if it was, store it in the user data
            $userData['zone_id'] = $_POST['zone_id'];
        } else {
            // if not, notiy the user
            throw new \Exception('The Zone ID was not provided.');
        }
    } else {
        // if the role does not require a zone ID, set a default one
        $userData['zone_id'] = 1;
    }

    // check if the user role requires privileges to be specified
    $arePrivilegesRequired = $isSupervisor || $isEmployee;

    if ($arePrivilegesRequired) {
        // check that the data in the privileges array exists and is 
        // of the proper type
        if (isset($_POST['privileges'])) {
            foreach ($_POST['privileges'] as $privilege) {
                $isInteger = val\isInteger($privilege['log_id']);
                if (!$isInteger) {
                    throw new \Exception(
                        'A log ID provided is not an integer'
                    );
                }

                $isInteger = val\isInteger($privilege['privilege_id']);
                if (!$isInteger) {
                    throw new \Exception(
                        'A privilege ID provided is not an integer'
                    );
                }
            }
        } else {
            // if it was not provided, throw an exception
            throw new \Exception('privileges array was not provided.');
        }

        // supervisor and employees get their permissions assigned by the 
        // administrator for a single zone only

        // get the ID of the read privilege
        $privilegesTable = new db\PrivilegesDAO();
        $privilegeID = $privilegesTable->getIDByName('Read');
        $privilegeID = $privilegeID['id'];

        // insert the profile data to the data base 
        $userID = $users->insert($userData);

        // create a privileges array with the proper format that medoo is 
        // expecting
        $privileges = [];
        foreach ($_POST['privileges'] as $privilege) {
            array_push($privileges, [
                'user_id' => $userID,
                'log_id' => $privilege['log_id'],
                'privilege_id' => ($isSupervisor) ?
                    $privilegeID :
                    $privilege['privilege_id']
            ]);
        }

        // store the user privileges in the data base 
        $userPrivileges->insert($privileges);
    }

    return [];
}


// Changes the log privileges of an specified user
function editPrivileges()
{
    // before we start, check that the data in the array is of the proper type
    foreach ($_POST['privileges'] as $privilege) {
        $isInteger = val\isInteger($privilege['log_id']);
        if (!$isInteger) {
            throw new \Exception('A log ID provided is not an integer');
        }

        $isInteger = val\isInteger($privilege['privilege_id']);
        if (!$isInteger) {
            throw new \Exception('A privilege ID provided is not an integer');
        }
    }

    // then, connect to the data base
    $userPrivileges = new db\UsersLogsPrivilegesDAO();

    // update the log privileges of the user
    foreach ($_POST['privileges'] as $privilege) {
        $userPrivileges->updatePrivilegeByUserAndLogID(
            $_POST['user_id'],
            $privilege['log_id'],
            $privilege['privilege_id']
        );
    }

    return [];
}


// [***]
function getPrivilegesOfUser()
{
    $userPrivileges = new db\UsersLogsPrivilegesDAO();
    $rows = $userPrivileges->selectByEmployeeNum($_POST['employee_num']);

    $privileges = [];
    $program = [
        'id' => 0,
        'name' => '',
        'modules' => []
    ];
    $module = [
        'id' => 0,
        'name' => '',
        'logs' => []
    ];

    foreach ($rows as $row) {
        $hasProgramChanged = $row['program_id'] != $program['id'];
        if ($hasProgramChanged) {
            if ($program['id'] != 0) {
                array_push($program['modules'], $module);
                array_push($privileges, $program);
            }
            $log = [
                'id' => $row['log_id'],
                'name' => $row['log_name'],
                'privilege' => [
                    'id' => $row['id'],
                    'name' => $row['name']
                ]
            ];
            $module = [
                'id' => $row['module_id'],
                'name' => $row['module_name'],
                'logs' => [ $log ]
            ];
            $program = [
                'id' => $row['program_id'],
                'name' => $row['program_name'],
                'modules' => []
            ];
        } else {
            $hasModuleChanged = $row['module_id'] != $module['id'];
            if ($hasModuleChanged) {
                array_push($program['modules'], $module);
                $log = [
                    'id' => $row['log_id'],
                    'name' => $row['log_name'],
                    'privilege' => [
                        'id' => $row['id'],
                        'name' => $row['name']
                    ]
                ];
                $module = [
                    'id' => $row['module_id'],
                    'name' => $row['module_name'],
                    'logs' => [ $log ]
                ];
            } else {
                array_push($module['logs'], [
                    'id' => $row['id'],
                    'name' => $row['name'],
                    'privilege' => [
                        'id' => $row['privilege_id'],
                        'name' => $row['privilege_name']
                    ]
                ]);
            }
        }
    }

    if ($module['id'] != 0) {
        array_push($program['modules'], $module);
    }

    if ($program['id'] != 0) {
        array_push($privileges, $program);
    }

    return $privileges;
}


// Changes the zone upon which the user is acting to the one with the 
// especified ID
function changeZoneOfDirector()
{
    // get the info of the zone using the ID
    $zones = new db\ZonesDAO();
    $zone = $zones->getByID($_POST['zone_id']);
    
    // check if the zone exists
    if (!isset($zone)) {
        // if not, notify the user
        throw new \Exception(
            "No zone with ID ".$_POST['zone_id']." could be find"
        );
    }

    // update the zone info associated with the account's session
    $_SESSION['zone_id'] = $zone['id'];
    $_SESSION['zone_name'] = $zone['name'];

    // return the info of the new zone
    return $zone;
}

?>