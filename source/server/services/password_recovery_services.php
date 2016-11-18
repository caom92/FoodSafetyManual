<?php

namespace fsm\services\recovery;

require_once realpath(dirname(__FILE__).'/../Email.php');
require_once realpath(dirname(__FILE__).'/../dao/UsersDAO.php');
require_once realpath(dirname(__FILE__).'/../dao/RecoveryTokensDAO.php');

use fsm\database as db;


// Sends an email to the user with a token for resetting her password
function requestPasswordRecovery() 
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
        $mail = new fsm\Email([
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


// Checks if the provided password recovery token is valid or not
function validateToken() 
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
};


// Resets the user log in password when she forgot it and 
// requested a password recovery to regain access to her account
function resetPassword() 
{
    // first, validate the provided token
    $userID = validateToken();

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

?>