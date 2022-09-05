<?php

$finishedProductRegister = [
  'tables' => [
    'finishedProduct\Logs' => realpath(dirname(__FILE__).'/Logs.php'),
    'finishedProduct\Codes' => realpath(dirname(__FILE__).'/Codes.php'),
    'finishedProduct\Status' => realpath(dirname(__FILE__).'/Status.php')
  ],
  'services' => [
    'add-finished-product' => realpath(dirname(__FILE__).'/add-finished-product.php'),
    'edit-finished-product' => realpath(dirname(__FILE__).'/edit-finished-product.php'),
    'info-finished-product' => realpath(dirname(__FILE__).'/info-finished-product.php'),
    'view-finished-product' => realpath(dirname(__FILE__).'/view-finished-product.php')
  ]
];

?>