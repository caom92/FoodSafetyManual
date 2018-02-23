import { Injectable } from '@angular/core'

// Este servicio se encarga de administrar los textos que se despliegan en la 
// pagina en el idioma elegido por el usuario
@Injectable()
export class LanguageService
{
  // La lista de traducciones para todos los textos del sistema
  private translations = {
    es: { // Español
      global: {
        wait: 'Por favor espere...',
        datePickerConfig: {
          closeOnSelect: true,
          closeOnClear: false,
          monthsFull: [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
            'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
          ],
          monthsShort: [
            'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep',
            'Oct', 'Nov', 'Dec'
          ],
          weekdaysFull: [
            'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes',
            'Sábado'
          ],
          weekdaysShort: [
            'Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'
          ],
          weekdaysLetter: [
            'D', 'L', 'M', 'R', 'J', 'V', 'S'
          ],
          today: 'Hoy',
          clear: 'Borrar',
          close: 'Cerrar',
          format: 'dddd, dd mmmm, yyyy',
          formatSubmit: "yyyy-mm-dd",
          selectYears: true,
          selectMonths: true
        },
        timePickerConfig: {
          twelvehour: false,
          donetext: 'OK',
          cleartext: 'Borrar',
          canceltext: 'Cancelar',
          autoclose: true
        }
      },
      navBar: {
        zone: 'Zona'
      },
      sideNavOptions: {
        users: 'Usuarios',
        zones: 'Zonas',
        programs: 'Bitácoras',
        supervisors: 'Supervisores',
        signatures: 'Firmas',
        reportProblem: 'Reportar Problema',
        inventory: 'Inventario',
        authorizations: 'Autorizaciones',
        editProfile: 'Editar Perfil',
        logout: 'Cerrar Sesión'
      },
      loginFormLabels: {
        title: 'Inicie Sesión',
        username: 'Nombre de Usuario',
        password: 'Contraseña',
        submit: 'Entrar'
      },
      loginForm: {
        username: {
          required: 'Este campo es obligatorio',
          minlength: 'Este campo debe tener al menos 3 caracteres'
        },
        password: {
          required: 'Este campo es obligatorio',
          minlength: 'Este campo debe tener al menos 6 caracteres'
        }
      },
      userProfileLabels: {
        title: 'Su Perfil de Usuario',
        username: 'Nombre de usuario',
        employeeNum: 'ID de Empleado',
        fullName: 'Nombre completo',
        firstName: 'Nombre(s)',
        lastName: 'Apellido(s)',
      },
      editPasswordFormLabels: {
        title: 'Cambiar la contraseña',
        newPassword: 'Nueva contraseña',
        newPasswordConfirmation: 'Confirme nueva contraseña',
        oldPassword: 'Contraseña actual',
        submit: 'Editar',
        error: 'Los campos para la nueva contraseña no coinciden'
      },
      editPasswordForm: {
        newPassword: {
          required: 'Este campo es obligatorio',
          minlength: 'Este campo debe tener al menos 6 caracteres'
        },
        newPasswordConfirmation: {
          required: 'Este campo es obligatorio',
          minlength: 'Este campo debe tener al menos 6 caracteres'
        },
        oldPassword: {
          required: 'Este campo es obligatorio',
          minlength: 'Este campo debe tener al menos 6 caracteres'
        }
      },
      editUsernameFormLabels: {
        title: 'Cambiar el nombre de usuario',
        newUsername: 'Nuevo nombre de usuario',
        password: 'Contraseña actual',
        submit: 'Editar'
      },
      editUsernameForm: {
        newUsername: {
          required: 'Este campo es obligatorio',
          minlength: 'Este campo debe tener al menos 3 caracteres'
        },
        password: {
          required: 'Este campo es obligatorio',
          minlength: 'Este campo debe tener al menos 6 caracteres'
        }
      },
      reportProblemFormLabels: {
        titles: [
          'Información General',
          'Descripción'
        ],
        username: 'Nombre de usuario',
        employeeNum: 'ID de empleado',
        zone: 'Zona defectuosa',
        program: 'Programa defectuoso',
        module: 'Módulo defectuoso',
        log: 'Bitácora defectuosa',
        browser: 'Navegador web que usa',
        severity: 'Severidad del problema',
        summary: 'Descripción del problema',
        steps: 'Pasos para replicar el problema',
        expectation: '¿Qué resultado esperaba?',
        reality: '¿Cuál fué el resultado obtenido?',
        screenshots: [
          'Adjunte 1 o más capturas de imágenes',
          'Adjuntar'
        ],
        severityLevels: [
          'Caída del programa',
          'Sin solución alternativa',
          'Tiene solución alternativa',
          'Error de documentación',
          'Trivial',
          'Defecto visual',
          'Mejora',
          'Otro'
        ],
        selectLabel: 'Elija una opción',
        submit: 'Enviar'
      },
      reportProblemForm: {
        zone: {
          required: 'Este campo es requerido'
        },
        program: {
          required: 'Este campo es requerido'
        },
        module: {
          required: 'Este campo es requerido'
        },
        log: {
          required: 'Este campo es requerido'
        },
        browser: {
          required: 'Este campo es requerido'
        },
        severity: {
          required: 'Este campo es requerido'
        },
        summary: {
          required: 'Este campo es requerido',
          maxlength: 'Este campo no debe ser mas de 1024 caracteres de largo'
        },
        steps: {
          maxlength: 'Este campo no debe ser mas de 1024 caracteres de largo'
        },
        expectation: {
          maxlength: 'Este campo no debe ser mas de 1024 caracteres de largo'
        },
        reality: {
          maxlength: 'Este campo no debe ser mas de 1024 caracteres de largo'
        }
      },
      inventoryList: {
        noInventory: 'No hay inventarios en éste módulo'
      },
      authorizationList: {
        title: 'Bitácoras pendientes de revisión',
        noPendings: 'No hay bitácoras pendientes',
        logLabel: 'Bitácora',
        employeeLabel: 'Empleado',
        dateLabel: 'Fecha'
      },
      logFootersLabels: {
        titles: [
          'Pies de Página de Bitácoras',
          'Editar pie de página'
        ],
        program: 'Programa',
        module: 'Módulo',
        tableHeaders: [
          'Programa',
          'Pie de pág. PDF',
          'Pie de pág. HTML',
          ''
        ],
        newFooter: { 
          required: 'Este campo es obligatorio',
          maxlength: 'Este campo no debe ser mas de 65535 caracteres de largo'
        }
      },
      supervisorsFormLabels: {
        title: 'Supervisores',
        zone: 'Zona',
        supervisor: 'Supervisor',
        noSupervisors: 'No hay supervisores registrados en esta zona',
        noEmployees: 'No hay empleados asignados a este supervisor',
        tableHeaders: [
          'ID de empleado',
          'Nombre'
        ],
        targetSupervisor: 'Supervisor a quien transferir los empleados',
        transferEmployeesButton: 'Transferir'
      },
      signaturesFormLabels: {
        titles: [
          'Firmas de supervisores',
          'Editar Firma'
        ],
        tableHeaders: [
          'ID de empleado',
          'Nombre',
          'Firma',
          ''
        ],
        upload: 'Subir imágen de firma',
        uploadButton: 'Subir',
        newSignature: {
          required: 'Este campo es obligatorio'
        }
      },
      zonesFormLabels: {
        title: 'Información de Zonas',
        tableHeaders: [
          'Zona',
          'Compañía',
          'Dirección',
          'Logo',
          ''
        ],
        addButton: 'Nuevo',
        zoneName: 'Nombre de la zona',
        companyName: 'Nombre de la compañía',
        address: 'Dirección de la compañía'
      },
      zonesForm: {
        zoneName: {
          required: 'Este campo es obligatorio',
          minlength: 'Este campo debe ser 3 caracteres de largo',
          maxlength: 'Este campo debe ser 3 caracteres de largo'
        },
        companyName: {
          required: 'Este campo es obligatorio',
          maxlength: 'Este campo no debe ser más de 255 caracteres de largo'
        },
        address: {
          required: 'Este campo es obligatorio',
          maxlength: 'Este campo no debe ser más de 255 caracteres de largo'
        }
      },
      usersFormLabels: {
        titles: [
          'Lista de usuarios',
          'Información del Usuario',
          'Privilegios de Usuario'
        ],
        tableHeaders: [
          'ID de Empleado',
          'Nombre',
          'Rol',
          '¿Activo?',
          'Editar'
        ],
        active: 'Sí',
        inactive: 'No',
        role: 'Rol de Usuario',
        program: 'Programa',
        privileges: 'Seleccione los permisos individuales del usuario',
        logsTableHeaders: [
          'Bitácora',
          'Ninguno',
          'Lectura',
          'Escritura'
        ],
        errors: {
          required: {
            required: 'Este campo es obligatorio'
          },
          requiredMaxLength: {
            required: 'Este campo es obligatorio',
            maxlength: 'Este campo no debe contener más de 255 caracteres'
          },
          username: {
            required: 'Este campo es obligatorio',
            minlength: 'Este campo debe contener al menos 3 caracteres'
          },
          password: {
            required: 'Este campo es obligatorio',
            minlength: 'Este campo debe contener al menos 6 caracteres'
          },
          supervisorMissing: 'Los empleados deben tener registrados un supervisor'
        }
      },
      login: {
        0: 'Sesión iniciada exitosamente',
        1: 'Las credenciales son incorrectas'
      },
      'check-session': {
        0: 'Sesión iniciada anteriormente'
      },
      'change-password': {
        0: 'La contraseña se cambió exitosamente',
        1: 'La vieja contraseña es incorrecta'
      },
      'change-username': {
        0: 'El nombre de usuario se cambió exitosamente',
        1: 'El nombre ingresado ya fue reclamado',
        2: 'La contraseña es incorrecta'
      },
      'director-change-zones': {
        0: 'La zona se cambió exitosamente',
        1: 'La zona seleccionada no pudo ser encontrada'
      },
      'send-bug-report': {
        0: 'Se envió el reporte de error exitosamente',
        1: 'Hubo un problema al enviar el reporte de error'
      },
      'approve-log': {
        0: 'Bitácora aprovada con éxito',
        1: 'No esta autorizado para aprovar esta bitácora'
      },
      'reject-log': {
        0: 'Bitácora rechazada con éxito',
        1: 'No está autorizado para rechazar esta bitácora',
        2: 'Esta bitácora ya fue aprovada'
      },
      'edit-report-footers': {
        0: 'Se editaron los pies de pagina exitosamente'
      },
      'add-signature': {
        0: 'La firma se subió exitosamente',
        1: 'Hubo un problema al subir la firma'
      },
      'add-zone': {
        0: 'Zona agregada exitosamente',
        1: 'El nombre de la zona ya está tomado',
        2: 'Falló al subirse la imágen del logo'
      },
      'edit-zone': {
        0: 'Zona editada exitosamente',
        1: 'El nombre de la zona ya está tomado',
        2: 'Falló al subirse la imágen del logo'
      },
      'assign-employees-to-supervisors': {
        0: 'Empleado(s) transferidos exitosamente',
        1: 'Los roles de usuario no son apropiados para la transferencia',
        2: 'Los empleados y el supervisor no estan en la misma zona'
      },
      'toggle-account-activation': {
        1: 'Supervisor tiene empleados asignados'
      },
      'add-user': {
        0: 'El usuario fue agregado exitosamente',
        1: 'Hace falta proporcionar el ID de Zona',
        2: 'El empleado esta en una zona diferente al supervisor elegido',
        3: 'El se eligió un usuario sin el rol apropiado como supervisor',
        4: 'Hace falta asignar un supervisor al empleado',
        5: 'Hace falta proporcionar los privilegios de bitácoras'
      },
      101: 'Faltó enviar una entrada al servidor',
      102: 'Una entrada enviada al servidor no es un valor numérico',
      103: 'Una entrada enviada al servidor esta fuera del intervalo correcto',
      104: 'Una entrada enviada al servidor no es un número entero',
      105: 'Una entrada enviada al servidor no es un número real',
      106: 'Una entrada enviada al servidor no tiene la longitud de caracteres correcta',
      107: 'La longitud de caracteres de una entrada enviada al servidor no esta dentro del intervalo apropiado',
      108: 'Una entrada enviada al servidor no es una cadena',
      109: 'Una entrada enviada al servidor no es una cadena de correo electrónico',
      110: 'Una entrada enviada al servidor no es un valor lógico',
      111: 'Una entrada enviada al servidor no es una fecha o el formato es incorrecto',
      112: 'Una entrada enviada al servidor es un arreglo vacío',
      113: 'Un archivo enviado al servidor no es un documento',
      114: 'Un archivo enviado al servidor no es una imagen',
      115: 'No se pudo enviar un archivo al servidor',
      116: 'Una entrada enviada al servidor no es un número telefónico',
      117: 'No tiene el rol apropiado para usar este servicio',
      118: 'La sesión no ha sido iniciada',
      119: 'No está autorizado para usar este servicio'
    },
    en: { // Ingles
      global: {
        wait: 'Please wait...',
        datePickerConfig: {
          closeOnSelect: true,
          closeOnClear: false,
          format: 'dddd, dd mmmm, yyyy',
          formatSubmit: "yyyy-mm-dd",
          selectYears: true,
          selectMonths: true,
        },
        timePickerConfig: {
          twelvehour: false,
          autoclose: true
        }
      },
      navBar: {
        zone: 'Zone'
      },
      sideNavOptions: {
        users: 'Users',
        zones: 'Zones',
        programs: 'Logs',
        supervisors: 'Supervisors',
        signatures: 'Signatures',
        reportProblem: 'Report Problem',
        inventory: 'Inventory',
        authorizations: 'Authorizations',
        editProfile: 'Edit Profile',
        logout: 'Log Out'
      },
      loginFormLabels: {
        title: 'Sign In',
        username: 'Username',
        password: 'Password',
        submit: 'Enter'
      },
      loginForm: {
        username: {
          required: 'This field is required',
          minlength: 'This field must be at least 3 characters long'
        },
        password: {
          required: 'This field is required',
          minlength: 'This field must be at least 6 characters long'
        }
      },
      userProfileLabels: {
        title: 'Your User Profile',
        username: 'Username',
        employeeNum: 'Employee ID',
        fullName: 'Full Name',
        firstName: 'First name',
        lastName: 'Last name',
      },
      editPasswordFormLabels: {
        title: 'Change password',
        newPassword: 'New password',
        newPasswordConfirmation: 'Confirm new password',
        oldPassword: 'Current password',
        submit: 'Edit',
        error: 'The fields for the new password differ from one another'
      },
      editPasswordForm: {
        newPassword: {
          required: 'This field is required',
          minlength: 'This field must be at least 6 characters long'
        },
        newPasswordConfirmation: {
          required: 'This field is required',
          minlength: 'This field must be at least 6 characters long'
        },
        oldPassword: {
          required: 'This field is required',
          minlength: 'This field must be at least 6 characters long'
        }
      },
      editUsernameFormLabels: {
        title: 'Change username',
        newUsername: 'New username',
        password: 'Current password',
        submit: 'Edit'
      },
      editUsernameForm: {
        newUsername: {
          required: 'This field is required',
          minlength: 'This field must be at least 3 characters long'
        },
        password: {
          required: 'This field is required',
          minlength: 'This field must be at least 6 characters long'
        }
      },
      reportProblemFormLabels: {
        titles: [
          'General Information',
          'Description'
        ],
        username: 'Username',
        employeeNum: 'Employee ID',
        zone: 'Defective zone',
        program: 'Defective program',
        module: 'Defective module',
        log: 'Defective log',
        browser: 'Web browser you use',
        severity: 'Severity of the issue',
        summary: 'Issue summary',
        steps: 'Steps to replicate the issue',
        expectation: 'What was the expected result?',
        reality: 'What was the obtained result?',
        screenshots: [
          'Attach 1 or more screenshots',
          'Attach'
        ],
        severityLevels: [
          'Crash',
          'No workaround',
          'Has workaround',
          'Documentation error',
          'Trivial',
          'Visual defect',
          'Enhancement',
          'Other'
        ],
        selectLabel: 'Select an option',
        submit: 'Send'
      },
      reportProblemForm: {
        zone: {
          required: 'This field is required'
        },
        program: {
          required: 'This field is required'
        },
        module: {
          required: 'This field is required'
        },
        log: {
          required: 'This field is required'
        },
        browser: {
          required: 'This field is required'
        },
        severity: {
          required: 'This field is required'
        },
        summary: {
          required: 'This field is required',
          maxlength: 'This field should be no more than 1024 characters long'
        },
        steps: {
          maxlength: 'This field should be no more than 1024 characters long'
        },
        expectation: {
          maxlength: 'This field should be no more than 1024 characters long'
        },
        reality: {
          maxlength: 'This field should be no more than 1024 characters long'
        }
      },
      inventoryList: {
        noInventory: 'There is no inventory in this module'
      },
      authorizationList: {
        title: 'Logs pending review',
        noPendings: 'There are no logs pending',
        logLabel: 'Log',
        employeeLabel: 'Employee',
        dateLabel: 'Date'
      },
      logFootersLabels: {
        titles: [
          "Log's Page Footers",
          'Edit page footer'
        ],
        program: 'Program',
        module: 'Module',
        tableHeaders: [
          'Program',
          'PDF Footer',
          'HTML Footer',
          ''
        ],
        newFooter: {
          required: 'This field is required',
          maxlength: 'This filed must not be more than 65535 characters long'
        }
      },
      supervisorsFormLabels: {
        title: 'Supervisors',
        zone: 'Zone',
        supervisor: 'Supervisor',
        noSupervisors: 'There are no supervisors registered in this zone',
        noEmployees: 'There are no employees assigned to this supervisor',
        tableHeaders: [
          'Employee ID',
          'Name'
        ],
        targetSupervisor: 'Supervisor to which transfer the employees',
        transferEmployeesButton: 'Transfer'
      },
      signaturesFormLabels: {
        titles: [
          "Supervisors' Signatures",
          'Edit Signature'
        ],
        tableHeaders: [
          'Employee ID',
          'Name',
          'Signature',
          ''
        ],
        upload: 'Upload signature image file',
        uploadButton: 'Upload',
        newSignature: {
          required: 'This filed is required'
        }
      },
      zonesFormLabels: {
        title: "Zones' Information",
        tableHeaders: [
          'Zone',
          'Company',
          'Address',
          'Logo',
          ''
        ],
        addButton: 'New',
        zoneName: "Zone's name",
        companyName: "Company's name",
        address: "Company's address"
      },
      zonesForm: {
        zoneName: {
          required: 'This field is required',
          minlength: 'This field must be 3 characters long',
          maxlength: 'This field must be 3 characters long'
        },
        companyName: {
          required: 'This field is required',
          maxlength: 'This field must not be more than 255 characters long'
        },
        address: {
          required: 'This field is required',
          maxlength: 'This field must not be more than 255 characters long'
        }
      },
      usersFormLabels: {
        titles: [
          'List of users',
          'User Information',
          'User Privileges'
        ],
        tableHeaders: [
          'Employee ID',
          'Name',
          'Role',
          'Active?',
          'Edit'
        ],
        active: 'Yes',
        inactive: 'No',
        role: 'User Role',
        program: 'Program',
        privileges: 'Select individual user privileges',
        logsTableHeaders: [
          'Log',
          'None',
          'Read',
          'Write'
        ],
        errors: {
          required: {
            required: 'This field is required'
          },
          requiredMaxLength: {
            required: 'This field is required',
            maxlength: 'This field must not be more than 255 characters long'
          },
          username: {
            required: 'This field is required',
            minlength: 'This field must be at least 3 characters long'
          },
          password: {
            required: 'This field is required',
            minlength: 'This field must be at least 3 characters long'
          },
          passwordEdit: {
            minlength: 'This field must be at least 3 characters long'
          },
          supervisorMissing: 'Employees must have a supervisor registered'
        }
      },
      login: {
        0: 'Logged in successfully',
        1: 'Log in credentials are incorrect'
      },
      'check-session': {
        0: 'Already logged in'
      },
      'change-password': {
        0: 'Password changed successfully',
        1: 'Current password is incorrect'
      },
      'change-username': {
        0: 'Username changed successfully',
        1: 'The user name is already taken',
        2: 'The password is incorrect'
      },
      'director-change-zones': {
        0: 'Zone changed successfully',
        1: "The selected zone couldn't be found"
      },
      'send-bug-report': {
        0: 'The bug report was sent successfully',
        1: 'There was a problem sending the bug report'
      },
      'approve-log': {
        0: 'Log approved successfully',
        1: 'You are not allowed to approve this log'
      },
      'reject-log': {
        0: 'Log rejected successfully',
        1: 'You are not allowed to reject this log',
        2: 'The log has already been approved'
      },
      'edit-report-footers': {
        0: 'The footers were edited successfully'
      },
      'add-signature': {
        0: 'Signature uploaded successfully',
        1: 'There was an error uploading the signature'
      },
      'add-zone': {
        0: 'Zone added successfully',
        1: 'The zone name is already taken',
        2: 'Failed to upload the logo image file'
      },
      'edit-zone': {
        0: 'Zone edited successfully',
        1: 'The zone name is already taken',
        2: 'Failed to upload the logo image file'
      },
      'assign-employees-to-supervisors': {
        0: 'Employee(s) transfered successfully',
        1: 'The user roles are not correct for the transfer',
        2: 'Employee(s) to transfer and supervisor are not in the same zone'
      },
      'toggle-account-activation': {
        1: 'Supervisor has employees assigned'
      },
      'add-user': {
        0: 'User was added successfully',
        1: 'No Zone ID was provided',
        2: 'Employee and supervisor are on different zones',
        3: 'User chosed as supervisor does not have the proper role',
        4: 'No supervisor was assigned',
        5: 'Log privileges were not provided'
      },
      101: 'A server input argument was not send',
      102: 'A server input argument is not a numeric value',
      103: 'A server input argument is outside the correct interval',
      104: 'A server input argument is not an integer',
      105: 'A server input argument is not a real number',
      106: "A server input argument doesn't have the proper character length",
      107: 'The character length of a server input argument is not within the proper interval',
      108: 'A server input argument is not a string',
      109: 'A server input argument is not an email string',
      110: 'A server input argument is not a boolean value',
      111: 'A server input argument is not a date or the format is incorrect',
      112: 'A server input argument is an empty array',
      113: 'A file sent to the server is not a document',
      114: 'A file sent to the server is not an image',
      115: 'A file could not be sent to the server',
      116: 'A server input argument is not a phone number',
      117: 'The user does not have the proper role to use this service',
      118: 'You are not logged in',
      119: 'You are not authorized to use this service'
    }
  }

  // Las interfaces publicas a todos los textos del sistema; el sistema 
  // desplegara cualquier texto que este almacenado aqui
  messages = {
    global: {
      wait: null
    },
    navBar: {
      zone: null
    },
    sideNavOptions: {
      users: null,
      zones: null,
      programs: null,
      supervisors: null,
      signatures: null,
      problem: null,
      inventory: null,
      authorizations: null,
      editProfile: null,
      logout: null
    },
    loginFormLabels: {
      title: null,
      username: null,
      password: null,
      submit: null
    },
    loginForm: {
      username: {
        required: null,
        minlength: null
      },
      password: {
        required: null,
        minlength: null
      }
    },
    userProfileLabels: {
      title: null,
      username: null,
      employeeNum: null,
      fullName: null,
      firstName: null,
      lastName: null,
    },
    editPasswordFormLabels: {
      title: null,
      newPassword: null,
      newPasswordConfirmation: null,
      oldPassword: null,
      submit: null,
      error: null
    },
    editPasswordForm: {
      newPassword: {
        required: null,
        minlength: null
      },
      newPasswordConfirmation: {
        required: null,
        minlength: null
      },
      oldPassword: {
        required: null,
        minlength: null
      }
    },
    editUsernameFormLabels: {
      title: null,
      newUsername: null,
      password: null,
      submit: null,
    },
    editUsernameForm: {
      newUsername: {
        required: null,
        minlength: null
      },
      password: {
        required: null,
        minlength: null
      }
    },
    reportProblemFormLabels: {
      titles: [ null, null ],
      username: null,
      zone: null,
      program: null,
      module: null,
      log: null,
      browser: null,
      summary: null,
      steps: null,
      expectation: null,
      reality: null,
      screenshots: [ null, null ],
      selectLabel: null,
      submit: null
    },
    reportProblemForm: {
      zone: {
        required: null
      },
      program: {
        required: null
      },
      module: {
        required: null
      },
      log: {
        required: null
      },
      browser: {
        required: null
      },
      severity: {
        required: null
      },
      summary: {
        required: null,
        maxlength: null
      },
      steps: {
        maxlength: null
      },
      expectation: {
        maxlength: null
      },
      reality: {
        maxlength: null
      }
    },
    inventoryList: {
      noInventory: null
    },
    authorizationList: {
      title: null,
      noPendings: null,
      logLabel: null,
      employeeLabel: null,
      dateLabel: null
    },
    logFootersLabels: {
      titles: [ null, null ],
      program: null,
      module: null,
      tableHeaders: [ null, null, null, null ],
      newFooter: {
        required: null,
        maxlength: null
      }
    },
    supervisorsFormLabels: {
      title: null,
      zone: null,
      supervisor: null,
      noSupervisors: null,
      noEmployees: null,
      tableHeaders: [ null, null ],
      targetSupervisor: null,
      transferEmployeesButton: null
    },
    signaturesFormLabels: {
      titles: [ null, null ],
      tableHeaders: [ null, null, null, null ],
      upload: null,
      uploadButton: null,
      newSignature: {
        required: null
      }
    },
    zonesFormLabels: {
      title: null,
      tableHeaders: [ null, null, null, null, null ],
      addButton: null,
      zoneName: null,
      companyName: null,
      address: null
    },
    zonesForm: {
      zoneName: {
        required: null,
        minlength: null,
        maxlength: null
      },
      companyName: {
        required: null,
        maxlength: null
      },
      address: {
        required: null,
        maxlength: null
      }
    },
    usersFormLabels: {
      titles: [ null, null, null ],
      tableHeaders: [ null, null, null, null, null ],
      active: null,
      inactive: null,
      role: null,
      program: null,
      privileges: null,
      logsTableHeaders: [
        null,
        null,
        null,
        null
      ]
    }
  }

  // Inicializa todos los textos de la aplicacion con el idioma que este 
  // seleccionado en ese momento, cualquiera que sea
  initMessages(): void {
    for (let msg in this.messages) {
      this.messages[msg] = this.translations[localStorage.lang][msg]
    }
  }

  // Cambia los textos del sistema para que correspondan al idioma especificado
  // [in]   lang: el idioma elegido por el usuario, debe ser una opcion de:
  //        'en' o 'es'
  changeLanguage(lang: string): void {
    localStorage.lang = lang
    for (let msg in this.messages) {
      this.messages[msg] = this.translations[lang][msg]
    }
  }

  // Retorna el texto en el idioma elegido que sea adecuado para la combinacion 
  // de nombre de servicio y codigo de resultado especificados
  // [in]   service: el nombre del servicio cuyo mensaje queremos obtener
  // [in]   code: el codigo de resultado obtenido tras solicitar dicho servicio
  // [out]  return: el texto correspondiente al resultado obtenido por el 
  //        servicio especificado en el idioma seleccionado
  getServiceMessage(service: string, code: number): string {
    // inicializamos el almacenamiento temporal para el mensaje resultante
    let message = null
    
    if (this.translations[localStorage.lang][service] !== undefined) {
      // si existe la combinacion de servicio y codigo de resultado 
      // especificados, retornamos ese
      message = this.translations[localStorage.lang][service][code]
    } else if (this.translations[localStorage.lang][code] !== undefined) {
      // si la combinacion no existe, buscamos el mensaje que corresponda 
      // unicamente el codigo de resultado especificado
      message = this.translations[localStorage.lang][code]
    } else {
      // si no se encontro un texto apropiado para ninguno de los dos casos, 
      // retornamos uno generico
      message = (localStorage.lang == 'en') ?
        'An unknown error occurred'
        : 'Ocurrió un error desconocido'
    }

    // retornamos el texto obtenido
    return message
  }
}