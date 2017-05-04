<?php

namespace fsm\services\gmp\packing\finishedProduct;

require_once realpath(dirname(__FILE__).'/../../../globals.php');

use fsm;

$gmpPackingFinishedProductServices = fsm\createServiceDescriptionFromTemplate(
    'GMP', 'Packing', 'Daily Finished Product Check',
    'gmp-packing-finished-product', 'gmp/pracking/finished_product/',
    [
        'log' => [
            'items_name' => 'log_info',
            'data_view' => function($scope, $segment) {
                // first, obtain the list of all production areas
                $areas = $scope->productionAreas->selectByZoneID(
                    $segment->get('zone_id')
                );

                // then, obtain the list of all suppliers
                $suppliers = $scope->suppliers->selectCode();

                // after that, obtain the list of products
                $products = $scope->products->selectCode();

                // then, obtain the list of customers
                $customers = $scope->customers->selectName();

                // and then, obtain the list of quality types
                $qualityTypes = $scope->qualityTypes->selectAll();

                // finally, return the log info
                return [
                    'production_areas' => $areas,
                    'suppliers' => $suppliers,
                    'product_codes' => $products,
                    'customers' => $customers,
                    'quality_types' => $qualityTypes
                ];
            }
        ],
        'capture' => [
            'requirements' => [
                'entries' => [
                    'type' => 'array',
                    'values' => [
                        'batch' => [
                            'type' => 'int',
                            'min' => 1
                        ],
                        'production_area_id' => [
                            'type' => 'int',
                            'min' => 1
                        ],
                        'supplier_id' => [
                            'type' => 'int',
                            'min' => 1
                        ],
                        'product_id' => [
                            'type' => 'int',
                            'min' => 1
                        ],
                        'customer_id' => [
                            'type' => 'int',
                            'min' => 1
                        ],
                        'quality_type_id' => [
                            'type' => 'int',
                            'min' => 1
                        ],
                        'origin' => [
                            'type' => 'string',
                            'length' => 3
                        ],
                        'expiration_date' => [
                            'type' => 'datetime',
                            'format' => 'Y-m-d'
                        ],
                        'water_temperature' => [
                            'type' => 'float'
                        ],
                        'product_temperature' => [
                            'type' => 'float'
                        ],
                        'is_weight_correct' => [
                            'type' => 'bool'
                        ],
                        'is_label_correct' => [
                            'type' => 'bool'
                        ],
                        'is_trackable' => [
                            'type' => 'bool'
                        ],
                        'notes' => [
                            'type' => 'string',
                            'min_length' => 3,
                            'max_length' => 128
                        ]
                    ]
                ]
            ],
            'data_view' => function($scope, $segment, $request, $logID) {
                // prepare the array of rows to insert to the database
                $rows = $request['entries'];

                // visit each entry
                foreach ($rows as $entry) {
                    // add the capture date ID
                    $entry['capture_date_id'] = $logID;
                }

                // finally, insert all the rows to the database
                return $scope->finishedProductLogs->insert($rows);
            }
        ],
        'report' => [
            'items_name' => 'entries',
            'data_view' => function($scope, $segment, $logDate) {
                // get the list of all entries from the database
                return $scope->finishedProductLogs->selectByCaptureDateID(
                    $logDate['id']
                );
            }
        ],
        'inventory' => [
            'callback' => function($scope, $request) {
                $segment = $scope->session->getSegment('fsm');
                return $scope->productionAreas->selectByZoneID(
                    $segment->get('zone_id')
                );
            }
        ],
        'add' => [
            'requirements' => [
                'name' => [
                    'type' => 'string',
                    'min_length' => 2,
                    'max_length' => 64
                ]
            ],
            'callback' => function($scope, $request) {
                $segment = $scope->session->getSegment('fsm');
                return $scope->productionAreas->insert([
                    'zone_id' => $segment->get('zone_id'),
                    'name' => $request['name']
                ]);
            }
        ]
    ]
);

?>