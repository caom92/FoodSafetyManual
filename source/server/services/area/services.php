<?php

$area = [
  'tables' => [
    'WorkingAreas' =>
      realpath(dirname(__FILE__).'/services/area/WorkingAreas.php')
  ],
  'services' => [
    'add-workplace-area' =>
      realpath(dirname(__FILE__).'/services/area/add-workplace-area.php'),
    'get-areas-of-zone' =>
        realpath(dirname(__FILE__).'/services/area/get-areas-of-zone.php')
  ]
];

?>