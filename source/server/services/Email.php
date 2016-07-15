<?php

// The namespace of the services of the project
namespace fsm\services;

// Import the configuration file
require_once realpath(dirname(__FILE__).'/../config/mail_config.php');

// Import PHPMailer using the composer autoloader
require_once realpath(
    dirname(__FILE__)."/../../../external/autoload.php"
);

// Alias namespaces for ease of use
use fsm\mail as mail;


// Interface for sending emails using an SMTP server with OAuth2 autentication
// and PHPMailer as backend for the service
class Email
{
    // The email to be sent
    private $mail;


    // Constructor
    // [in]     receiver: associative array which includes the email address
    //          of the receiver and her name
    // [in]     subject: the subject of the email contents
    // [in]     body: the body of the email
    // [in]     lang: the language to use for displaying the sender name
    function __construct($receiver, $subject, $body, $lang)
    {
        // Create a new PHPMailer instance
        $this->mail = new \PHPMailerOAuth;

        // Indicate we are using UTF-8 character encoding
        $this->mail->CharSet = mail\CHARSET;

        // Tell PHPMailer to use SMTP
        $this->mail->isSMTP();

        // Set the hostname of the mail server
        $this->mail->Host = mail\HOST;

        // Set the SMTP port number 
        $this->mail->Port = mail\PORT;

        // Set the encryption system to use 
        $this->mail->SMTPSecure = "tls";

        // Whether to use SMTP authentication
        $this->mail->SMTPAuth = true;

        // Set AuthType
        $this->mail->AuthType = "XOAUTH2";

        // User Email to use for SMTP authentication
        // Use the same Email used in Google Developer Console
        $this->mail->oauthUserEmail = mail\OAUTH_USER_EMAIL;

        // Obtained From Google Developer Console
        $this->mail->oauthClientId = mail\OAUTH_CLIENT_ID;

        // Obtained From Google Developer Console
        $this->mail->oauthClientSecret = mail\OAUTH_CLIENT_SECRET;

        // Obtained By running get_oauth_token.php after setting up APP in 
        // Google Developer Console.
        $this->mail->oauthRefreshToken = mail\OAUTH_REFRESH_TOKEN;

        // Set who the message is to be sent from
        // For gmail, this generally needs to be the same as the user you 
        // logged in as
        $this->mail->setFrom(mail\OAUTH_USER_EMAIL, mail\USER_NAME[$lang]);

        // Set who the message is to be sent to
        $this->mail->addAddress($receiver['email'], $receiver['name']);

        // Set the subject line
        $this->mail->Subject = $subject;

        // Use HTML message
        $this->mail->isHTML(true);

        // Replace the plain text body with one created manually
        $this->mail->Body = $body;      
    }


    // Adds a file as an attachment to the email
    // [in]     file: the file to be attached to the email
    // [in]     name: the name of the attachment 
    function addAttachment($file, $name)
    {
        $this->mail->AddAttachment($file, $name);
    }


    // Attempts to send the email with the information provided and returns
    // an empty string if it was sent successfully or an error message
    // otherwise
    function send()
    {
        // sends the email
        if ($this->mail->Send()) {
            // if it was sent successfully, return an empty string 
            return '';
        } else {
            // if the email failed to be sent, return the error message
            return $this->mail->ErrorInfo;
        }
    }
}

?>