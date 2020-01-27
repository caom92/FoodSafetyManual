<?php

$service = [
  'requirements_desc' => [
    'logged_in' => ['Supervisor', 'Manager', 'Director'],
    'id' => [
      'type' => 'int',
      'min' => 1
    ],
    'subject' => [
      'type' => 'string',
      'min_length' => 0,
      'max_length' => 65535,
      'optional' => true
    ],
    'corrective_action' => [
      'type' => 'string',
      'min_length' => 0,
      'max_length' => 65535,
      'optional' => true
    ],
    'customer' => [
      'type' => 'string',
      'min_length' => 0,
      'max_length' => 65535,
      'optional' => true
    ],
    'complaint_date' => [
      'type' => 'datetime',
      'format' => 'Y-m-d',
      'optional' => true
    ],
    'sales_order_number' => [
      'type' => 'string',
      'min_length' => 0,
      'max_length' => 65535,
      'optional' => true
    ],
    'account_manager' => [
      'type' => 'string',
      'min_length' => 0,
      'max_length' => 65535,
      'optional' => true
    ],
    'shipped_to' => [
      'type' => 'string',
      'min_length' => 0,
      'max_length' => 65535,
      'optional' => true
    ],
    'complaint_reason' => [
      'type' => 'string',
      'min_length' => 0,
      'max_length' => 65535,
      'optional' => true
    ],
    'root_cause' => [
      'type' => 'string',
      'min_length' => 0,
      'max_length' => 65535,
      'optional' => true
    ],
    'product_details' => [
      'type' => 'array',
      'values' => [
        'entry_num' => [
          'type' => 'int',
          'min' => 1
        ],
        'product' => [
          'type' => 'string',
          'min_length' => 0,
          'max_length' => 65535
        ],
        'cost' => [
          'type' => 'int',
          'min' => 1,
          'optional' => true
        ],
        'quantity' => [
          'type' => 'int',
          'min' => 1,
          'optional' => true
        ],
        'product_age' => [
          'type' => 'int',
          'min' => 1,
          'optional' => true
        ],
        'shipping_age' => [
          'type' => 'int',
          'min' => 1,
          'optional' => true
        ],
        'transit_time' => [
          'type' => 'int',
          'min' => 1,
          'optional' => true
        ],
        'complaint_age' => [
          'type' => 'int',
          'min' => 1,
          'optional' => true
        ],
        'incoming_qc_score' => [
          'type' => 'string',
          'min_length' => 0,
          'max_length' => 65535,
          'optional' => true
        ]
      ]
    ],
    'sources' => [
      'type' => 'array',
      'values' => [
        'id' => [
          'type' => 'int',
          'min' => 1
        ]
      ]
    ],
    'shipping_point' => [
      'type' => 'string',
      'min_length' => 0,
      'max_length' => 65535,
      'optional' => true
    ],
    'notes' => [
      'type' => 'string',
      'min_length' => 0,
      'max_length' => 65535,
      'optional' => true
    ]
  ],
  'callback' => function($scope, $request) {
    $segment = $scope->session->getSegment('fsm');
    $customerComplaintTable = $scope->daoFactory->get('customerComplaint\Logs');

    // fill table; only creator_id, zone_id and capture_date are strictly required
    // also, accepter_id and closure_date are never included until closing
    $customerComplaintTable->updateByID([
      'subject' => (isset($request['subject']) && array_key_exists('subject', $request)) ? $request['subject'] : NULL,
      'corrective_action' => (isset($request['corrective_action']) && array_key_exists('corrective_action', $request)) ? $request['corrective_action'] : NULL,
      'customer' => (isset($request['customer']) && array_key_exists('customer', $request)) ? $request['customer'] : NULL,
      'complaint_date' => (isset($request['complaint_date']) && array_key_exists('complaint_date', $request)) ? $request['complaint_date'] : NULL,
      'sales_order_number' => (isset($request['sales_order_number']) && array_key_exists('sales_order_number', $request)) ? $request['sales_order_number'] : NULL,
      'account_manager' => (isset($request['account_manager']) && array_key_exists('account_manager', $request)) ? $request['account_manager'] : NULL,
      'shipped_to' => (isset($request['shipped_to']) && array_key_exists('shipped_to', $request)) ? $request['shipped_to'] : NULL,
      'complaint_reason' => (isset($request['complaint_reason']) && array_key_exists('complaint_reason', $request)) ? $request['complaint_reason'] : NULL,
      'root_cause' => (isset($request['root_cause']) && array_key_exists('root_cause', $request)) ? $request['root_cause'] : NULL,
      'shipping_point' => (isset($request['shipping_point']) && array_key_exists('shipping_point', $request)) ? $request['shipping_point'] : NULL,
      'notes' => (isset($request['notes']) && array_key_exists('notes', $request)) ? $request['notes'] : NULL,
    ], $request['id']);

    $details = (isset($request['product_details']) && array_key_exists('product_details', $request)) ? $request['product_details'] : [];
    $detailsTable = $scope->daoFactory->get('customerComplaint\Details');
    $lastEntryNumber = 1;

    if (count($details) > 0) {
      foreach($details as $detail) {
        $hasDetail = $detailsTable->hasByFormIDAndEntry($request['id'], $detail['entry_num']);

        if ($hasDetail) {
          // details exist, update
          $detailsTable->updateByFormIDAndEntry(
            [
              'product' => $detail['product'],
              'cost' => $detail['cost'],
              'quantity' => $detail['quantity'],
              'product_age' => $detail['product_age'],
              'shipping_age' => $detail['shipping_age'],
              'transit_time' => $detail['transit_time'],
              'complaint_age' => $detail['complaint_age'],
              'incoming_qc_score' => $detail['incoming_qc_score']
            ],
            $request['id'],
            $detail['entry_num']
          );
        } else {
          // details don't exist, add
          $detailsTable->insert([
            'form_id' => $request['id'],
            'entry_num' => $detail['entry_num'],
            'product' => $detail['product'],
            'cost' => $detail['cost'],
            'quantity' => $detail['quantity'],
            'product_age' => $detail['product_age'],
            'shipping_age' => $detail['shipping_age'],
            'transit_time' => $detail['transit_time'],
            'complaint_age' => $detail['complaint_age'],
            'incoming_qc_score' => $detail['incoming_qc_score']
          ]);
        }

        $lastEntryNumber = $detail['entry_num'];
      }
    }

    $entriesToDelete = $detailsTable->selectHigherEntryByFormID($request['id'], $lastEntryNumber);

    $detailsTable->delete([
      'AND' => [
        'form_id' => $request['id'],
        'entry_num[>]' =>  $lastEntryNumber
      ]
    ]);

    $sources = (isset($request['sources']) && array_key_exists('sources', $request)) ? $request['sources'] : [];
    $sourcesTable = $scope->daoFactory->get('customerComplaint\Sources');

    // First we delete all existing zones, in case they were modified

    $sourcesTable->deleteByFormID($request['id']);

    // Then we add the ones sent in the update request

    if (count($sources) > 0) {
      foreach($sources as $source) {
        $sourcesTable->insert([
          'form_id' => $request['id'],
          'zone_id' => $source['id']
        ]);
      }
    }
  }
];

?>