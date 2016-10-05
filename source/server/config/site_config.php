<?php

// Namespace of the main module of the project
namespace fsm;

// The root URL after the domain name for accessing the site
const SITE_ROOT = '/espresso';

// The default file where to store error messages created by PHP
const LOG_FILE = 'error_log.txt';

// Different error messages that can be used to return to the client
const ERROR_INVALID_ARGS = 'Input arguments are invalid.';
const ERROR_NOT_LOGGED_IN = 'User is not logged in.';
const ERROR_NO_PERMISSIONS = 'Permission denied.';

?>