<?php

namespace espresso;

require_once "table.php";

class UsersCompanyInfo extends Table
{
    // Default constructor
    function __construct()
    {
        parent::__construct("users_company_info");
    }
    
    
    // Returns the element which has the specified id in the table
    function findItemById($id)
    {
        return join([
            "[><]company_departments" => [
                "workplace_areas.company_department_id" => "id"
                ],
            "[><]company_zones" => [
                "company_departments.company_zone_id" => "id"
                ]
        ], [
            "users_company_info.id",
            "users_company_info.employee_id",
            "company_zones.zone_name",
            "company_departments.department_name",
            "users_company_info.full_name"
        ], [
            "id" => $id
        ]);
    }
    
    
    // Returns the element which has the specified name in the table
    function findItemByName($name)
    {
        return join([
            "[><]company_departments" => [
                "workplace_areas.company_department_id" => "id"
                ],
            "[><]company_zones" => [
                "company_departments.company_zone_id" => "id"
                ]
        ], [
            "users_company_info.id",
            "users_company_info.employee_id",
            "company_zones.zone_name",
            "company_departments.department_name",
            "users_company_info.full_name"
        ], [
            "full_name" => $name
        ]);
    }
}

?>