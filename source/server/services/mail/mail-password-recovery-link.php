<?php

// Import PHPMailer using the composer autoloader
require_once realpath(
    dirname(__FILE__)."/../../../../external/PHPMailer/vendor/autoload.php"
);

require_once realpath(dirname(__FILE__))."/../../config.php";

require_once realpath(dirname(__FILE__)."/../../dao/UserProfiles.php");

require_once realpath(dirname(__FILE__)."/../../dao/RecoveringPasswords.php");

// Alias the namespaces for ease of writing
use fsm as core;
use fsm\dao as dao;
use fsm\mail as mail;


// For this script, the client sends only the username and we need to first
// verify if it exists in the data base

// the json object to be sent to the client in response
$outputJSON;

// temporary variables where to store user data and the recovery token
$userProfile;
$recoveryToken;

try {
    // attempt to connect to the database
    $dataBaseConnection = dao\connectToDataBase();
    $userProfilesTable = new dao\UserProfiles($dataBaseConnection);
    $recoveringPasswordsTable = 
        new dao\RecoveringPasswords($dataBaseConnection);
    
    // since we do not know if the user is attempting to login with her user 
    // name, email or employee ID, lets search in the table for all these
    // combinations and store it in a temporal variable
    $userProfile = $userProfilesTable->searchItemsByIdentifier(
        $_POST["username"]); 

    // check if any result was found
    if (count($userProfile) > 0) {
        // get the current timestamp and add 1 day to get the 
        // expiration date for the token
        $expirationDate = strttotime("+1 day", time());

        // create the recovery token
        $recoveryToken = hash(
            "sha256",
            hash(
                'md5', 
                $userProfile[0]["first_name"]
                . $userProfile[0]["last_name"]
                . time()
            )
        );

        // delete any previous token, valid or invalid, that is associated with
        // this user ID
        $recoveringPasswordsTable->deleteItemsByUserID($userProfile[0]["id"]);
        
        // store it in the data base
        $recoveringPasswordsTable->saveItems([
            "user_id" => $userProfile[0]["id"],
            "expiration_date" => date("Y-m-d H:i:s", $expirationDate),
            "token" => $recoveryToken
        ]);

        // create the password recovery link
        $recoveryLink = "localhost/fsm/users/recover-password?token="
            . $recoveryToken;

        // prepare the email to be sent to the user
        $body = "";
        $subject = "";

        // now prepare the email to be sent to the user
        if ($_POST["lang"] == "en") {
            $subject = "Jacobs Farm: Password Recovery.";
            $body = "This is an automated response to your request to recover " 
                . "your password. Just click the following link within the " 
                . "next 24 hours and you will be taken to the password " 
                . "recovery page:<br>"
                . "<a href='" . $recoveryLink . "'>Recover my password!</a>";
        } else if ($_POST["lang"] == "es") {
            $subject = "Del Cabo: Recuperación de contraseña.";
            $body = "Esta es una respuesta automatizada a su petición"
                . " de recuperar su contraseña. Sólo haga clic "
                . "en el enlace que aparece a continuación dentro de "
                . "las siguientes 24 horas y lo llevará a la "
                . "página de recuperación de "
                . "contraseña: <br>"
                . "<a href='" . $recoveryLink . "'>"
                . "¡Recuperar mi contraseña!</a>";
        }

        //Create a new PHPMailer instance
        $mail = new PHPMailerOAuth;

        // Indicate we are using UTF-8 character encoding
        $mail->CharSet = mail\CHARSET;

        //Tell PHPMailer to use SMTP
        $mail->isSMTP();

        //Set the hostname of the mail server
        $mail->Host = mail\HOST;

        //Set the SMTP port number 
        $mail->Port = mail\PORT;

        //Set the encryption system to use 
        $mail->SMTPSecure = "tls";

        //Whether to use SMTP authentication
        $mail->SMTPAuth = true;

        //Set AuthType
        $mail->AuthType = "XOAUTH2";

        //User Email to use for SMTP authentication
        // Use the same Email used in Google Developer Console
        $mail->oauthUserEmail = mail\OAUTH_USER_EMAIL;

        //Obtained From Google Developer Console
        $mail->oauthClientId = mail\OAUTH_CLIENT_ID;

        //Obtained From Google Developer Console
        $mail->oauthClientSecret = mail\OAUTH_CLIENT_SECRET;

        //Obtained By running get_oauth_token.php after setting up APP in Google 
        // Developer Console.
        $mail->oauthRefreshToken = mail\OAUTH_REFRESH_TOKEN;

        //Set who the message is to be sent from
        //For gmail, this generally needs to be the same as the user you logged 
        // in as
        $mail->setFrom(mail\OAUTH_USER_EMAIL, mail\USER_NAME[$_POST["lang"]]);

        //Set who the message is to be sent to
        $mail->addAddress($userProfile[0]["email"], 
            $userProfile[0]["first_name"].$userProfile[0]["last_name"]);

        //Set the subject line
        $mail->Subject = $subject;

        //Use HTML message
        $mail->isHTML(true);

        //Replace the plain text body with one created manually
        $mail->Body = $body;

        // send the file
        if ($mail->Send()) {
            // notify the client if the file was mailed successfully
            $outputJSON = [
                "meta" => [
                    "return_code" => 0,
                    "message" => "Password recovery mail sent successfully"
                ],
                "data" => []
            ];
        } else {
            // if the file was not mailed, notify the client
            $outputJSON = [
                "meta" => [
                    "return_code" => 1,
                    "message" => "Password recovery mail: " . $mail->ErrorInfo
                ],
                "data" => []
            ];
        }
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