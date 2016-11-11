<?php

// Namespace of the main module of the project
namespace fsm;

// Import the site configuration file
require_once realpath(dirname(__FILE__).'/../config/site_config.php');

// Import the service factory
require_once realpath(dirname(__FILE__).'/services/ServiceFactory.php');

// Import the data validator
require_once realpath(dirname(__FILE__).'/services/DataValidator.php');

use fsm\services as serv;

class Controller 
{
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
    static private function respond(
        $data = [], 
        $message = 'Success.', 
        $code = 1
    )
    {
        // indicate in the HTTP headers that we are returning a JSON 
        header('Content-Type: application/json; charset=utf-8');

        // check if the message is that of success
        $isMessageSuccess = $message == 'Success.';
        
        $isCodeNull = $code == NULL;

        // return the resulting JSON object
        echo json_encode([
            'meta' => [
                'return_code' => ($isMessageSuccess) ? 0 : $code,
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
    static private function validateServiceRequirements($requirementsDesc)
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
                    $session = new serv\Session();
                    $isLoggedIn = $session->isOpen();

                    if ($isLoggedIn) {
                        // if she is, then check if the service is expecting 
                        // the user to have an specific role
                        $mustCheckRoles = $requirement != 'any';
                        if ($mustCheckRoles) {
                            // retrieve the current role of the user
                            $role = $session->get('role_name');
                            $hasProperRole = false;

                            // check if the user's role correspond to any of 
                            // the roles that the service is expecting
                            foreach ($requirement as $requiredRole) {
                                if ($role === $requiredRole) {
                                    $hasProperRole = true;
                                }
                            }

                            if (!$hasProperRole) {
                                throw new \Exception('User does not have the proper rule.');
                            }
                        }
                    } else {
                        throw new \Exception('User is not logged in.');
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
                                serv\DataValidator::isNumeric($_POST[$key]); 

                            if (!$isNumeric) {
                                throw new \Exception(
                                    "Input argument '$key' is not a numeric value."
                                );
                            }
                        break;

                        case 'int':
                            // check if the input argument is an integer value 
                            // or string 
                            $isInt = serv\DataValidator::isInt($_POST[$key]);

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
                                    $isWithinInterval = serv\DataValidator::integerIsBetweenValues(
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
                                serv\DataValidator::isFloat($_POST[$key]);

                            if (!$isFloat) {
                                throw new \Exception(
                                    "Input argument '$key' is not a floating-point value."
                                );
                            }
                        break;

                        case 'string':
                            // check if the input argument is a string value
                            $isString = 
                                serv\DataValidator::isString($_POST[$key]);

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
                                    $hasProperLength = serv\DataValidator::stringHasLength(
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

                                    $isLengthWithinInterval = serv\DataValidator::stringHasLengthInterval(
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
                                serv\DataValidator::stringIsLanguage(
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
                                serv\DataValidator::stringIsEmail($_POST[$key]);

                            if (!$isEmail) {
                                throw new \Exception(
                                    "Input argument '$key' is not an email string."
                                );
                            }
                        break;

                        case 'files':
                            // check if the input argument is an uploaded file
                            $isDefined = 
                                serv\DataValidator::isDefined($_FILES[$key]);

                            if (!$isDefined) {
                                throw new \Exception(
                                    "Input argument '$key' is not a file."
                                );
                            }
                        break;
                    } // switch ($requirement['type'])
                break; // default
            } // switch ($key)
        } // foreach ($key as $keys)
    } // function validateServiceRequirements


    // Starts execution of the controller
    static function execute()
    {
        try {
            // get the requested service
            $service = str_replace(
                SITE_ROOT.'/services/', 
                '', 
                $_SERVER['REQUEST_URI']
            );

            // create an instance of the service factory
            $factory = new serv\ServiceFactory($service);
            $service = $factory->createService();

            // check that the input arguments are valid and that the user has 
            // the proper permissions to use the service
            self::validateServiceRequirements(
                $service->getRequirementsDescriptor()
            );

            // execute the service
            $result = $service->execute();
            self::respond($result);
        } catch (\Exception $e) {
            // if there was a problem, notify the client
            self::respond(
                [], 
                $e->getMessage(),
                $e->getCode()
            );
        }
    } // function execute
} // class Controller


// Configure PHP to write the errors to a log file
ini_set("log_errors", true);
ini_set("error_log", "../".LOG_FILE);

// Execute the controller
Controller::execute();

?>