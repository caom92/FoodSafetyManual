<?php

$customerComplaint = [
  'tables' => [
    'customerComplaint\Logs' => realpath(__DIR__.'/Logs.php'),
    'customerComplaint\Details' => realpath(__DIR__.'/Details.php'),
    'customerComplaint\Sources' => realpath(__DIR__.'/Sources.php')
  ],
  'services' => [    
    'approve-customer-complaint-form' => realpath(__DIR__.'/approve-customer-complaint-form.php'),
    'authorization-report-customer-complaint-form' => realpath(__DIR__.'/authorization-report-customer-complaint-form.php'),
    'capture-customer-complaint-form' => realpath(__DIR__.'/capture-customer-complaint-form.php'),
    'list-waiting-logs-customer-complaint-form' => realpath(__DIR__.'/list-waiting-logs-customer-complaint-form.php'),
    'log-customer-complaint-form' => realpath(__DIR__.'/log-customer-complaint-form.php'),
    'report-customer-complaint-form' => realpath(__DIR__.'/report-customer-complaint-form.php'),
    'update-customer-complaint-form' => realpath(__DIR__.'/update-customer-complaint-form.php')
  ]
];

?>