<?php

namespace fsm\services;

require_once realpath(dirname(__FILE__).'/Service.php');
require_once realpath(dirname(__FILE__).'/../dao/UsersDAO.php');
require_once realpath(dirname(__FILE__).'/../dao/ZonesDAO.php');
require_once realpath(dirname(__FILE__).'/../dao/ProgramsDAO.php');
require_once realpath(dirname(__FILE__).'/../dao/ModulesDAO.php');
require_once realpath(dirname(__FILE__).'/../dao/PrivilegesDAO.php');

require_once realpath(dirname(__FILE__).'/../dao/RolesDAO.php');

use fsm\database as db;



class ListAllUsersService implements Service
{
    // Returns an associative array of associative arrays which describe the 
    // user permission and input arguments values and formats that this service 
    // is expecting to recieve 
    function getRequirementsDescriptor()
    {
        return [
            
        ];
    }


    // Starts execution of the service
    function execute()
    {
        
    }
}


// Service that returns a list of the privileges of the specified user
class ListUserPrivilegesService implements Service
{
    // Returns an associative array of associative arrays which describe the 
    // user permission and input arguments values and formats that this service 
    // is expecting to recieve 
    function getRequirementsDescriptor()
    {
        return [
            'logged_in' => ['Administrator'],
            'employee_num' => [
                'type' => 'int'
            ]
        ];
    }


    // Starts execution of the service
    function execute()
    {
        // first, connect to the data base   
        // and instantiate all the tables that we'll need
        $zonesTable = new db\ZonesDAO();
        $programsTable = new db\ProgramsDAO();
        $modulesTable = new db\ModulesDAO();
        $userPrivilegesTable = new db\UsersLogsPrivilegesDAO();
        $privilegesTable = new db\PrivilegesDAO();

        // now, get all the zones, programs
        $zones = $zonesTable->selectAll();
        $programs = $programsTable->selectAll(); 

        // then, get the privileges of the user that was provided
        $userPrivileges = $userPrivilegesTable->selectByEmployeeNum($_POST['employee_num']);

        // initialize the resulting json
        $result = [
            'zones' => []
        ];

        // initialize the default privilege
        $defaultPrivilege = $privilegesTable->getDefault();

        // visit each zone that was retrieved
        foreach ($zones as $zone) {
            // create the zone json
            $zoneJSON = [
                'id' => $zone['id'],
                'name' => $zone['name'],
                'programs' => []
            ];

            // visit each program that was retrieved
            foreach ($programs as $program) {
                // create the program json
                $programJSON = [
                    'id' => $program['id'],
                    'name' => $program['name'],
                    'modules' => []
                ];

                // retrieve all the modules that correspond to this program
                $modules = $modulesTable->selectByProgramID($program['id']);

                // visit each module in the program
                foreach ($modules as $module) {
                    // create the module json
                    $moduleJSON = [
                        'id' => $module['id'],
                        'name' => $module['name'],
                        'privilege' => $defaultPrivilege
                    ];

                    // push the module json
                    array_push($programJSON['modules'], $moduleJSON);
                }

                // push the program json
                array_push($zoneJSON['programs'], $programJSON);
            }

            // push the zone json
            array_push($result['zones'], $zoneJSON);
        }

        // finally, visit each user privilege
        foreach ($userPrivileges as $privilege) {
            // visit each zone
            $z = 0;
            foreach ($result['zones'] as $zone) {
                // check if there are any privileges for this zone
                if ($zone['id'] == $privilege['zone_id']) {
                    // if they are, visit each program
                    $p = 0;
                    foreach ($zone['programs'] as $program) {
                        // check if there are any privileges for this program
                        if ($program['id'] == $privilege['program_id']) {
                            // if they are, visit each module
                            $m = 0;
                            foreach ($program['modules'] as $module) {
                                // check if there is a privilege for this module
                                if ($module['id'] == $privilege['module_id']) {
                                    // if there is, store it
                                    $result['zones'][$z]['programs'][$p]['modules'][$m]['privilege']['id'] = 
                                        $privilege['privilege_id'];

                                    $result['zones'][$z]['programs'][$p]['modules'][$m]['privilege']['name'] = 
                                        $privilege['privilege_name'];
                                }
                                $m++;
                            }
                        }
                        $p++;
                    }
                }
                $z++;
            }
        }

        // return the resulting json
        return $result;
    }
}


// Service that returns a list of all available privileges
class ListAllPrivilegesService implements Service
{
    // Returns an associative array of associative arrays which describe the 
    // user permission and input arguments values and formats that this service 
    // is expecting to recieve 
    function getRequirementsDescriptor()
    {
        return [
            'logged_in' => ['Administrator'],
        ];
    }


    // Starts execution of the service
    function execute()
    {
        $privileges = new db\PrivilegesDAO();
        return $privileges->selectAll();
    }
}


// Service for adding a new user to the data base
class AddNewUserService implements Service
{
    // Returns an associative array of associative arrays which describe the 
    // user permission and input arguments values and formats that this service 
    // is expecting to recieve 
    function getRequirementsDescriptor()
    {
        return [
            'logged_in' => ['Administrator'],
            'employee_num' =>[
                'type' => 'int'
            ],
            'first_name' =>[
                'type' => 'string'
            ],
            'last_name' =>[
                'type' => 'string'
            ],
            'email' =>[
                'type' => 'email'
            ],
            'role_id' =>[
                'type' => 'int'
            ],
            'login_name' =>[
                'type' => 'string',
                'min_length' => 5
            ],
            'login_password' =>[
                'type' => 'string',
                'min_length' => 6
            ]
        ];
    }


    // Starts execution of the service
    function execute()
    {
        // first, check if the client sent privileges
        $hasPrivileges = isset($_POST['privileges']);

        if (!$hasPrivileges) {
            throw new \Exception(
                'Failed to add new user; no privileges where provided.'
            );
        }

        // then, connect to the data base
        $users = new db\UsersDAO();
        $usersPrivileges = new db\UsersLogsPrivilegesDAO();

        // check if there is no duplication with log in name, email or 
        // employee number
        $isLogInNameDuplicated = $users->hasByLogInName($_POST['login_name']);
        $isEmailDuplicated = $users->hasByEmail($_POST['email']);
        $isEmployeeNumDuplicated = $users->hasByEmployeeNum(
            $_POST['employee_num']
        );

        if ($isLogInNameDuplicated) {
            throw new \Exception(
                'Failed to add new user; log in name is duplicated.'
            );
        }

        if ($isEmailDuplicated) {
            throw new \Exception(
                'Failed to add new user; email address is duplicated.'
            );
        }

        if ($isEmployeeNumDuplicated) {
            throw new \Exception(
                'Failed to add new user; employee ID number is duplicated.'
            );
        }

        // insert the user to the data base
        $userID = $users->insert([
            'role_id' => $_POST['role_id'],
            'employee_num' => $_POST['employee_num'],
            'first_name' => $_POST['first_name'],
            'last_name' => $_POST['last_name'],
            'email' => $_POST['email'],
            'login_name' => $_POST['login_name'],
            'login_password' => password_hash(
                $_POST['login_password'], 
                PASSWORD_BCRYPT
            )
        ]);

        // add the privileges to the data base
        foreach ($_POST['privileges'] as $privilege) {
            $privilegeID = (isset($privilege['privilege_id'])) ? 
                $privilege['privilege_id'] : 1;

            $usersPrivileges->insert([
                'user_id' => $userID,
                'zone_id' => $privilege['zone_id'],
                'module_id' => $privilege['module_id'],
                'privilege_id' => $privilegeID
            ]);
        }

        return [];
    }
}


// Service for listing all the user roles
class ListAllUserRolesService implements Service
{
    // Returns an associative array of associative arrays which describe the 
    // user permission and input arguments values and formats that this service 
    // is expecting to recieve 
    function getRequirementsDescriptor()
    {
        return [
            'logged_in' => ['Administrator']
        ];
    }


    // Starts execution of the service
    function execute()
    {
        $roles = new db\RolesDAO();
        return $roles->selectAll();
    }
}


// Service for listing all the zones, programs, modules and privileges
class ListAllZonesProgramsModulesAndPrivilegesService implements Service
{
    // Returns an associative array of associative arrays which describe the 
    // user permission and input arguments values and formats that this service 
    // is expecting to recieve 
    function getRequirementsDescriptor()
    {
        return [
            'logged_in' => ['Administrator']
        ];
    }


    // Starts execution of the service
    function execute()
    {
        // first, connect to the data base
        $zonesTable = new db\ZonesDAO();
        $programsTable = new db\ProgramsDAO();
        $modules = new db\ModulesDAO();
        $privilegesTable = new db\PrivilegesDAO();

        // then list all zones and programs
        $zones = $zonesTable->selectAll();
        $programs = $programsTable->selectAll();

        // get the default privilege 
        $defaultPrivilege = $privilegesTable->selectDefault();
        
        // initialize the resulting associative array 
        $finalObj = [
            'zones' => []
        ];
        
        // visit each zone...
        foreach ($zones as $zone) {
            // create a temporal zone holder with the current zone data
            $zoneObj = [
                'id' => $zone['id'],
                'name' => $zone['name'],
                'programs' => []
            ];

            // then visit each program...
            foreach ($programs as $program) {
                // create a temporal program holder with the current program 
                // data 
                $programObj = [
                    'id' => $program['id'],
                    'name' => $program['name'],
                    'modules' => []
                ];

                // and finally visit each module of this program
                foreach ($modules->selectByProgramID($program['id']) as $module)
                {
                    // and store in the temporal program holder the info of 
                    // each module and the default privilege
                    array_push($programObj['modules'], [
                        'id' => $module['id'],
                        'name' => $module['name'],
                        'privilege' => [
                            'id' => $defaultPrivilege['id'],
                            'name' => $defaultPrivilege['name']
                        ]
                    ]);
                }

                // store the temporal program holder in the temporal zone holder
                array_push($zoneObj['programs'], $programObj);
            }

            // store the temporal zone holder in the resulting associative array
            array_push($finalObj['zones'], $zoneObj);
        }

        // return the resulting associative array
        return $finalObj;
    }
}


// Service that edits the privileges of an specified user
class EditUserPrivilegesService
{
    // Returns an associative array of associative arrays which describe the 
    // user permission and input arguments values and formats that this service 
    // is expecting to recieve 
    function getRequirementsDescriptor()
    {
        return [
            'logged_in' => ['Administrator'],
            'user_id' => [
                'type' => 'int'
            ]
        ];
    }


    // Starts execution of the service
    function execute() 
    {
        // check if the client sent the privileges
        $hasPrivileges = isset($_POST['privileges']);
        if (!$hasPrivileges) {
            throw new \Exception(
                'Failed to edit user privileges; no privileges where provided.'
            );
        }

        $userPrivileges = 
            new db\UsersLogsPrivilegesDAO();

        foreach ($_POST['privileges'] as $privilege) {
            $usersPrivileges->updatePrivilegeByUserZoneModuleIDs(
                $_POST['user_id'],
                $privilege['zone_id'],
                $privilege['module_id'],
                $privilete['privilege_id']
            );
        }

        return [];
    }
}



class GetUserInfoService implements Service 
{
    // Returns an associative array of associative arrays which describe the 
    // user permission and input arguments values and formats that this service 
    // is expecting to recieve 
    function getRequirementsDescriptor()
    {
        return [
            
        ];
    }


    // Starts execution of the service
    function execute()
    {
        
    }
}

?>