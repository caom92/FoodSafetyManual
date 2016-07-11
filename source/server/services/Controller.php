<?php

// Namespace of the main module of the project
namespace fsm;

// Import the site configuration file
require_once realpath(dirname(__FILE__).'/../config/site_config.php');

// Import all the services
require_once realpath(dirname(__FILE__).'/Services.php');


try {
    // get the requested service
    $service = str_replace(SITE_ROOT.'/services/', '', $_SERVER['REQUEST_URI']);

    // get which was the requested service and provide it
    switch ($service) {
        case 'status':
            Services::canConnectToDataBase();
            respond(0, 'The data base server is available.');
        break;

        case 'login':
            if (isset($_POST['username']) && isset($_POST['password'])) {
                $userData = Services::LogIn(
                    $_POST['username'], 
                    $_POST['password']
                );
                respond(0, 'User logged in successfully.', $userData);
            } else {
                throw new \Exception('Input arguments are invalid.');
            }
        break;

        case 'logout':
            Services::LogOut();
            respond(0, 'User logged out.');
        break;

        case 'check-session':
            if (Services::isSessionOpen()) {
                respond(0, 'A user is logged in.');
            } else {
                throw new \Exception('No user is logged in.');
            }
        break;

        case 'password-recovery':
            if (isset($_POST['username']) && isset($_POST['lang'])) {
                Services::mailRecoveryToken(
                    $_POST['username'], 
                    $_POST['lang']
                );
                respond(0, 'Recovery token mailed successfully.');
            } else {
                throw new \Exception('Input arguments are invalid');
            }
        break;

        case 'token-validation':
            if (isset($_POST['token'])) {
                Services::validateToken($_POST['token']);
                respond(0, 'Token is valid.');
            } else {
                throw new \Exception('Input arguments are not valid.');
            }
        break;

        case 'change-username':
            if (isset($_POST['new_username'])) {
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

                    Services::changeUserAccountName($_POST['new_username']);
                    respond(0, 'User login name was changed successfully');
                } else {
                    throw new \Exception('User is not logged in');
                }
            } else {
                throw new \Exception('Input arguments are invalid');
            }
        break;

        case 'change-password':
            if (isset($_POST['new_password'])) {
                if (Services::isSessionOpen()) {
                    Services::changeUserPassword($_POST['new_password']);
                    respond(0, 'User password was changed successfully');
                } else {
                    throw new \Exception('User is not logged in');
                }
            } else {
                throw new \Exception('Input arguments are invalid');
            }
        break;

        case 'change-password-by-recovery':
            $areInputArgsValid = (
                isset($_POST['new_password']) && 
                isset($_POST['token'])
            );
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
                throw new \Exception('Input arguments are invalid');
            }
        break;

        case 'change-email':
            if (isset($_POST['new_email'])) {
                if (Services::isSessionOpen()) {
                    $isDuplicated = Services::checkUserEmailDuplicates(
                        $_POST['new_email']
                    );
                    if ($isDuplicated) {
                        throw new \Exception(
                            'Failed to update user info: email already taken.');
                    }

                    Services::changeUserEmail($_POST['new_email']);
                    respond(0, 'User email was changed successfully');
                } else {
                    throw new \Exception('User is not logged in');
                }
            } else {
                throw new \Exception('Input arguments are invalid');
            }
        break;

        case 'send-bug-report':
            $areInputArgsValid = (
                isset($_POST['user-name']) &&
                isset($_POST['user-id']) &&
                isset($_POST['zone-selection']) &&
                isset($_POST['procedure-selection']) &&
                isset($_POST["browser-selection"]) &&
                isset($_POST['severity-selection']) &&
                isset($_POST['summary']) &&
                isset($_POST['lang']) &&
                isset($_POST['email'])
            );
            if ($areInputArgsValid) {
                if (Services::isSessionOpen()) {
                    if (isset($_FILES['screenshot-attachment'])) {
                        Services::mailBugReport($_POST, $_FILES);
                    } else {
                        Services::mailBugReport($_POST);
                    }
                    respond(0, 'Bug report mailed successfully.');
                } else {
                    throw new \Exception('User is not logged in');
                }
            } else {
                throw new \Exception('Input arguments are invalid');
            }
        break;

        case 'list-zones':
            if (Services::isSessionOpen()) {
                if (Services::isAdmin()) {
                    respond(0, 'Listing zones.', Services::getAllZones());
                } else {
                    throw new \Exception("Permission denied.");
                }
            } else {
                throw new \Exception('User is not logged in.');
            }
        break;

        case 'list-programs':
            if (Services::isSessionOpen()) {
                if (Services::isAdmin()) {
                    respond(0, 'Listing programs', Services::getAllPrograms());
                } else {
                    throw new \Exception("Permission denied.");
                }
            } else {
                throw new \Exception('User is not logged in.');
            }
        break;

        case 'get-modules-of-program':
            $areInputArgsValid = isset($_POST['program_id']);

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
                        throw new \Exception("Permission denied.");
                    }
                } else {
                    throw new \Exception('User is not logged in.');
                }
            } else {
                throw new \Exception('Input arguments are invalid');
            }
        break;

        case 'list-users':
            if (Services::isSessionOpen()) {
                if (Services::isAdmin()) {
                    respond(0, 'Listing users', Services::getAllUsers());
                } else {
                    throw new \Exception("Permission denied.");
                }
            } else {
                throw new \Exception('User is not logged in.');
            }
        break;

        case 'get-user-privileges':
            $areInputArgsValid = isset($_POST['user_id']);

             if ($areInputArgsValid) {
                if (Services::isSessionOpen()) {
                    if (Services::isAdmin()) {
                        respond(0, 'Listing user privileges.', 
                            Services::getPrivilegesOfUser($_POST['user_id']));
                    } else {
                        throw new \Exception("Permission denied.");
                    }
                } else {
                    throw new \Exception('User is not logged in.');
                }
            } else {
                throw new \Exception('Input arguments are invalid.');
            }
        break;

        case 'list-privileges':
            if (Services::isSessionOpen()) {
                if (Services::isAdmin()) {
                    respond(0, 'Listing privileges.', 
                        Services::getAllPrivileges());
                } else {
                    throw new \Exception("Permission denied.");
                }
            } else {
                throw new \Exception('User is not logged in.');
            }
        break;

        case 'add-zone':
            $areInputArgsValid = isset($_POST['new_zone']);

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
                        throw new \Exception("Permission denied.");
                    }
                } else {
                    throw new \Exception('User is not logged in.');
                }
            } else {
                throw new \Exception('Input arguments are invalid.');
            }
        break;

        case 'is-zone-name-duplicated':
            $areInputArgsValid = isset($_POST['zone_name']);

             if ($areInputArgsValid) {
                if (Services::isSessionOpen()) {
                    if (Services::isAdmin()) {
                        $result = Services::checkZoneNameDuplicates(
                            $_POST['zone_name']
                        );
                        respond(0, 'Zone name checked for duplicity.', $result);
                    } else {
                        throw new \Exception("Permission denied.");
                    }
                } else {
                    throw new \Exception('User is not logged in.');
                }
            } else {
                throw new \Exception('Input arguments are invalid.');
            }
        break;

        case 'is-login-name-duplicated':
            $areInputArgsValid = isset($_POST['login_name']);

            if ($areInputArgsValid) {
                if (Services::isSessionOpen()) {
                    $result = Services::checkAccountNameDuplicates(
                        $_POST['login_name']
                    );
                    respond(0, 'User log in name checked for duplicity.', 
                        $result);
                } else {
                    throw new \Exception('User is not logged in.');
                }
            } else {
                throw new \Exception('Input arguments are invalid.');
            }
        break;

        case 'is-email-duplicated':
            $areInputArgsValid = isset($_POST['email']);

            if ($areInputArgsValid) {
                if (Services::isSessionOpen()) {
                    $result = Services::checkUserEmailDuplicates(
                        $_POST['email']
                    );
                    respond(0, 'User email checked for duplicity.', 
                        $result);
                } else {
                    throw new \Exception('User is not logged in.');
                }
            } else {
                throw new \Exception('Input arguments are invalid.');
            }
        break;

        case 'is-employee-num-duplicated':
            $areInputArgsValid = isset($_POST['employee_num']);

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
                        throw new \Exception("Permission denied.");
                    }
                } else {
                    throw new \Exception('User is not logged in.');
                }
            } else {
                throw new \Exception('Input arguments are invalid.');
            }
        break;

        case 'add-user':
            $isPostSet = isset($_POST);
            if (!$isPostSet) {
                throw new \Exception('Input arguments are invalid.');
            }

            // now, check that every attribute in the json is set as expected
            $areInputArgsValid = isset($_POST['employee_num']) &&
                isset($_POST['first_name']) &&
                isset($_POST['last_name']) &&
                isset($_POST['email']) &&
                isset($_POST['login_name']) &&
                isset($_POST['login_password']) &&
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
                        Services::addNewUser($userData);
                        respond(0, 'User registered successfully.');
                    } else {
                        throw new \Exception("Permission denied.");
                    }
                } else {
                    throw new \Exception('User is not logged in.');
                }
            } else {
                throw new \Exception('Input arguments are invalid.');
            }
        break;

        case 'list-user-roles':
            if (Services::isSessionOpen()) {
                if (Services::isAdmin()) {
                    respond(0, 'User roles listed successfully.', 
                        Services::getAllUserRoles());
                } else {
                    throw new \Exception("Permission denied.");
                }
            } else {
                throw new \Exception('User is not logged in.');
            }
        break;

        case 'list-zones-programs-modules-privileges':
            if (Services::isSessionOpen()) {
                if (Services::isAdmin()) {
                    respond(0, 'User roles listed successfully.', 
                        Services::getAllZonesProgramsModulesAndPivileges());
                } else {
                    throw new \Exception("Permission denied.");
                }
            } else {
                throw new \Exception('User is not logged in.');
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

?>