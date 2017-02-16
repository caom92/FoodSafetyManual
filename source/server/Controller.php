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
    // The list of services that the server can provide
    private $services;

    // The list of validation functions that can be used to validate the input
    // arguments of the services
    private $validationRules;


    // Creates an instance of the controller
    function __construct($services) {
        $this->services = $services;
        $this->validationRules = [
            'number' => function($name, $value, $options) {
                // check if the input argument is a numeric value
                // or string
                $isNumeric = val\isNumeric($value);

                if (!$isNumeric) {
                    throw new \Exception(
                        "Input argument '$name' is not a numeric value."
                    );
                }
            },
            'int' => function($name, $value, $options) {
                // check if the input argument is an integer value
                // or string
                $isInt = val\isInteger($value);

                // now we check if this value must be within an
                // specified interval
                $hasMinRule = isset($options['min']);
                $hasMaxRule = isset($options['max']);
                $hasRules = $hasMinRule || $hasMaxRule;

                // if the input argument is an integer...
                if ($isInt) {
                    // and if are additional validation rules...
                    if ($hasRules) {
                        // retrieve the interval limits
                        $min = ($hasMinRule) ?
                            $options['min'] : \PHP_INT_MIN;

                        $max = ($hasMaxRule) ?
                            $options['max'] : \PHP_INT_MAX;

                        // check if the value is within the
                        // intervals
                        $isWithinInterval = val\integerIsBetweenValues(
                            $value, $min, $max
                        );

                        if (!$isWithinInterval) {
                            throw new \Exception(
                                "Input argument '$name' is not within ".
                                "[$min, $max]"
                            );
                        }
                    }
                } else {
                    throw new \Exception(
                        "Input argument '$name' is not an integer value."
                    );
                }
            },
            'float' => function($name, $value, $options) {
                // check if the input argument is a floating point
                // value or string
                $isFloat = val\isFloat($value);

                if (!$isFloat) {
                    throw new \Exception(
                        "Input argument '$name' is not a floating-point value."
                    );
                }
            },
            'string' => function($name, $value, $options) {
                // check if the input argument is a string value
                $isString = val\isString($value);

                // check if the input argument must be an specific
                // number of characters long
                $hasLengthRule = isset($options['length']);

                // check if the input argument must have a number
                // of characters that is within an specified
                // interval
                $hasMinLengthRule = isset($options['min_length']);
                $hasMaxLengthRule = isset($options['max_length']);

                // if the input argument is a string...
                if ($isString) {
                    // and must have an specific length
                    if ($hasLengthRule) {
                        // check if the string has the specified
                        // length
                        $hasProperLength = val\stringHasLength(
                            $value,
                            $options['length']
                        );

                        if (!$hasProperLength) {
                            throw new \Exception(
                                "Input argument '$name' is not ". 
                                "{$options['length']} characters long."
                            );
                        }
                    } else {
                        // check if the string has a length that is
                        // within a certain interval
                        $min = ($hasMinLengthRule) ?
                            $options['min_length'] : 0;
                        $max = ($hasMaxLengthRule) ?
                            $options['max_length'] : \PHP_INT_MAX;

                        $isLengthWithinInterval = val\stringHasLengthInterval(
                            $value,
                            $min,
                            $max
                        );

                        if (!$isLengthWithinInterval) {
                            throw new \Exception(
                                "Input argument '$name' does not have a length".
                                " that is within [$min, $max]."
                            );
                        }
                    }
                } else {
                    throw new \Exception(
                        "Input argument '$name' is not a string value."
                    );
                }
            },
            'lang' => function($name, $value, $options) {
                // check if the input argument is a string that
                // denotes a language code
                $isLanguage =
                    val\stringIsLanguageCode($value);

                if (!$isLanguage) {
                    throw new \Exception(
                        "Input argument '$name' is not language string."
                    );
                }
            },
            'email' => function($name, $value, $options) {
                // check if the input argument is a string that
                // denotes an email address
                $isEmail = val\stringIsEmail($value);

                if (!$isEmail) {
                    throw new \Exception(
                        "Input argument '$name' is not an email string."
                    );
                }
            },
            'bool' => function($name, $value, $options) {
                // check if the input argument is a boolean value
                $isBoolean = val\isBoolean($value);

                if (!$isBoolean) {
                    throw new \Exception(
                        "Input argument '$name' is not a boolean value"
                    );
                }
            },
            'files' => function($name, $value, $options) {
                // first, get the name of the file
                $name = $options['name'];

                // then, check if any file was send
                $isFilesSet = isset($_FILES[$name]) 
                    && array_key_exists($name, $_FILES);

                // then, check if a file format was especified
                $isFileFormatSet = isset($options['format'])
                    && array_key_exists('format', $options);

                // and check if the file was declared as optional
                $isOptional = isset($options['optional'])
                    && array_key_exists('optional', $options);

                // if any file was send ...
                if ($isFilesSet) {
                    // and a file format was especified...
                    if ($isFileFormatSet) {
                        // check that each sent file is of the especified file 
                        // format, throwing an exception if this is not the case
                        switch ($options['format']) {
                            case 'document':
                                if (is_array($_FILES[$name]['tmp_name'])) {
                                    foreach ($_FILES[$name]['tmp_name'] as $file) {
                                        if (!val\isDocumentFile($file)) {
                                            throw new \Exception(
                                                "A file in '$name' ".
                                                "is not a document file");
                                            break;
                                        }
                                    }
                                } else if (!val\isDocumentFile($_FILES[$name]['tmp_name'])) {
                                    throw new \Exception(
                                        "The file '{$_FILES[$name]['name']}' ".
                                        "is not a document file");
                                }
                            break;

                            case 'bitmap':
                                if (is_array($_FILES[$name]['tmp_name'])) {
                                    foreach ($_FILES[$name]['tmp_name'] as $file) {
                                        if (!val\isBitmapFile($file)) {
                                            throw new \Exception(
                                                "A file in '$name' ".
                                                "is not a bitmap file");
                                            break;
                                        }
                                    }
                                } else if (!val\isBitmapFile($_FILES[$name]['tmp_name'])) {
                                    throw new \Exception(
                                        "The file '{$_FILES[$name]['name']}' ".
                                        "is not a bitmap file");
                                }
                            break;
                        }
                    }
                } else {
                    // if no file was send and the file was not declared as
                    // optional, throw an exception
                    if (!$isOptional) {
                        throw new \Exception("File '$name' is undefined");
                    }
                }
            },
            'array' => function($name, $value, $options) {
                // first, check if the array was declared as optional
                $hasOptionalFlag = isset($options['optional']) 
                    && array_key_exists('optional', $options);
                $isOptional = ($hasOptionalFlag) ? $options['optional'] : false;

                // then, check if the array is expected to be simple or 
                // associative
                $isSimpleArray = isset($options['values']['type'])
                    && array_key_exists('type', $options['values']);
                
                // then validate the content of the array if it's not empty
                if (count($value) > 0) {
                    // if the array is expected to be a simple one... 
                    if ($isSimpleArray) {
                        // get the validator that correspond to data type
                        // that each element is expected to have
                        $rule = $options['type'];
                        $validator = $this->validationRules[$rule];

                        // and validate each element
                        for ($i = 0; $i < count($value); $i++) {
                            $validator("$name[$i]", $value[$i], 
                                $options['values']);
                        }
                    } else {
                        // if the array is actually an associative array,
                        // recursively call this function 
                        foreach ($value as $element) {
                            $this->validateServiceInputRequirements(
                                $element, $options['values']);
                        }
                    }
                } else if (!$isOptional) {
                    // if the array is empty and it was not declared as
                    // optional, throw an exception
                    throw new Exception(
                        "Input argument $name is an empty array");
                }
            },
            'datetime' => function($name, $value, $options) {
                // check if the input argument is a date or time
                // string literal with the especified format
                $format = $options['format'];
                $isDateTime = val\isDateTime($value, $format);

                if (!$isDateTime) {
                    throw new \Exception(
                        "Input argument '$name' is not a date and/or time literal of the format '$format'"
                    );
                }
            },
            'logged_in' => function($name, $value, $options) {
                // if it does, check if the user is logged in
                $session = new Session();
                $isLoggedIn = $session->isOpen();

                if ($isLoggedIn) {
                    // if she is, then check if the service is expecting
                    // the user to have an specific role
                    $mustCheckRoles = $options !== 'any';
                    if ($mustCheckRoles) {
                        // retrieve the current role of the user
                        $role = $_SESSION['role_name'];
                        $hasProperRole = false;

                        // check if the user's role correspond to any of
                        // the roles that the service is expecting
                        foreach ($options as $requiredRole) {
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
            },
            'has_privilege' => function($name, $value, $options) {
                // first, connect to the data base
                $session = new Session();

                // check if a single or multiple permissions are required
                $isSingle = count($options['privilege']) == 1;

                // then check if the user has the given privilege in the
                // specified log
                $hasPrivilege = false;

                // temporal storage of the input data
                $p = $options['program'];
                $m = $options['module'];
                $l = $options['log'];
                $r = $options['privilege'];

                // temporal storage of the user privileges array
                $userPrivileges = $_SESSION['privileges'];

                // temporal storage for array keys
                $k = array_keys($userPrivileges);
                $k = $k[1];

                if ($isSingle) {
                    $hasPrivilege =
                        isset($userPrivileges[$k][$p][$m][$l]) &&
                        $userPrivileges[$k][$p][$m][$l]['privilege']['name'] ==
                        $r;
                } else {
                    foreach ($r as $privilege) {
                        $hasPrivilege =
                            isset($userPrivileges[$k][$p][$m][$l]) &&
                            $userPrivileges[$k][$p][$m][$l]['privilege']['name']
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
            }
        ];
    }


    // Provides the service requested by the remote client and sends back the
    // result of such service as response
    function serveRemoteClient($request)
    {
        try {
            // get the requested service
            $service = str_replace(
                SITE_ROOT.'/services/',
                '',
                $_SERVER['REQUEST_URI']
            );

            // checks if the service exits
            if (isset($this->services[$service])
                && array_key_exists($service, $this->services)) {
                // if it does, retrieve the input requirements descriptor and
                // the execution callback
                $service = $this->services[$service];
                $inputRequirements = $service['requirements_desc'];
                $callback = $service['callback'];

                // check that the input arguments are valid and that the user
                // has the proper permissions to use the service
                $this->validateServiceInputRequirements(
                    $request, $inputRequirements
                );

                // execute the service
                $result = $callback($request);
                $this->respondToRemoteClient($result);
            } else {
                throw new \Exception(
                  'The requested service does not exists.', 1
                );
            }
        } catch (\Exception $e) {
            // if there was a problem, notify the client
            $this->respondToRemoteClient(
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
    // [in]     request: the data sent from the client alongside the service
    //          request
    // [in]     requirementsDesc: an associative array of associative
    //          arrays which describe the
    //          user permission and input arguments values and formats that the
    //          service is expecting to recieve
    // [out]    throw: if any of the requirements specified in the requirements
    //          descriptor is not complied to, then an exception will be thrown
    private function validateServiceInputRequirements($request, 
        $requirementsDesc)
    {
        // we visit each input argument sent alongside the request with their
        // corresponding validation rule
        foreach ($requirementsDesc as $attribute => $options) {
            // we first check if the argument was declared as optional
            $hasOptionalFlag = isset($options['optional']) 
                && array_key_exists('optional', $options);

            $isOptional = ($hasOptionalFlag) ? $options['optional'] : false;

            // then check if the client actually sent the argument
            $hasAttribute = isset($request[$attribute]) 
                && array_key_exists($attribute, $request);

            // after that, we check if the rule to be evaluated is going to be
            // decided by the type option or by the attribute name
            $isTypedRule = isset($options['type']) 
                && array_key_exists('type', $options);

            // initialize temporal variables for the validator name and the 
            // value to validate
            $rule = NULL;
            $value = NULL;

            // if the rule is to be decided by the type attribute...
            if ($isTypedRule) {
                // check that the argument to evaluate was provided by the 
                // client
                if ($hasAttribute) {
                    // get the validator rule and value to evaluate
                    $rule = $options['type'];
                    $value = $request[$attribute];
                } else if (!$isOptional) {
                    // if the argument was not send by the client and it was not
                    // optional, we throw an exception
                    throw new \Exception("Input argument $attribute is undefined");
                }
            } else {
                // if the rule is to be decided by the attribute name, get the
                // validator rule and value to evaluate
                $rule = $attribute;
                $value = NULL;
            }

            // finally get the validator and use it to evaluate the value
            $callback = $this->validationRules[$rule];
            $callback($attribute, $value, $options);
        }
    } // function validateServiceRequirements
} // class Controller

?>
