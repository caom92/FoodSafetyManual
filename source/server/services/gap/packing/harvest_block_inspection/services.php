<?php

$harvestBlockInspection = [
  'tables' => [
    'gap\packing\harvestBlockInspection\InfoLogs' =>
      realpath(dirname(__FILE__).'/InfoLogs.php'),
    'gap\packing\harvestBlockInspection\QuestionLogs' =>
      realpath(dirname(__FILE__).'/QuestionLogs.php'),
    'gap\packing\harvestBlockInspection\Questions' =>
      realpath(dirname(__FILE__).'/Questions.php')
  ],
  'services' => [
    'add-gap-packing-harvest-block-inspection' =>
      realpath(dirname(__FILE__).'/add-gap-packing-harvest-block-inspection.php'),
    'authorization-report-gap-packing-harvest-block-inspection' =>
      realpath(dirname(__FILE__).'/authorization-report-gap-packing-harvest-block-inspection.php'),
    'capture-gap-packing-harvest-block-inspection' =>
      realpath(dirname(__FILE__).'/capture-gap-packing-harvest-block-inspection.php'),
    'inventory-gap-packing-harvest-block-inspection' =>
      realpath(dirname(__FILE__).'/inventory-gap-packing-harvest-block-inspection.php'),
    'list-waiting-logs-gap-packing-harvest-block-inspection' =>
      realpath(dirname(__FILE__).'/list-waiting-logs-gap-packing-harvest-block-inspection.php'),
    'log-gap-packing-harvest-block-inspection' =>
      realpath(dirname(__FILE__).'/log-gap-packing-harvest-block-inspection.php'),
    'reorder-gap-packing-harvest-block-inspection' =>
      realpath(dirname(__FILE__).'/reorder-gap-packing-harvest-block-inspection.php'),
    'report-gap-packing-harvest-block-inspection' =>
      realpath(dirname(__FILE__).'/report-gap-packing-harvest-block-inspection.php'),
    'toggle-gap-packing-harvest-block-inspection' =>
      realpath(dirname(__FILE__).'/toggle-gap-packing-harvest-block-inspection.php'),
    'update-gap-packing-harvest-block-inspection' =>
      realpath(dirname(__FILE__).'/update-gap-packing-harvest-block-inspection.php'),
    'upload-manual-gap-packing-harvest-block-inspection' =>
      realpath(dirname(__FILE__).'/upload-manual-gap-packing-harvest-block-inspection.php')
  ]
];

?>