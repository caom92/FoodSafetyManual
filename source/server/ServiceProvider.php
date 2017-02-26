<?php

// Importamos los archivos de configuracion 
require_once realpath(dirname(__FILE__).'/config/site_config.php');

// Importamos las librerias
require_once realpath(dirname(__FILE__).'/../../external/autoload.php');

// Importamos la libreria de validaciones de datos
require_once realpath(dirname(__FILE__).'/data_validations.php');

// Indicamos alias para las clases de PSR-7
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;


// Esta clase representa el objeto que nos permite recibir una peticion del 
// cliente, procesarla y entregarle un recurso como resultado
class ServiceProvider
{
  // Instancia de la aplicacion Slim que nos permite manejar las peticiones
  private $app;

  // Instancia del contenedor de la aplicacion Slim que nos permite inyectar 
  // servicios en el contexto global 
  private $container;

  // Una lista de todas las reglas de validacion que se pueden aplicar a 
  // los datos de entrada recibidos desde cliente al ejecutar un servicio
  private static $validationRules;


  // Crea una instancia del manejador de servicios
  function __construct($scope, $services) {
    // Creamos una instancia de Slim con la configuracion indicada
    $this->app = new \Slim\App([
      'settings' => [
        'displayErrorDetails' => true
      ]
    ]);

    // Obtenemos el contenedor de Slim para poder inyectar servicios adicionales
    $this->container = $this->app->getContainer();

    // Inyectamos el servicio PDO para manejar logs en el servidor
    $this->container['log'] = function($config) {
      // creamos una instancia del logger
      $logger = new \Monolog\Logger('tdiary');

      // agregamos el manejador de archivos a la pila de manejadores para 
      // desplegar la informacion en el archivo indicado por la configuracion 
      // del servidor
      $logger->pushHandler(new \Monolog\Handler\StreamHandler(
        realpath(dirname(__FILE__)).'/'.SERVER_LOG_FILE
      ));

      // retornamos la instancia de Monolog
      return $logger;
    };

    // Inyectamos el manejador de sesiones
    $this->container['session'] = function($config) {
      ini_set('session.name', 'SessionCookie');
      ini_set('session.hash_function', 'sha512');
      ini_set('session.cookie_httponly', '1');
      ini_set('session.use_strict_mode', '1');
      $factory = new \Aura\Session\SessionFactory;
      return $factory->newInstance($_COOKIE);
    };

    // Configuramos los objetos de error retornados por el servidor al toparse
    // con los errores HTTP 404 y 405 para que retornen objetos JSON igual que 
    // todas las otras respuestas del servidor
    $this->container['notFoundHandler'] = function($config) {
      return function ($request, $response) use ($config) {
        return $config['response']
          ->withStatus(404)
          ->withHeader('Content-Type', 'application/json;charset=utf8')
          ->write(ServiceProvider::prepareResponse([], 404, 
            'The requested service does not exist'));
      };
    };

    $this->container['notAllowedHandler'] = function($config) {
      return function($request, $response, $methods) use ($config) {
        return $config['response']
          ->withStatus(405)
          ->withHeader('Allow', implode(', ', $methods))
          ->withHeader('Content-type', 'application/json;charset=utf8')
          ->write(ServiceProvider::prepareResponse([], 405, 
            'Method must be one of: ' . implode(', ', $methods)));
      };
    };

    // Ahora visitamos cada elemento del arreglo de servicios de contexto de 
    // Slim
    foreach ($scope as $name => $callback) {
      $this->container[$name] = $callback;
    }

    // Ahora visitamos cada elemento del arreglo de servicios
    foreach ($services as $method => $serviceList) {
      foreach ($serviceList as $name => $service) {
        // guardamos el URI completo con el cual se puede solicitar la ejecucion
        // de este servicio
        $name = SERVER_SERVICE_ROOT.$name;

        // creamos la funcion que contiene las acciones a ejecutar cuando se
        // llama este servicio
        $callback = function(Request $request, Response $response) 
          use ($service)
        {
          // preparamos los encabezados de la respuesta a enviar al cliente
          $response = $response->withHeader('Content-Type', 
            'application/json;charset=utf8');

          // inicializamos la variable que almacenara el resultado del servicio
          $result = NULL;

          // intentamos ejecutar el servicio
          try {
            // necesitamos obtener los datos de entrada que fueron enviados 
            // como JSON
            $json = json_decode($request->getBody(), true);

            // validamos los datos de entrada recibidos por el servicio desde el
            // cliente
            ServiceProvider::validateServiceInputArguments(
              $this, $json, $service['requirements_desc']
            );

            // ejecutamos el servicio
            $result = $service['callback']($this, $json);

            // preparamos la respuesta a enviar al cliente
            $result = ServiceProvider::prepareResponse($result);
          } catch (Exception $e) {
            // si una exception fue lanzada, retornamos un mensaje de error al 
            // cliente
            $this->log->error($e->getMessage());
            $result = ServiceProvider::prepareResponse(
              [], $e->getCode(), $e->getMessage()
            );
          } finally {
            // escribimos la respuesta
            $response->getBody()->write($result);
          }

          // y la enviamos al cliente
          return $response;
        };

        // configuramos el servicio dependiendo del metodo HTTP que debe 
        // utilizar
        switch ($method) {
          case 'GET':
            $this->app->get($name, $callback);
          break;

          case 'POST':
            $this->app->post($name, $callback);
          break;
        }
      }
    }
  }


  // Agrega una nueva regla de validacion para los datos de entrada que pueden
  // ser enviados desde el cliente junto con una peticion para un servicio
  // [in]   name (string): el nombre de la regla de validacion que va a ser
  //        agregada
  // [in]   callback (function(scope:object, name:string, value:any, 
  //        options:array)): la funcion a invocar para ejecutar la regla de 
  //        validacion y validar un campo de entrada
  static function addValidationRule($name, $callback) {
    self::$validationRules[$name] = $callback;
  }

  
  // Ejecutamos la aplicacion para atender las peticiones recibidas
  function serveRemoteClient() {
    $this->app->run();
  }


  // Inyecta un nuevo servicio en el contexto de Slim
  // [in]   name (string): el nombre de la variable en donde se va a almacenar 
  //        este servicio
  // [in]   callback (function(config:array):any): la funcion que creara la 
  //        instancia del servicio al momento de ser inyectado desde el contexto
  function addScopeService($name, $callback) {
    $this->container[$name] = $callback;
  }


  // Prepara el objeto JSON que sera enviado como respuesta al cliente
  // [in]   response (ResponseInterface): el objeto PSR-7 que almacena nuestra
  //        respuesta
  // [in]   [data] (array): arreglo asociativo que contiene los datos a 
  //        retornar al cliente
  // [in]   [code] (int): el codigo de retorno que representa el estado en el 
  //        cual concluyo la ejecucion del servicio; 0 significa exito
  // [in]   [message] (string): una cadena que contiene un mensaje descriptivo
  //        sobre el resultado retornado por el servicio
  private static function prepareResponse($data = [], $code = 0, 
    $message = 'Success') 
  {
    // revisamos si tanto el mensaje como el codigo de retorno indican 
    // que el servicio concluyo exitosamente con su ejecucion
    $isCodeSuccess = $code == 0;
    $isMessageSuccess = $message == 'Success';
    
    // creamos el objeto JSON apropiado almacenando los datos a enviar dentro
    // de el
    return json_encode([
      'meta' => [
        'return_code' => ($isMessageSuccess && $isCodeSuccess) ?
          0 : ($isCodeSuccess) ? 1 : $code,
        'message' => $message
      ],
      'data' => $data
    ]);
  }


  // Revisa que el cliente envio los datos de entrada correctos para ejecutar
  // el servicio requerido
  // [in]   scope (object): el objeto que contiene el contexto de slim 
  // [in]   request (array): arreglo asociativo que contiene los datos de 
  //        entrada enviados desde el cliente
  // [in]   requirementsDesc (array): arreglo asociativo que describe las
  //        reglas de validacion que seran aplicadas a cada dato de entrada
  //        correspondiente
  // [out]  throw: si alguno de los datos de entrada no cumple con sus reglas
  //        de validacion respectivas, se arrojara una excepcion detallando
  //        el dato que no cumplio con las reglas y la regla especifica que
  //        fallo la prueba
  private static function validateServiceInputArguments(
    $scope, $request, $requirementsDesc)
  {
    // validamos los datos de entrada segun fueron especificadas las reglas de
    // validacion
    foreach ($requirementsDesc as $attribute => $options) {
      // primero revisamos si el argumento de entrada fue declarado como
      // opcional o no
      $hasOptionalFlag = 
        isset($options['optional']) && array_key_exists('optional', $options);
      $isOptional = ($hasOptionalFlag) ? $options['optional'] : false;

      // luego revisamos que el cliente haya enviado el argumento esperado
      $hasAttribute = 
        isset($request[$attribute]) && array_key_exists($attribute, $request);

      // despues revisamos si la regla que vamos a evaluar se decide con el
      // atributo type
      $isTypedRule = isset($options['type']) 
          && array_key_exists('type', $options);

      // inicializamos el nombre del validador y el valor a evaluar
      $rule = $value = NULL;

      // si el validador se obtendra por el atributo type del descriptor de 
      // requerimientos...
      if ($isTypedRule) {
        // y el atributo a evaluar fue proporcionado por el cliente
        if ($hasAttribute) {
          // obtenemos el nombre del validador y el valor a evaluar adecuados
          $rule = $options['type'];
          $value = $request[$attribute];
        } else if (!$isOptional) {
          // si el argumento no fue enviado desde el cliente y no fue declarado 
          // como opcional, entonces hay que lanzar una excepcion
          throw new Exception("Input argument $attribute is undefined");
        } else {
          // si el argumento no fue enviado pero es opcional, podemos brincar 
          // esta validacion y continuar con los otros argumentos
          continue;
        }
      } else {
        // si el validador se obtendra por el nombre del atributo en el 
        // descriptor de requerimientos, obtenemos el nombre del validador
        // y el valor a evaluar adecuados
        $rule = $attribute;
        $value = NULL;
      } 

      // finalmente obtenemos el validador y lo utilizamos para validar el 
      // argumento de entrada 
      $callback = self::$validationRules[$rule];
      $callback($scope, $attribute, $value, $options);
    }
  }


  // Esta funcion inicializa las reglas de validacion que existen por defecto
  // en el sistema
  static function initDefaultValidationRules() {
    self::$validationRules = [
      'number' => function($scope, $name, $value, $options) {
        // revisamos si la variable tiene un valor numerico
        if (!isNumeric($value)) {
          // si no lo tiene, notificamos al usuario
          throw new Exception(
            "Input argument '$name' is not a numeric value"
          );
        }
      },
      'int' => function($scope, $name, $value, $options) {
        // revisamos si la variable es un entero
        $isInt = isInteger($value);

        // luego, revisamos si este valor debe estar dentro de algun intervalo
        $hasMinRule = isset($options['min']);
        $hasMaxRule = isset($options['max']);
        $hasRules = $hasMinRule || $hasMaxRule;

        // si el dato de entrada es entero...
        if ($isInt) {
          // y existen reglas adicionales de validacion por procesar
          if ($hasRules) {
            // calculamos los limites del intervalo
            $min = ($hasMinRule) ? $options['min'] : PHP_INT_MIN;
            $max = ($hasMaxRule) ? $options['max'] : PHP_INT_MAX;

            // y revisamos que el valor de la variable se encuentre dentro
            // del intervalo
            if (!integerIsBetweenValues($value, $min, $max)) {
              throw new Exception(
                "Input argument '$name' is not within [$min, $max]"
              );
            }
          }
        } else {
          // si la variable no posee un valor entro, notificamos al cliente
          throw new Exception(
            "Input argument '$name' is not an integer value"
          );
        }
      },
      'float' => function($scope, $name, $value, $options) {
        // revisamos que la variable posea un valor de coma flotante
        if (!isFloat($value)) {
          throw new Exception(
            "Input argument '$name' is not a floating-point value"
          );
        }
      },
      'string' => function($scope, $name, $value, $options) {
        // revisamos que la variable posea una cadena
        $isString = isString($value);

        // luego revisamos si la variable debe poseer una longitud especifica
        // de caracteres
        $hasLengthRule = isset($options['length']);

        // tambien revisamos si la variable debe tener un numero de caracteres
        // que se encuentre dentro de un intervalo
        $hasMinLengthRule = isset($options['min_length']);
        $hasMaxLengthRule = isset($options['max_length']);

        // si la variable de entrada es una cadena ...
        if ($isString) {
          // y debe poseer una longitud de caracteres especifica ...
          if ($hasLengthRule) {
            // revisamos que la cadena tenga la longitud especifica
            if (!stringHasLength($value, $options['length'])) {
              throw new Exception(
                "Input argument '$name' does not have a length of ".
                $options['length']
              );
            }
          } else {
            // revisamos si la longitud de la cadena esta dentro del 
            // intervalo especificado
            $min = ($hasMinLengthRule) ? $options['min_length'] : 0;
            $max = ($hasMaxLengthRule) ? $options['max_length'] : PHP_INT_MAX;
            
            // si no lo tiene, notificamos al usuario
            if (!stringHasLengthInterval($value, $min, $max)) {
              throw new Exception(
                "Input argument '$name' does not have a length that is ".
                "within [$min, $max]"
              );
            }
          }
        } else {
          // si la variable no es una cadena, notificamos al usuario
          throw new Exception(
            "Input argument '$name' is not a string value"
          );
        }
      },
      'email' => function($scope, $name, $value, $options) {
        // revisamos si la variable es una cadena con un formato valido de 
        // correo electronico
        if (!stringIsEmail($value)) {
          throw new Exception(
            "Input argument '$name' is not an email string"
          );
        }
      },
      'datetime' => function($scope, $name, $value, $options) {
        // revisamos si la variable es una cadena con un formato valido de 
        // hora y/o fecha
        if (!isDateTime($value, $options['format'])) {
          throw new Exception(
            "Input argument '$name' is not a date and/or time literal of ".
            "the format '{$options['format']}'"
          );
        }
      },
      'array' => function($scope, $name, $value, $options) {
        // primero revisamos si el arreglo fue declarado como opcional
        $hasOptionalFlag = 
          isset($options['optional']) && array_key_exists('optional', $options);
        $isOptional = ($hasOptionalFlag) ? $options['optional'] : false;

        // despues revisamos si el arreglo esperado es simple o asociativo
        $isSimpleArray = isset($options['values']['type'])
          && array_key_exists('type', $options['values']);
                    
        // si el arreglo no esta vacio, validamos sus contenidos
        $length = count($value);
        if ($length > 0) {
          // si el arreglo es sencillo ...
          if ($isSimpleArray) {
            // obtenemos el validador que le corresponde al tipo de dato que
            // se espera que tenga cada elemento
            $rule = $options['type'];
            $validator = self::$validationRules[$rule];

            // y validamos cada elemento 
            for ($i = 0; $i < $length; $i++) {
              $validator("$name[$i]", $value[$i], $options['values']);
            }
          } else {
            // si el arreglo es un arreglo asociativo, debemos invocar esta
            // funcion asociativamente
            foreach ($value as $element) {
              ServiceProvider::validateServiceInputArguments($element, 
                $options['values']);
            }
          }
        } else if (!$isOptional) {
          // si el arreglo esta vacio y no fue declarado como opcional, 
          // lanzamos una excepcion
          throw new Exception("Input argument $name is an empty array");
        }
      },
      'files' => function($scope, $name, $value, $options) {
        // primero, obtenemos el nombre del archivo
        $name = $options['name'];

        // revisamos que se hayan enviado archivos
        $isFilesSet = isset($_FILES[$name]) 
          && array_key_exists($name, $_FILES);

        // tambien revisamos que se haya especificado el tipo de archivo que se 
        // espera que estos archivos tengan
        $isFileFormatSet = isset($options['format'])
          && array_key_exists('format', $options);

        // y revisamos si los archivos fueron declarados como opcionales
        $isOptional = isset($options['optional'])
          && array_key_exists('optional', $options);

        // si se enviaron archivos desde el cliente...
        if ($isFilesSet) {
          // y se especifico que se espera un tipo de archivo
          if ($isFileFormatSet) {
            // validamos que todos los archivos enviados sean del tipo 
            // especificado, notificando al usuario cuando este no es el caso
            switch ($options['format']) {
              case 'document':
                if (is_array($_FILES[$name]['tmp_name'])) {
                  foreach ($_FILES[$name]['tmp_name'] as $file) {
                    if (!isDocumentFile($file)) {
                      throw new Exception(
                        "A file in '$name' is not a document file");
                      break;
                    }
                  }
                } else if (!isDocumentFile($_FILES[$name]['tmp_name'])) {
                  throw new Exception(
                    "The file '{$_FILES[$name]['name']}' is not a document ".
                    "file");
                }
              break;

              case 'bitmap':
                if (is_array($_FILES[$name]['tmp_name'])) {
                  foreach ($_FILES[$name]['tmp_name'] as $file) {
                    if (!isBitmapFile($file)) {
                      throw new Exception(
                        "A file in '$name' is not a bitmap file");
                      break;
                    }
                  }
                } else if (!isBitmapFile($_FILES[$name]['tmp_name'])) {
                  throw new Exception(
                    "The file '{$_FILES[$name]['name']}' is not a bitmap file");
                }
              break;
            }
          }
        } else {
          // si no se enviaron archivos desde el cliente y no fueron declarados 
          // como opcionales, notificamos al usuario
          if (!$isOptional) {
            throw new Exception("File '$name' is undefined");
          }
        }
      }
    ];
  }
}

// Inicializamos las reglas de validacion que existen por defecto en el sistema
ServiceProvider::initDefaultValidationRules();

?>