<?php

// Import PHPMailer using the composer autoloader
require_once realpath(
    dirname(__FILE__)."/../../../../external/PHPMailer/vendor/autoload.php"
);

// Import the email configuration file
require_once realpath(dirname(__FILE__))."/../../config.php";

// Alias the namespaces for ease of writing
use espresso\mail as mail;

// For this script, the client does not send a json object, rather, it sends
// the binary data using the default channels of POST and FILES for proper
// form submition and translation into an email

// Create the email body by pasting all the posted data into it
$body = "Usuario: " . $_POST["user-name"] . "<br>"
    . "ID de empleado: " . $_POST["user-id"] . "<br>"
    . "Zona: " . $_POST["zone-selection"] . "<br>"
    . "Procedimiento: " . $_POST["procedure-selection"] . "<br>"
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
    
// create the body of the confirmation mail
$confirmationBody = "";
$confirmationMailSubject = "";
$confirmationMainFrom = "";

if ($_POST["lang"] == "en") {
    $confirmationMailSubject = 
        "Jacobs Farm : Bug report submission confirmation";
    $confirmationMailFrom = "Espresso mailing system";
    $confirmationBody = "This is an automated response to the bug report that"
        . " you submitted earlier. We'll start working on solving the problem "
        . "as soon as possible. You don't need to reply to this message. If "
        . "you did not submitted any bug report to us, please just disregard "
        . "this message. ";
} else if ($_POST["lang"] == "es"){
    $confirmationMailSubject = 
        "Del Cabo : Confirmaci&oacute;n de env&iacute;o de reporte de problema";
    $confirmationMailFrom = "Sistema de mensajer&iacute;a de Espresso.";
    $confirmationBody = "Esta es una respuesta automatizada al reporte de "
        . "problema que nos envi&oacute; hace unos momentos. Comenzaremos a " 
        . "trabajar en resolver el problema tan pronto como nos sea posible. "
        . "No es necesario que conteste este mensaje. Si usted no nos "
        . "envi&oacute; ning&uacute;n reporte, por favor ignore este mensaje.";
}

// Create a new PHPMailer instance
$mail = new PHPMailerOAuth;
$confirmationMail = new PHPMailerOAuth;

// Indicate we are using UTF-8 character encoding
$mail->CharSet = mail\CHARSET;
$confirmationMail->CharSet = mail\CHARSET;

// Tell PHPMailer to use SMTP
$mail->isSMTP();
$confirmationMail->isSMTP();

// Set the hostname of the mail server
$mail->Host = mail\HOST;
$confirmationMail->Host = mail\HOST;

// Set the SMTP port number 
$mail->Port = mail\PORT;
$confirmationMail->Port = mail\PORT;

// Set the encryption system to use 
$mail->SMTPSecure = "tls";
$confirmationMail->SMTPSecure = "tls";

// Whether to use SMTP authentication
$mail->SMTPAuth = true;
$confirmationMail->SMTPAuth = true;

// Set AuthType
$mail->AuthType = "XOAUTH2";
$confirmationMail->AuthType = "XOAUTH2";

// User Email to use for SMTP authentication
// Use the same Email used in Google Developer Console
$mail->oauthUserEmail = mail\OAUTH_USER_EMAIL["en"];
$confirmationMail->oauthUserEmail = mail\OAUTH_USER_EMAIL;

// Obtained From Google Developer Console
$mail->oauthClientId = mail\OAUTH_CLIENT_ID;
$confirmationMail->oauthClientId = mail\OAUTH_CLIENT_ID;

// Obtained From Google Developer Console
$mail->oauthClientSecret = mail\OAUTH_CLIENT_SECRET;
$confirmationMail->oauthClientSecret = mail\OAUTH_CLIENT_SECRET;

// Obtained By running get_oauth_token.php after setting up APP in Google 
// Developer Console.
$mail->oauthRefreshToken = mail\OAUTH_REFRESH_TOKEN;
$confirmationMail->oauthRefreshToken = 
    mail\OAUTH_REFRESH_TOKEN;

// Set who the message is to be sent from
// For gmail, this generally needs to be the same as the user you logged in as
$mail->setFrom(mail\OAUTH_USER_EMAIL["en"], mail\USER_NAME);
$confirmationMail->setFrom(mail\OAUTH_USER_EMAIL["en"], $confirmationMailFrom);

// Set who the message is to be sent to
$mail->addAddress("caom92@live.com", "Carlos Oliva");
$confirmationMail->addAddress($_POST["email"], "Carlos Oliva");

// Set the subject line
$mail->Subject = "Jacobs Farm - Del Cabo: Bug Report";
$confirmationMail->Subject = $confirmationMailSubject;

// Use HTML message
$mail->isHTML(true);
$confirmationMail->isHTML(true);

// Replace the plain text body with one created manually
$mail->Body = $body;
$confirmationMail->Body = $confirmationBody;

// attach the image files
$length = count($_FILES["screenshot-attachment"]["tmp_name"]);

for ($i = 0; $i < $length; $i++) {
    $mail->AddAttachment($_FILES["screenshot-attachment"]["tmp_name"][$i], 
    $_FILES["screenshot-attachment"]["name"][$i]);
}

// the json object to be sent to the client in response
$outputJSON;

// send the file
if ($mail->Send()) {
    // notify the client if the file was mailed successfully
    $outputJSON = [
        "meta" => [
            "return_code" => 0,
            "message" => "Bug report mail sent successfully. "
        ],
        "data" => []
    ];
} else {
    // if the file was not mailed, notify the client
    $outputJSON = [
        "meta" => [
            "return_code" => 1,
            "message" => "Bug report mail: " . $mail->ErrorInfo . ". "
        ],
        "data" => []
    ];
}

// send the confirmation email, it is not really important if this 
// message does not make it to the recipient
if ($confirmationMail->Send()) {
    $outputJSON["meta"]["message"] .= "Confirmation mail sent successfully.";
} else {
    $outputJSON["meta"]["message"] .= "Confirmation mail: " 
        . $confirmationMail->ErrorInfo;
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