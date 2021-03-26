<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');

$service = fsm\createCaptureService(
  'GAP',
  'Fields',
  'Harvest Machine Cleaning',
  [
    'machines' => [
      'type' => 'array',
      'values' => [
        'date' => [
          'type' => 'datetime',
          'format' => 'Y-m-d',
          'optional' => true
        ],
        'entry_num' => [
          'type' => 'int',
          'min' => 1
        ],
        'harvest_machine_quantity' => [
          'type' => 'int',
          'optional' => true
        ],
        'disinfection' => [
          'type' => 'int',
          'optional' => true
        ],
        'soap_bag_wash' => [
          'type' => 'bool',
          'optional' => true
        ],
        'rinse' => [
          'type' => 'bool',
          'optional' => true
        ],
        'conditions' => [
          'type' => 'bool',
          'optional' => true
        ],
        'noted_defects' => [
          'type' => 'string',
          'max_length' => 65535,
          'optional' => true
        ],
        'initials' => [
          'type' => 'string',
          'max_length' => 255,
          'optional' => true
        ]
      ]
    ]
  ],
  [
    'extra_info' => [
      // NULL
    ],
    'function' => function($scope, $segment, $request, $logID) {
      foreach ($request['machines'] as $machine) {
        $scope->daoFactory->get('gap\packing\harvestMachineCleaning\Logs')->insert([
          'capture_date_id' => $logID,
          'entry_num' => $machine['entry_num'],
          'date' => (isset($machine['date']) && array_key_exists('date', $machine)) ? $machine['date'] : NULL,
          'harvest_machine_quantity' => (isset($machine['harvest_machine_quantity']) && array_key_exists('harvest_machine_quantity', $machine)) ? $machine['harvest_machine_quantity'] : NULL,
          'disinfection' => (isset($machine['disinfection']) && array_key_exists('disinfection', $machine)) ? $machine['disinfection'] : NULL,
          'soap_bag_wash' => (isset($machine['soap_bag_wash']) && array_key_exists('soap_bag_wash', $machine)) ? $machine['soap_bag_wash'] : NULL,
          'rinse' => (isset($machine['rinse']) && array_key_exists('rinse', $machine)) ? $machine['rinse'] : NULL,
          'conditions' => (isset($machine['conditions']) && array_key_exists('conditions', $machine)) ? $machine['conditions'] : NULL,
          'noted_defects' => (isset($machine['noted_defects']) && array_key_exists('noted_defects', $machine)) ? $machine['noted_defects'] : NULL,
          'initials' => (isset($machine['initials']) && array_key_exists('initials', $machine)) ? $machine['initials'] : NULL
        ]);
      }
    }
  ],
  FALSE,
  TRUE
);

?>