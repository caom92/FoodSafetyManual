<?php

namespace fsm\services\gmp\packing\unusualOccurrences;

require_once realpath(dirname(__FILE__).'/../../../globals.php');

use fsm;

$gmpPackingUnusualOccurrenceServices = 
    fsm\createServiceDescriptionFromTemplate(
        'GMP', 'Packing', 
        'Daily Notice of Unusual Occurrence and Corrective Action Report',
        'gmp-packing-unusual-occurrence', 'gmp/pracking/unusual_occurrence/',
        [
            'log' => [
                'items_name' => 'items',
                'data_view' => function($scope, $segment) {
                    $areas = $scope->workingAreas->selectByZoneID(
                        $segment->get('zone_id')
                    );
                    $shifts = $scope->shifts->selectAll();
                    $products = $scope->products->selectCode();
                    return [
                        'shifts' => $shifts,
                        'products' => $products,
                        'areas' => $areas
                    ];
                }
            ],
            'capture' => [
                'requirements' => [
                    'time' => [
                        'type' => 'datetime',
                        'format' => 'G:i'
                    ],
                    'shift_id' => [
                        'type' => 'int',
                        'min' => 1
                    ],
                    'area_id' => [
                        'type' => 'int',
                        'min' => 1
                    ],
                    'product_id' => [
                        'type' => 'int',
                        'min' => 1
                    ],
                    'batch' => [
                        'type' => 'int',
                        'min' => 1
                    ],
                    'description' => [
                        'type' => 'string',
                        'min_length' => 2,
                        'max_length' => 128
                    ],
                    'corrective_action' => [
                        'type' => 'string',
                        'min_length' => 2,
                        'max_length' => 128
                    ],
                    'album_url' => [
                        'type' => 'string',
                        'min_length' => 2,
                        'max_length' => 256
                    ],
                ],
                'data_view' => function($scope, $segment, $request, $logID) {
                    return $scope->unusualOccurrenceLogs->insert([
                        'capture_date_id' => $logID,
                        'time' => $request['time'],
                        'shift_id' => $request['shift_id'],
                        'product_id' => $request['product_id'],
                        'batch' => $request['batch'],
                        'description' => $request['description'],
                        'corrective_action' => $request['corrective_action'],
                        'album_url' => $request['album_url']
                    ]);
                }
            ],
            'report' => [
                'items_name' => 'entry',
                'data_view' => function($scope, $segment, $logDate) {
                    return $scope->unusualOccurrenceLogs->selectByCaptureDateID(
                        $logDate['id']
                    );
                }
            ]
        ]
    );

?>