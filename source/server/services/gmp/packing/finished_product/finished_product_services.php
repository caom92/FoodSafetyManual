<?php

namespace fsm\services\gmp\packing\finishedProduct;

require_once realpath(dirname(__FILE__).'/../../../globals.php');

use fsm;

$gmpPackingFinishedProductServices = fsm\createServiceDescriptorFromTemplate(
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
                $suppliers = $scope->suppliers->selectName();

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
                // first, get the list of all entries from the database
                $rows = $scope->finishedProductLogs->selectByCaptureDateID(
                    $logDate['id']
                );

                // temporal storage for the log entries in their final format 
                // before sending them to the client
                $entries = [];

                // visit each row obtained from the data base
                foreach ($rows as $row) {
                    array_push($entries, [
                        'batch' => $row['batch'],
                        'production_area' => $row['production_area_name'],
                        'supplier' => 
                            $scope->suppliers->getNameByID($row['supplier_id']),
                        'product_code' => $row['product_code'],
                        'customer' => 
                            $scope->customers->getNameByID($row['customer_id']),
                        'quality' => $row['quality'],
                        'origin' => $row['origin'],
                        'expiration_date' => $row['expiration_date'],
                        'water_temperature' => $row['water_temperature'],
                        'product_temperature' => $row['product_temperature'],
                        'is_weight_correct' => $row['is_weight_correct'],
                        'is_label_correct' => $row['is_label_correct'],
                        'is_trackable' => $row['is_trackable'],
                        'notes' => $row['notes']
                    ]);
                }

                // finally, return the resulting array
                return $entries;
            }
        ]
    ]
);

?>