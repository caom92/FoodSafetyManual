<?php

// Namespace of the main module of the project
namespace fsm;

// Import the site configuration file
require_once realpath(dirname(__FILE__).'/../config/site_config.php');

// Import all the services
require_once realpath(dirname(__FILE__).'/Services.php');

// Configure PHP to write the errors to a log file
ini_set("log_errors", true);
ini_set("error_log", "../".LOG_FILE);


// This function sends back to the client the especified information in a 
// JSON of the form:
// {
//      meta: {
//          return_code:[int],
//          message:[string]
//      }
//      data:[json]
// }
// [in]     code: the return code or error code to be sent back 
// [in]     message: the message string providing more information about
//          the code sent
// [in]     [data]: associative array of data that is going to be parsed into
//          a JSON and be sent back to the client
function respond($code, $message, $data = [])
{
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode([
        'meta' => [
            'return_code' => $code,
            'message' => $message
        ],
        'data' => $data
    ]);
}

try {
    // get the requested service
    $service = str_replace(SITE_ROOT.'/services/', '', $_SERVER['REQUEST_URI']);

    // detect which was the requested service and provide it
    switch ($service) {
        case 'status':
            Services::canConnectToDataBase();
            respond(0, 'The data base server is available.');
        break;

        case 'login':
            $areInputArgsValid =
                validateString($_POST['username'], 6) &&
                validateString($_POST['password'], 6);
                
            if ($areInputArgsValid) {
                $userData = Services::logIn(
                    $_POST['username'], 
                    $_POST['password']
                );
                respond(0, 'User logged in successfully.', $userData);
            } else {
                throw new \Exception(ERROR_INVALID_ARGS);
            }
        break;

        case 'logout':
            Services::logOut();
            respond(0, 'User logged out.');
        break;

        case 'check-session':
            respond(0, 'User session checked.', Services::isSessionOpen());
        break;

        case 'request-password-recovery':
            $areInputArgsValid =
                validateEmail($_POST['email']) && 
                validateLanguageCode($_POST['lang']);

            if ($areInputArgsValid) {
                Services::mailRecoveryToken(
                    $_POST['email'], 
                    $_POST['lang']
                );
                respond(0, 'Recovery token mailed successfully.');
            } else {
                throw new \Exception(ERROR_INVALID_ARGS);
            }
        break;

        case 'token-validation':
            $areInputArgsValid =
                validateStringToken($_POST['token']);

            if ($areInputArgsValid) {
                Services::validateToken($_POST['token']);
                respond(0, 'Token is valid.');
            } else {
                throw new \Exception(ERROR_INVALID_ARGS);
            }
        break;

        case 'change-username':
            $areInputArgsValid = 
                validateString($_POST['password'], 6) &&
                validateString($_POST['new_username'], 6);

            if ($areInputArgsValid) {
                if (Services::isSessionOpen()) {
                    $isDuplicated = Services::checkAccountNameDuplicates(
                        $_POST['new_username']
                    ); 
                    if ($isDuplicated) {
                        throw new \Exception(
                            'Failed to update user info: log in name '.
                            'already taken.'
                        );
                    }

                    Services::changeUserAccountName(
                        $_POST['password'], 
                        $_POST['new_username']
                    );
                    respond(0, 'User login name was changed successfully');
                } else {
                    throw new \Exception(ERROR_NOT_LOGGED_IN);
                }
            } else {
                throw new \Exception(ERROR_INVALID_ARGS);
            }
        break;

        case 'change-password':
            $areInputArgsValid =
                validateString($_POST['password'], 6) &&
                validateString($_POST['new_password'], 6);

            if ($areInputArgsValid) {
                if (Services::isSessionOpen()) {
                    Services::changeUserPassword(
                        $_POST['password'], 
                        $_POST['new_password']
                    );
                    respond(0, 'User password was changed successfully');
                } else {
                    throw new \Exception(ERROR_NOT_LOGGED_IN);
                }
            } else {
                throw new \Exception(ERROR_INVALID_ARGS);
            }
        break;

        case 'change-password-by-recovery':
            $areInputArgsValid = 
                validateString($_POST['new_password'], 6) && 
                validateStringToken($_POST['token']);

            if ($areInputArgsValid) {
                $userID = Services::validateToken($_POST['token']);
                $username = Services::changeUserPasswordByRecovery(
                    $userID, 
                    $_POST['new_password']
                );
                $result = Services::LogIn(
                    $username, 
                    $_POST['new_password']
                );
                respond(0, 'User password was changed successfully', $result);
            } else {
                throw new \Exception(ERROR_INVALID_ARGS);
            }
        break;

        case 'change-email':
            $areInputArgsValid =
                validateString($_POST['password'], 6) &&
                validateString($_POST['new_email'], 6);

            if ($areInputArgsValid) {
                if (Services::isSessionOpen()) {
                    $isDuplicated = Services::checkUserEmailDuplicates(
                        $_POST['new_email']
                    );
                    if ($isDuplicated) {
                        throw new \Exception(
                            'Failed to update user info: email already taken.');
                    }

                    Services::changeUserEmail(
                        $_POST['password'], 
                        $_POST['new_email']
                    );
                    respond(0, 'User email was changed successfully');
                } else {
                    throw new \Exception(ERROR_NOT_LOGGED_IN);
                }
            } else {
                throw new \Exception(ERROR_INVALID_ARGS);
            }
        break;

        case 'send-bug-report':
            $areInputArgsValid = (
                validateString($_POST['user-name'], 6) &&
                validateInteger($_POST['user-id']) &&
                validateString($_POST['zone-selection']) &&
                validateString($_POST['procedure-selection']) &&
                validateString($_POST["browser-selection"]) &&
                validateString($_POST['severity-selection']) &&
                validateString($_POST['summary'], 1, 512) &&
                validateLanguageCode($_POST['lang']) &&
                validateEmail($_POST['email'])
            );
            if ($areInputArgsValid) {
                if (Services::isSessionOpen()) {
                    if (isset($_FILES['screenshot-attachment'])) {
                        $result = Services::mailBugReport($_POST, $_FILES);
                        respond(0, 'Bug report mailed successfully.', $result);
                    } else {
                        Services::mailBugReport($_POST);
                        respond(0, 'Bug report mailed successfully.');
                    }
                } else {
                    throw new \Exception(ERROR_NOT_LOGGED_IN);
                }
            } else {
                throw new \Exception(ERROR_INVALID_ARGS);
            }
        break;

        case 'list-zones':
            if (Services::isSessionOpen()) {
                if (Services::isAdmin()) {
                    respond(0, 'Listing zones.', Services::getAllZones());
                } else {
                    throw new \Exception(ERROR_NO_PERMISSIONS);
                }
            } else {
                throw new \Exception(ERROR_NOT_LOGGED_IN);
            }
        break;

        case 'list-programs':
            if (Services::isSessionOpen()) {
                if (Services::isAdmin()) {
                    respond(0, 'Listing programs', Services::getAllPrograms());
                } else {
                    throw new \Exception(ERROR_NO_PERMISSIONS);
                }
            } else {
                throw new \Exception(ERROR_NOT_LOGGED_IN);
            }
        break;

        case 'get-modules-of-program':
            $areInputArgsValid = validateInteger($_POST['program_id']);

            if ($areInputArgsValid) {
                if (Services::isSessionOpen()) {
                    if (Services::isAdmin()) {
                        respond(0, 'Listing modules', 
                            Services::getModulesOfProgram
                            (
                                $_POST['program_id']
                            )
                        );
                    } else {
                        throw new \Exception(ERROR_NO_PERMISSIONS);
                    }
                } else {
                    throw new \Exception(ERROR_NOT_LOGGED_IN);
                }
            } else {
                throw new \Exception(ERROR_INVALID_ARGS);
            }
        break;

        case 'list-users':
            if (Services::isSessionOpen()) {
                if (Services::isAdmin()) {
                    respond(0, 'Listing users', Services::getAllUsers());
                } else {
                    throw new \Exception(ERROR_NO_PERMISSIONS);
                }
            } else {
                throw new \Exception(ERROR_NOT_LOGGED_IN);
            }
        break;

        case 'get-user-privileges':
            $areInputArgsValid = validateInteger($_POST['user_id']);

             if ($areInputArgsValid) {
                if (Services::isSessionOpen()) {
                    if (Services::isAdmin()) {
                        respond(0, 'Listing user privileges.', 
                            Services::getPrivilegesOfUser($_POST['user_id']));
                    } else {
                        throw new \Exception(ERROR_NO_PERMISSIONS);
                    }
                } else {
                    throw new \Exception(ERROR_NOT_LOGGED_IN);
                }
            } else {
                throw new \Exception(ERROR_INVALID_ARGS);
            }
        break;

        case 'list-privileges':
            if (Services::isSessionOpen()) {
                if (Services::isAdmin()) {
                    respond(0, 'Listing privileges.', 
                        Services::getAllPrivileges());
                } else {
                    throw new \Exception(ERROR_NO_PERMISSIONS);
                }
            } else {
                throw new \Exception(ERROR_NOT_LOGGED_IN);
            }
        break;

        case 'add-zone':
            $areInputArgsValid = validateString($_POST['new_zone'], 3, 3);

             if ($areInputArgsValid) {
                if (Services::isSessionOpen()) {
                    if (Services::isAdmin()) {
                        $isDuplicated = Services::checkZoneNameDuplicates(
                            $_POST['new_zone']
                        );
                        if ($isDuplicated) {
                            throw new \Exception(
                                'Failed to add new zone: name already taken.');
                        }

                        Services::addNewZone($_POST['new_zone']);
                        respond(0, 'Zone added successfully.');
                    } else {
                        throw new \Exception(ERROR_NO_PERMISSIONS);
                    }
                } else {
                    throw new \Exception(ERROR_NOT_LOGGED_IN);
                }
            } else {
                throw new \Exception(ERROR_INVALID_ARGS);
            }
        break;

        case 'is-zone-name-duplicated':
            $areInputArgsValid = validateString($_POST['zone_name'], 3, 3);

             if ($areInputArgsValid) {
                if (Services::isSessionOpen()) {
                    if (Services::isAdmin()) {
                        $result = Services::checkZoneNameDuplicates(
                            $_POST['zone_name']
                        );
                        respond(0, 'Zone name checked for duplicity.', $result);
                    } else {
                        throw new \Exception(ERROR_NO_PERMISSIONS);
                    }
                } else {
                    throw new \Exception(ERROR_NOT_LOGGED_IN);
                }
            } else {
                throw new \Exception(ERROR_INVALID_ARGS);
            }
        break;

        case 'is-login-name-duplicated':
            $areInputArgsValid = validateString($_POST['login_name'], 6);

            if ($areInputArgsValid) {
                if (Services::isSessionOpen()) {
                    $result = Services::checkAccountNameDuplicates(
                        $_POST['login_name']
                    );
                    respond(0, 'User log in name checked for duplicity.', 
                        $result);
                } else {
                    throw new \Exception(ERROR_NOT_LOGGED_IN);
                }
            } else {
                throw new \Exception(ERROR_INVALID_ARGS);
            }
        break;

        case 'is-email-duplicated':
            $areInputArgsValid = validateEmail($_POST['email']);

            if ($areInputArgsValid) {
                if (Services::isSessionOpen()) {
                    $result = Services::checkUserEmailDuplicates(
                        $_POST['email']
                    );
                    respond(0, 'User email checked for duplicity.', 
                        $result);
                } else {
                    throw new \Exception(ERROR_NOT_LOGGED_IN);
                }
            } else {
                throw new \Exception(ERROR_INVALID_ARGS);
            }
        break;

        case 'is-employee-num-duplicated':
            $areInputArgsValid = validateInteger($_POST['employee_num']);

            if ($areInputArgsValid) {
                if (Services::isSessionOpen()) {
                    if (Services::isAdmin()) {
                        $result = Services::checkUserEmployeeNumDuplicates(
                            $_POST['employee_num']
                        );
                        respond(
                            0, 'User employee number checked for duplicity.', 
                            $result
                        );
                    } else {
                        throw new \Exception(ERROR_NO_PERMISSIONS);
                    }
                } else {
                    throw new \Exception(ERROR_NOT_LOGGED_IN);
                }
            } else {
                throw new \Exception(ERROR_INVALID_ARGS);
            }
        break;

        case 'add-user':
            // now, check that every attribute in the json is set as expected
            $areInputArgsValid = 
                validateInteger($_POST['employee_num']) &&
                validateString($_POST['first_name']) &&
                validateString($_POST['last_name']) &&
                validateEmail($_POST['email']) &&
                validateInteger($_POST['role_id']) &&
                validateString($_POST['login_name']) &&
                validateString($_POST['login_password']) &&
                isset($_POST['privileges']);

            // continue if all the attributes are set...
            if ($areInputArgsValid) {
                // if the user is logged in....
                if (Services::isSessionOpen()) {
                    // and if the user is an admin
                    if (Services::isAdmin()) {
                        // check if the log in name is duplicated
                        $isAccountNameDuplicated = 
                            Services::checkAccountNameDuplicates(
                                $_POST['login_name']
                            );
                        if ($isAccountNameDuplicated) {
                            // throw an exception if it was
                            throw new \Exception(
                                'User registration failed, log in name is '. 
                                'already taken.'
                            );
                        }

                        // check if the email is duplicated
                        $isEmailDuplicated = 
                            Services::checkUserEmailDuplicates($_POST['email']);
                        if ($isEmailDuplicated) {
                            // throw an exception if it was
                            throw new \Exception(
                                'User registration failed, email is already '. 
                                'taken.'
                            );
                        }

                        // check if the employee number is duplicated
                        $isEmployeeNumDuplicated = 
                            Services::checkUserEmployeeNumDuplicates(
                                $_POST['employee_num']
                            ); 
                        if ($isEmployeeNumDuplicated) {
                            // throw an exception if it was
                            throw new \Exception(
                                'User registration failed, employee number '.
                                'is already taken.'
                            );
                        }

                        // after many checks, finally add the user
                        Services::addNewUser($_POST);
                        respond(0, 'User registered successfully.');
                    } else {
                        throw new \Exception(ERROR_NO_PERMISSIONS);
                    }
                } else {
                    throw new \Exception(ERROR_NOT_LOGGED_IN);
                }
            } else {
                throw new \Exception(ERROR_INVALID_ARGS);
            }
        break;

        case 'list-user-roles':
            if (Services::isSessionOpen()) {
                if (Services::isAdmin()) {
                    respond(0, 'User roles listed successfully.', 
                        Services::getAllUserRoles());
                } else {
                    throw new \Exception(ERROR_NO_PERMISSIONS);
                }
            } else {
                throw new \Exception(ERROR_NOT_LOGGED_IN);
            }
        break;

        case 'list-zones-programs-modules-privileges':
            if (Services::isSessionOpen()) {
                if (Services::isAdmin()) {
                    respond(0, 'User roles listed successfully.', 
                        Services::getAllZonesProgramsModulesAndPrivileges());
                } else {
                    throw new \Exception(ERROR_NO_PERMISSIONS);
                }
            } else {
                throw new \Exception(ERROR_NOT_LOGGED_IN);
            }
        break;

        case 'get-inventory':
            $areInputArgsValid = 
                validateInteger($_POST['zone_id']) &&
                validateInteger($_POST['module_id']);

            if ($areInputArgsValid) {
                if (Services::isSessionOpen()) {
                    if (Services::isAdmin()) {
                        respond(0, 'Module inventory retrieved successfully.', 
                            Services::getInventoryOfProgram(
                                $_POST['zone_id'], 
                                $_POST['module_id']
                            )
                        );
                    } else {
                        throw new \Exception(ERROR_NO_PERMISSIONS);
                    }
                } else {
                    throw new \Exception(ERROR_NOT_LOGGED_IN);
                }
            } else {
                throw new \Exception(ERROR_INVALID_ARGS);
            }
        break;

        case 'toggle-email-notifications':
            $areInputArgsValid = validateString($_POST['enable_notifications']);

            if ($areInputArgsValid) {
                if (Services::isSessionOpen()) {
                    Services::toggleUserEmailNotifications(
                        $_POST['enable_notifications']
                    );
                    respond(
                        0,
                        "E-mail notifications' configuration changed". 
                        " successfully"
                    );
                } else {
                    throw new \Exception(ERROR_NOT_LOGGED_IN);
                }
            } else {
                throw new \Exception(ERROR_INVALID_ARGS);
            }
        break;

        case 'discharge-inventory-item':
            $areInputArgsValid = validateInteger($_POST['item_id']);

            if ($areInputArgsValid) {
                if (Services::isSessionOpen()) {
                    if (Services::isAdmin()) {
                        Services::dischargeInventoryItem($_POST['item_id']);
                        respond(0, 
                            'Inventory item was discharged successfully.'
                        );
                    } else {
                        throw new \Exception(ERROR_NO_PERMISSIONS);
                    }
                } else {
                    throw new \Exception(ERROR_NOT_LOGGED_IN);
                }
            } else {
                throw new \Exception(ERROR_INVALID_ARGS);
            }
        break;

        case 'add-inventory-item':
            $areInputArgsValid = 
                validateInteger($_POST['zone_id']) &&
                validateInteger($_POST['module_id']) &&
                validateString($_POST['name']);

            if ($areInputArgsValid) {
                if (Services::isSessionOpen()) {
                    if (Services::isAdmin()) {
                        Services::addNewInventoryItem(
                            $_POST['zone_id'],
                            $_POST['module_id'],
                            $_POST['name']
                        );
                        respond(0, 
                            'Inventory item was added successfully.'
                        );
                    } else {
                        throw new \Exception(ERROR_NO_PERMISSIONS);
                    }
                } else {
                    throw new \Exception(ERROR_NOT_LOGGED_IN);
                }
            } else {
                throw new \Exception(ERROR_INVALID_ARGS);
            }
        break;

        case 'edit-user-permissions':
            $areInputArgsValid = 
                validateInteger($_POST['user_id']) &&
                isset($_POST['privileges']);

            if ($areInputArgsValid) {
                if (Services::isSessionOpen()) {
                    if (Services::isAdmin()) {
                        Services::editUserPermissions(
                            $_POST['user_id'], 
                            $_POST['privileges']
                        );
                        respond(0, 'User permissions changed successfully.');
                    } else {
                        throw new \Exception(ERROR_NO_PERMISSIONS);
                    }
                } else {
                    throw new \Exception(ERROR_NOT_LOGGED_IN);
                }
            } else {
                throw new \Exception(ERROR_INVALID_ARGS);
            }
        break;

        case 'list-available-inventory-items':
            $areInputArgsValid = 
                validateInteger($_POST['zone_id']) &&
                validateInteger($_POST['module_id']);

            if ($areInputArgsValid) {
                if (Services::isSessionOpen()) {
                    respond(0, 'Module inventory retrieved successfully.', 
                        Services::getAvailableInventoryOfProgram(
                            $_POST['zone_id'], 
                            $_POST['module_id']
                        )
                    );
                } else {
                    throw new \Exception(ERROR_NOT_LOGGED_IN);
                }
            } else {
                throw new \Exception(ERROR_INVALID_ARGS);
            }
        break;
            
        default:
            // the requested service is not available
            throw new \Exception(
                "The requested service '$service' is not available.");
        break;
    }
} catch (\Exception $e) {
    // if there was a problem, notify the client
    $errorCode = $e->getCode();
    respond(
        ($errorCode != 0) ? $errorCode : 1, 
        $e->getMessage()
    );
}

?>