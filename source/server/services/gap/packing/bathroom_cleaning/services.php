<?php

$gapBathroomCleaning = [
  'tables' => [
    'gap\packing\bathroomCleaning\DateLogs' =>
      realpath(dirname(__FILE__).'/DateLogs.php'),
    'gap\packing\bathroomCleaning\ItemLogs' =>
      realpath(dirname(__FILE__).'/ItemLogs.php'),
    'gap\packing\bathroomCleaning\Items' =>
      realpath(dirname(__FILE__).'/Items.php')
  ],
  'services' => [
    'add-gap-packing-bathroom-cleaning' =>
      realpath(dirname(__FILE__).'/add-gap-packing-bathroom-cleaning.php'),
    'authorization-report-gap-packing-bathroom-cleaning' =>
      realpath(dirname(__FILE__).'/authorization-report-gap-packing-bathroom-cleaning.php'),
    'capture-gap-packing-bathroom-cleaning' =>
      realpath(dirname(__FILE__).'/capture-gap-packing-bathroom-cleaning.php'),
    'inventory-gap-packing-bathroom-cleaning' =>
      realpath(dirname(__FILE__).'/inventory-gap-packing-bathroom-cleaning.php'),
    'list-waiting-logs-gap-packing-bathroom-cleaning' =>
      realpath(dirname(__FILE__).'/list-waiting-logs-gap-packing-bathroom-cleaning.php'),
    'log-gap-packing-bathroom-cleaning' =>
      realpath(dirname(__FILE__).'/log-gap-packing-bathroom-cleaning.php'),
    'reorder-gap-packing-bathroom-cleaning' =>
      realpath(dirname(__FILE__).'/reorder-gap-packing-bathroom-cleaning.php'),
    'report-gap-packing-bathroom-cleaning' =>
      realpath(dirname(__FILE__).'/report-gap-packing-bathroom-cleaning.php'),
    'toggle-gap-packing-bathroom-cleaning' =>
      realpath(dirname(__FILE__).'/toggle-gap-packing-bathroom-cleaning.php'),
    'update-gap-packing-bathroom-cleaning' =>
      realpath(dirname(__FILE__).'/update-gap-packing-bathroom-cleaning.php'),
    'upload-manual-gap-packing-bathroom-cleaning' =>
      realpath(dirname(__FILE__).'/upload-manual-gap-packing-bathroom-cleaning.php')
  ]
];

?>