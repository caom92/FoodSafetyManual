<?php

namespace fsm\services;

require_once realpath(dirname(__FILE__).'/Service.php');
require_once realpath(dirname(__FILE__).'/Session.php');
require_once realpath(dirname(__FILE__).'/Email.php');
require_once realpath(dirname(__FILE__).'/../dao/UsersDAO.php');
require_once realpath(dirname(__FILE__).'/../dao/RecoveryTokensDAO.php');

use fsm;
use fsm\database as db;


// Service for logging in the user to her account
class LogInService implements Service
{
    // Returns an associative array of associative arrays which describe the 
    // user permission and input arguments values and formats that this service 
    // is expecting to recieve 
    function getRequirementsDescriptor()
    {
        return [
            'username' => [
                'type' => 'string',
                'min_length' => 5
            ],
            'password' => [
                'type' => 'string',
                'min_length' => 6
            ]
        ];
    }


    // Starts execution of the service
    function execute()
    {
        $session = new Session();
        $userInfo = $session->start($_POST['username'], $_POST['password']);
        
        if (isset($userInfo)) {
            return $userInfo;
        } else {
            throw new \Exception('Log in credentials where incorrect.');
        }
    }
}


// Service for logging out the user to her account
class LogOutService implements Service
{
    // Returns an associative array of associative arrays which describe the 
    // user permission and input arguments values and formats that this service 
    // is expecting to recieve 
    function getRequirementsDescriptor()
    {
        return [];
    }


    // Starts execution of the service
    function execute()
    {
        $session = new Session();
        $session->close();
        return [];
    }
}


// Service for checking if the user is logged in
class IsLoggedInService implements Service
{
    // Returns an associative array of associative arrays which describe the 
    // user permission and input arguments values and formats that this service 
    // is expecting to recieve 
    function getRequirementsDescriptor()
    {
        return [];
    }


    // Starts execution of the service
    function execute()
    {
        $session = new Session();
        return $session->isOpen();
    }
}


// Service for requesting to the server a password reset for recovering account 
// access
class RequestPasswordRecoveryService
{
    // Returns an associative array of associative arrays which describe the 
    // user permission and input arguments values and formats that this service 
    // is expecting to recieve
    function getRequirementsDescriptor()
    {
        return [
            'email' => [
                'type' => 'email'
            ],
            'lang' => [
                'type' => 'lang'
            ]
        ];
    }


    // Starts execution of the service
    function execute()
    {
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
    }   // function execute
}   // class RequestPasswordRecoveryService


// Service that checks if the provided password recovery token is valid or not
class ValidateTokenService implements Service
{
    // Returns an associative array of associative arrays which describe the 
    // user permission and input arguments values and formats that this service 
    // is expecting to recieve 
    function getRequirementsDescriptor()
    {
        return [
            'token' => [
                'type' => 'string',
                'length' => 128
            ]
        ];
    }


    // Starts execution of the service
    function execute()
    {
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
    }
}


// Service that changes the log in name of the user
class ChangeLogInNameService implements Service
{
    // Returns an associative array of associative arrays which describe the 
    // user permission and input arguments values and formats that this service 
    // is expecting to recieve 
    function getRequirementsDescriptor()
    {
        return [
            'logged_in' => 'any',
            'password' => [
                'type' => 'string',
                'min_length' => 6
            ],
            'new_username' => [
                'type' => 'string',
                'min_length' => 5
            ]
        ];
    }


    // Starts execution of the service
    function execute()
    {
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
}


// Service that changes the user log in password
class ChangePasswordService implements Service
{
    // Returns an associative array of associative arrays which describe the 
    // user permission and input arguments values and formats that this service 
    // is expecting to recieve 
    function getRequirementsDescriptor()
    {
        return [
            'logged_in' => 'any',
            'password' => [
                'type' => 'string',
                'min_length' => 6
            ],
            'new_password' => [
                'type' => 'string',
                'min_length' => 6
            ]
        ];
    }


    // Starts execution of the service
    function execute()
    {
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
        $newPasswd = password_hash($_POST['new_password'], PASSWORD_BCRYPT);

        // store the new password in the data base 
        $users->updatePasswordByUserID(
            $session->get('id'), 
            $newPasswd
        );

        // save the new password in the session storage
        $session->set('login_password', $newPasswd);
    }
}


// Service that resets the user log in password when she forgot it and 
// requested a password recovery to regain access to her account
class ChangePasswordByRecoveryService implements Service
{
    // Returns an associative array of associative arrays which describe the 
    // user permission and input arguments values and formats that this service 
    // is expecting to recieve 
    function getRequirementsDescriptor()
    {
        return [
            'new_password' => [
                'type' => 'string',
                'min_length' => 6
            ],
            'token' => [
                'type' => 'string',
                'length' => 128
            ]
        ];
    }


    // Starts execution of the service
    function execute()
    {
        // first, validate the provided token
        $validateTokenService = new ValidateTokenService();
        $userID = $validateTokenService->execute();

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
}


// Service that changes the user's email address
class ChangeEmailService implements Service
{
    // Returns an associative array of associative arrays which describe the 
    // user permission and input arguments values and formats that this service 
    // is expecting to recieve 
    function getRequirementsDescriptor()
    {
        return [
            'logged_in' => 'any',
            'password' => [
                'type' => 'string',
                'min_length' => 6
            ],
            'new_email' => [
                'type' => 'email'
            ]
        ];
    }


    // Starts execution of the service
    function execute()
    {
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
}


// Service that checks if the log in name is duplicated
class CheckLogInNameDuplicationService implements Service
{
    // Returns an associative array of associative arrays which describe the 
    // user permission and input arguments values and formats that this service 
    // is expecting to recieve 
    function getRequirementsDescriptor()
    {
        return [
            'logged_in' => 'any',
            'login_name' => [
                'type' => 'string',
                'min_length' => 5
            ]
        ];
    }


    // Starts execution of the service
    function execute()
    {
        // first we connect to the database
        $users = new db\UsersDAO();

        // then we check if the name is duplicated
        return $users->hasByLogInName($_POST['login_name']);
    }
}


// Service that checks if the email is duplicated
class CheckEmailDuplicationService implements Service
{
    // Returns an associative array of associative arrays which describe the 
    // user permission and input arguments values and formats that this service 
    // is expecting to recieve 
    function getRequirementsDescriptor()
    {
        return [
            'logged_in' => 'any',
            'email' => [
                'type' => 'email'
            ]
        ];
    }


    // Starts execution of the service
    function execute()
    {
        // first we connect to the database
        $users = new db\UsersDAO();

        // then we check if the name is duplicated
        return $users->hasByEmail($_POST['email']);
    }
}


// Service that checks if the employee ID number is duplicated
class CheckEmployeeNumDuplicationService implements Service
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
        // first we connect to the database
        $users = new db\UsersDAO();

        // then we check if the name is duplicated
        return $users->hasByEmployeeNum($_POST['employee_num']);
    }
}


// Service that toggles the email notifications of a user
class ToggleEmailNotificationsService implements Service
{
    // Returns an associative array of associative arrays which describe the 
    // user permission and input arguments values and formats that this service 
    // is expecting to recieve 
    function getRequirementsDescriptor()
    {
        return [
            'logged_in' => 'any',
            'enable_notifications' => [
                'type' => 'string'
            ]
        ];
    }


    // Starts execution of the service
    function execute()
    {
        $users = new db\UsersDAO();
        $session = new serv\Session();
        $users->updateEmailNotificationsByID(
            $session->get('id'), 
            ($_POST['enable_notifications'] === 'true')
        );
    }
}


// Service that toggles the activation of the specified account
class ToggleAccountActivationService implements Service
{
    // Returns an associative array of associative arrays which describe the 
    // user permission and input arguments values and formats that this service 
    // is expecting to recieve 
    function getRequirementsDescriptor()
    {
        return [
            'logged_in' => [ 'Administrator'],
            'user_id' => [
                'type' => 'int'
            ]
        ];
    }


    // Starts execution of the service
    function execute()
    {
        $users = new db\UsersDAO();
        $users->toggleActivationByID($_POST['user_id']);
        return [];
    }
}

?>