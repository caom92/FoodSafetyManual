<?php

namespace espresso;

require_once "table.php";

class UsersCompanyInfo extends Table
{
    // Creates an interface for interacting with the users_company_info table 
    // in the specified data base
    function __construct($dataBaseConnection)
    {
        parent::__construct($dataBaseConnection, "users_company_info");
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
    
    
    // Returns a list of elements which have the specified name
    function findItemsByName($name)
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
    
    
    // Returns an array that stores every element in the table
    function getAllItems()
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
        ]);
    }
}

?>