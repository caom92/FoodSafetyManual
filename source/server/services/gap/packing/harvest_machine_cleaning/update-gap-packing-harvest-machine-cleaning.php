<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');

$service = fsm\createUpdateService(
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
    'function' => function($scope, $request) {
      $logs = $scope->daoFactory->get('gap\packing\harvestMachineCleaning\Logs');

      $lastEntryNumber = 1;

      foreach ($request['machines'] as $machine) {
        $hasEntry = $logs->hasByCaptureDateIDAndEntry($request['report_id'], $machine['entry_num']);

        if ($hasEntry) {
          // entry exists, update
          $logs->updateByCapturedLogIDAndEntry(
            [
              'date' => (isset($machine['date']) && array_key_exists('date', $machine)) ? $machine['date'] : NULL,
              'harvest_machine_quantity' => (isset($machine['harvest_machine_quantity']) && array_key_exists('harvest_machine_quantity', $machine)) ? $machine['harvest_machine_quantity'] : NULL,
              'disinfection' => (isset($machine['disinfection']) && array_key_exists('disinfection', $machine)) ? $machine['disinfection'] : NULL,
              'soap_bag_wash' => (isset($machine['soap_bag_wash']) && array_key_exists('soap_bag_wash', $machine)) ? $machine['soap_bag_wash'] : NULL,
              'rinse' => (isset($machine['rinse']) && array_key_exists('rinse', $machine)) ? $machine['rinse'] : NULL,
              'conditions' => (isset($machine['conditions']) && array_key_exists('conditions', $machine)) ? $machine['conditions'] : NULL,
              'noted_defects' => (isset($machine['noted_defects']) && array_key_exists('noted_defects', $machine)) ? $machine['noted_defects'] : NULL,
              'initials' => (isset($machine['initials']) && array_key_exists('initials', $machine)) ? $machine['initials'] : NULL
            ],
            $request['report_id'],
            $machine['entry_num']
          );
        } else {
          // entry doesn't exist, add
          $scope->daoFactory->get('gap\packing\harvestMachineCleaning\Logs')->insert([
            'capture_date_id' => $request['report_id'],
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

        $lastEntryNumber = $machine['entry_num'];
      }

      $logs->delete([
        'AND' => [
          'capture_date_id' => $request['report_id'],
          'entry_num[>]' => $lastEntryNumber
        ]
      ]);
    }
  ],
  FALSE,
  TRUE
);

?>