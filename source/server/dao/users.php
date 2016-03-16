<?php

require_once dirname(__FILE__)."\\table.php";

// Data Access Object for the users table
class Users extends Table
{
    // Creates an interface for interacting with the users table in 
    // the specified data base
    function __construct($dataBaseConnection)
    {
        parent::__construct($dataBaseConnection, "users");
    }
    
    
    // Returns the element which has the specified id in the table
    function findItemById($id)
    {
        return parent::joinSelect([
            "[><]users_company_info" => [
                "company_info_id" => "id"
                ],
            "[><]company_departments" => [
                "users_company_info.company_department_id" => "id"
                ],
            "[><]company_zones" => [
                "company_departments.company_zone_id" => "id"
                ],
            "[><]users_login_info" => [
                "login_info_id" => "id"
                ],
            "[><]certification_programs" => [
                "certification_program_id" => "id"
                ],
            "[><]access_permissions" => [
                "access_permission_id" => "id"
                ]
        ], [
            "users.id",
            "users_company_info.employee_id",
            "company_zones.zone_name",
            "company_departments.department_name",
            "users_company_info.full_name",
            "users_login_info.login_password",
            "users_login_info.email",
            "certification_programs.certification_program_name",
            "access_permissions.permission_name"
        ], [
            "id" => $id
        ]);
    }
    
    
    // Returns an array that stores every element in the table
    function getAllItems()
    {
        return parent::joinSelect([
            "[><]users_company_info" => [
                "company_info_id" => "id"
                ],
            "[><]company_departments" => [
                "workplace_areas.company_department_id" => "id"
                ],
            "[><]company_zones" => [
                "company_departments.company_zone_id" => "id"
                ],
            "[><]users_login_info" => [
                "login_info_id" => "id"
                ],
            "[><]certification_programs" => [
                "certification_program_id" => "id"
                ],
            "[><]access_permissions" => [
                "access_permission_id" => "id"
                ]
        ], [
            "users.id",
            "users_company_info.employee_id",
            "company_zones.zone_name",
            "company_departments.department_name",
            "users_company_info.full_name",
            "users_login_info.login_password",
            "users_login_info.email",
            "certification_programs.certification_program_name",
            "access_permissions.permission_name"
        ]);
    }
}

?>