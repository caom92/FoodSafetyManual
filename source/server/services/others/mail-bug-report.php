<?php

// Import PHPMailer using the composer autoloader
require_once realpath(
    dirname(__FILE__)."/../../../../external/PHPMailer/vendor/autoload.php"
);

// For this script, the client does not send a json object, rather, it sends
// the binary data using the default channels of POST and FILES for proper
// form submition and translation into an email

// Create the email body by pasting all the posted data into it
$body = "Usuario: " . $_POST["user-name"] . "\n"
    . "ID de empleado: " . $_POST["user-id"] . "\n"
    . "Zona: " . $_POST["zone-selection"] . "\n"
    . "Procedimiento: " . $_POST["procedure-selection"] . "\n"
    . "Navegadores: ";
    
// paste browsers
foreach ($_POST["browser-selection"] as $browser) {
    $body .= $browser . " ";
}

// continue with the rest of the body
$body .= "\n" . "Severidad: " . $_POST["severity-selection"] . "\n"
    . "Resumen: " . $_POST["summary"] . "\n"
    . "Pasos para reproducirlo: " . $_POST["steps"] . "\n"
    . "Salida esperada: " . $_POST["expectation"] . "\n"
    . "Salida obtenida: " . $_POST["reality"] . "\n";

//Create a new PHPMailer instance
$mail = new PHPMailerOAuth;

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
//For gmail, this generally needs to be the same as the user you logged in as
$mail->setFrom("caom92@gmail.com", "Espresso mailing system");

//Set who the message is to be sent to
$mail->addAddress("caom92@live.com", "Carlos Oliva");

//Set the subject line
$mail->Subject = "Jacobs Farm - Del Cabo: Bug Report";

//Use plain text message
$mail->isHTML(false);

//Replace the plain text body with one created manually
$mail->Body = $body;

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
        "error_code" => 0,
        "error_message" => "",
        "data" => []
    ];
} else {
    // if the file was not mailed, notify the client
    $outputJSON = [
        "error_code" => 1,
        "error_message" => $mail->ErrorInfo,
        "data" => []
    ];
}

// Send the data to the client as a JSON with the following format
// {
//     error_code:[int],
//     error_message:[string],
//     data:[]
// }
echo json_encode($outputJSON);

?>