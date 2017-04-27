<?php

namespace fsm\services\contacts;

use fsm\database as db;

$contactServices = [
    'list-suppliers' => [
        'requirements_desc' => [
            'logged_in' => ['Administrator']
        ],
        'callback' => 'fsm\services\contacts\getSuppliers'
    ],
    'add-supplier' => [
        'requirements_desc' => [
            'logged_in' => ['Administrator'],
            'company_name' => [
                'type' => 'string',
                'min_length' => 2,
                'max_length' => 128
            ],
            'contact_name' => [
                'type' => 'string',
                'min_length' => 2,
                'max_length' => 64
            ],
            'phone_num' => [
                'type' => 'phone'
            ],
            'email' => [
                'type' => 'email'
            ],
            'code' => [
                'type' => 'string',
                'min_length' => 3,
                'max_length' => 4
            ]
        ],
        'callback' => 'fsm\services\contacts\addSupplier'
    ],
    'list-customers' => [
        'requirements_desc' => [
            'logged_in' => ['Administrator']
        ],
        'callback' => 'fsm\services\contacts\getCustomers'
    ],
    'add-customer' => [
        'requirements_desc' => [
            'logged_in' => ['Administrator'],
            'company_name' => [
                'type' => 'string',
                'min_length' => 2,
                'max_length' => 128
            ],
            'contact_name' => [
                'type' => 'string',
                'min_length' => 2,
                'max_length' => 64
            ],
            'phone_num' => [
                'type' => 'phone'
            ],
            'email' => [
                'type' => 'email'
            ],
            'city' => [
                'type' => 'string',
                'min_length' => 2,
                'max_length' => 64
            ],
            'salesman' => [
                'type' => 'string',
                'min_length' => 2,
                'max_length' => 64
            ]
        ],
        'callback' => 'fsm\services\contacts\addCustomer'
    ],
    'list-products' => [
        'requirements_desc' => [
            'logged_in' => ['Administrator']
        ],
        'callback' => 'fsm\services\contacts\getProducts'
    ],
    'add-product' => [
        'requirements_desc' => [
            'logged_in' => ['Administrator'],
            'code' => [
                'type' => 'string',
                'min_length' => 1,
                'max_length' => 8
            ],
            'name' => [
                'type' => 'string',
                'min_length' => 2,
                'max_length' => 64
            ]
        ],
        'callback' => 'fsm\services\contacts\addProduct'
    ],
    'toggle-product' => [
        'requirements_desc' => [
            'logged_in' => ['Administrator'],
            'product_id' => [
                'type' => 'int',
                'min' => 1
            ]
        ],
        'callback' => 'fsm\services\contacts\toggleProductActivation'
    ]
];


// Returns a list of all the suppliers registered
function getSuppliers($scope, $request) 
{
    return $scope->suppliers->selectAll();
}


// Adds a new supplier to the database
function addSupplier($scope, $request)
{
    $infoID = $scope->contactInfo->insert([
        'company_name' => $request['company_name'],
        'contact_name' => $request['contact_name'],
        'phone_num' => $request['phone_num'],
        'email' => $request['email']
    ]);

    return $scope->suppliers->insert([
        'contact_info_id' => $infoID,
        'code' => $request['code']
    ]);
}


// Returns a list of all the customers registered
function getCustomers($scope, $request) 
{
    return $scope->customers->selectAll();
}


// Adds a new customer to the database
function addCustomer($scope, $request)
{
    $infoID = $scope->contactInfo->insert([
        'company_name' => $request['company_name'],
        'contact_name' => $request['contact_name'],
        'phone_num' => $request['phone_num'],
        'email' => $request['email']
    ]);

    return $scope->customers->insert([
        'contact_info_id' => $infoID,
        'city' => $request['city'],
        'salesman' => $request['salesman']
    ]);
}


// Returns a list of all the products registered
function getProducts($scope, $request) 
{
    return $scope->products->selectAll();
}


// Adds a new product to the database
function addProduct($scope, $request)
{
    return $scope->products->insert([
        'is_active' => TRUE,
        'code' => $request['code'],
        'name' => $request['name']
    ]);
}


// Toggles the activation of the product with the specified ID
function toggleProductActivation($scope, $request)
{
    return $scope->products->toggleActivationByID($request['product_id']);
}

?>