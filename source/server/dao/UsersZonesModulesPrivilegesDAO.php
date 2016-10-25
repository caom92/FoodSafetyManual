<?php

// Namespace for the project's Data Access Objects
namespace fsm\database;

// Importing required classes
require_once realpath(dirname(__FILE__)."/DataAccessObject.php");

// Data Access Object for the users_zones_modules_privileges table
class UsersZonesModulesPrivilegesDAO extends DataAccessObject
{
    // Creates an interface for interacting with the 
    // users table in the specified data base
    function __construct($dataBaseConnection)
    {
        parent::__construct($dataBaseConnection, 
            "users_zones_modules_privileges");
    }


    // Inserts the data to the data base
    // [in]    items: an array of associative arrays which define the rows to
    //         be inserted, where the key is the column name
    // [out]   return: the ID of the last inserted item
    function insert($items)
    {
        return parent::insert($items);
    }


    // Returns the privilege data about every module of the user with the 
    // especified ID in the form of an associative array
    // [in]     employeeNum: the employee ID number of the user which privileges
    //          we want to retrieve
    // [out]    return: an associative array if the user was found in the
    //          database or NULL otherwise; information is organized in a
    //          zone/program/module/privilege fashion
    function selectByEmployeeNum($employeeNum)
    {
        return $this->dataBaseConnection->query(
            "SELECT 
                `z`.`id` AS `zone_id`,
                `z`.`name` AS `zone_name`,
                `p`.`id` AS `program_id`,
                `p`.`name` AS `program_name`,
                `m`.`id` AS `module_id`,
                `m`.`name` AS `module_name`,
                `pr`.`id` AS `privilege_id`,
                `pr`.`name` AS `privilege_name` 
            FROM `users_zones_modules_privileges` 
                INNER JOIN `users` AS `u`
                ON `u`.`employee_num` = $employeeNum
                INNER JOIN `zones` AS `z` 
                ON `users_zones_modules_privileges`.`zone_id` = `z`.`id` 
                INNER JOIN `modules` AS `m` 
                ON `users_zones_modules_privileges`.`module_id` = `m`.`id` 
                INNER JOIN `programs` AS `p` 
                ON `m`.`program_id` = `p`.`id` 
                INNER JOIN `privileges` AS `pr` 
                ON `users_zones_modules_privileges`.`privilege_id` = `pr`.`id` 
            WHERE `user_id` = `u`.`id`"
        );
        // we avoided the use of medoo here because its select method (used 
        // inside parent::insert here) concatenates the name of the table to 
        // the data inserted in the ON clause to create the final query; thus 
        // we could not create the query we needed using the medoo interface 
        // return parent::join(
        //     [
        //         '[><]users(u)' => [ $employeeNum => 'employee_num' ],
        //         '[><]zones(z)' => [ 'zone_id' => 'id' ],
        //         '[><]modules(m)' => [ 'module_id' => 'id' ],
        //         '[><]programs(p)' => [ 'm.program_id' => 'id' ],
        //         '[><]privileges(pr)' => [ 'privilege_id' => 'id']
        //     ],
        //     [
        //         'z.id(zone_id)',
        //         'z.name(zone_name)',
        //         'p.id(program_id)',
        //         'p.name(program_name)',
        //         'm.id(module_id)',
        //         'm.name(module_name)',
        //         'pr.id(privilege_id)',
        //         'pr.name(privilege_name)'
        //     ],
        //     [
        //         'user_id' => 'u.id'
        //     ]
        // );
    }


    // Returns the list of modules which the user with the especified ID has 
    // access to only, ignoring all others, as an associative array
    // [in]     userID: the ID of the user which privileges we want to 
    //          retrieve
    // [out]    return: an associative array if the user was found in the
    //          database or NULL otherwise; information is organized in a
    //          program/module/zone/privilege fashion
    function selectSimplifiedByUserID($userID)
    {
        return parent::join(
            [
                '[><]modules(m)' => [ 'module_id' => 'id' ],
                '[><]programs(p)' => [ 'm.program_id' => 'id'],
                '[><]zones(z)' => [ 'zone_id' => 'id' ],
                '[><]privileges(pr)' => [ 'privilege_id' => 'id' ]
            ],
            [
                'p.name(program_name)',
                'm.name(module_name)',
                'z.name(zone_name)',
                'pr.name(privilege)'
            ],
            [
                'AND' => [
                    'user_id' => $userID,
                    'privilege_id[!]' => 1 
                ],
                'ORDER' => [
                    'p.id',
                    'm.id',
                    'z.id'
                ]
            ]
        );
    }


    // Changes the privileges that the user with the especified ID has for the
    // especified zone-module combination
    // [in]     userID: the ID of the user which privileges are going to be 
    //          updated
    // [in]     zoneID: the ID of the zone which user's privilege will be 
    //          updated
    // [in]     moduleID: the ID of the module which user's privilege will be
    //          updated
    // [in]     privilegeID: the ID of the privilege that will be assigned to
    //          the user
    function updatePrivilegeByUserZoneModuleIDs(
        $userID, 
        $zoneID, 
        $moduleID, 
        $privilegeID
    )
    {
        parent::update(['privilege_id' => $privilegeID], [
            'AND' => [
                'user_id' => $userID,
                'zone_id' => $zoneID,
                'module_id' => $moduleID
            ]
        ]);
    }
}

?>