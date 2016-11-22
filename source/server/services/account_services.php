<?php

namespace fsm\services\account;

require_once realpath(dirname(__FILE__).'/../dao/UsersDAO.php');

use fsm\database as db;


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

?>