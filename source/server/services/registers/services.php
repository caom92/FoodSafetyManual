<?php

$registers = [
  'tables' => [
    'Registers' => realpath(dirname(__FILE__).'/Registers.php'),
    'CapturedRegisters' => realpath(dirname(__FILE__).'/CapturedRegisters.php'),
    'RegisterFooters' => realpath(dirname(__FILE__).'/RegisterFooters.php')
  ],
  'services' => [
    'add-register-footer' => realpath(dirname(__FILE__).'/add-register-footer.php'),
    'edit-register-footer' => realpath(dirname(__FILE__).'/edit-register-footer.php'),
    'list-register-footer' => realpath(dirname(__FILE__).'/list-register-footer.php'),
    'count-pending-registers' => realpath(dirname(__FILE__).'/count-pending-registers.php'),
    'list-registers' => realpath(dirname(__FILE__).'/list-registers.php'),
    'sign-register' => realpath(dirname(__FILE__).'/sign-register.php'),
    'gp-sign-register' => realpath(dirname(__FILE__).'/gp-sign-register.php')
  ]
];

?>