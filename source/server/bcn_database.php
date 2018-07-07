<?php

header(
  'Content-Type: application/json;charset=utf8'
);
header(
  'Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept, Origin, Authorization'
);
header(
  'Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS'
);
header(
  'Access-Control-Allow-Origin: *'
);

include realpath(dirname(__FILE__).'/bcn_database.csv');

?>