<?php

namespace fsm\services;

require_once realpath(dirname(__FILE__).'/Service.php');
require_once realpath(dirname(__FILE__).'/Session.php');
require_once realpath(dirname(__FILE__).'/Email.php');
require_once realpath(dirname(__FILE__).'/DataValidator.php');


// Service for mailing a bug report
class MailBugReportService implements Service
{
    // Returns an associative array of associative arrays which describe the 
    // user permission and input arguments values and formats that this service 
    // is expecting to recieve 
    function getRequirementsDescriptor()
    {
        return [
            'logged_in' => 'any',
            'zone-selection' => [
                'type' => 'string'
            ],
            'procedure-selection' => [
                'type' => 'string'
            ],
            'severity-selection' => [
                'type' => 'string'
            ],
            'summary' => [
                'type' => 'string',
                'min_length' => 3,
                'max_length' => 512
            ],
            'lang' => [
                'type' => 'lang'
            ],
            'email' => [
                'type' => 'email'
            ]
        ];
    }


    // Starts execution of the service
    function execute()
    {
        // get the user session data
        $session = new Session();
        
        // Create the email body by pasting all the posted data into it
        $body = "Usuario: " . $session->get("login-name") . "<br>"
            . "ID de empleado: " . $session->get("id") . "<br>"
            . "Zona: " . $_POST["zone-selection"] . "<br>"
            . "Programa: " . $_POST["procedure-selection"] . "<br>"
            . "Modulo: " . $_POST['module-selection'] . "<br>"
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

        $subject = 'Jacobs Farm - Del Cabo: Bug report';

        // create the email with the information that we created so far 
        $bugReport = new Email([
                'email' => 'caom92@live.com',
                'name' => 'Carlos Oliva'
            ],
            $subject, $body, 'es'
        );

        // array where the invalid bitmaps are going to be stored
        $invalidImages = [];

        // attach the image files
        if (isset($_FILES)) {
            $length = count($_FILES["screenshot-attachment"]["tmp_name"]);

            // for each file to be attached ...
            for ($i = 0; $i < $length; $i++) {
                // check if the file type corresponds to a valid supported 
                // bitmap file type
                $isValid = DataValidator::isBitmapFile(
                    $_FILES["screenshot-attachment"]["tmp_name"][$i]
                );

                // if the file type is valid ...
                if ($isValid) {
                    // attach it to the email
                    $bugReport->addAttachment(
                        $_FILES["screenshot-attachment"]["tmp_name"][$i], 
                        $_FILES["screenshot-attachment"]["name"][$i]
                    );
                } else {
                    // if it is invalid, store it in the invalid bitmaps array
                    array_push(
                        $invalidImages, 
                        $_FILES["screenshot-attachment"]["name"][$i]
                    );
                }
            }
        }

        // send the email
        $result = $bugReport->send();

        // if the email could not be sent, throw en exception
        if (strlen($result) > 0) {
            throw new \Exception($result);
        }

        // now, let's send a confirmation email
        if ($_POST["lang"] == "en") {
            $subject = 
                "Jacobs Farm : Bug report submission confirmation";
            $body = "This is an automated response to the bug report that"
                . " you submitted earlier. We'll start working on solving the" 
                . " problem as soon as possible. You don't need to reply to"
                . " this message. If you did not submitted any bug report to "
                . "us, please just disregard this message. ";
        } elseif ($_POST["lang"] == "es") {
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
        $confirmation = new Email([
                'email' => $session->get('email'),
                'name' => $session->get('login-name')
            ],
            $subject, $body, $_POST['lang']
        );

        // send the email
        $result = $confirmation->send();

        // if the email could not be sent, throw en exception
        if (strlen($result) > 0) {
            throw new \Exception($result);
        }
        
        // return the invalid bitmap images 
        return $invalidImages;
    }
}

?>