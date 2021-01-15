<?php

$gmpBathroomCleaning = [
  'tables' => [
    'gmp\packing\bathroomCleaning\DateLogs' =>
      realpath(dirname(__FILE__).'/DateLogs.php'),
    'gmp\packing\bathroomCleaning\ItemLogs' =>
      realpath(dirname(__FILE__).'/ItemLogs.php'),
    'gmp\packing\bathroomCleaning\Items' =>
      realpath(dirname(__FILE__).'/Items.php')
  ],
  'services' => [
    'add-gmp-packing-bathroom-cleaning' =>
      realpath(dirname(__FILE__).'/add-gmp-packing-bathroom-cleaning.php'),
    'authorization-report-gmp-packing-bathroom-cleaning' =>
      realpath(dirname(__FILE__).'/authorization-report-gmp-packing-bathroom-cleaning.php'),
    'capture-gmp-packing-bathroom-cleaning' =>
      realpath(dirname(__FILE__).'/capture-gmp-packing-bathroom-cleaning.php'),
    'inventory-gmp-packing-bathroom-cleaning' =>
      realpath(dirname(__FILE__).'/inventory-gmp-packing-bathroom-cleaning.php'),
    'list-waiting-logs-gmp-packing-bathroom-cleaning' =>
      realpath(dirname(__FILE__).'/list-waiting-logs-gmp-packing-bathroom-cleaning.php'),
    'log-gmp-packing-bathroom-cleaning' =>
      realpath(dirname(__FILE__).'/log-gmp-packing-bathroom-cleaning.php'),
    'reorder-gmp-packing-bathroom-cleaning' =>
      realpath(dirname(__FILE__).'/reorder-gmp-packing-bathroom-cleaning.php'),
    'report-gmp-packing-bathroom-cleaning' =>
      realpath(dirname(__FILE__).'/report-gmp-packing-bathroom-cleaning.php'),
    'toggle-gmp-packing-bathroom-cleaning' =>
      realpath(dirname(__FILE__).'/toggle-gmp-packing-bathroom-cleaning.php'),
    'update-gmp-packing-bathroom-cleaning' =>
      realpath(dirname(__FILE__).'/update-gmp-packing-bathroom-cleaning.php'),
    'upload-manual-gmp-packing-bathroom-cleaning' =>
      realpath(dirname(__FILE__).'/upload-manual-gmp-packing-bathroom-cleaning.php')
  ]
];

?>