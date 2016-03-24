<?php

if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
    require_once dirname(__FILE__)."\\table.php";
}
else {
    require_once dirname(__FILE__)."/table.php";
}

// Data Access Object for the users table
class Users extends Table
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
                "users_profile_info.login_password" => $password
            ],
            "ORDER" => "users.company_zone_id"
        ]);
    }
}

?>