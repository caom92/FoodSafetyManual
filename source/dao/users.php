<?php

namespace espresso;

require_once "table.php";

// Data Access Object for the users table
class Users extends Table
{
    // Default constructor
    function __construct()
    {
        parent_::__construct("users");
    }
    
    
    // Returns the element which has the specified id in the table
    function findItemById($id)
    {
        return join([
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
            ]
        ]);
    }
}

?>