<?php

$registerOzoneWater = [
  'tables' => [
    'ozoneWater\Logs' => realpath(dirname(__FILE__).'/Logs.php')
  ],
  'services' => [
    'add-ozone-water' => realpath(dirname(__FILE__).'/add-ozone-water.php'),
    'edit-ozone-water' => realpath(dirname(__FILE__).'/edit-ozone-water.php'),
    'view-ozone-water' => realpath(dirname(__FILE__).'/view-ozone-water.php')
  ]
];

?>