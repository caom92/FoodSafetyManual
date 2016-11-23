<?php

namespace fsm\services\account;

require_once realpath(dirname(__FILE__).'/../dao/UsersDAO.php');
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

    $isSupervisor = $userInfo['role_name'] === 'Supervisor';
    $isEmployee = $userInfo['role_name'] === 'Employee';
    
    if ($isSupervisor || $isEmployee) {
        return [
            'id' => $userInfo['id'],
            'role_id' => $userInfo['role_id'],
            'role_name' => $userInfo['role_name'],
            'zone_id' => $userInfo['zone_id'],
            'zone_name' => $userInfo['zone_name'],
            'employee_num' => $userInfo['employee_num'],
            'first_name' => $userInfo['first_name'],
            'last_name' => $userInfo['last_name'],
            'email' => $userInfo['email'],
            'login_name' => $userInfo['login_name']
        ];
    } else {
        return [
            'id' => $userInfo['id'],
            'role_id' => $userInfo['role_id'],
            'role_name' => $userInfo['role_name'],
            'employee_num' => $userInfo['employee_num'],
            'first_name' => $userInfo['first_name'],
            'last_name' => $userInfo['last_name'],
            'email' => $userInfo['email'],
            'login_name' => $userInfo['login_name']
        ];
    }
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

    // first, connect to the data base
    $users = new db\UsersDAO();
    $userPrivileges = new db\UserLogsPrivilegesDAO();

    // then, hash the password
    $hashedPassword = password_hash(
        $_POST['password'],
        \PASSWORD_BCRYPT
    );

    // insert the profile data to the data base 
    $userID = $users->insert([
        'is_active' => TRUE,
        'role_id' => $_POST['role_id'],
        'zone_id' => $_POST['zone_id'],
        'employee_num' => $_POST['employee_num'],
        'first_name' => $_POST['first_name'],
        'last_name' => $_POST['last_name'],
        'email' => $_POST['email'],
        'login_name' => $_POST['username'],
        'login_password' => $hashedPassword
    ]);

    // create a privileges array with the proper format that medoo is expecting
    $privileges = [];
    foreach ($_POST['privileges'] as $privilege) {
        array_push($privileges, [
            'user_id' => $userID,
            'log_id' => $privilege['log_id'],
            'privilege_id' => $privilege['privilege_id']
        ]);
    }

    // store the user privileges in the data base 
    $userPrivileges->insert($privileges);

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
    $userPrivileges = new db\UserLogsPrivilegesDAO();

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

?>