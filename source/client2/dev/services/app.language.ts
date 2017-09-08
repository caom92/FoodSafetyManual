import { Injectable } from '@angular/core'

// Este servicio se encarga de administrar los textos que se despliegan en la 
// pagina en el idioma elegido por el usuario
@Injectable()
export class LanguageService
{
  // Las interfaces publicas a todos los textos del sistema; el sistema 
  // desplegara cualquier texto que este almacenado aqui
  messages = {
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
      fullName: null
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
    }
  }

  // La lista de traducciones para todos los textos del sistema
  private translations = {
    es: { // Español
      sideNavOptions: {
        users: 'Usuarios',
        zones: 'Zonas',
        programs: 'Programas',
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
        fullName: 'Nombre completo'
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
      sideNavOptions: {
        users: 'Users',
        zones: 'Zones',
        programs: 'Programs',
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
        fullName: 'Full Name'
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

  // Inicializa todos los textos de la aplicacion con el idioma que este 
  // seleccionado en ese momento, cualquiera que sea
  initMessages() {
    for (let msg in this.messages) {
      this.messages[msg] = this.translations[localStorage.lang][msg]
    }
  }

  // Cambia los textos del sistema para que correspondan al idioma especificado
  // [in]   lang: el idioma elegido por el usuario, debe ser una opcion de:
  //        'en' o 'es'
  changeLanguage(lang: string) {
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
  getServiceMessage(service: string, code: number) {
    // inicializamos el almacenamiento temporal para el mensaje resultante
    let message = null
    
    if (this.translations[localStorage.lang][service][code] !== undefined) {
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