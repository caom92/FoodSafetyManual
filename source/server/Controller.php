<?php

// Namespace of the main module of the project
namespace fsm;

require_once realpath(dirname(__FILE__).'/config/site_config.php');
require_once realpath(dirname(__FILE__).'/Session.php');
require_once realpath(dirname(__FILE__).'/data_validations.php');

use fsm\validations as val;
use fsm\database as db;


// The communication bridge between the frontend and the backend
class Controller
{
    // Provides the service requested by the remote client and sends back the
    // result of such service as response
    static function serveRemoteClient()
    {
        try {
            // get the requested service
            $service = str_replace(
                SITE_ROOT.'/services/',
                '',
                $_SERVER['REQUEST_URI']
            );

            // checks if the service exits
            if (isset(self::$services[$service])
                && array_key_exists($service, self::$services)) {
                // if it does, retrieve the input requirements descriptor and
                // the execution callback
                $service = self::$services[$service];
                $inputRequirements = $service['requirements_desc'];
                $callback = $service['callback'];

                // check that the input arguments are valid and that the user
                // has the proper permissions to use the service
                self::validateServiceInputRequirements(
                    $inputRequirements
                );

                // execute the service
                $result = $callback();
                self::respondToRemoteClient($result);
            } else {
                throw new \Exception(
                  'The requested service does not exists.', 1
                );
            }
        } catch (\Exception $e) {
            // if there was a problem, notify the client
            self::respondToRemoteClient(
                [],
                $e->getMessage(),
                $e->getCode()
            );
        }
    } // function execute


    // This function sends back to the client the especified information in a
    // JSON of the form:
    // {
    //      meta: {
    //          return_code:[int],
    //          message:[string]
    //      }
    //      data:[json]
    // }
    // [in]     [data]: associative array of data that is going to be parsed
    //          into a JSON and be sent back to the client
    // [in]     [message]: the message string providing more information about
    //          the code sent
    // [in]     [code]: the return code or error code to be sent back
    static private function respondToRemoteClient(
        $data = [],
        $message = 'Success.',
        $code = 0
    )
    {
        // indicate in the HTTP headers that we are returning a JSON
        header('Content-Type: application/json; charset=utf-8');

        // check if the message is that of success
        $isMessageSuccess = $message == 'Success.';
        $isCodeSuccess = $code == 0;

        // return the resulting JSON object
        echo json_encode([
            'meta' => [
                'return_code' => ($isMessageSuccess && $isCodeSuccess) ?
                    0 :
                    ($isCodeSuccess) ? 1 : $code,
                'message' => $message
            ],
            'data' => $data
        ]);
    }


    // Checks that the user has the proper permissions to us the service and
    // that the input arguments have the proper values and format
    // [in]     requirementsDesc: an associative array of associative
    //          arrays which describe the
    //          user permission and input arguments values and formats that the
    //          service is expecting to recieve
    // [out]    throw: if any of the requirements specified in the requirements
    //          descriptor is not complied to, then an exception will be thrown
    static private function validateServiceInputRequirements($requirementsDesc)
    {
        // first, we retrieve the name of the input arguments that the service
        // is expecting to recieve
        $keys = array_keys($requirementsDesc);

        // then, we visit each input argument to check if it complies to the
        // specified validation rules
        foreach ($keys as $key) {
            // the required validation rule of the current input argument
            $requirement = $requirementsDesc[$key];

            switch ($key) {
                // check if the service expects the user to be logged in
                case 'logged_in':
                    // if it does, check if the user is logged in
                    $session = new Session();
                    $isLoggedIn = $session->isOpen();

                    if ($isLoggedIn) {
                        // if she is, then check if the service is expecting
                        // the user to have an specific role
                        $mustCheckRoles = $requirement != 'any';
                        if ($mustCheckRoles) {
                            // retrieve the current role of the user
                            $role = $_SESSION['role_name'];
                            $hasProperRole = false;

                            // check if the user's role correspond to any of
                            // the roles that the service is expecting
                            foreach ($requirement as $requiredRole) {
                                if ($role === $requiredRole) {
                                    $hasProperRole = true;
                                    break;
                                }
                            }

                            if (!$hasProperRole) {
                                throw new \Exception('User does not have the proper role.');
                            }
                        }
                    } else {
                        throw new \Exception('User is not logged in.');
                    }
                break;

                // check if the service expects the user to has access
                // permission to it
                case 'has_privilege':
                    // first, connect to the data base
                    $session = new Session();

                    // check if a single or multiple permissions are required
                    $isSingle = count($requirement['privilege']) == 1;

                    // then check if the user has the given privilege in the
                    // specified log
                    $hasPrivilege = false;

                    // temporal storage of the input data
                    $p = $requirement['program'];
                    $m = $requirement['module'];
                    $l = $requirement['log'];
                    $r = $requirement['privilege'];

                    // temporal storage of the user privileges array
                    $userPrivileges = $_SESSION['privileges'];

                    if ($isSingle) {
                        $hasPrivilege =
                            isset($userPrivileges[0][$p][$m][$l]) &&
                            $userPrivileges[0][$p][$m][$l]['privilege']['name'] ==
                            $r;
                    } else {
                        foreach ($r as $privilege) {
                            $hasPrivilege =
                                isset($userPrivileges[0][$p][$m][$l]) &&
                                $userPrivileges[0][$p][$m][$l]['privilege']['name']
                                == $privilege;

                            if ($hasPrivilege) {
                                break;
                            }
                        }
                    }

                    if (!$hasPrivilege) {
                        throw new \Exception(
                            'User is not allowed to use this service.'
                        );
                    }
                break;

                default:
                    // check the type of the input argument that the service is
                    // expecting it to have
                    switch ($requirement['type']) {
                        case 'number':
                            // check if the input argument is a numeric value
                            // or string
                            $isNumeric =
                                val\isNumeric($_POST[$key]);

                            if (!$isNumeric) {
                                throw new \Exception(
                                    "Input argument '$key' is not a numeric value."
                                );
                            }
                        break;

                        case 'int':
                            // check if the input argument is an integer value
                            // or string
                            $isInt = val\isInteger($_POST[$key]);

                            // now we check if this value must be within an
                            // specified interval
                            $hasMinRule = isset($requirement['min']);
                            $hasMaxRule = isset($requirement['max']);
                            $hasRules = $hasMinRule || $hasMaxRule;

                            // if the input argument is an integer...
                            if ($isInt) {
                                // and if are additional validation rules...
                                if ($hasRules) {
                                    // retrieve the interval limits
                                    $min = ($hasMinRule) ?
                                        $requirement['min'] :
                                        \PHP_INT_MIN;

                                    $max = ($hasMaxRule) ?
                                        $requirement['max'] :
                                        \PHP_INT_MAX;

                                    // check if the value is within the
                                    // intervals
                                    $isWithinInterval = val\integerIsBetweenValues(
                                        $_POST[$key],
                                        $min,
                                        $max
                                    );

                                    if (!$isWithinInterval) {
                                        throw new \Exception(
                                            "Input argument '$key' is not within [$min, $max]"
                                        );
                                    }
                                }
                            } else {
                                throw new \Exception(
                                    "Input argument '$key' is not an integer value."
                                );
                            }
                        break;

                        case 'float':
                            // check if the input argument is a floating point
                            // value or string
                            $isFloat =
                                val\isFloat($_POST[$key]);

                            if (!$isFloat) {
                                throw new \Exception(
                                    "Input argument '$key' is not a floating-point value."
                                );
                            }
                        break;

                        case 'string':
                            // check if the input argument is a string value
                            $isString =
                                val\isString($_POST[$key]);

                            // check if the input argument must be an specific
                            // number of characters long
                            $hasLengthRule =
                                isset($requirement['length']);

                            // check if the input argument must have a number
                            // of characters that is within an specified
                            // interval
                            $hasMinLengthRule =
                                isset($requirement['min_length']);
                            $hasMaxLengthRule =
                                isset($requirement['max_length']);

                            // if the input argument is a string...
                            if ($isString) {
                                // and must have an specific length
                                if ($hasLengthRule) {
                                    // check if the string has the specified
                                    // length
                                    $hasProperLength = val\stringHasLength(
                                        $_POST[$key],
                                        $requirement['length']
                                    );

                                    if (!$hasProperLength) {
                                        throw new \Exception(
                                            "Input argument '$key' does not have the proper length."
                                        );
                                    }
                                } else {
                                    // check if the string has a length that is
                                    // within a certain interval
                                    $min = ($hasMinLengthRule) ?
                                        $requirement['min_length'] :
                                        0;
                                    $max = ($hasMaxLengthRule) ?
                                        $requirement['max_length'] :
                                        \PHP_INT_MAX;

                                    $isLengthWithinInterval = val\stringHasLengthInterval(
                                        $_POST[$key],
                                        $min,
                                        $max
                                    );

                                    if (!$isLengthWithinInterval) {
                                        throw new \Exception(
                                            "Input argument '$key' does not have a length that is within a set interval."
                                        );
                                    }
                                }
                            } else {
                                throw new \Exception(
                                    "Input argument '$key' is not a string value."
                                );
                            }
                        break;

                        case 'lang':
                            // check if the input argument is a string that
                            // denotes a language code
                            $isLanguage =
                                val\stringIsLanguageCode(
                                    $_POST[$key]
                                );

                            if (!$isLanguage) {
                                throw new \Exception(
                                    "Input argument '$key' is not language string."
                                );
                            }
                        break;

                        case 'email':
                            // check if the input argument is a string that
                            // denotes an email address
                            $isEmail =
                                val\stringIsEmail($_POST[$key]);

                            if (!$isEmail) {
                                throw new \Exception(
                                    "Input argument '$key' is not an email string."
                                );
                            }
                        break;

                        case 'files':
                            // check if the input argument is an uploaded file
                            $isDefined =
                                val\isDefined($_FILES[$key]);

                            if (!$isDefined) {
                                throw new \Exception(
                                    "Input argument '$key' is not a file."
                                );
                            }
                        break;

                        case 'array':
                            // check if the input argument is an array
                            $isDefined =
                                val\isDefined($_POST[$key]);
                            $isEmpty = count($_POST[$key]) == 0;

                            if (!$isDefined || $isEmpty) {
                                throw new \Exception(
                                    "Input argument '$key' is not an array."
                                );
                            }
                        break;

                        case 'datetime':
                            // check if the input argument is a date or time
                            // string literal with the especified format
                            $format = $requirement['format'];
                            $isDateTime = val\isDateTime($_POST[$key], $format);

                            if (!$isDateTime) {
                                throw new \Exception(
                                    "Input argument '$key' is not a date and/or time literal of the format '$format'"
                                );
                            }
                        break;
                    } // switch ($requirement['type'])
                break; // default
            } // switch ($key)
        } // foreach ($key as $keys)
    } // function validateServiceRequirements


    // The list of services that the server can provide
    static $services;
} // class Controller

// Import the services list
require_once realpath(dirname(__FILE__).'/services/Services.php');

?>
