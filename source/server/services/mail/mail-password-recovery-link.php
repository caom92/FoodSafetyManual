<?php

// Import PHPMailer using the composer autoloader
require_once realpath(
    dirname(__FILE__)."/../../../../external/PHPMailer/vendor/autoload.php"
);

require_once realpath(dirname(__FILE__)."/../../dao/UsersProfileInfo.php");

require_once realpath(dirname(__FILE__)."/../../dao/RecoveringPasswords.php");

// Alias the namespaces for ease of writing
use espresso as core;
use espresso\dao as dao;


// This function creates a password recovering token and stores it in an
// appropiate data base table for later password recovery by the user
// inside a time frame
function createAndStorePasswordRecoveryToken($userProfile, 
    $recoveringPasswordsTable)
{
    // get the current timestamp
    $timestamp = time();

    // create the recovery token
    $recoveryToken = 
        hash("sha256", $userProfile["full_name"] . " " . $timestamp);

    // delete any previous token, valid or invalid, that is associated with
    // this user ID
    $recoveringPasswordsTable->deleteItemsByUserID($userProfile["id"]);
    
    // store it in the data base
    $recoveringPasswordsTable->saveItems([
        "user_id" => $userProfile["id"],
        "timestamp" => date("Y-m-d H:i:s", $timestamp),
        "recovery_token" => $recoveryToken
    ]);

    // return the resulting token
    return $recoveryToken;
}


// This function prepares an email to be sent to the user with a link for 
// recovering the password. The user profile data of the user which password
// is going to be recovered must be input to this function 
function sendPasswordRecoveryLinkByEmail($userProfile, $recoveryToken)
{
    // create the password recovery link
    $recoveryLink = "localhost/espresso/users/recover-password?token="
        . $recoveryToken;

    // prepare the email to be sent to the user
    $body = "";
    $from = "";
    $subject = "";

    // now prepare the email to be sent to the user
    if ($_POST["lang"] == "en") {
        $from = "Espresso mailing system.";
        $subject = "Jacobs Farm: Password Recovery.";
        $body = "This is an automated response to your request to recover your"
            . " password. Just click the following link within the next 24" 
            . " hours and you will be taken to the password recovery page:<br>"
            . "<a href='" . $recoveryLink . "'>Recover my password!</a>";
    } else if ($_POST["lang"] == "es") {
        $from = "Sistema de mensajería de espresso.";
        $subject = "Del Cabo: Recuperación de contraseña.";
        $body = "Esta es una respuesta automatizada a su petici&oacute;n de "
            . "recuperar su contrase&ntilde;a. S&oacute;lo haga clic en el " 
            . "enlace que aparece a continuaci&oacute;n dentro de las " 
            . "siguientes 24 horas y lo llevar&aacute; a la "
            . "p&aacute;gina de recuperaci&oacute;n de contrase&ntilde;a: <br>"
            . "<a href='" . $recoveryLink . "'>"
            . "&iexcl;Recuperar mi contrase&ntilde;a!</a>";
    }

    //Create a new PHPMailer instance
    $mail = new PHPMailerOAuth;

    // Indicate we are using UTF-8 character encoding
    $mail->CharSet = "UTF-8";

    //Tell PHPMailer to use SMTP
    $mail->isSMTP();

    //Set the hostname of the mail server
    $mail->Host = "smtp.gmail.com";

    //Set the SMTP port number 
    $mail->Port = 587;

    //Set the encryption system to use 
    $mail->SMTPSecure = "tls";

    //Whether to use SMTP authentication
    $mail->SMTPAuth = true;

    //Set AuthType
    $mail->AuthType = "XOAUTH2";

    //User Email to use for SMTP authentication
    // Use the same Email used in Google Developer Console
    $mail->oauthUserEmail = "caom92@gmail.com";

    //Obtained From Google Developer Console
    $mail->oauthClientId = 
    "400565202453-2816cv5dbclt3s8l2u5p0qq8f713orrf.apps.googleusercontent.com";

    //Obtained From Google Developer Console
    $mail->oauthClientSecret = "PJdHoakwXn2IQ4p0L52eu9NW";

    //Obtained By running get_oauth_token.php after setting up APP in Google 
    // Developer Console.
    $mail->oauthRefreshToken = "1/SQZQxNs4NhjJcAYN6JWHYvsKcWQL0XRsQAaHsfuH3iI";

    //Set who the message is to be sent from
    //For gmail, this generally needs to be the same as the user you logged 
    // in as
    $mail->setFrom("caom92@gmail.com", $from);

    //Set who the message is to be sent to
    $mail->addAddress($userProfile["email"], $userProfile["full_name"]);

    //Set the subject line
    $mail->Subject = $subject;

    //Use HTML message
    $mail->isHTML(true);

    //Replace the plain text body with one created manually
    $mail->Body = $body;

    // send the file
    if ($mail->Send()) {
        // notify the client if the file was mailed successfully
        return [
            "meta" => [
                "return_code" => 0,
                "message" => "Password recovery mail sent successfully"
            ],
            "data" => []
        ];
    } else {
        // if the file was not mailed, notify the client
        return [
            "meta" => [
                "return_code" => 1,
                "message" => "Password recovery mail: " . $mail->ErrorInfo
            ],
            "data" => []
        ];
    }
}   // function sendPasswordRecoveryLinkByEmail


// For this script, the client sends only the username and we need to first
// verify if it exists in the data base

// the json object to be sent to the client in response
$outputJSON;

try {
    // attempt to connect to the database
    $dataBaseConnection = dao\connectToDataBase();
    $usersProfileTable = new dao\UsersProfileInfo($dataBaseConnection);
    $recoveringPasswordsTable = 
        new dao\RecoveringPasswords($dataBaseConnection);
    
    // since we do not know if the user is attempting to login with her user 
    // name, email or employee ID, lets search in the table for all these
    // combinations and store it in a temporal variable
    $byLogin = $usersProfileTable->searchItemsByLogInName($_POST["username"]);
    
    $byID = $usersProfileTable->searchItemsByEmployeeID($_POST["username"]);
    
    $byEmail = $usersProfileTable->searchItemsByEmail($_POST["username"]);

    // if any of these validations where correct, then the user name is valid 
    // so we create the resulting json to be sent to the client and start a 
    // to write the password recovery link

    if (count($byLogin) > 0) {
        // create the recovery token
        $recoveryToken = createAndStorePasswordRecoveryToken(
            $byLogin[0], $recoveringPasswordsTable);

        // create the resulting JSON and send the email
        $outputJSON = sendPasswordRecoveryLinkByEmail($byLogin[0], 
            $recoveryToken);

    } else if (count($byID) > 0) {
        // create the recovery token
        $recoveryToken = createAndStorePasswordRecoveryToken(
            $byID[0], $recoveringPasswordsTable);

        // create the resulting JSON and send the email
        $outputJSON = sendPasswordRecoveryLinkByEmail($byID[0], $recoveryToken);
    } else if (count($byEmail) > 0) {
        // create the recovery token
        $recoveryToken = createAndStorePasswordRecoveryToken(
            $byEmail[0], $recoveringPasswordsTable);
        
        // create the resulting JSON and send the email
        $outputJSON = sendPasswordRecoveryLinkByEmail($byEmail[0]);
    } else {
        // otherwise, the authentication failed and we must notify the client
        $outputJSON = [
            "meta" => [
                "return_code" => 1,
                "message" => "User not registered in the data base."
            ],
            "data" => []
        ];
    }

} catch (Exception $e) {
    core\displayErrorPageAndExit($e->getCode(), $e->getMessage());
}


// Send the data to the client as a JSON with the following format
// {
//     meta:[meta]
//     data:[data]
// }
// where meta is:
// {
//     return_code:[int]
//     message:[string]
// }
header("Content-Type: application/json");
echo json_encode($outputJSON);

?>