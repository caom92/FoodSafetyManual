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
    // [in]        password: md5 checksum of the password that we want to 
    //             search for in the table
    // [out]       return: an associative array with the data of the element
    //             that contained the especified log in name and password 
    //             combination, or an empty string in case none was found
    function searchItemsByLogInNameAndPassword($loginName, $password)
    {
        return parent::select("*", [ "AND" => [
            "login_name" => $loginName,
            "login_password" => $password
        ]]);
    }
    
    
    // Returns an associative array containing the data of the element which
    // has the especified employee ID number and password combination
    // [in]        employeeID: the company especific employee ID number that
    //             we want to search for in the table
    // [in]        password: md5 checksum of the password that we want to 
    //             search for in the table
    // [out]       return: an associative array with the data of the element
    //             that contained the especified employee ID and password 
    //             combination, or an empty string in case none was found
    function searchItemsByEmployeeIDAndPassword($employeeID, $password)
    {
        return parent::select("*", [ "AND" => [
            "employee_id_num" => $employeeID,
            "login_password" => $password
        ]]);
    }
    
    
    // Returns an associative array containing the data of the element which
    // has the especified email and password combination
    // [in]        email: the email that we want to search
    //             for in the table
    // [in]        password: md5 checksum of the password that we want to 
    //             search for in the table
    // [out]       return: an associative array with the data of the element
    //             that contained the especified email and password 
    //             combination, or an empty string in case none was found
    function searchItemsByEmailAndPassword($email, $password)
    {
        return parent::select("*", [ "AND" => [
            "email" => $email,
            "login_password" => $password
        ]]);
    }
    
    
    // Inserts the data to the data base
    // [in]    items: an array of associative arrays which define the rows to
    //         be inserted, where the key is the column name
    // [out]   return: the ID of the last inserted item
    function saveItems($items)
    {
        return parent::insert($items);
    }
}

?>