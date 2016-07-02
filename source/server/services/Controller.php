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
                    $usernameChanged = Services::changeUserAccountName(
                        $_POST['new_username']
                    );
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
                    $passwdChanged = Services::changeUserPassword(
                        $_POST['new_password']
                    );
                    respond(0, 'User password was changed successfully');
                } else {
                    throw new \Exception('User is not logged in');
                }
            } else {
                throw new \Exception('Input arguments are invalid');
            }
        break;

        case 'change-password-by-recovery':
            $inputArgsAreValid = (
                isset($_POST['new_password']) && 
                isset($_POST['token'])
            );
            if ($inputArgsAreValid) {
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
                    $emailChanged = Services::changeUserEmail(
                        $_POST['new_email']
                    );
                    respond(0, 'User email was changed successfully');
                } else {
                    throw new \Exception('User is not logged in');
                }
            } else {
                throw new \Exception('Input arguments are invalid');
            }
        break;

        case 'send-bug-report':
            $inputArgsAreValid = (
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
            if ($inputArgsAreValid) {
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
                respond(0, 'Listing zones', 
                    [ 'zones' => Services::getAllZones() ]);
            } else {
                throw new \Exception('User is not logged in.');
            }
        break;

        case 'list-programs':
            if (Services::isSessionOpen()) {
                respond(0, 'Listing programs', 
                    [ 'programs' => Services::getAllPrograms() ]);
            } else {
                throw new \Exception('User is not logged in.');
            }
        break;

        case 'list-modules':
            if (Services::isSessionOpen()) {
                respond(0, 'Listing modules', [ 
                    'modules' => Services::getAllModules() ]);
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