<?php

$service = [
  'requirements_desc' => [
    'logged_in' => ['Supervisor', 'Manager', 'Director'],
    'id' => [
      'type' => 'int',
      'min' => 1
    ],
    'work_order_number' => [
      'type' => 'string',
      'min_length' => 0,
      'max_length' => 255,
      'optional' => true
    ],
    'capture_date' => [
      'type' => 'datetime',
      'format' => 'Y-m-d',
      'optional' => true
    ],
    'department' => [
      'type' => 'string',
      'min_length' => 0,
      'max_length' => 65535,
      'optional' => true
    ],
    'description' => [
      'type' => 'string',
      'min_length' => 0,
      'max_length' => 65535,
      'optional' => true
    ],
    'received_by' => [
      'type' => 'string',
      'min_length' => 0,
      'max_length' => 65535,
      'optional' => true
    ],
    'assigned_to' => [
      'type' => 'string',
      'min_length' => 0,
      'max_length' => 65535,
      'optional' => true
    ],
    'repair_date' => [
      'type' => 'datetime',
      'format' => 'Y-m-d',
      'optional' => true
    ],
    'repair_time' => [
      'type' => 'datetime',
      'format' => 'G:i',
      'optional' => true
    ],
    'repair_duration' => [
      'type' => 'int',
      'min' => 1,
      'optional' => true
    ],
    'repair_work_order_type' => [
      'type' => 'string',
      'min_length' => 0,
      'max_length' => 65535,
      'optional' => true
    ],
    'maintenance_task_performer' => [
      'type' => 'string',
      'min_length' => 0,
      'max_length' => 65535,
      'optional' => true
    ],
    'repair_start_date' => [
      'type' => 'datetime',
      'format' => 'Y-m-d',
      'optional' => true
    ],
    'repair_start_time' => [
      'type' => 'datetime',
      'format' => 'G:i',
      'optional' => true
    ],
    'repair_finish_date' => [
      'type' => 'datetime',
      'format' => 'Y-m-d',
      'optional' => true
    ],
    'repair_finish_time' => [
      'type' => 'datetime',
      'format' => 'G:i',
      'optional' => true
    ],
    'repair_comments' => [
      'type' => 'string',
      'min_length' => 0,
      'max_length' => 65535,
      'optional' => true
    ],
    'sanitation_task_performer' => [
      'type' => 'string',
      'min_length' => 0,
      'max_length' => 65535,
      'optional' => true
    ],
    'sanitation_date' => [
      'type' => 'datetime',
      'format' => 'Y-m-d',
      'optional' => true
    ],
    'sanitation_start_time' => [
      'type' => 'datetime',
      'format' => 'G:i',
      'optional' => true
    ],
    'sanitation_finish_time' => [
      'type' => 'datetime',
      'format' => 'G:i',
      'optional' => true
    ],
    'sanitation_corrective_action' => [
      'type' => 'string',
      'min_length' => 0,
      'max_length' => 65535,
      'optional' => true
    ],
    'cleaning_verification' => [
      'type' => 'bool',
      'optional' => true
    ]
  ],
  'callback' => function($scope, $request) {
    $segment = $scope->session->getSegment('fsm');
    $workOrderLogs = $scope->daoFactory->get('workOrder\Logs');

    $workOrderLogs->updateByID([
      'capture_date' => $request['capture_date'],
      'work_order_number' => (isset($request['work_order_number']) && array_key_exists('work_order_number', $request)) ? $request['work_order_number'] : NULL,
      'department' => (isset($request['department']) && array_key_exists('department', $request)) ? $request['department'] : NULL,
      'description' => (isset($request['description']) && array_key_exists('description', $request)) ? $request['description'] : NULL,
      'received_by' => (isset($request['received_by']) && array_key_exists('received_by', $request)) ? $request['received_by'] : NULL,
      'assigned_to' => (isset($request['assigned_to']) && array_key_exists('assigned_to', $request)) ? $request['assigned_to'] : NULL,
      'repair_date' => (isset($request['repair_date']) && array_key_exists('repair_date', $request)) ? $request['repair_date'] : NULL,
      'repair_time' => (isset($request['repair_time']) && array_key_exists('repair_time', $request)) ? $request['repair_time'] : NULL,
      'repair_duration' => (isset($request['repair_duration']) && array_key_exists('repair_duration', $request)) ? $request['repair_duration'] : NULL,
      'repair_work_order_type' => (isset($request['repair_work_order_type']) && array_key_exists('repair_work_order_type', $request)) ? $request['repair_work_order_type'] : NULL,
      'maintenance_task_performer' => (isset($request['maintenance_task_performer']) && array_key_exists('maintenance_task_performer', $request)) ? $request['maintenance_task_performer'] : NULL,
      'repair_start_date' => (isset($request['repair_start_date']) && array_key_exists('repair_start_date', $request)) ? $request['repair_start_date'] : NULL,
      'repair_start_time' => (isset($request['repair_start_time']) && array_key_exists('repair_start_time', $request)) ? $request['repair_start_time'] : NULL,
      'repair_finish_date' => (isset($request['repair_finish_date']) && array_key_exists('repair_finish_date', $request)) ? $request['repair_finish_date'] : NULL,
      'repair_finish_time' => (isset($request['repair_finish_time']) && array_key_exists('repair_finish_time', $request)) ? $request['repair_finish_time'] : NULL,
      'repair_comments' => (isset($request['repair_comments']) && array_key_exists('repair_comments', $request)) ? $request['repair_comments'] : NULL,
      'sanitation_task_performer' => (isset($request['sanitation_task_performer']) && array_key_exists('sanitation_task_performer', $request)) ? $request['sanitation_task_performer'] : NULL,
      'sanitation_date' => (isset($request['sanitation_date']) && array_key_exists('sanitation_date', $request)) ? $request['sanitation_date'] : NULL,
      'sanitation_start_time' => (isset($request['sanitation_start_time']) && array_key_exists('sanitation_start_time', $request)) ? $request['sanitation_start_time'] : NULL,
      'sanitation_finish_time' => (isset($request['sanitation_finish_time']) && array_key_exists('sanitation_finish_time', $request)) ? $request['sanitation_finish_time'] : NULL,
      'sanitation_corrective_action' => (isset($request['sanitation_corrective_action']) && array_key_exists('sanitation_corrective_action', $request)) ? $request['sanitation_corrective_action'] : NULL,
      'cleaning_verification' => (isset($request['cleaning_verification']) && array_key_exists('cleaning_verification', $request)) ? $request['cleaning_verification'] : NULL
    ], $request['id']);

    $formID = $request['id'];

    return [
      'id' => $formID
    ];
  }
];

?>