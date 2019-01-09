<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createAuthorizationReportService(
  'GMP',
  'Packing',
  'Ozone Water Test Log',
  [
    'items_name' => 'items',
    'extra_info' => NULL,
    'function' => function($scope, $segment, $logDate) {
      $fieldsTable = 
        $scope->daoFactory->get('gmp\packing\ozone\MachinesFields');
      $entries = $scope->daoFactory->get('gmp\packing\ozone\Logs')
        ->selectByCaptureDateID($logDate['id']);
      
      foreach ($entries as &$entry) {
        $fields = $fieldsTable->selectAllByMachineID($entry['id']);
        $entry['fields'] = [];
        $entry['time'] = (is_null($entry['time'])) ? '' : DateTime::createFromFormat('H:i:s', $entry['time'])->format('H:i');
        foreach ($fields as $field) {
          switch ($field['field_id']) {
            case 1: 
              if (!is_null($entry['reading'])) {
                $field['value'] = $entry['reading'];
                array_push($entry['fields'], $field);
              }
            break;
            case 2: 
              if (!is_null($entry['ph'])) {
                $field['value'] = $entry['ph'];
                array_push($entry['fields'], $field);
              }
            break;
            case 3: 
              if (!is_null($entry['orp'])) {
                $field['value'] = $entry['orp'];
                array_push($entry['fields'], $field);
              }
            break;
            case 4: 
              if (!is_null($entry['temperature'])) {
                $field['value'] = $entry['temperature'];
                array_push($entry['fields'], $field);
              }
            break;
            case 5: 
              if (!is_null($entry['corrective_action'])) {
                $field['value'] = $entry['corrective_action'];
                array_push($entry['fields'], $field);
              }
            break;
            case 6: 
              if (!is_null($entry['product'])) {
                $field['value'] = $entry['product'];
                array_push($entry['fields'], $field);
              }
            break;
            case 7: 
              if (!is_null($entry['lot'])) {
                $field['value'] = $entry['lot'];
                array_push($entry['fields'], $field);
              }
            break;
            case 8: 
              if (!is_null($entry['parcel'])) {
                $field['value'] = $entry['parcel'];
                array_push($entry['fields'], $field);
              }
            break;
            case 9: 
              if (!is_null($entry['reference'])) {
                $field['value'] = $entry['reference'];
                array_push($entry['fields'], $field);
              }
            break;
            case 10: 
              if (!is_null($entry['total_chlorine'])) {
                $field['value'] = $entry['total_chlorine'];
                array_push($entry['fields'], $field);
              }
            break;
            case 11: 
              if (!is_null($entry['free_chlorine'])) {
                $field['value'] = $entry['free_chlorine'];
                array_push($entry['fields'], $field);
              }
            break;
            case 12: 
              if (!is_null($entry['rinse'])) {
                $field['value'] = $entry['rinse'];
                array_push($entry['fields'], $field);
              }
            break;
            case 13: 
              if (!is_null($entry['status'])) {
                $field['value'] = $entry['status'];
                array_push($entry['fields'], $field);
              }
            break;
          }
        }
        unset($entry['reading']);
        unset($entry['ph']);
        unset($entry['orp']);
        unset($entry['temperature']);
        unset($entry['corrective_action']);
        unset($entry['product']);
        unset($entry['lot']);
        unset($entry['parcel']);
        unset($entry['reference']);
        unset($entry['total_chlorine']);
        unset($entry['free_chlorine']);
        unset($entry['rinse']);
        unset($entry['status']);
      }

      unset($entry);

      $machines = [];

      $machine = [
        'id' => 0
      ];

      foreach ($entries as $entry) {
        $hasMachineChanged = $entry['id'] != $machine['id'];
        if ($hasMachineChanged) {
          if ($machine['id'] != 0) {
            array_push($machines, $machine);
          }

          $tempArr = array();

          foreach ($entry['fields'] as $field) {
            $temp = array();
            $temp['id'] = $field['id'];
            $temp['name_en'] = $field['name_en'];
            $temp['name_es'] = $field['name_es'];
            $temp['field_id'] = $field['field_id'];
            array_push($tempArr, $temp);
          }

          $machine = [
            'id' => $entry['id'],
            'name' => $entry['name'],
            'fields' => $tempArr,
            'entries' => [
              [
                'test_num' => $entry['test_num'],
                'time' => $entry['time'],
                'fields' => $entry['fields']
              ] 
            ]
          ];
        } else {
          array_push($machine['entries'], [
            'test_num' => $entry['test_num'],
            'time' => $entry['time'],
            'fields' => $entry['fields']
          ]);
        }
      }

      if ($machine['id'] != 0) {
        array_push($machines, $machine);
      }

      return $machines;
    }
  ]
);

?>