<?php

// The namespace of the services of the project
namespace fsm;

// Import the site configuration file
require_once realpath(dirname(__FILE__).'/../config/site_config.php');

// Imports all the service files together
require_once realpath(dirname(__FILE__).'/Session.php');
require_once realpath(dirname(__FILE__).'/Email.php');

// load all the necessary DAOs
require_once realpath(dirname(__FILE__).'/../dao/ZonesDAO.php');
require_once realpath(dirname(__FILE__).'/../dao/ProgramsDAO.php');
require_once realpath(dirname(__FILE__).'/../dao/ModulesDAO.php');
require_once realpath(dirname(__FILE__).'/../dao/UsersDAO.php');
require_once realpath(dirname(__FILE__).'/../dao/PrivilegesDAO.php');
require_once realpath(dirname(__FILE__).'/../dao/RecoveryTokensDAO.php');
require_once realpath(dirname(__FILE__)
    .'/../dao/UsersZonesModulesPrivilegesDAO.php');
require_once realpath(dirname(__FILE__).'/../dao/RolesDAO.php');
require_once realpath(dirname(__FILE__).'/../dao/InventoryDAO.php');

// Alias namespaces for ease of use
use fsm\services as serv;
use fsm\database as db;


// Interface that encapsulates the logic for all the different services that 
// the server provides
class Services
{
    // Checks if a connection to the database can be established
    static function canConnectToDataBase() 
    {
        $db = db\connectToDataBase();

        if (!isset($db)) {
            throw new \Exception('The data base server is unavailable');
        }
    }


    // Logs a user in with the credentials provided
    static function LogIn($username, $password)
    {
        $session = new serv\Session();
        $result = $session->start($username, $password);
        
        if (isset($result)) {
            return $result;
        } else {
            throw new \Exception('Log in credentials where incorrect');
        }
    }


    // Logs a user out
    static function LogOut()
    {
        $session = new serv\Session();
        $session->close();
    }


    // Checks if a user is logged in
    static function isSessionOpen()
    {
        $session = new serv\Session();
        return $session->isOpen();
    }


    // Sends a password recovery token by email to the user with the given 
    // username
    static function mailRecoveryToken($username, $lang)
    {
        // retrieve the user information
        $db = db\connectToDataBase();
        $users = new db\UsersDAO($db);
        $tokens = new db\RecoveryTokensDAO($db);
        $userProfile = $users->selectByIdentifier($username);

        if (count($userProfile) > 0) {
            // get the current timestamp and add 1 day to get the 
            // expiration date for the token
            $expirationDate = \strtotime("+15 minutes", time());

            // create the recovery token
            $recoveryToken = hash(
                "sha512",
                rand()
                . $userProfile[0]['first_name']
                . $userProfile[0]['last_name']
                . time()
            );

            // delete any previous token, valid or invalid, that is associated 
            // with this user ID
            $tokens->deleteByUserID($userProfile[0]["id"]);
            
            // store it in the data base
            $tokens->insert([
                "user_id" => $userProfile[0]["id"],
                "expiration_date" => date("Y-m-d H:i:s", $expirationDate),
                "token" => $recoveryToken
            ]);

            // create the password recovery link
            $recoveryLink = 
                "http://".$_SERVER['HTTP_HOST'].SITE_ROOT
                ."/password-recovery?token="
                . $recoveryToken;
            
            // now prepare the email to be sent to the user
            $body = '';
            $subject = '';

            if ($lang == 'en') {
                $subject = "Jacobs Farm: Password Recovery.";
                $body = "This is an automated response to your request to "
                    . "recover your password. Just click the following link" 
                    . " within the next 15 minutes and you will be taken to "
                    . "the password recovery page:<br>"
                    . "<a href='".$recoveryLink."'>Recover my " 
                    . "password!</a>";
            } elseif ($lang == 'es') {
                $subject = "Del Cabo: Recuperación de contraseña.";
                $body = "Esta es una respuesta automatizada a su petición"
                    . " de recuperar su contraseña. Sólo haga clic "
                    . "en el enlace que aparece a continuación dentro de "
                    . "los próximos 15 minutos y lo llevará a la "
                    . "página de recuperación de "
                    . "contraseña: <br>"
                    . "<a href='$recoveryLink'>"
                    . "¡Recuperar mi contraseña!</a>";
            }

            // create the mail object
            $mail = new serv\Email([
                    'email' => $userProfile[0]['email'],
                    'name' => 
                        $userProfile[0]["first_name"]
                        .$userProfile[0]["last_name"]
                ],
                $subject, $body, $lang
            );

            // send the email
            $result = $mail->send();

            // if the email could not be sent, throw en exception
            if (strlen($result) > 0) {
                throw new \Exception($result);
            }
        } else {
            throw new \Exception('User not found in data base');
        }
    }


    // Checks if the given token is valid and if it is, it consumes it and
    // then returns the corresponding user ID
    static function validateToken($token)
    {
        // attempt to connect to the database
        $tokens = new db\RecoveryTokensDAO(db\connectToDataBase());

        // search the token in the data base
        $result = $tokens->selectByToken($token);

        // if the token was found, check if it has not expired yet
        if (count($result) > 0) {
            // get the expiration date that was stored with the token
            $tokenExpiration = new \DateTime($result[0]["expiration_date"]);  

            // check if the token has not expired
            if (new \DateTime(date("Y-m-d H:i:s")) <= $tokenExpiration) {
                return $result[0]['user_id'];
            } else {
                new \Exception(
                    "Password recovery token has expired or is invalid.");
            }
        } else {
            throw new \Exception(
                "The user did not requested password recovery.");
        }
    }


    // Change the account name of the user with the provided ID
    static function changeUserAccountName($password, $newName)
    {
        $session = new serv\Session();
        $users = new db\UsersDAO(db\connectToDataBase());
        $userID = $session->getID();
        $result = $users->updateLogInNameByUserID($userID, $newName);

        $isPasswordValid = password_verify(
            $password,
            $session->getValue('login_password')
        );

        if (!$isPasswordValid) {
            throw new \Exception(
                'Log in name could not be changed; authentication '. 
                'credentials were incorrect.'
            );
        }

        if (count($result) <= 0) {
            throw new \Exception("Log in name could not be changed.");
        }
    }


    // Change the password of the user with the provided ID
    static function changeUserPassword($password, $newPasswd)
    {
        $session = new serv\Session();
        $users = new db\UsersDAO(db\connectToDataBase());
        $userID = $session->getID();

        $isPasswordValid = password_verify(
            $password, 
            $session->getValue('login_password')
        );

        if (!$isPasswordValid) {
            throw new \Exception(
                'Password could not be changed; authentication credentials '. 
                'where incorrect.'
            );
        }

        $result = $users->updatePasswordByUserID(
            $userID, 
            password_hash($newPasswd, PASSWORD_BCRYPT)
        );

        if (count($result) <= 0) {
            throw new \Exception('Password could not be changed.');
        }
    }


    // Change the password of the user with the provided ID
    static function changeUserPasswordByRecovery($userID, $newPasswd)
    {
        $db = db\connectToDataBase();
        $users = new db\UsersDAO($db);
        $tokens = new db\RecoveryTokensDAO($db);
        $result = $users->updatePasswordByUserID(
            $userID, 
            password_hash($newPasswd, PASSWORD_BCRYPT)
        );

        if ($result <= 0) {
            throw new \Exception('Password could not be changed.');
        } else {
            $tokens->deleteByUserID($userID);
            $userProfile = $users->selectByIdentifier($userID);
            return $userProfile[0]['login_name'];
        }
    }



    // Change the email of the user with the provided ID
    static function changeUserEmail($password, $newEmail)
    {
        $session = new serv\Session();
        $users = new db\UsersDAO(db\connectToDataBase());
        $userID = $session->getID();
        $result = $users->updateEmailByUserID($userID, $newEmail);

        $isPasswordValid = password_verify(
            $password, 
            $session->getValue('login_password')
        );

        if (!$isPasswordValid) {
            throw new \Exception(
                'Email could not be changed; authentication credentials '.
                'were incorrect.'
            );
        }

        if (count($result) <= 0) {
            throw new \Exception('Email could not be changed.');
        }
    }


    // Sends a bug report by email
    static function mailBugReport($formData, $files = NULL)
    {
        // Create the email body by pasting all the posted data into it
        $body = "Usuario: " . $formData["user-name"] . "<br>"
            . "ID de empleado: " . $formData["user-id"] . "<br>"
            . "Zona: " . $formData["zone-selection"] . "<br>"
            . "Programa: " . $formData["procedure-selection"] . "<br>"
            . "Modulo: " . $formData['module-selection'] . "<br>"
            . "Navegadores: ";

        // paste browsers
        foreach ($formData["browser-selection"] as $browser) {
            $body .= $browser . " ";
        }

        // continue with the rest of the body
        $body .= "\n" . "Severidad: " . $formData["severity-selection"] . "<br>"
            . "Resumen: " . $formData["summary"] . "<br>"
            . "Pasos para reproducirlo: " . $formData["steps"] . "<br>"
            . "Salida esperada: " . $formData["expectation"] . "<br>"
            . "Salida obtenida: " . $formData["reality"] . "<br>";

        $subject = 'Jacobs Farm - Del Cabo: Bug report';

        // create the email with the information that we created so far 
        $bugReport = new serv\Email([
                'email' => 'caom92@live.com',
                'name' => 'Carlos Oliva'
            ],
            $subject, $body, 'es'
        );

        // attach the image files
        if (isset($files)) {
            $length = count($files["screenshot-attachment"]["tmp_name"]);

            for ($i = 0; $i < $length; $i++) {
                $bugReport->addAttachment(
                    $files["screenshot-attachment"]["tmp_name"][$i], 
                    $files["screenshot-attachment"]["name"][$i]
                );
            }
        }

        // send the email
        $result = $bugReport->send();

        // if the email could not be sent, throw en exception
        if (strlen($result) > 0) {
            throw new \Exception($result);
        }

        // now, let's send a confirmation email
        if ($formData["lang"] == "en") {
            $subject = 
                "Jacobs Farm : Bug report submission confirmation";
            $body = "This is an automated response to the bug report that"
                . " you submitted earlier. We'll start working on solving the" 
                . " problem as soon as possible. You don't need to reply to"
                . " this message. If you did not submitted any bug report to "
                . "us, please just disregard this message. ";
        } elseif ($formData["lang"] == "es") {
            $subject = 
                "Del Cabo : Confirmación de envío de reporte de problema";
            $body = "Esta es una respuesta automatizada al reporte de "
                . "problema que nos envió hace unos momentos. Comenzaremos a " 
                . "trabajar en resolver el problema tan pronto como nos sea "
                . "posible. No es necesario que conteste este mensaje. Si "
                . "usted no nos envió ningún reporte, por favor ignore este" 
                . "mensaje.";
        }

        // create the confirmation email
        $confirmation = new serv\Email([
                'email' => $formData['email'],
                'name' => $formData['user-name']
            ],
            $subject, $body, $formData['lang']
        );

        // send the email
        $result = $confirmation->send();

        // if the email could not be sent, throw en exception
        if (strlen($result) > 0) {
            throw new \Exception($result);
        }
    }


    // Returns true if the logged in user is an admin or false otherwise
    static function isAdmin() 
    {
        $session = new serv\Session();
        $isAdmin = $session->getValue('role_name') == 'Admin';
        return $isAdmin;
    }


    // Gets a list of all the zones in the data base
    static function getAllZones()
    {
        $zones = new db\ZonesDAO(db\connectToDataBase());
        return $zones->selectAll();
    }


    // Gets a list of all the programs in the data base
    static function getAllPrograms()
    {
        $programs = new db\ProgramsDAO(db\connectToDataBase());
        return $programs->selectAll();
    }


    // Gets a list of all the modules of the given program
    static function getModulesOfProgram($programID)
    {
        $modules = new db\ModulesDAO(db\connectToDataBase());
        return $modules->selectByProgramID($programID);
    }


    // Gets a list of all the users in the data base which are not
    // administrators
    static function getAllUsers()
    {
        $users = new db\UsersDAO(db\connectToDataBase());
        return $users->selectAll();
    }


    // Gets a list of users and their corresponding privileges
    static function getPrivilegesOfUser($userID)
    {
        // first, connect to the data base   
        $db = db\connectToDataBase();

        // then instantiate all the tables that we'll need
        $zonesTable = new db\ZonesDAO($db);
        $programsTable = new db\ProgramsDAO($db);
        $modulesTable = new db\ModulesDAO($db);
        $userPrivilegesTable = new db\UsersZonesModulesPrivilegesDAO($db);
        $privilegesTable = new db\PrivilegesDAO($db);

        // now, get all the zones, programs
        $zones = $zonesTable->selectAll();
        $programs = $programsTable->selectAll(); 

        // then, get the privileges of the user that was provided
        $userPrivileges = $userPrivilegesTable->selectByUserID($userID);

        // initialize the resulting json
        $result = [
            'zones' => []
        ];

        // initialize the default privilege
        $defaultPrivilege = $privilegesTable->selectDefault();

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


    // Gets a list of all the privileges that exist in the data base
    static function getAllPrivileges()
    {
        $privileges = new db\PrivilegesDAO(db\connectToDataBase());
        return $privileges->selectAll();
    }


    // Registers a new zone in the data base
    static function addNewZone($zoneName)
    {
        // first we connect to the database
        $zones = new db\ZonesDAO(db\connectToDataBase());

        // then we check if the name is duplicated
        $duplicatedNames = $zones->selectByName($zoneName);
        $isNameRepeated = count($duplicatedNames) > 0;

        // if it is not, we store it in the database
        if (!$isNameRepeated) {
            $zones->insert($zoneName);
        }
    }


    // Checks if the given zone name is duplicated in the database, returning
    // true if this is the case, or false otherwise
    static function checkZoneNameDuplicates($zoneName)
    {
        // first we connect to the database
        $zones = new db\ZonesDAO(db\connectToDataBase());

        // then we check if the name is duplicated
        $duplicatedNames = $zones->selectByName($zoneName);
        $isNameRepeated = count($duplicatedNames) > 0;
        return $isNameRepeated;
    }


    // Checks if the given log in name is duplicated in the database, returning
    // true if this is the case, or false otherwise
    static function checkAccountNameDuplicates($username)
    {
        // first we connect to the database
        $users = new db\UsersDAO(db\connectToDataBase());

        // then we check if the name is duplicated
        $duplicatedNames = $users->selectByLogInName($username);
        $isNameRepeated = count($duplicatedNames) > 0;
        return $isNameRepeated; 
    }


    // Checks if the given email is duplicated in the database, returning
    // true if this is the case, or false otherwise
    static function checkUserEmailDuplicates($email)
    {
        // first we connect to the database
        $users = new db\UsersDAO(db\connectToDataBase());

        // then we check if the name is duplicated
        $duplicatedNames = $users->selectByEmail($email);
        $isNameRepeated = count($duplicatedNames) > 0;
        return $isNameRepeated; 
    }


    // Checks if the given email is duplicated in the database, returning
    // true if this is the case, or false otherwise
    static function checkUserEmployeeNumDuplicates($employeeNum)
    {
        // first we connect to the database
        $users = new db\UsersDAO(db\connectToDataBase());

        // then we check if the name is duplicated
        $duplicatedNames = $users->selectByEmployeeNum($employeeNum);
        $isNameRepeated = count($duplicatedNames) > 0;
        return $isNameRepeated; 
    }


    // Registers a new user in the data base
    static function addNewUser($userData)
    {
        // first connect to the data base
        $db = db\connectToDataBase();
        $users = new db\UsersDAO($db);
        $usersPrivileges = new db\UsersZonesModulesPrivilegesDAO($db);

        // insert the user to the data base
        $userID = $users->insert([
            'role_id' => $userData['role_id'],
            'employee_num' => $userData['employee_num'],
            'first_name' => $userData['first_name'],
            'last_name' => $userData['last_name'],
            'email' => $userData['email'],
            'login_name' => $userData['login_name'],
            'login_password' => password_hash(
                $userData['login_password'], 
                PASSWORD_BCRYPT
            )
        ]);

        // add the privileges to the data base
        foreach ($userData['privileges'] as $privilege) {
            $privilegeID = (isset($privilege['privilege_id'])) ? 
                $privilege['privilege_id'] : 1;

            $usersPrivileges->insert([
                'user_id' => $userID,
                'zone_id' => $privilege['zone_id'],
                'module_id' => $privilege['module_id'],
                'privilege_id' => $privilegeID
            ]);
        }
    }


    // Returns all the user roles
    static function getAllUserRoles()
    {
        $roles = new db\RolesDAO(db\connectToDataBase());
        return $roles->selectAll();
    }


    // Returns an associative array containing all the modules with
    // the default privilege grouped by programs grouped by zones 
    static function getAllZonesProgramsModulesAndPrivileges()
    {
        // first, connect to the data base
        $db = db\connectToDataBase();
        $zonesTable = new db\ZonesDAO($db);
        $programsTable = new db\ProgramsDAO($db);
        $modules = new db\ModulesDAO($db);
        $privilegesTable = new db\PrivilegesDAO($db);

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


    // Returns the inventory items associated to the given zone and module
    static function getInventoryOfProgram($zoneID, $moduleID)
    {
        $inventory = new InventoryDAO(db\connectToDataBase());
        return $inventory->selectByZoneIDAndModuleID($zoneID, $moduleID);
    }


    // Changes the email notifications' configuration of the user
    static function toggleUserEmailNotifications($enableNotifications)
    {
        $users = new db\UsersDAO(db\connectToDataBase());
        $session = new serv\Session();
        $users->updateEmailNotificationsByID(
            $session->getID(), 
            ($enableNotifications === 'true')
        );
    }
}

?>