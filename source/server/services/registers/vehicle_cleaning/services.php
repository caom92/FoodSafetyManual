<?php

$vehicleCleaning = [
  'tables' => [
    'vehicleCleaning\Logs' => realpath(dirname(__FILE__).'/Logs.php')
  ],
  'services' => [
    'add-vehicle-cleaning' => realpath(dirname(__FILE__).'/add-vehicle-cleaning.php'),
    'edit-vehicle-cleaning' => realpath(dirname(__FILE__).'/edit-vehicle-cleaning.php'),
    'view-vehicle-cleaning' => realpath(dirname(__FILE__).'/view-vehicle-cleaning.php')
  ]
];

?>