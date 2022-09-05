<?php

$workOrder = [
  'tables' => [
    'workOrder\Logs' => realpath(__DIR__.'/Logs.php')
  ],
  'services' => [
    'approve-work-order-form' => realpath(__DIR__.'/approve-work-order-form.php'),
    'authorization-report-work-order-form' => realpath(__DIR__.'/authorization-report-work-order-form.php'),
    'capture-work-order-form' => realpath(__DIR__.'/capture-work-order-form.php'),
    'delete-work-order-form' => realpath(__DIR__.'/delete-work-order-form.php'),
    'list-waiting-logs-work-order-form' => realpath(__DIR__.'/list-waiting-logs-work-order-form.php'),
    'report-work-order-form' => realpath(__DIR__.'/report-work-order-form.php'),
    'update-work-order-form' => realpath(__DIR__.'/update-work-order-form.php')
  ]
];

?>