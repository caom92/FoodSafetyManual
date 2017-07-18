<?php

$service = [
  'requirements_desc' => [
    'logged_in' => 'any',
    'problem-zone-selection' => [
      'type' => 'string',
      'length' => 3
    ],
    'procedure-selection' => [
      'type' => 'string',
      'min_length' => 3,
    ],
    'module-selection' => [
      'type' => 'string',
      'min_length' => 1,
      'max_length' => 255
    ],
    'log-selection' => [
      'type' => 'string',
      'min_length' => 1,
      'max_length' => 255
    ],
    'browser-selection' => [
      'type' => 'array',
      'values' => [
        'type' => 'string',
        'min_length' => 1,
        'max_length' => 255
      ]
    ],
    'severity-selection' => [
      'type' => 'string',
      'min_length' => 1,
      'max_length' => 65535
    ],
    'summary' => [
      'type' => 'string',
      'min_length' => 1,
      'max_length' => 65535
    ],
    'steps' => [
      'type' => 'string',
      'max_length' => 65535,
      'optional' => true
    ],
    'expectation' => [
      'type' => 'string',
      'max_length' => 65535,
      'optional' => true
    ],
    'reality' => [
      'type' => 'string',
      'max_length' => 65535,
      'optional' => true
    ],
    'files' => [
      'name' => 'screenshot-attachment',
      'optional' => true,
      'format' => 'bitmap'
    ],
    // 'lang' => [
    //   'type' => 'string',
    //   'length' => 2
    // ]
  ],
  'callback' => function($scope, $request) {
    include_once realpath(dirname(__FILE__).'/../../Email.php');

    $hasSteps = isset($request["steps"]) && array_key_exists('steps', $request);
    $hasExpectations = isset($request["expectation"]) 
      && array_key_exists('expectation', $request);
    $hasReality = isset($request["reality"]) 
      && array_key_exists('reality', $request);

    $steps = ($hasSteps) ? $request['steps'] : 'N/A';
    $expectations = ($hasExpectations) ? $request['expectation'] : 'N/A';
    $reality = ($hasExpectations) ? $request['expectation'] : 'N/A';

    // get session segment
    $segment = $scope->session->getSegment('fsm');

    // Create the email body by pasting all the posted data into it
    $body = "Usuario: " . $segment->get("login-name") . "<br>"
      . "ID de empleado: " . $segment->get("user_id") . "<br>"
      . "Zona: " . $request["problem-zone-selection"] . "<br>"
      . "Programa: " . $request["procedure-selection"] . "<br>"
      . "Modulo: " . $request['module-selection'] . '<br>'
      . "<br>"
      . "Navegadores: ";

    // paste browsers
    foreach ($request["browser-selection"] as $browser) {
      $body .= $browser . " ";
    }

    // continue with the rest of the body
    $body .= "\n" . "Severidad: " . $request["severity-selection"] . "<br>"
      . "Resumen: " . $request["summary"] . "<br>"
      . "Pasos para reproducirlo: " . 
      $steps
      . "<br>"
      . "Salida esperada: " . 
      $expectations
      . "<br>"
      . "Salida obtenida: " . 
      $reality
      . "<br>";

    $subject = 'Food Safety Manual: Bug report';

    // create the email with the information that we created so far 
    $bugReport = new fsm\mail\Email([
        'email' => fsm\mail\RECIEVER_EMAIL,
        'name' => fsm\mail\RECIEVER_NAME
      ],
      $subject, $body, 'es'
    );

    // array where the invalid bitmaps are going to be stored
    $invalidImages = [];

    // attach the image files
    if (isset($_FILES["screenshot-attachment"]) 
      && array_key_exists("screenshot-attachment", $_FILES)) {
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