<?php

namespace fsm\services;

// Import all the services
require_once realpath(dirname(__FILE__).'/CheckServerStatusService.php');
require_once realpath(dirname(__FILE__).'/AccountServices.php');
require_once realpath(dirname(__FILE__).'/MailBugReportService.php');
require_once realpath(dirname(__FILE__).'/ZoneServices.php');
require_once realpath(dirname(__FILE__).'/ProgramsServices.php');
require_once realpath(dirname(__FILE__).'/ModulesServices.php');
require_once realpath(dirname(__FILE__).'/UsersServices.php');

// Interface for creating executable services depending on the service that was 
// requested by the user
class ServiceFactory 
{
    // The instance of the requested service
    private $service;


    // Creates a service factory instance that can create instances of the 
    // specified service
    function __construct($service)
    {
        switch ($service) {
            default: 
              throw new \Exception('The requested service does not exists.'); 
            break;

            case 'status':
                $this->service = new CheckServerStatusService();
            break;

            case 'login':
                $this->service = new LogInService();
            break;

            case 'logout':
                $this->service = new LogOutService();
            break;
            
            case 'check-session':
                $this->service = new IsLoggedInService();
            break;

            case 'request-password-recovery':
                $this->service = new RequestPasswordRecoveryService();
            break;

            case 'token-validation':
                $this->service = new ValidateTokenService();
            break;

            case 'change-username':
                $this->service = new ChangeLogInNameService();
            break;

            case 'change-password':
                $this->service = new ChangePasswordService();
            break;

            case 'change-password-by-recovery':
                $this->service = new ChangePasswordByRecoveryService();
            break;

            case 'change-email':
                $this->service = new ChangeEmailService();
            break;

            case 'send-bug-report':
                $this->service = new MailBugReportService();
            break;

            case 'list-zones':
                $this->service = new ListAllZonesService();
            break;

            case 'list-programs':
                $this->service = new ListAllProgramsService();
            break;

            case 'get-modules-of-program':
                $this->service = new ListModulesOfProgramService();
            break;

            case 'list-users':
                $this->service = new ListAllUsersService();
            break;

            case 'get-user-privileges':
                $this->service = new ListUserPrivilegesService();
            break;

            case 'list-privileges':
                $this->service = new ListAllPrivilegesService();
            break;

            case 'add-zone':
                $this->service = new AddNewZoneService();
            break;

            case 'is-zone-name-duplicated':
                $this->service = new CheckZoneNameDuplicationService();
            break;

            case 'is-login-name-duplicated':
                $this->service = new CheckLogInNameDuplicationService();
            break;

            case 'is-email-duplicated':
                $this->service = new CheckEmailDuplicationService();
            break;

            case 'is-employee-num-duplicated':
                $this->service = new CheckEmployeeNumDuplicationService();
            break;

            case 'add-user':
                $this->service = new AddNewUserService();
            break;

            case 'list-user-roles':
                $this->service = new ListAllUserRolesService();
            break;

            case 'list-zones-programs-modules-privileges':
                $this->service = 
                    new ListAllZonesProgramsModulesAndPrivilegesService();
            break;

            case 'get-inventory':
                $this->service = new ListInventoryItemsService();
            break;

            case 'toggle-email-notifications':
                $this->service = new ToggleEmailNotificationsService();
            break;

            case 'discharge_inventory_item':
                $this->service = new DischargeInventoryItemService();
            break;

            case 'add-inventory-item':
                $this->service = new AddNewInventoryItemService();
            break;

            case 'edit-user-permissions':
                $this->service = new EditUserPrivilegesService();
            break;

            case 'list-avaliable-inventory-items':
                $this->service = new ListAvailableInventoryItemsService();
            break;

            case 'get-employee-info':
                $this->service = new GetUserInfoService();
            break;

            case 'toggle-account-activation':
                $this->service = new ToggleAccountActivationService();
            break;

            case 'list-programs-and-modules':
                $this->service = new ListAllProgramsAndModules();
            break;

            case 'list-workplace-area-hardware':
                $this->service = new ListWorkplaceAreaHardware();
            break;
        }
    }


    // Returns an instance of the requested service
    function createService()
    {
        return $this->service;
    }
}

?>