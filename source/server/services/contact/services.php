<?php

$contact = [
  'tables' => [
    'ContactInfo' =>
      realpath(dirname(__FILE__).'/ContactInfo.php'),
    'Customers' =>
      realpath(dirname(__FILE__).'/Customers.php'),
    'Products' =>
      realpath(dirname(__FILE__).'/Products.php'),
    'Suppliers' =>
      realpath(dirname(__FILE__).'/Suppliers.php')
  ],
  'services' => [
    'add-customer' =>
      realpath(dirname(__FILE__).'/add-customer.php'),
    'add-product' =>
      realpath(dirname(__FILE__).'/add-product.php'),
    'add-supplier' =>
      realpath(dirname(__FILE__).'/add-supplier.php'),
    'list-customers' =>
      realpath(dirname(__FILE__).'/list-customers.php'),
    'list-products' =>
      realpath(dirname(__FILE__).'/list-products.php'),
    'list-suppliers' =>
      realpath(dirname(__FILE__).'/list-suppliers.php'),
    'toggle-products' =>
      realpath(dirname(__FILE__).'/toggle-products.php')
  ]
];

?>