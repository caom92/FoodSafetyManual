<?php

// Namespace for the project's Data Access Objects
namespace fsm\dao;

// Importing required classes
require_once realpath(dirname(__FILE__)."/DataBaseTable.php");

// Data Access Object for the user_procedure_privileges table
class UserProcedurePrivileges extends DataBaseTable
{
    // Creates an interface for interacting with the user_procedure_privileges 
    // table in the specified data base
    function __construct($dataBaseConnection)
    {
        parent::__construct($dataBaseConnection, "user_procedure_privileges");
    }
    
    
    // Returns a list of elements in the table which have the especified
    // user name and password
    function searchItemsByNicknameAndPassword($nickname, $password)
    {
        return parent::join([
                "[><]user_profiles" => [
                    "user_id" => "id"
                ],
                "[><]zones" => [
                    "zone_id" => "id"
                ],
                "[><]procedures" => [
                    "procedure_id" => "id"
                ],
                "[><]privileges" => [
                    "privilege_id" => "id"
                ]
            ], [
                "user_procedure_privileges.id",
                "user_profiles.id(user_profile_id)",
                "user_profiles.employee_num",
                "user_profiles.first_name",
                "user_profiles.last_name",
                "user_profiles.email",
                "user_profiles.account_nickname",
                "user_profiles.login_password",
                "zones.id(zone_id)",
                "zones.name(zone_name)",
                "procedures.id(procedure_id)",
                "procedures.name(procedure_name)",
                "privileges.id(privilege_id)",
                "privileges.name(privilege_name)"
            ], [
                "AND" => [
                    "user_profiles.account_nickname" => $nickname,
                    "user_profiles.login_password" => $password
                ],
                "ORDER" => "user_procedure_privileges.zone_id"
            ]
        );
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