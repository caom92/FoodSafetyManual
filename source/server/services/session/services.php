<?php

$session = [
  'services' => [
    'check-session' => 
      realpath(dirname(__FILE__).'/check-session.php'),
    'login' => 
      realpath(dirname(__FILE__).'/login.php'),
    'logout' =>
      realpath(dirname(__FILE__).'/logout.php')
  ]
];

?>