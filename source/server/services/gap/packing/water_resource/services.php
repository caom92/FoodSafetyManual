<?php

$waterResource = [
  'tables' => [
    'gap\packing\waterResource\Items' =>
      realpath(dirname(__FILE__).'/Items.php'),
    'gap\packing\waterResource\Areas' =>
      realpath(dirname(__FILE__).'/Areas.php'),
    'gap\packing\waterResource\Logs' =>
      realpath(dirname(__FILE__).'/Logs.php')
  ],
  'services' => [
    'upload-manual-gap-packing-water-resource' =>
      realpath(dirname(__FILE__).'/upload-manual-gap-packing-water-resource.php'),
    'log-gap-packing-water-resource' =>
      realpath(dirname(__FILE__).'/log-gap-packing-water-resource.php'),
    'capture-gap-packing-water-resource' =>
      realpath(dirname(__FILE__).'/capture-gap-packing-water-resource.php'),
    'report-gap-packing-water-resource' =>
      realpath(dirname(__FILE__).'/report-gap-packing-water-resource.php'),
    'inventory-gap-packing-water-resource' =>
      realpath(dirname(__FILE__).'/inventory-gap-packing-water-resource.php'),
    'add-gap-packing-water-resource' =>
      realpath(dirname(__FILE__).'/add-gap-packing-water-resource.php'),
    'toggle-gap-packing-water-resource' =>
      realpath(dirname(__FILE__).'/toggle-gap-packing-water-resource.php'),
    'reorder-gap-packing-water-resource' =>
      realpath(dirname(__FILE__).'/reorder-gap-packing-water-resource.php'),
    'add-workplace-area-gap-packing-water-resource' =>
      realpath(dirname(__FILE__).'/add-area-gap-packing-water-resource.php'),
    'get-areas-of-zone-gap-packing-water-resource' =>
      realpath(dirname(__FILE__).'/get-areas-of-zone-gap-packing-water-resource.php'),
    'get-areas-of-zone-by-position-gap-packing-water-resource' =>
      realpath(dirname(__FILE__).'/get-areas-of-zone-by-position-gap-packing-water-resource.php'),
    'update-gap-packing-water-resource' =>
      realpath(dirname(__FILE__).'/update-gap-packing-water-resource.php'),
    'authorization-report-gap-packing-water-resource' =>
      realpath(dirname(__FILE__).'/authorization-report-gap-packing-water-resource.php'),
    'edit-workplace-area-gap-packing-water-resource' =>
      realpath(dirname(__FILE__).'/edit-area-gap-packing-water-resource.php'),
    'list-waiting-logs-gap-packing-water-resource' =>
      realpath(dirname(__FILE__).'/list-waiting-logs-gap-packing-water-resource.php')
  ]
];

?>