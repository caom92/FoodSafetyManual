<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createReportService(
  'GMP',
  'Packing',
  'Ozone Water Test Log',
  [
    'items_name' => 'items',
    'extra_info' => NULL,
    'function' => function($scope, $segment, $logDate) {
      $fieldsTable = 
        $scope->daoFactory->get('gmp\packing\ozone\MachinesFields');
      $machines = $scope->daoFactory->get('gmp\packing\ozone\Logs')
        ->selectByCaptureDateID($logDate['id']);
      
      foreach ($machines as &$machine) {
        $fields = $fieldsTable->selectAllByMachineID($machine['id']);
        $machine['fields'] = [];
        foreach ($fields as $field) {
          switch ($field['field_id']) {
            case 1: 
              if (!is_null($machine['reading'])) {
                $field['value'] = $machine['reading'];
                array_push($machine['fields'], $field);
              }
            break;
            case 2: 
              if (!is_null($machine['ph'])) {
                $field['value'] = $machine['ph'];
                array_push($machine['fields'], $field);
              }
            break;
            case 3: 
              if (!is_null($machine['orp'])) {
                $field['value'] = $machine['orp'];
                array_push($machine['fields'], $field);
              }
            break;
            case 4: 
              if (!is_null($machine['temperature'])) {
                $field['value'] = $machine['temperature'];
                array_push($machine['fields'], $field);
              }
            break;
            case 5: 
              if (!is_null($machine['corrective_action'])) {
                $field['value'] = $machine['corrective_action'];
                array_push($machine['fields'], $field);
              }
            break;
            case 6: 
              if (!is_null($machine['product'])) {
                $field['value'] = $machine['product'];
                array_push($machine['fields'], $field);
              }
            break;
            case 7: 
              if (!is_null($machine['lot'])) {
                $field['value'] = $machine['lot'];
                array_push($machine['fields'], $field);
              }
            break;
            case 8: 
              if (!is_null($machine['parcel'])) {
                $field['value'] = $machine['parcel'];
                array_push($machine['fields'], $field);
              }
            break;
            case 9: 
              if (!is_null($machine['reference'])) {
                $field['value'] = $machine['reference'];
                array_push($machine['fields'], $field);
              }
            break;
            case 10: 
              if (!is_null($machine['total_chlorine'])) {
                $field['value'] = $machine['total_chlorine'];
                array_push($machine['fields'], $field);
              }
            break;
            case 11: 
              if (!is_null($machine['free_chlorine'])) {
                $field['value'] = $machine['free_chlorine'];
                array_push($machine['fields'], $field);
              }
            break;
            case 12: 
              if (!is_null($machine['rinse'])) {
                $field['value'] = $machine['rinse'];
                array_push($machine['fields'], $field);
              }
            break;
            case 13: 
              if (!is_null($machine['status'])) {
                $field['value'] = $machine['status'];
                array_push($machine['fields'], $field);
              }
            break;
          }
        }
        unset($machine['reading']);
        unset($machine['ph']);
        unset($machine['orp']);
        unset($machine['temperature']);
        unset($machine['corrective_action']);
        unset($machine['product']);
        unset($machine['lot']);
        unset($machine['parcel']);
        unset($machine['reference']);
        unset($machine['total_chlorine']);
        unset($machine['free_chlorine']);
        unset($machine['rinse']);
        unset($machine['status']);
      }

      unset($machine);

      return $machines;
      //return $scope->daoFactory->get('gmp\packing\ozone\Logs')
      //  ->selectByCaptureDateID($logDate['id']);
    }
  ]
);

?>