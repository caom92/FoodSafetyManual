<?php

require_once realpath(dirname(__FILE__).'/server_services.php');
require_once realpath(dirname(__FILE__).'/session_services.php');
require_once realpath(dirname(__FILE__).'/password_recovery_services.php');
require_once realpath(dirname(__FILE__).'/account_services.php');
require_once realpath(dirname(__FILE__).'/zone_services.php');
require_once realpath(dirname(__FILE__).'/programs_services.php');
require_once realpath(dirname(__FILE__).'/inventory_services.php');
require_once realpath(dirname(__FILE__)
    .'/gmp/packing/preop/preop_services.php');


// The list of services that the server can provide
fsm\Controller::$services = [
    'status' => [
        'requirements_desc' => [],
        'callback' => 'fsm\services\server\checkStatus'
    ],
    'send-bug-report' => [
        'requirements_desc' => [
            'logged_in' => 'any',
            'zone-selection' => [
                'type' => 'string'
            ],
            'procedure-selection' => [
                'type' => 'string'
            ],
            'severity-selection' => [
                'type' => 'string'
            ],
            'summary' => [
                'type' => 'string',
                'min_length' => 3,
                'max_length' => 512
            ],
            'lang' => [
                'type' => 'lang'
            ],
            'email' => [
                'type' => 'email'
            ]
        ],
        'callback' => 'fsm\services\server\mailBugReport'
    ],
    'list-programs-modules-logs' => [
        'requirements_desc' => [
            'logged_in' => ['Administrator']
        ],
        'callback' => 'fsm\services\server\getAllProgramsModulesAndLogs'
    ],
    'login' => [
        'requirements_desc' => [
            'username' => [
                'type' => 'string',
                'min_length' => 5
            ],
            'password' => [
                'type' => 'string',
                'min_length' => 6
            ]
        ],
        'callback' => 'fsm\services\session\logIn'
    ],
    'logout' => [
        'requirements_desc' => [],
        'callback' => 'fsm\services\session\logOut'
    ],
    'check-session' => [
        'requirements_desc' => [],
        'callback' => 'fsm\services\session\isLoggedIn'
    ],
    'request-password-recovery' => [
        'requirements_desc' => [
            'email' => [
                'type' => 'email'
            ],
            'lang' => [
                'type' => 'lang'
            ]
        ],
        'callback' => 'fsm\services\recovery\requestPasswordRecovery'
    ],
    'token-validation' => [
        'requirements_desc' => [
            'token' => [
                'type' => 'string',
                'length' => 128
            ]
        ],
        'callback' => 'fsm\services\recovery\validateToken'
    ],
    'change-password-by-recovery' => [
        'requirements_desc' => [
            'new_password' => [
                'type' => 'string',
                'min_length' => 6
            ],
            'token' => [
                'type' => 'string',
                'length' => 128
            ]
        ],
        'callback' => 'fsm\services\recovery\resetPassword'
    ],
    'list-users' => [
        'requirements_desc' => [
            'logged_in' => [ 'Administrator' ]
        ],
        'callback' => 'fsm\services\account\getAllUsersAccountInfo'
    ],
    'get-employee-info' => [
        'requirements_desc' => [
            'logged_in' => ['Administrator'],
            'employee_num' => [
                'type' => 'int'
            ]
        ],
        'callback' => 'fsm\services\account\getUserAccountInfo'
    ],
    'is-login-name-duplicated' => [
        'requirements_desc' => [
            'logged_in' => 'any',
            'login_name' => [
                'type' => 'string',
                'min_length' => 5
            ]
        ],
        'callback' => 'fsm\services\account\isLogInNameDuplicated'
    ],
    'is-email-duplicated' => [
        'requirements_desc' => [
            'logged_in' => 'any',
            'email' => [
                'type' => 'email'
            ]
        ],
        'callback' => 'fsm\services\account\isEmailDuplicated'
    ],
    'is-employee-num-duplicated' => [
        'requirements_desc' => [
            'logged_in' => ['Administrator'],
            'employee_num' => [
                'type' => 'int'
            ]
        ],
        'callback' => 'fsm\services\account\isEmployeeNumDuplicated'
    ],
    'change-username' => [
        'requirements_desc' => [
            'logged_in' => 'any',
            'password' => [
                'type' => 'string',
                'min_length' => 6
            ],
            'new_username' => [
                'type' => 'string',
                'min_length' => 5
            ]
        ],
        'callback' => 'fsm\services\account\editLogInName'
    ],
    'change-email' => [
        'requirements_desc' => [
            'logged_in' => 'any',
            'password' => [
                'type' => 'string',
                'min_length' => 6
            ],
            'new_email' => [
                'type' => 'email'
            ]
        ],
        'callback' => 'fsm\services\account\editEmail'
    ],
    'change-password' => [
        'requirements_desc' => [
            'logged_in' => 'any',
            'password' => [
                'type' => 'string',
                'min_length' => 6
            ],
            'new_password' => [
                'type' => 'string',
                'min_length' => 6
            ]
        ],
        'callback' => 'fsm\services\account\editPassword'
    ],
    'toggle-account-activation' => [
        'requirements_desc' => [
            'logged_in' => [ 'Administrator'],
            'user_id' => [
                'type' => 'int'
            ]
        ],
        'callback' => 'fsm\services\account\toggleAccountActivation'
    ],
    'list-privileges' => [
        'requirements_desc' => [
            'logged_in' => ['Administrator']
        ],
        'callback' => 'fsm\services\account\getAllUserPrivileges'
    ],
    'list-user-roles' => [
        'requirements_desc' => [
            'logged_in' => ['Administrator']
        ],
        'callback' => 'fsm\services\account\getAllUserRoles'
    ],
    'add-user' => [
        'requirements_desc' => [
            'logged_in' => ['Administrator'],
            'username' => [
                'type' => 'string',
                'min_length' => 5,
            ],
            'employee_num' => [
                'type' => 'int'
            ],
            'first_name' => [
                'type' => 'string'
            ],
            'last_name' => [
                'type' => 'string'
            ],
            'email' => [
                'type' => 'email'
            ],
            'role_id' => [
                'type' => 'int'
            ],
            'login_name' => [
                'type' => 'string',
                'min_length' => 5
            ],  
            'login_password' => [
                'type' => 'string',
                'min_length' => 6
            ]
        ],
        'callback' => 'fsm\services\account\addNewUserAccount'
    ],
    'edit-user-privileges' => [
        'requirements_desc' => [
            'logged_in' => ['Administrator'],
            'user_id' => [
                'type' => 'int'
            ],
            'privileges' => [
                'type' => 'array'
            ]
        ],
        'callback' => 'fsm\services\account\editPrivileges'
    ],
    'get-privileges-of-employee' => [
        'requirements_desc' => [
            'logged_in' => ['Administrator'],
            'employee_num' => [
                'type' => 'int'
            ]
        ],
        'callback' => 'fsm\services\account\getPrivilegesOfUser'
    ],
    'list-zones' => [
        'requirements_desc' => [
            'logged_in' => ['Administrator', 'Director']
        ],
        'callback' => 'fsm\services\zone\getAllZones'
    ],
    'is-zone-name-duplicated' => [
        'requirements_desc' => [
            'logged_in' => [ 'Administrator' ],
            'zone_name' => [
                'type'=> 'string',
                'length' => 3
            ]
        ],
        'callback' => 'fsm\services\zone\isZoneNameDuplicated'
    ],
    'add-zone' => [
        'requirements_desc' => [
            'logged_in' => ['Administrator'],
            'new_zone' => [
                'type' => 'string',
                'length' => 3
            ]
        ],
        'callback' => 'fsm\services\zone\addNewZone'
    ],
    'list-programs' => [
        'requirements_desc' => [
            'logged_in' => [ 'Administrator' ]
        ],
        'callback' => 'fsm\services\program\getAllPrograms'
    ],
    'get-modules-of-program' => [
        'requirements_desc' => [
            'logged_in' => [ 'Administrator' ],
            'program_id' => [
                'type' => 'int'
            ]
        ],
        'callback' => 'fsm\services\program\getAllModulesOfProgram'
    ],
    'get-areas-of-zone' => [
        'requirements_desc' => [
            'logged_in' => ['Supervisor']
        ],
        'callback' => 'fsm\services\inventory\getWorkingAreasOfZone'
    ], 
    'get-items-of-area' => [
        'requirements_desc' => [
            'logged_in' => ['Supervisor'],
            'area_id' => [
                'type' => 'int'
            ]
        ],
        'callback' => 'fsm\services\inventory\getItemsOfWorkingArea'
    ],
    'list-item-types' => [
        'requirements_desc' => [
            'logged_in' => ['Supervisor']
        ],
        'callback' => 'fsm\services\inventory\getAllItemTypes'
    ],
    'toggle-item-activation' => [
        'requirements_desc' => [
            'logged_in' => ['Supervisor'],
            'item_id' => [
                'type' => 'int'
            ]
        ],
        'callback' => 'fsm\services\inventory\toggleActivationOfItem'
    ],
    'add-new-inventory-item' => [
        'requirements_desc' => [
            'logged_in' => ['Supervisor'],
            'area_id' => [
                'type' => 'int'
            ],
            'type_id' => [
                'type' => 'int'
            ],
            'name' => [
                'type' => 'string',
                'max_length' => 64
            ]
        ],
        'callback' => 'fsm\services\inventory\addNewItem'
    ],
    'get-items-of-zone' => [
        'requirements_desc' => [
            'logged_in' => ['Manager', 'Supervisor', 'Employee'],
            'has_privilege' => [
                'privilege' => ['Read', 'Write'],
                'program' => 'GMP',
                'module' => 'Packing',
                'log' => 'Pre-Operational Inspection'
            ]
        ],
        'callback' => 'fsm\services\inventory\getItemsOfZone'
    ],
    'change-order-of-item' => [
        'requirements_desc' => [
            'logged_in' => ['Supervisor'],
            'item_id' => [
                'type' => 'int'
            ],
            'position' => [
                'type' => 'int'
            ]
        ],
        'callback' => 'fsm\services\inventory\changeItemPosition'
    ],
    'list-corrective-actions' => [
        'requirements_desc' => [
            'logged_in' => 'any'
        ],
        'callback' => 'fsm\services\gmp\packing\preop\getAllCorrectiveActions'
    ],
    'capture-gmp-packing-preop' => [
        'requirements_desc' => [
            'logged_in' => ['Employee'],
            'has_privilege' => [
                'privilege' => 'Write',
                'program' => 'GMP',
                'module' => 'Packing',
                'log' => 'Pre-Operational Inspection'
            ],
            'user_id' => [
                'type' => 'int'
            ],
            'date' => [
                'type' => 'datetime',
                'format' => 'Y-m-d'
            ],
            'area_log' => [
                'type' => 'array'
            ]
        ],
        'callback' => 'fsm\services\gmp\packing\preop\registerLogEntry'
    ],
    'report-gmp-packing-preop' => [
        'requirements_desc' => [
            'logged_in' => ['Manager', 'Supervisor', 'Employee'],
            'has_privilege' => [
                'privilege' => ['Read', 'Write'],
                'program' => 'GMP',
                'module' => 'Packing',
                'log' => 'Pre-Operational Inspection'
            ],
            'start_date' => [
                'type' => 'datetime',
                'format' => 'Y-m-d'
            ],
            'end_date' => [
                'type' => 'datetime',
                'format' => 'Y-m-d'
            ]
        ],
        'callback' => 'fsm\services\gmp\packing\preop\getReportData'
    ],
    'upload-manual-gmp-packing-preop' => [
        'requirements_desc' => [
            'logged_in' => ['Director', 'Manager', 'Supervisor'],
            'has_privilege' => [
                'privilege' => ['Read'],
                'program' => 'GMP',
                'module' => 'Packing',
                'log' => 'Pre-Operational Inspection'
            ],
            'manual_file' => [
                'type' => 'files'
            ]
        ],
        'callback' => 'fsm\services\gmp\packing\preop\uploadManualFile'
    ],
    'director-change-zones' => [
        'requirements_desc' => [
            'logged_in' => ['Director'],
            'zone_id' => [
                'type' => 'int'
            ]
        ],
        'callback' => 'fsm\services\account\changeZoneOfDirector'
    ]
];

?>