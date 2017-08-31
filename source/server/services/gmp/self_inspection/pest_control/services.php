<?php

$selfInspection = [
  'tables' => [
    'gmp\selfInspection\pestControl\Logs' =>
      realpath(dirname(__FILE__).'/Logs.php'),
    'gmp\selfInspection\pestControl\Rooms' =>
      realpath(dirname(__FILE__).'/Rooms.php'),
    'gmp\selfInspection\pestControl\Stations' =>
      realpath(dirname(__FILE__).'/Stations.php'),
  ],
  'services' => [
    'upload-manual-gmp-self-inspection-pest-control' =>
      realpath(dirname(__FILE__).'/upload-manual-gmp-self-inspection-pest-control.php'),
    'log-gmp-self-inspection-pest-control' =>
      realpath(dirname(__FILE__).'/log-gmp-self-inspection-pest-control.php'),
    'capture-gmp-self-inspection-pest-control' =>
      realpath(dirname(__FILE__).'/capture-gmp-self-inspection-pest-control.php'),
    'report-gmp-self-inspection-pest-control' =>
      realpath(dirname(__FILE__).'/report-gmp-self-inspection-pest-control.php'),
    'inventory-gmp-self-inspection-pest-control' =>
      realpath(dirname(__FILE__).'/inventory-gmp-self-inspection-pest-control.php'),
    'add-gmp-self-inspection-pest-control' =>
      realpath(dirname(__FILE__).'/add-gmp-self-inspection-pest-control.php'),
    'toggle-gmp-self-inspection-pest-control' =>
      realpath(dirname(__FILE__).'/toggle-gmp-self-inspection-pest-control.php'),
    'reorder-gmp-self-inspection-pest-control' =>
      realpath(dirname(__FILE__).'/reorder-gmp-self-inspection-pest-control.php'),
    'add-room-gmp-self-inspection-pest-control' =>
      realpath(dirname(__FILE__).'/add-room-gmp-self-inspection-pest-control.php'),
    'rooms-gmp-self-inspection-pest-control' =>
      realpath(dirname(__FILE__).'/rooms-gmp-self-inspection-pest-control.php'),
    'update-gmp-self-inspection-pest-control' =>
      realpath(dirname(__FILE__).'/update-gmp-self-inspection-pest-control.php'),
    'authorization-report-gmp-self-inspection-pest-control' =>
      realpath(dirname(__FILE__).'/authorization-report-gmp-self-inspection-pest-control.php'),
    'edit-room-gmp-self-inspection-pest-control' =>
      realpath(dirname(__FILE__).'/edit-room-gmp-self-inspection-pest-control.php')
  ]
];

?>