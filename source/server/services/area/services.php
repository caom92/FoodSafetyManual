<?php

$area = [
  'tables' => [
    'WorkingAreas' =>
      realpath(dirname(__FILE__).'/WorkingAreas.php')
  ],
  'services' => [
    'add-workplace-area' =>
      realpath(dirname(__FILE__).'/add-workplace-area.php'),
    'get-areas-of-zone' =>
      realpath(dirname(__FILE__).'/get-areas-of-zone.php')
  ]
];

?>