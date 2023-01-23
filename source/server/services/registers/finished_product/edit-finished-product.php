<?php

require_once realpath(dirname(__FILE__).'/../../service_creators.php');

$service = fsm\createEditRegisterService(
  'finished-product',
  [
    'code' => [
      'type' => 'string',
      'max_length' => 255
    ],
    'time' => [
      'type' => 'datetime',
      'format' => 'G:i'
    ],
    /*'description' => [
      'type' => 'string',
      'max_length' => 65535
    ],*/
    'folio' => [
      'type' => 'string',
      'max_length' => 255,
      'optional' => true
    ],
    'temperature' => [
      'type' => 'int',
      'optional' => true
    ],
    'color' => [
      'type' => 'int',
      'optional' => true
    ],
    'label' => [
      'type' => 'bool',
      'optional' => true
    ],
    'weight' => [
      'type' => 'bool',
      'optional' => true
    ],
    'mark' => [
      'type' => 'bool',
      'optional' => true
    ],
    'traceability' => [
      'type' => 'bool',
      'optional' => true
    ],
    /*'small_count' => [
      'type' => 'int',
      'optional' => true
    ],*/
    /*'big_count' => [
      'type' => 'int',
      'optional' => true
    ],*/
    /*'deformation' => [
      'type' => 'int',
      'optional' => true
    ],*/
    'insect_damage' => [
      'type' => 'int',
      'optional' => true
    ],
    /*'scarring' => [
      'type' => 'int',
      'optional' => true
    ],*/
    'decoloration' => [
      'type' => 'int',
      'optional' => true
    ],
    'dehydration' => [
      'type' => 'int',
      'optional' => true
    ],
    'mechanical_damage' => [
      'type' => 'int',
      'optional' => true
    ],
    'soggy' => [
      'type' => 'int',
      'optional' => true
    ],
    'decay' => [
      'type' => 'int',
      'optional' => true
    ],
    'wrinkly' => [
      'type' => 'int',
      'optional' => true
    ],
    'busted' => [
      'type' => 'int',
      'optional' => true
    ],
    /*'mushiness' => [
      'type' => 'int',
      'optional' => true
    ],*/
    /*'bruises' => [
      'type' => 'int',
      'optional' => true
    ],*/
    'status_id' => [
      'type' => 'int',
      'optional' => true
    ],
    'sampling' => [
      'type' => 'int',
      'optional' => true
    ],
    'exposition_temperature' => [
      'type' => 'int',
      'optional' => true
    ],
    'notes' => [
      'type' => 'string',
      'max_length' => 65535,
      'optional' => true
    ]
  ],
  function($scope, $request, $capturedRegisterID) {
    $segment = $scope->session->getSegment('fsm');
    $finishedProductLogs = $scope->daoFactory->get('finishedProduct\Logs');
    $finishedProductCodes = $scope->daoFactory->get('finishedProduct\Codes');
    $finishedProductStatus = $scope->daoFactory->get('finishedProduct\Status');
    $zoneID = $segment->get('zone_id');

    $code = NULL;
    if ($finishedProductCodes->hasByCode($request['code'])) {
      $code = $finishedProductCodes->selectByCode($request['code']);
    } else {
      $codeID = $finishedProductCodes->insert([
        'code' => $request['code']
        //'description' => $request['description']
      ]);
      $code = $finishedProductCodes->selectByID($codeID);
    }

    if ((isset($request['status_id']) && array_key_exists('status_id', $request))) {
      $status = $finishedProductStatus->selectByID($request['status_id']);
    } else {
      $status = [
        'id' => NULL,
        'name' => NULL
      ];
    }

    $finishedProductLogs->updateByCapturedRegisterID([
      'code_id' => $code['id'],
      'time' => (isset($request['time']) && array_key_exists('time', $request)) ? $request['time'] : NULL,
      'folio' => (isset($request['folio']) && array_key_exists('folio', $request)) ? $request['folio'] : NULL,
      'temperature' => (isset($request['temperature']) && array_key_exists('temperature', $request)) ? $request['temperature'] : NULL,
      'color' => (isset($request['color']) && array_key_exists('color', $request)) ? $request['color'] : NULL,
      'label' => (isset($request['label']) && array_key_exists('label', $request)) ? $request['label'] : NULL,
      'weight' => (isset($request['weight']) && array_key_exists('weight', $request)) ? $request['weight'] : NULL,
      'traceability' => (isset($request['traceability']) && array_key_exists('traceability', $request)) ? $request['traceability'] : NULL,
      'mark' => (isset($request['mark']) && array_key_exists('mark', $request)) ? $request['mark'] : NULL,
      //'small_count' => (isset($request['small_count']) && array_key_exists('small_count', $request)) ? $request['small_count'] : NULL,
      //'big_count' => (isset($request['big_count']) && array_key_exists('big_count', $request)) ? $request['big_count'] : NULL,
      //'deformation' => (isset($request['deformation']) && array_key_exists('deformation', $request)) ? $request['deformation'] : NULL,
      'insect_damage' => (isset($request['insect_damage']) && array_key_exists('insect_damage', $request)) ? $request['insect_damage'] : NULL,
      //'scarring' => (isset($request['scarring']) && array_key_exists('scarring', $request)) ? $request['scarring'] : NULL,
      'decoloration' => (isset($request['decoloration']) && array_key_exists('decoloration', $request)) ? $request['decoloration'] : NULL,
      'dehydration' => (isset($request['dehydration']) && array_key_exists('dehydration', $request)) ? $request['dehydration'] : NULL,
      'mechanical_damage' => (isset($request['mechanical_damage']) && array_key_exists('mechanical_damage', $request)) ? $request['mechanical_damage'] : NULL,
      'soggy' => (isset($request['soggy']) && array_key_exists('soggy', $request)) ? $request['soggy'] : NULL,
      'decay' => (isset($request['decay']) && array_key_exists('decay', $request)) ? $request['decay'] : NULL,
      'wrinkly' => (isset($request['wrinkly']) && array_key_exists('wrinkly', $request)) ? $request['wrinkly'] : NULL,
      'busted' => (isset($request['busted']) && array_key_exists('busted', $request)) ? $request['busted'] : NULL,
      //'mushiness' => (isset($request['mushiness']) && array_key_exists('mushiness', $request)) ? $request['mushiness'] : NULL,
      //'bruises' => (isset($request['bruises']) && array_key_exists('bruises', $request)) ? $request['bruises'] : NULL,
      'status_id' => (isset($request['status_id']) && array_key_exists('status_id', $request)) ? $request['status_id'] : NULL,
      'sampling' => (isset($request['sampling']) && array_key_exists('sampling', $request)) ? $request['sampling'] : NULL,
      'exposition_temperature' => (isset($request['exposition_temperature']) && array_key_exists('exposition_temperature', $request)) ? $request['exposition_temperature'] : NULL,
      'notes' => (isset($request['notes']) && array_key_exists('notes', $request)) ? $request['notes'] : NULL
    ], $capturedRegisterID);

    $editedRegister = $finishedProductLogs->selectByCapturedRegisterID($capturedRegisterID);

    $editedRegister['time'] = substr($editedRegister['time'], 0, 5);

    return $editedRegister;
  },
  TRUE,
  TRUE
);
  
?>