<?php

// Namespace for the project's Data Access Objects
namespace espresso\dao;

// Importing required classes
require_once realpath(dirname(__FILE__)."/DataBaseTable.php");

// Data Access Object for the user_profiles table
class UserProfiles extends DataBaseTable
{
    // Creates an interface for interacting with the 
    // user_profiles table in the specified data base
    function __construct($dataBaseConnection)
    {
        parent::__construct($dataBaseConnection, "user_profiles");
    }
    

    // Returns an associative array containing the data of the which
    // has the especified identifier and password combination
    // [in]     identifier: the identifier of the element that we want 
    //          to look for; in this case, this can be either the ID, the
    //          account nickname, the employee number or the email
    // [in]     password: sha256 checksum of the password that we want to
    //          search for in the table
    // [out]    return: an associative array with the data of the element
    //          that contained the especified identifier and password 
    //          combination, or an empty string in case none was found
    function searchItemsByIdentifierAndPassword($identifier, $password)
    {
        return parent::select("*", [ "AND"  => [
            "OR" => [
                "id" => $identifier,
                "employee_num" => $identifier,
                "email" => $identifier,
                "account_nickname" => $identifier
            ],
            "login_password" => $password
        ]]);
    }


    // Returns an associative array containing the data of the which
    // has the especified identifier and password combination
    // [in]     identifier: the identifier of the element that we want 
    //          to look for; in this case, this can be either the ID, the
    //          account nickname, the employee number or the email
    // [out]    return: an associative array with the data of the element
    //          that contained the especified identifier and password 
    //          combination, or an empty string in case none was found
    function searchItemsByIdentifier($identifier)
    {
        return parent::select("*", [ "OR" => [
                "id" => $identifier,
                "employee_num" => $identifier,
                "email" => $identifier,
                "account_nickname" => $identifier
            ]
        ]);
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
            [ "login_password" => $newPassword ], 
            [ "id" => $id ]
        );
    }


    function changeEmailOfUserWithID($id, $newEmail)
    {
        return parent::update(
            [ "email" => $newEmail ],
            [ "id" => $id ]
        );
    }


    function changeAccountNicknameOfUserWithID($id, $newNickname)
    {
        return parent::update(
            [ "account_nickname" => $newNickname ],
            [ "id" => $id ]
        );
    }
}

?>