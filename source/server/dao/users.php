<?php

// Namespace for the project's Data Access Objects
namespace espresso\dao;

// Importing required classes
require_once realpath(dirname(__FILE__)."/DataBaseTable.php");

// Data Access Object for the users table
class Users extends DataBaseTable
{
    // Creates an interface for interacting with the users 
    // table in the specified data base
    function __construct($dataBaseConnection)
    {
        parent::__construct($dataBaseConnection, "users");
    }
    
    
    // Returns a list of elements in the table which have the especified
    // user name and password
    function searchItemsByUserNameAndPassword($userName, $password)
    {
        return parent::join([
                "[><]users_profile_info" => [
                    "profile_info_id" => "id"
                ],
                "[><]company_zones" => [
                    "company_zone_id" => "id"
                ],
                "[><]certification_programs" => [
                    "certification_program_id" => "id"
                ],
                "[><]access_permissions" => [
                    "access_permission_id" => "id"
                ]
            ], [
                "users.id",
                "users_profile_info.id(user_profile_id)",
                "users_profile_info.employee_id_num",
                "users_profile_info.full_name",
                "users_profile_info.email",
                "users_profile_info.login_name",
                "users_profile_info.login_password",
                "company_zones.id(zone_id)",
                "company_zones.zone_name",
                "certification_programs.id(program_id)",
                "certification_programs.certification_program_name",
                "access_permissions.id(permission_id)",
                "access_permissions.permission_name"
            ], [
                "AND" => [
                    "users_profile_info.login_name" => $userName,
                    "users_profile_info.login_password" => md5($password)
                ],
                "ORDER" => "users.company_zone_id"
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