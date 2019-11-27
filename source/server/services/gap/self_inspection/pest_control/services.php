<?php

$gapSelfInspection = [
  'tables' => [
    'gap\selfInspection\pestControl\Logs' =>
      realpath(dirname(__FILE__).'/Logs.php'),
    'gap\selfInspection\pestControl\Rooms' =>
      realpath(dirname(__FILE__).'/Rooms.php'),
    'gap\selfInspection\pestControl\Stations' =>
      realpath(dirname(__FILE__).'/Stations.php'),
  ],
  'services' => [
    'upload-manual-gap-self-inspection-pest-control' =>
      realpath(dirname(__FILE__).'/upload-manual-gap-self-inspection-pest-control.php'),
    'log-gap-self-inspection-pest-control' =>
      realpath(dirname(__FILE__).'/log-gap-self-inspection-pest-control.php'),
    'capture-gap-self-inspection-pest-control' =>
      realpath(dirname(__FILE__).'/capture-gap-self-inspection-pest-control.php'),
    'report-gap-self-inspection-pest-control' =>
      realpath(dirname(__FILE__).'/report-gap-self-inspection-pest-control.php'),
    'inventory-gap-self-inspection-pest-control' =>
      realpath(dirname(__FILE__).'/inventory-gap-self-inspection-pest-control.php'),
    'add-gap-self-inspection-pest-control' =>
      realpath(dirname(__FILE__).'/add-gap-self-inspection-pest-control.php'),
    'toggle-gap-self-inspection-pest-control' =>
      realpath(dirname(__FILE__).'/toggle-gap-self-inspection-pest-control.php'),
    'reorder-gap-self-inspection-pest-control' =>
      realpath(dirname(__FILE__).'/reorder-gap-self-inspection-pest-control.php'),
    'add-workplace-area-gap-self-inspection-pest-control' =>
      realpath(dirname(__FILE__).'/add-room-gap-self-inspection-pest-control.php'),
    'get-areas-of-zone-gap-self-inspection-pest-control' =>
      realpath(dirname(__FILE__).'/rooms-gap-self-inspection-pest-control.php'),
    'get-areas-of-zone-by-position-gap-self-inspection-pest-control' =>
      realpath(dirname(__FILE__).'/rooms-gap-self-inspection-pest-control.php'),
    'update-gap-self-inspection-pest-control' =>
      realpath(dirname(__FILE__).'/update-gap-self-inspection-pest-control.php'),
    'authorization-report-gap-self-inspection-pest-control' =>
      realpath(dirname(__FILE__).'/authorization-report-gap-self-inspection-pest-control.php'),
    'edit-workplace-area-gap-self-inspection-pest-control' =>
      realpath(dirname(__FILE__).'/edit-room-gap-self-inspection-pest-control.php')
  ]
];

?>