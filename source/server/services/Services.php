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
require_once realpath(dirname(__FILE__).'/../dao/RecoveryTokensDAO.php');

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
            $expirationDate = \strtotime("+1 day", time());

            // create the recovery token
            $recoveryToken = hash(
                "sha256",
                hash(
                    'md5', 
                    rand()
                    . $userProfile[0]['login_name']
                    . $userProfile[0]["login_password"]
                    . time()
                )
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
                ."/recover-password?token="
                . $recoveryToken;
            
            // now prepare the email to be sent to the user
            $body = '';
            $subject = '';

            if ($lang == 'en') {
                $subject = "Jacobs Farm: Password Recovery.";
                $body = "This is an automated response to your request to "
                    . "recover your password. Just click the following link" 
                    . " within the next 24 hours and you will be taken to the "
                    . " password recovery page:<br>"
                    . "<a href='".$recoveryLink."'>Recover my " 
                    . "password!</a>";
            } elseif ($lang == 'es') {
                $subject = "Del Cabo: Recuperación de contraseña.";
                $body = "Esta es una respuesta automatizada a su petición"
                    . " de recuperar su contraseña. Sólo haga clic "
                    . "en el enlace que aparece a continuación dentro de "
                    . "las siguientes 24 horas y lo llevará a la "
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
            throw \Exception('User not found in data base');
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
    static function changeUserAccountName($newName)
    {
        $session = new serv\Session();
        $users = new db\UsersDAO(db\connectToDataBase());
        $userID = $session->getID();
        $result = $users->updateLogInNameByUserID($userID, $newName);

        if (count($result) <= 0) {
            throw new \Exception("Log in name could not be changed.");
        }
    }


    // Change the password of the user with the provided ID
    static function changeUserPassword($newPasswd)
    {
        $session = new serv\Session();
        $users = new db\UsersDAO(db\connectToDataBase());
        $userID = $session->getID();
        $result = $users->updatePasswordByUserID($userID, $newPasswd);

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
        $result = $users->updatePasswordByUserID($userID, $newPasswd);

        if ($result <= 0) {
            throw new \Exception('Password could not be changed.');
        } else {
            $tokens->deleteByUserID($userID);
            $userProfile = $users->selectByIdentifier($userID, $newPasswd);
            return $userProfile[0]['login_name'];
        }
    }



    // Change the email of the user with the provided ID
    static function changeUserEmail($newEmail)
    {
        $session = new serv\Session();
        $users = new db\UsersDAO(db\connectToDataBase());
        $userID = $session->getID();
        $result = $users->updateEmailByUserID($userID, $newEmail);

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
            . "Procedimiento: " . $formData["procedure-selection"] . "<br>"
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


    // Gets a list of all the zones in the data base
    static function getAllZones()
    {
        $zones = new db\ZonesDAO(db\connectToDataBase());
        return $zones->selectAll();
    }


    // Gets a list of all the zones in the data base
    static function getAllPrograms()
    {
        $programs = new db\ProgramsDAO(db\connectToDataBase());
        return $programs->selectAll();
    }


    // Gets a list of all the zones in the data base
    static function getAllModules()
    {
        $modules = new db\ModulesDAO(db\connectToDataBase());
        return $modules->selectAll();
    }
}

?>