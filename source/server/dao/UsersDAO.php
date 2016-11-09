<?php

// Namespace for the project's Data Access Objects
namespace fsm\database;

// Importing required classes
require_once realpath(dirname(__FILE__)."/DataAccessObject.php");

// Data Access Object for the users table
class UsersDAO extends DataAccessObject
{
    // Creates an interface for interacting with the 
    // users table in the specified data base
    function __construct()
    {
        parent::__construct("users");
    }
    

    // Returns an associative array containing the data of the which
    // has the especified identifier; it can also search for an 
    // identifier and password combination
    // [in]     identifier: the identifier of the element that we want 
    //          to look for; in this case, this can be either the ID, the
    //          user name, the employee number or the email
    // [out]    return: an associative array with the data of the element
    //          that contained the especified identifier and password 
    //          combination, or an empty string in case none was found
    function getByIdentifier($identifier)
    {
        $rows = parent::select(
            [
                "$this->table.id(id)", 'r.name(role_name)', 
                'employee_num', 'email', 'first_name', 'last_name', 
                'login_name', 'login_password', 
                'recieve_email_notifications'
            ], 
            [ 
                'AND' => [
                    "OR" => [
                        "$this->table.id" => $identifier,
                        "employee_num" => $identifier,
                        "email" => $identifier,
                        "login_name" => $identifier
                    ],
                    "$this->table.is_active" => 1    
                ]
            ],
            [
                '[><]roles(r)' => [ 'role_id' => 'id' ]
            ]
        );

        $isEmpty = count($rows) == 0;
        return (!$isEmpty) ? $rows[0] : NULL; 
    }


    // Returns true if there is data in the data base that shares the given 
    // user name
    function hasByLogInName($username)
    {
        return parent::has([ 'login_name' => $username ]);
    }


    // Returns the data of every user that shares the given email
    function hasByEmail($email)
    {
        return parent::has([ 'email' => $email ]);
    }


    // Returns the data of every user that shares the given employee number
    function hasByEmployeeNum($employeeNum)
    {
        return parent::has([ 'employee_num' => $employeeNum ]);
    }


    // Returns an associative with the basic information of every user in the 
    // data base which is not an administrator, where the key is the field name
    // and the value is the field value
    function selectAll()
    {
        return parent::select(
            [
                "$this->table.id", 
                'role_id',
                'r.name(role_name)', 
                'employee_num', 
                'login_name', 
                'email', 
                'first_name', 
                'last_name',
                'is_active'
            ],
            [],
            [
                '[><]roles(r)' => [ 'role_id' => 'id']
            ]
        );
    }
    
    
    // Inserts the data to the data base
    // [in]    items: an array of associative arrays which define the rows to
    //         be inserted, where the key is the column name
    // [out]   return: the ID of the last inserted item
    function insert($items)
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
    function updatePasswordByUserID($id, $newPassword)
    {
        parent::update(
            [ "login_password" => $newPassword ], 
            [ "id" => $id ]
        );
    }


    // Changes the email field of the element in the table which has the 
    // especified user ID
    // [in]     id: the user ID of the elemente which email we 
    //          want to change
    // [in]     newEmail: the new email value that is to be assigned
    //          to the element found
    // [out]    return: the number of rows affected
    function updateEmailByUserID($id, $newEmail)
    {
        parent::update(
            [ "email" => $newEmail ],
            [ "id" => $id ]
        );
    }


    // Changes the login name field of the element in the table which has the 
    // especified user ID
    // [in]     id: the user ID of the element which login name we 
    //          want to change
    // [in]     newName: the new login name value that is to be assigned
    //          to the element found
    // [out]    return: the number of rows affected
    function updateLogInNameByUserID($id, $newName)
    {
        parent::update(
            [ "login_name" => $newName ],
            [ "id" => $id ]
        );
    }


    // Changes the configuration of the user which controls if she should 
    // recieve emails every time a new notification created by an action
    // performed by any of the users she was following arrives to her
    // account
    // [in]     id: the user ID of the element which email notifications' 
    //          configuration will be changed
    // [in]     enableNotifications: boolean value that will turn on or off the 
    //          email notifications
    // [out]    return: the number of rows affected
    function updateEmailNotificationsByID($id, $enableNotifications)
    {
        parent::update(
            [ 'recieve_email_notifications' => $enableNotifications ],
            [ 'id' => $id ]
        );
    }

    
    // Inverts the activation status of the item with the specified ID
    function toggleActivationByID($id)
    {
        $query = parent::$dataBase->pdo->prepare("
            UPDATE $this->table
            SET is_active = !is_active
            WHERE id = ?
        ");
        $query->execute([ $id ]);
    }
}

?>