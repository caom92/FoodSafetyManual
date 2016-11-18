<?php

namespace fsm\services;

require_once realpath(dirname(__FILE__).'/Session.php');
require_once realpath(dirname(__FILE__).'/Email.php');
require_once realpath(dirname(__FILE__).'/DataValidator.php');
require_once realpath(dirname(__FILE__).'/../dao/UsersDAO.php');
require_once realpath(dirname(__FILE__).'/../dao/RecoveryTokensDAO.php');
require_once realpath(dirname(__FILE__).'/../dao/ZonesDAO.php');
require_once realpath(dirname(__FILE__).'/../dao/ProgramsDAO.php');
require_once realpath(dirname(__FILE__).'/../dao/ModulesDAO.php');
require_once realpath(dirname(__FILE__).
    '/../dao/UsersLogsPrivilegesDAO.php');
require_once realpath(dirname(__FILE__).'/../dao/WorkingAreasDAO.php');
require_once realpath(dirname(__FILE__).'/../dao/ItemsDAO.php');

use fsm;
use fsm\database as db;


// Checks if the token sent from the client is valid and returns the ID of its 
// owner if it is
$validateToken = function() {
    // attempt to connect to the database
    $tokens = new db\RecoveryTokensDAO();

    // search the token in the data base
    $token = $tokens->getByToken($_POST['token']);

    // if the token was found, check if it has not expired yet
    $exists = isset($token) && $token != FALSE;
    if ($exists) {
        // get the expiration date that was stored with the token
        $tokenExpiration = new \DateTime($token["expiration_date"]);  

        // check if the token has not expired
        if (new \DateTime(date("Y-m-d H:i:s")) <= $tokenExpiration) {
            return $token['user_id'];
        } else {
            new \Exception(
                "Password recovery token has expired or is invalid."
            );
        }
    } else {
        throw new \Exception(
            "The user did not requested password recovery."
        );
    }

    return [];
};


// The list of services that the server can provide
fsm\Controller::$services = [
    // checks if the data base server is available for use
    'status' => [
        'requirements_desc' => [],
        'callback' => function() {
            return isset(db\DataAccessObject::$dataBase);
        }
    ],

    // Logs the user into her account and starts a session
    'login' => [
        'requirements_desc' => [
            'username' => [
                'type' => 'string',
                'min_length' => 5
            ],
            'password' => [
                'type' => 'string',
                'min_length' => 6
            ]
        ],
        'callback' => function() {
            $session = new Session();
            $userInfo = $session->start($_POST['username'], $_POST['password']);
            
            if (isset($userInfo)) {
                return $userInfo;
            } else {
                throw new \Exception('Log in credentials where incorrect.');
            }
        }
    ],

    // Logs the user out from her account and ends the session
    'logout' => [
        'requirements_desc' => [],
        'callback' => function() {
            $session = new Session();
            $session->close();
            return [];
        }
    ],
    
    // Checks if the user is logged in
    'check-session' => [
        'requirements_desc' => [],
        'callback' => function() {
            $session = new Session();
            return $session->isOpen();
        }
    ],

    // Sends an email to the user with a token for resetting her password
    'request-password-recovery' => [
        'requirements_desc' => [
            'email' => [
                'type' => 'email'
            ],
            'lang' => [
                'type' => 'lang'
            ]
        ],
        'callback' => function() {
            // retrieve the user information
            $users = new db\UsersDAO();
            $tokens = new db\RecoveryTokensDAO();
            $userProfile = $users->getByIdentifier($_POST['email']);

            if (isset($userProfile)) {
                // get the current timestamp and add 1 day to get the 
                // expiration date for the token
                $expirationDate = strtotime("+15 minutes", time());

                // create the recovery token
                $recoveryToken = hash(
                    "sha512",
                    rand()
                    . $userProfile['first_name']
                    . $userProfile['last_name']
                    . time()
                );

                // delete any previous token, valid or invalid, that is associated 
                // with this user ID
                $tokens->deleteByUserID($userProfile["id"]);
                
                // store it in the data base
                $tokens->insert([
                    "user_id" => $userProfile["id"],
                    "expiration_date" => date("Y-m-d H:i:s", $expirationDate),
                    "token" => $recoveryToken
                ]);

                // create the password recovery link
                $recoveryLink = 
                    "http://".$_SERVER['HTTP_HOST'].fsm\SITE_ROOT
                    ."/password-recovery?token="
                    . $recoveryToken;
                
                // now prepare the email to be sent to the user
                $body = '';
                $subject = '';

                if ($_POST['lang'] == 'en') {
                    $subject = "Jacobs Farm: Password Recovery.";
                    $body = "This is an automated response to your request to "
                        . "recover your password. Just click the following link" 
                        . " within the next 15 minutes and you will be taken to "
                        . "the password recovery page:<br>"
                        . "<a href='".$recoveryLink."'>Recover my " 
                        . "password!</a>";
                } elseif ($_POST['lang'] == 'es') {
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
                $mail = new Email([
                        'email' => $userProfile['email'],
                        'name' => 
                            $userProfile["first_name"].' '.
                            $userProfile["last_name"]
                    ],
                    $subject, $body, $_POST['lang']
                );

                // send the email
                $result = $mail->send();

                // if the email could not be sent, throw en exception
                if (strlen($result) > 0) {
                    throw new \Exception($result);
                }
            } else {
                throw new \Exception('User not found in data base');
            } // if (isset($userProfile))

            return [];
        }
    ],

    // Checks if the provided password recovery token is valid or not
    'token-validation' => [
        'requirements_desc' => [
            'token' => [
                'type' => 'string',
                'length' => 128
            ]
        ],
        'callback' => $validateToken
    ],

    // Changes the log in name of the user
    'change-username' => [
        'requirements_desc' => [
            'logged_in' => 'any',
            'password' => [
                'type' => 'string',
                'min_length' => 6
            ],
            'new_username' => [
                'type' => 'string',
                'min_length' => 5
            ]
        ],
        'callback' => function() {
            // first we connect to the database
            $users = new db\UsersDAO();
            $session = new Session();

            // then we check if the name is duplicated and if the password is valid
            $isNameDuplicated = $users->hasByLogInName($_POST['new_username']);
            $isPasswordValid = password_verify(
                $_POST['password'],
                $session->get('login_password')
            );
            
            if ($isNameDuplicated) {
                throw new \Exception(
                    'Failed to update user name; new name is already taken.'
                );
            }

            if (!$isPasswordValid) {
                throw new \Exception(
                    'Failed to update user name; the password is incorrect.'
                );
            }
            
            // if the password is not duplicated and the password is valid, then
            // update the user name
            $users->updateLogInNameByUserID(
                $session->get('id'),
                $_POST['new_username']
            );

            return [];
        }
    ],

    // Changes the user log in password    
    'change-password' => [
        'requirements_desc' => [
            'logged_in' => 'any',
            'password' => [
                'type' => 'string',
                'min_length' => 6
            ],
            'new_password' => [
                'type' => 'string',
                'min_length' => 6
            ]
        ],
        'callback' => function() {
            // first, connect to the data base
            $session = new Session();
            $users = new db\UsersDAO();

            // check if the password is valid
            $isPasswordValid = password_verify(
                $_POST['password'], 
                $session->get('login_password')
            );

            if (!$isPasswordValid) {
                throw new \Exception(
                    'Password could not be changed; authentication credentials '. 
                    'where incorrect.'
                );
            }

            // obtain the hash of the new password
            $newPasswd = password_hash($_POST['new_password'], \PASSWORD_BCRYPT);

            // store the new password in the data base 
            $users->updatePasswordByUserID(
                $session->get('id'), 
                $newPasswd
            );

            // save the new password in the session storage
            $session->set('login_password', $newPasswd);
        }
    ],

    // Resets the user log in password when she forgot it and 
    // requested a password recovery to regain access to her account
    'change-password-by-recovery' => [
        'requirements_desc' => [
            'new_password' => [
                'type' => 'string',
                'min_length' => 6
            ],
            'token' => [
                'type' => 'string',
                'length' => 128
            ]
        ],
        'callback' => function() {
            // first, validate the provided token
            $userID = $validateToken();

            if (isset($userID)) {
                // then connect to the data base
                $users = new db\UsersDAO();
                $tokens = new db\RecoveryTokensDAO();

                // change the user log in password in the data base
                $users->updatePasswordByUserID(
                    $userID, 
                    password_hash($_POST['new_password'], PASSWORD_BCRYPT)
                ); 

                // delete the old token
                $tokens->deleteByUserID($userID);

                // obtain the log in name and the new password
                $userProfile = $users->getByIdentifier($userID);
                $_POST['username'] = $userProfile['login_name'];
                $_POST['password'] = $_POST['new_password'];

                // use this info to log in the user
                $logInService = new LogInService();
                return $logInService->execute();
            } else {
                throw new \Exception('Recovery token is invalid.');
            }
        }
    ],

    // Changes the user's email address
    'change-email' => [
        'requirements_desc' => [
            'logged_in' => 'any',
            'password' => [
                'type' => 'string',
                'min_length' => 6
            ],
            'new_email' => [
                'type' => 'email'
            ]
        ],
        'callback' => function() {
            // connect to the data base
            $session = new Session();
            $users = new db\UsersDAO();

            // check if the new email is duplicated and if the password is valid
            $isEmailDuplicated = $users->hasByEmail($_POST['new_email']);
            $isPasswordValid = password_verify(
                $_POST['password'], 
                $session->get('login_password')
            );

            if ($isEmailDuplicated) {
                throw new \Exception(
                    'Failed to update user email; address is already taken.'
                );
            }

            if (!$isPasswordValid) {
                throw new \Exception(
                    'Failed to update user email; the password is incorrect.'
                );
            }

            // update the email address in the data base
            $users->updateEmailByUserID($session->get('id'), $_POST['new_email']);

            return [];
        }
    ],

    // Service for mailing a bug report
    'send-bug-report' => [
        'requirements_desc' => [
            'logged_in' => 'any',
            'zone-selection' => [
                'type' => 'string'
            ],
            'procedure-selection' => [
                'type' => 'string'
            ],
            'severity-selection' => [
                'type' => 'string'
            ],
            'summary' => [
                'type' => 'string',
                'min_length' => 3,
                'max_length' => 512
            ],
            'lang' => [
                'type' => 'lang'
            ],
            'email' => [
                'type' => 'email'
            ]
        ],
        'callback' => function() {
            // get the user session data
            $session = new Session();
            
            // Create the email body by pasting all the posted data into it
            $body = "Usuario: " . $session->get("login-name") . "<br>"
                . "ID de empleado: " . $session->get("id") . "<br>"
                . "Zona: " . $_POST["zone-selection"] . "<br>"
                . "Programa: " . $_POST["procedure-selection"] . "<br>"
                . "Modulo: " . $_POST['module-selection'] . "<br>"
                . "Navegadores: ";

            // paste browsers
            foreach ($_POST["browser-selection"] as $browser) {
                $body .= $browser . " ";
            }

            // continue with the rest of the body
            $body .= "\n" . "Severidad: " . $_POST["severity-selection"] . "<br>"
                . "Resumen: " . $_POST["summary"] . "<br>"
                . "Pasos para reproducirlo: " . $_POST["steps"] . "<br>"
                . "Salida esperada: " . $_POST["expectation"] . "<br>"
                . "Salida obtenida: " . $_POST["reality"] . "<br>";

            $subject = 'Jacobs Farm - Del Cabo: Bug report';

            // create the email with the information that we created so far 
            $bugReport = new Email([
                    'email' => 'caom92@live.com',
                    'name' => 'Carlos Oliva'
                ],
                $subject, $body, 'es'
            );

            // array where the invalid bitmaps are going to be stored
            $invalidImages = [];

            // attach the image files
            if (isset($_FILES)) {
                $length = count($_FILES["screenshot-attachment"]["tmp_name"]);

                // for each file to be attached ...
                for ($i = 0; $i < $length; $i++) {
                    // check if the file type corresponds to a valid supported 
                    // bitmap file type
                    $isValid = DataValidator::isBitmapFile(
                        $_FILES["screenshot-attachment"]["tmp_name"][$i]
                    );

                    // if the file type is valid ...
                    if ($isValid) {
                        // attach it to the email
                        $bugReport->addAttachment(
                            $_FILES["screenshot-attachment"]["tmp_name"][$i], 
                            $_FILES["screenshot-attachment"]["name"][$i]
                        );
                    } else {
                        // if it is invalid, store it in the invalid bitmaps array
                        array_push(
                            $invalidImages, 
                            $_FILES["screenshot-attachment"]["name"][$i]
                        );
                    }
                }
            }

            // send the email
            $result = $bugReport->send();

            // if the email could not be sent, throw en exception
            if (strlen($result) > 0) {
                throw new \Exception($result);
            }

            // now, let's send a confirmation email
            if ($_POST["lang"] == "en") {
                $subject = 
                    "Jacobs Farm : Bug report submission confirmation";
                $body = "This is an automated response to the bug report that"
                    . " you submitted earlier. We'll start working on solving the" 
                    . " problem as soon as possible. You don't need to reply to"
                    . " this message. If you did not submitted any bug report to "
                    . "us, please just disregard this message. ";
            } elseif ($_POST["lang"] == "es") {
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
            $confirmation = new Email([
                    'email' => $session->get('email'),
                    'name' => $session->get('login-name')
                ],
                $subject, $body, $_POST['lang']
            );

            // send the email
            $result = $confirmation->send();

            // if the email could not be sent, throw en exception
            if (strlen($result) > 0) {
                throw new \Exception($result);
            }
            
            // return the invalid bitmap images 
            return $invalidImages;
        }
    ],

    // Returns a list of all zones
    'list-zones' => [
        'requirements_desc' => [
            'logged_in' => ['Administrator']
        ],
        'callback' => function() {
            $zones = new db\ZonesDAO();
            return $zones->selectAll();
        }
    ],

    // Returns a list of all programs
    'list-programs' => [
        'requirements_desc' => [
            'logged_in' => [ 'Administrator' ]
        ],
        'callback' => function() {
            $programs = new db\ProgramsDAO();
            return $programs->selectAll();
        }
    ],

    // Returns a list of all the modules of the specified program
    'get-modules-of-program' => [
        'requirements_desc' => [
            'logged_in' => [ 'Administrator' ],
            'program_id' => [
                'type' => 'int'
            ]
        ],
        'callback' => function() {
            $modules = new db\ModulesDAO();
            return $modules->selectByProgramID($_POST['program_id']);
        }
    ],

    // Returns a list of all the active users
    'list-users' => [
        'requirements_desc' => [
            'logged_in' => [ 'Administrator' ]
        ],
        'callback' => function() {
            $users = new db\UsersDAO();
            return $users->selectAll();
        }
    ],

    // case 'get-user-privileges':
    //     $this->service = new ListUserPrivilegesService();
    // break;

    // case 'list-privileges':
    //     $this->service = new ListAllPrivilegesService();
    // break;

    // Stores a new zone in the data base
    'add-zone' => [
        'requirements_desc' => [
            'logged_in' => ['Administrator'],
            'new_zone' => [
                'type' => 'string',
                'length' => 3
            ]
        ],
        'callback' => function() {
            // first we connect to the database
            $zones = new db\ZonesDAO();

            // then we check if the name is duplicated
            $isZoneNameDuplicated = $zones->hasByName($_POST['new_zone']);
            if (!$isZoneNameDuplicated) {
                // if it's not, store it
                $zones->insert($_POST['new_zone']);
                return [];
            } else {
                throw new \Exception('Cannot add new zone; name is already taken.');
            }
        }
    ],

    // Checks if the zone name is duplicated
    'is-zone-name-duplicated' => [
        'requirements_desc' => [
            'logged_in' => [ 'Administrator' ],
            'zone_name' => [
                'type'=> 'string',
                'length' => 3
            ]
        ],
        'callback' => function() {
            // first we connect to the database
            $zones = new db\ZonesDAO();

            // then we check if the name is duplicated
            return $zone->hasByName($_POST['zone_name']);
        }
    ],

    // Checks if the log in name is duplicated
    'is-login-name-duplicated' => [
        'requirements_desc' => [
            'logged_in' => 'any',
            'login_name' => [
                'type' => 'string',
                'min_length' => 5
            ]
        ],
        'callback' => function() {
            // first we connect to the database
            $users = new db\UsersDAO();

            // then we check if the name is duplicated
            return $users->hasByLogInName($_POST['login_name']);
        }
    ],

    // Checks if the email is duplicated
    'is-email-duplicated' => [
        'requirements_desc' => [
            'logged_in' => 'any',
            'email' => [
                'type' => 'email'
            ]
        ],
        'callback' => function() {
            // first we connect to the database
            $users = new db\UsersDAO();

            // then we check if the name is duplicated
            return $users->hasByEmail($_POST['email']);
        }
    ],

    // Checks if the employee ID number is duplicated
    'is-employee-num-duplicated' => [
        'requirements_desc' => [
            'logged_in' => ['Administrator'],
            'employee_num' => [
                'type' => 'int'
            ]
        ],
        'callback' => function() {
            // first we connect to the database
            $users = new db\UsersDAO();

            // then we check if the name is duplicated
            return $users->hasByEmployeeNum($_POST['employee_num']);
        }
    ],

    // case 'add-user':
    //     $this->service = new AddNewUserService();
    // break;

    // case 'list-user-roles':
    //     $this->service = new ListAllUserRolesService();
    // break;

    // case 'list-zones-programs-modules-privileges':
    //     $this->service = 
    //         new ListAllZonesProgramsModulesAndPrivilegesService();
    // break;

    // case 'get-inventory':
    //     $this->service = new ListInventoryItemsService();
    // break;

    // case 'toggle-email-notifications':
    //     $this->service = new ToggleEmailNotificationsService();
    // break;

    // case 'discharge_inventory_item':
    //     $this->service = new DischargeInventoryItemService();
    // break;

    // case 'add-inventory-item':
    //     $this->service = new AddNewInventoryItemService();
    // break;

    // case 'edit-user-permissions':
    //     $this->service = new EditUserPrivilegesService();
    // break;

    // case 'list-avaliable-inventory-items':
    //     $this->service = new ListAvailableInventoryItemsService();
    // break;

    // Returns the profile info of the specified user
    'get-employee-info' => [
        'requirements_desc' => [
            'logged_in' => ['Administrator'],
            'employee_num' => [
                'type' => 'int'
            ]
        ],
        'callback' => function() {
            $users = new db\UsersDAO();
            $userInfo = $users->getByIdentifier($_POST['employee_num']);

            $isSupervisor = $userInfo['role_name'] === 'Supervisor';
            $isEmployee = $userInfo['role_name'] === 'Employee';
            
            if ($isSupervisor || $isEmployee) {
                return [
                    'id' => $userInfo['id'],
                    'role_id' => $userInfo['role_id'],
                    'role_name' => $userInfo['role_name'],
                    'zone_id' => $userInfo['zone_id'],
                    'zone_name' => $userInfo['zone_name'],
                    'employee_num' => $userInfo['employee_num'],
                    'first_name' => $userInfo['first_name'],
                    'last_name' => $userInfo['last_name'],
                    'email' => $userInfo['email'],
                    'login_name' => $userInfo['login_name']
                ];
            } else {
                return [
                    'id' => $userInfo['id'],
                    'role_id' => $userInfo['role_id'],
                    'role_name' => $userInfo['role_name'],
                    'employee_num' => $userInfo['employee_num'],
                    'first_name' => $userInfo['first_name'],
                    'last_name' => $userInfo['last_name'],
                    'email' => $userInfo['email'],
                    'login_name' => $userInfo['login_name']
                ];
            }
        }
    ],

    // Toggles the activation of the specified account
    'toggle-account-activation' => [
        'requirements_desc' => [
            'logged_in' => [ 'Administrator'],
            'user_id' => [
                'type' => 'int'
            ]
        ],
        'callback' => function() {
            $users = new db\UsersDAO();
            $users->toggleActivationByID($_POST['user_id']);
            return [];
        }
    ],

    // Lists the areas of the specified zone
    'get-areas-of-zone' => [
        'requirements_desc' => [
            'logged_in' => ['Administrator'],
            'zone_id' => [
                'type' => 'int'
            ]
        ],
        'callback' => function() {
            $areas = new db\WorkingAreasDAO();
            return $areas->selectByZoneID($_POST['zone_id']);
        }
    ], 

    // Lists the items in the specified area
    'get-items-of-area' => [
        'requirements_desc' => [
            'logged_in' => ['Administrator'],
            'area_id' => [
                'type' => 'int'
            ]
        ],
        'callback' => function() {
            $items = new db\ItemsDAO();
            return $items->selectByAreaID($_POST['area_id']);
        }
    ],

    // Toggles the activation of the specified item
    'toggle-item-activation' => [
        'requirements_desc' => [
            'logged_in' => ['Administrator'],
            'item_id' => [
                'type' => 'int'
            ]
        ],
        'callback' => function() {
            $items = new db\ItemsDAO();
            $items->toggleActivationByID($_POST['item_id']);
            return [];
        }
    ],
    
    // Adds a new inventory item to the specified area
    'add-new-inventory-item' => [
        'requirements_desc' => [
            'logged_in' => ['Administrator'],
            'area_id' => [
                'types' => 'int'
            ],
            'name' => [
                'type' => 'string',
                'max' => 64
            ]
        ],
        'callback' => function() {
            // first connect to the data base
            $items = new db\ItemsDAO();

            // count the number of items in this area
            // so we can compute the position of this item and add it
            // in the last position
            $numItemsInArea = $items->countByAreaID($_POST['area_id']);

            // store the item in the data base 
            return $items->insert(
                $_POST['area_id'],
                $numItemsInArea + 1,
                $_POST['name']
            );
        }
    ]
];

?>