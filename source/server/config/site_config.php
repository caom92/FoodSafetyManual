<?php

<<<<<<< HEAD
// Namespace of the main module of the project
namespace fsm;

// The root URL after the domain name for accessing the site
const SITE_ROOT = '/espresso';

// The default file where to store error messages created by PHP
const LOG_FILE = 'error_log.txt';
=======
// The root URL after the domain name for accessing the site
//const SITE_ROOT = '/espresso';
const SERVER_SERVICE_ROOT = '/espresso/services/';

// The default file where to store error messages created by PHP
//const LOG_FILE = 'error_log.txt';
const SERVER_LOG_FILE = 'app.log';

// Flag that allows the server to attend requests from other origins
const SERVER_ALLOW_CORS_REQUESTS = TRUE;

// Flag that allows the server to attend requests from other origins that come 
// attached with a session cookie
const SERVER_ALLOW_CORS_CREDENTIALS = TRUE;

// List of origins which requests the server is allowed to attend if the come 
// with a session cookie attached
const SERVER_CORS_CREDENTIALS_ALLOWED_ORIGINS = [
  'http://localhost:4200',
  'http://localhost:8100',
  'http://manual.jfdc.tech',
  'http://documents.jfdc.tech'
];
>>>>>>> carlos

?>