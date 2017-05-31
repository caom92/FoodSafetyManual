<?php

$service = [
  'requirements_desc' => [
    'logged_in' => 'any',
    'zone-selection' => [
      'type' => 'string'
    ],
    'procedure-selection' => [
      'type' => 'string'
    ],
    'browser-selection' => [
      'type' => 'array',
      'optional' => true,
      'values' => [
        'type' => 'string'
      ]
    ],
    'severity-selection' => [
      'type' => 'string'
    ],
    'module-selection' => [
      'type' => 'string',
      'optional' => true
    ],
    'summary' => [
      'type' => 'string',
      'min_length' => 1,
      'max_length' => 65535
    ],
    'steps' => [
      'type' => 'string',
      'min_length' => 1,
      'max_length' => 65535,
      'optional' => true
    ],
    'expectation' => [
      'type' => 'string',
      'min_length' => 1,
      'max_length' => 65535,
      'optional' => true
    ],
    'reality' => [
      'type' => 'string',
      'min_length' => 1,
      'max_length' => 65535,
      'optional' => true
    ],
    'files' => [
      'name' => 'screenshot-attachment',
      'optional' => true,
      'format' => 'bitmap'
    ],
    'lang' => [
      'type' => 'lang'
    ]
  ],
  'callback' => function($scope, $request) {
    include_once realpath(dirname(__FILE__).'/../../Email.php');

    // get session segment
    $segment = $scope->session->getSegment('fsm');

    // Create the email body by pasting all the posted data into it
    $body = "Usuario: " . $segment->get("login-name") . "<br>"
      . "ID de empleado: " . $segment->get("user_id") . "<br>"
      . "Zona: " . $request["zone-selection"] . "<br>"
      . "Programa: " . $request["procedure-selection"] . "<br>"
      . "Modulo: " . $request['module-selection'] . "<br>"
      . "Navegadores: ";

    // paste browsers
    foreach ($request["browser-selection"] as $browser) {
      $body .= $browser . " ";
    }

    // continue with the rest of the body
    $body .= "\n" . "Severidad: " . $request["severity-selection"] . "<br>"
      . "Resumen: " . $request["summary"] . "<br>"
      . "Pasos para reproducirlo: " . $request["steps"] . "<br>"
      . "Salida esperada: " . $request["expectation"] . "<br>"
      . "Salida obtenida: " . $request["reality"] . "<br>";

    $subject = 'Jacobs Farm - Del Cabo: Bug report';

    // create the email with the information that we created so far 
    $bugReport = new fsm\mail\Email([
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
        // attach it to the email
        $bugReport->addAttachment(
          $_FILES["screenshot-attachment"]["tmp_name"][$i], 
          $_FILES["screenshot-attachment"]["name"][$i]
        );
      }
    }

    // send the email
    $result = $bugReport->send();

    // if the email could not be sent, throw en exception
    if (strlen($result) > 0) {
      throw new \Exception($result);
    }

    // if the email could not be sent, throw en exception
    if (strlen($result) > 0) {
      throw new \Exception($result);
    }
    
    // return the invalid bitmap images 
    return $invalidImages;
  }
];

?>