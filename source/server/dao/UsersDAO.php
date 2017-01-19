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
    //          user name, the employee number
    // [out]    return: an associative array with the data of the element
    //          that contained the especified identifier and password 
    //          combination, or an empty string in case none was found
    function getByIdentifier($identifier)
    {
        $rows = parent::select(
            [
                "$this->table.id(user_id)", 'r.id(role_id)', 'r.name(role_name)', 
                'z.id(zone_id)', 'z.name(zone_name)', 'employee_num', 
                'first_name', 'last_name', 'login_name', 
                'login_password'
            ], 
            [ 
                'AND' => [
                    "OR" => [
                        "$this->table.id" => $identifier,
                        "employee_num" => $identifier,
                        "login_name" => $identifier
                    ],
                    "$this->table.is_active" => 1    
                ]
            ],
            [
                '[><]roles(r)' => [ 'role_id' => 'id' ],
                '[><]zones(z)' => [ 'zone_id' => 'id' ]
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
        return parent::$dataBase->query(
            "SELECT 
                $this->table.id,
                role_id,
                r.name AS role_name,
                employee_num,
                login_name,
                first_name,
                last_name,
                is_active
            FROM $this->table 
            INNER JOIN roles AS r
                ON role_id = r.id
            WHERE $this->table.id != {$_SESSION['user_id']}"
        )->fetchAll();
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

    
    // Inverts the activation status of the item with the specified ID
    function toggleActivationByID($id)
    {
        return parent::$dataBase->query(
            "UPDATE $this->table
            SET is_active = !is_active
            WHERE id = '$id'"
        )->fetchAll();
    }


    // Deletes the user which has the specified ID
    function deleteByID($id)
    {
        return parent::delete(['id' => $id]);
    }


    // Edits the role of the user with the especified ID to the one with the
    // specified ID
    function updateRoleByID($userID, $roleID)
    {
        return parent::update(
            ['role_id' => $roleID],
            ['id' => $userID]
        );
    }


    // Returns the name of the role of the user which has the especified 
    // employee number
    function getRoleByEmployeeNum($employeeNum)
    {
        $rows = parent::select(
            ['r.name(role_name)'], 
            ['employee_num' => $employeeNum],
            ['[><]roles(r)' => ['role_id' => "id"]]
        );
        return (count($rows) > 0) ? $rows[0]['role_name'] : NULL;
    }


    // Returns the name of the role of the user which has the especified 
    // employee number
    function getRoleByID($userID)
    {
        $rows = parent::select(
            ['r.name(role_name)'], 
            ["$this->table.id" => $userID],
            ['[><]roles(r)' => ['role_id' => "id"]]
        );
        return (count($rows) > 0) ? $rows[0]['role_name'] : NULL;
    }


    // Returns the zone ID of the user with the especified ID
    function getZoneIDByID($userID)
    {
        $rows = parent::get(
            ['zone_id'], 
            ['id' => $userID]
        );
        return (count($rows) > 0) ? $rows['zone_id'] : NULL;
    }

    
    // Returns a list of all the users that are supervisors and belong to the
    // especified zone
    function selectSupervisorsNameByZoneID($zoneID)
    {
        return parent::select(
            ["$this->table.id(id)", 'first_name', 'last_name'],
            ['AND' => [
                'zone_id' => $zoneID,
                'r.name' => 'Supervisor',
                'is_active[!]' => FALSE
            ]],
            ['[><]roles(r)' => [
                'role_id' => 'id'
            ]]
        );
    }
}

?>