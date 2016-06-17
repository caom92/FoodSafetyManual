<?php

// Namespace for the project's Data Access Objects
namespace espresso\dao;

// Importing required classes
require_once realpath(dirname(__FILE__)."/DataBaseTable.php");

// Data Access Object for the users_profile_info table
class UsersProfileInfo extends DataBaseTable
{
    // Creates an interface for interacting with the 
    // users_profile_info table in the specified data base
    function __construct($dataBaseConnection)
    {
        parent::__construct($dataBaseConnection, "users_profile_info");
    }
    
    
    // Returns an associative array containing the data of the element which
    // has the especified log in name and password combination
    // [in]        loginName: the name for logging in that we want to search
    //             for in the table
    // [in]        password: sha256 checksum of the password that we want to 
    //             search for in the table
    // [out]       return: an associative array with the data of the element
    //             that contained the especified log in name and password 
    //             combination, or an empty string in case none was found
    function searchItemsByLogInName($loginName, $password = "")
    {
        if ($password != "") {
            return parent::select("*", [ "AND" => [
                "login_name" => $loginName,
                "login_password" => $password
            ]]);
        } else {
            return parent::select("*", [
                "login_name" => $loginName
            ]);
        }
    }
    
    
    // Returns an associative array containing the data of the element which
    // has the especified employee ID number and password combination
    // [in]        employeeID: the company especific employee ID number that
    //             we want to search for in the table
    // [in]        password: sha256 checksum of the password that we want to 
    //             search for in the table
    // [out]       return: an associative array with the data of the element
    //             that contained the especified employee ID and password 
    //             combination, or an empty string in case none was found
    function searchItemsByEmployeeID($employeeID, $password = "")
    {
        if ($password != "") {
            return parent::select("*", [ "AND" => [
                "employee_id_num" => $employeeID,
                "login_password" => $password
            ]]);
        } else {
            return parent::select("*", [
                "employee_id_num" => $employeeID
            ]);
        }
    }
    
    
    // Returns an associative array containing the data of the element which
    // has the especified email and password combination
    // [in]        email: the email that we want to search
    //             for in the table
    // [in]        password: sha256 checksum of the password that we want to 
    //             search for in the table
    // [out]       return: an associative array with the data of the element
    //             that contained the especified email and password 
    //             combination, or an empty string in case none was found
    function searchItemsByEmail($email, $password = "")
    {
        if ($password != "") {
            return parent::select("*", [ "AND" => [
                "email" => $email,
                "login_password" => $password
            ]]);
        } else {
            return parent::select("*", [
                "email" => $email
            ]);
        }
    }


    // Returns an associative array containing the data of the element which
    // has the especified ID and password combination
    // [in]        id: the user ID that we want to search
    //             for in the table
    // [in]        password: sha256 checksum of the password that we want to 
    //             search for in the table
    // [out]       return: an associative array with the data of the element
    //             that contained the especified email and password 
    //             combination, or an empty string in case none was found
    function searchItemsByID($id, $password = "")
    {
        if ($password != "") {
            return parent::select("*", [ "AND" => [
                "id" => $id,
                "login_password" => $password
            ]]);
        } else {
            return parent::select("*", [
                "id" => $id
            ]);
        }
    }
    
    
    // Inserts the data to the data base
    // [in]    items: an array of associative arrays which define the rows to
    //         be inserted, where the key is the column name
    // [out]   return: the ID of the last inserted item
    function saveItems($items)
    {
        return parent::insert($items);
    }


    // Changes the login password field of the element in the table which has 
    // the especified user ID
    // [in]     id: the user ID of the elemente which login password we 
    //          want to change
    // [in]     newPassword: the new password value that is to be assigned
    //          to the element found
    // [out]    return: the number of rows affected
    function changeLogInPasswordOfUserWithID($id, $newPassword)
    {
        return parent::update(
            ["login_password" => $newPassword], 
            ["id" => $id]
        );
    }
}

?>