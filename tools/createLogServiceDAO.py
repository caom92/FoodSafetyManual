#!/usr/bin/env python
import sys
import json
import os

# Esta funcion crea los archivos donde se definiran las interfaces para 
# interactuar con las tablas de la base de datos correspondientes a este 
# servicio
# [in]  inputFile (file stream): el archivo que fue ingresado al programa que 
#       contiene el JSON que define las caracteristicas del servicio
# [in]  servicesFile (file stream): el archivo donde se conglomeran las 
#       declaraciones de todos los servicios de esta bitacora
def createDataBaseTableFiles(inputFile, servicesFile):
  # Revisamos si pertenece a algun espacio de nombre
  hasNamespace = inputFile['namespace'] is not None

  # Luego, crearemos los archivos de tablas de esta bitacora
  for table in inputFile['tables']:
    # Agregamos a la tabla a la lista de tablas en el archivo conglomerado
    tableName = None
    if hasNamespace:
      tableName = inputFile['namespace'] + "\\" + table['class']
    else:
      tableName = table['class']

    servicesFile.write(
      "    '" + tableName + "' =>\n"
      "      realpath(dirname(__FILE__).'/" + table['class'] + ".php'),\n"
    )

    # Ahora abrimos el archivo de salida
    outputFile = open(inputFile['path'] + table['class'] + '.php', 'w')

    # Y comenzamos a escribir el programa en el
    outputFile.write(
      "<?php\n"
      "\n"
    )

    # Escribimos el nombre de espacio adecuado
    if hasNamespace:
      outputFile.write(
        "namespace fsm\\database\\" + inputFile['namespace'] + ";\n"
      )
    else:
      outputFile.write(
        "namespace fsm\\database;\n"
      )

    # Revisamos si la clase hereda de algun padre
    isChildClass = table['parent'] is not None

    # Escribimos la sentencia de importacion de la clase padre
    if isChildClass:
      outputFile.write(
        "require_once realpath(dirname(__FILE__).'/../../../../dao/" 
        + table['parent'] + ".php');\n"
      )
    else:
      outputFile.write(
        "require_once realpath(dirname(__FILE__).'/../../../../dao/"
        "DataBaseTable.php');\n"
      )

    # Continuamos escribiendo el archivo
    outputFile.write(
      "use fsm\\database as db;\n"
      "\n"
      "\n"
      "// Interfaz para la tabla " + table['table'] + "\n"
      "class " + table['class'] + " extends db\\"
    )

    # Dependiendo de la clase padre, la declaracion de la clase cambia
    if isChildClass:
      outputFile.write(table['parent'] + "\n")
    else:
      outputFile.write('DataBaseTable\n')

    # Continuamos escribiendo el archivo
    outputFile.write(
      "{\n"
      "  // Crea una instancia de una interfaz a la base de datos para "
      "modificar \n"
      "  // la tabla " + table['table'] + "\n"
      "  function __construct() { \n"
      "    parent::__construct('" + table['table'] + "');\n"
      "  }\n"
      "\n"
    )

    # Dependiendo de la clase padre, habra que agregar algunas funciones
    if table['parent'] == 'LogTable':
      outputFile.write(
        "  // Retorna una lista de todos los renglones en la tabla que tengan "
        "asignado\n"
        "  // el ID de la fecha de captura especificado\n"
        "  // [in]   dateID (int): el ID de la fecha en que los datos fueron "
        "capturados\n"
        "  //        en la base de datos\n"
        "  // [out]  return (dictionary): un arreglo asociativo que contiene "
        "los datos\n"
        "  //        de la tabla que tengan asignado el ID especificado "
        "organizados"
        " en\n"
        "  //        renglones y columnas\n"
        "  function selectByCaptureDateID($dateID) {\n"
        "  }\n"
      )

    # Continuamos escribiendo el archivo
    outputFile.write(
      "}\n"
      "\n"
      "?>"
    )

    # Finalmente, cerramos el archivo
    outputFile.close()

# Esta funcion crea el archivo donde se encontrara definido el servicio que 
# permitira al usuario agregar un manual PDF relacionado con esta bitacora
# [in]  inputFile (file stream): el archivo que fue ingresado al programa que 
#       contiene el JSON que define las caracteristicas del servicio
# [in]  servicesFile (file stream): el archivo donde se conglomeran las 
#       declaraciones de todos los servicios de esta bitacora
def createUploadManualServiceFile(inputFile, servicesFile):
  # Comenzamos por el archivo para subir manuales
  outputFile = open(inputFile['path'] + 'upload-manual-' + inputFile['suffix'] 
    + '.php', 'w')
  outputFile.write(
    "<?php\n"
    "\n"
    "require_once realpath(dirname(__FILE__).'/../../../service_creators.php');"
    "\n"
    "\n"
    "\n"
    "$service = fsm\createUploadManualService(\n"
    "  '" + inputFile['program'] + "',\n"
    "  '" + inputFile['module'] + "',\n" 
    "  '" + inputFile['log'] + "',\n"
    "  '" + inputFile['manual_path'] + "'\n"
    ");\n"
    "\n"
    "?>"
  )
  outputFile.close()

  # Agregamos el archivo del servicio a nuestro archivo conglomerado
  servicesFile.write(
    "    'upload-manual-" + inputFile['suffix'] + "' =>\n"
    "      realpath(dirname(__FILE__).'/upload-manual-" + inputFile['suffix'] 
    + ".php'),\n"
  )

# Esta funcion crea el archivo donde se encontrara definido el servicio que 
# devolvera al cliente los datos necesarios para desplegar la bitacora
# [in]  inputFile (file stream): el archivo que fue ingresado al programa que 
#       contiene el JSON que define las caracteristicas del servicio
# [in]  servicesFile (file stream): el archivo donde se conglomeran las 
#       declaraciones de todos los servicios de esta bitacora
def createLogServiceFile(inputFile, servicesFile):
  # Creamos el archivo para desplegar la interfaz de la bitacora
  outputFile = open(inputFile['path'] + 'log-' + inputFile['suffix'] + '.php', 
    'w')
  outputFile.write(
    "<?php\n"
    "\n"
    "require_once realpath(dirname(__FILE__).'/../../../service_creators.php');"
    "\n"
    "\n"
    "\n"
    "$service = fsm\createLogService(\n"
    "  '" + inputFile['program'] + "',\n"
    "  '" + inputFile['module'] + "',\n" 
    "  '" + inputFile['log'] + "',\n"
  )

  # Dependiendo si se va a escribir una funcion personalizada o se utilizara el 
  # templete, decidimos como sera el siguiente parametro
  if inputFile['services']['log'] is None:
    outputFile.write(
      "  function($scope, $request) {\n"
      "    // TO DO\n"
      "  },\n"
      "  TRUE"
    )
  else:
    outputFile.write(
      "  [\n"
      "    'items_name' => '" + inputFile['services']['log']['items_name'] + 
      "',\n"
      "    'function' => function($scope, $segment) {\n"
      "      // TO DO\n"
      "    }\n"
      "  ]\n"
    )

  # Continuamos escribiendo el archivo
  outputFile.write(
    ");\n"
    "\n"
    "?>"
  )
  outputFile.close()

  # Agregamos el archivo del servicio a nuestro archivo conglomerado
  servicesFile.write(
    "    'log-" + inputFile['suffix'] + "' =>\n"
    "      realpath(dirname(__FILE__).'/log-" + inputFile['suffix'] + ".php'),"
    "\n"
  )

# Esta funcion crea el archivo donde se encontrara definido el servicio que 
# captura los datos de la bitacora que son entrados por el usuario
# [in]  inputFile (file stream): el archivo que fue ingresado al programa que 
#       contiene el JSON que define las caracteristicas del servicio
# [in]  servicesFile (file stream): el archivo donde se conglomeran las 
#       declaraciones de todos los servicios de esta bitacora
def createCaptureServiceFile(inputFile, servicesFile):
  # Creamos el archivo del servicio para capturar los datos de la bitacora
  outputFile = open(inputFile['path'] + 'capture-' + inputFile['suffix'] + 
    '.php', 'w')
  outputFile.write(
    "<?php\n"
    "\n"
    "require_once realpath(dirname(__FILE__).'/../../../service_creators.php');"
    "\n"
    "\n"
    "\n"
    "$service = fsm\createCaptureService(\n"
    "  '" + inputFile['program'] + "',\n"
    "  '" + inputFile['module'] + "',\n" 
    "  '" + inputFile['log'] + "',\n"
    "  [\n"
    "    // TO DO\n"
    "  ],\n"
  )

  # Dependiendo si se va a escribir una funcion personalizada o se utilizara el 
  # templete, decidimos como sera el siguiente parametro
  if inputFile['services']['capture'] is None:
    outputFile.write(
      "  function($scope, $request) {\n"
      "    // TO DO\n"
      "  },\n"
      "  TRUE"
    )
  else:
    if inputFile['services']['capture']['extra_info'] is None:
      outputFile.write(
        "  [\n"
        "    'extra_info' => NULL\n,"
        "    'function' => function($scope, $segment, $request, $logID) {\n"
        "      // TO DO\n"
        "    }\n"
        "  ]\n"
      )
    else:  
      outputFile.write(
        "  [\n"
        "    'extra_info' => [\n"
        "      '" + inputFile['services']['capture']['extra_info'][0] + "',\n"
      )
      if inputFile['services']['capture']['extra_info'][1] is not None:
        outputFile.write(
          "      '" + inputFile['services']['capture']['extra_info'][1] + "'\n"
        )
      outputFile.write(
        "    ],\n"
        "    'function' => function($scope, $segment, $request, $logID) {\n"
        "      // TO DO\n"
        "    }\n"
        "  ]\n"
      )

  # Continuamos escribiendo el archivo
  outputFile.write(
    ");\n"
    "\n"
    "?>"
  )
  outputFile.close()

  # Agregamos el archivo del servicio a nuestro archivo conglomerado
  servicesFile.write(
    "    'capture-" + inputFile['suffix'] + "' =>\n"
    "      realpath(dirname(__FILE__).'/capture-" + inputFile['suffix'] 
    + ".php'),\n"
  )

# Esta funcion crea el archivo donde se encontrara definido el servicio que
# retorna reportes de la bitacora
# [in]  inputFile (file stream): el archivo que fue ingresado al programa que 
#       contiene el JSON que define las caracteristicas del servicio
# [in]  servicesFile (file stream): el archivo donde se conglomeran las 
#       declaraciones de todos los servicios de esta bitacora
def createReportServiceFile(inputFile, servicesFile):
  # Creamos el archivo del servicio para capturar los datos de la bitacora
  outputFile = open(inputFile['path'] + 'report-' + inputFile['suffix'] 
    + '.php', 'w')
  outputFile.write(
    "<?php\n"
    "\n"
    "require_once realpath(dirname(__FILE__).'/../../../service_creators.php');"
    "\n"
    "\n"
    "\n"
    "$service = fsm\createReportService(\n"
    "  '" + inputFile['program'] + "',\n"
    "  '" + inputFile['module'] + "',\n" 
    "  '" + inputFile['log'] + "',\n"
  )

  # Dependiendo si se va a escribir una funcion personalizada o se utilizara el 
  # templete, decidimos como sera el siguiente parametro
  if inputFile['services']['report'] is None:
    outputFile.write(
      "  function($scope, $request) {\n"
      "    // TO DO\n"
      "  },\n"
      "  TRUE"
    )
  else:
    if inputFile['services']['report']['extra_info'] is None:
      outputFile.write(
        "  [\n"
        "    'items_name' => '" + inputFile['services']['report']['items_name'] 
        + "',\n"
        "    'extra_info' => NULL,\n"
        "    'function' => function($scope, $segment, $logDate) {\n"
        "      // TO DO\n"
        "    }\n"
        "  ]\n"
      )
    else:
      outputFile.write(
        "  [\n"
        "    'items_name' => '" + inputFile['services']['report']['items_name'] 
        + "',\n"
        "    'extra_info' => [\n"
        "      '" + inputFile['services']['report']['extra_info'][0] + "',\n"
      )
      if inputFile['services']['report']['extra_info'][1] is not None:
        outputFile.write(
          "      '" + inputFile['services']['report']['extra_info'][1] + "'\n"
        )
      outputFile.write(
        "    ],\n"
        "    'function' => function($scope, $segment, $logDate) {\n"
        "      // TO DO\n"
        "    }\n"
        "  ]\n"
      )

  # Continuamos escribiendo el archivo
  outputFile.write(
    ");\n"
    "\n"
    "?>"
  )
  outputFile.close()

  # Agregamos el archivo del servicio a nuestro archivo conglomerado
  servicesFile.write(
    "    'report-" + inputFile['suffix'] + "' =>\n"
    "      realpath(dirname(__FILE__).'/report-" + inputFile['suffix'] 
    + ".php'),\n"
  )

# Esta funcion crea el archivo donde se encontrara definido el servicio que
# retorna los datos del inventario de la bitacora
# [in]  inputFile (file stream): el archivo que fue ingresado al programa que 
#       contiene el JSON que define las caracteristicas del servicio
# [in]  servicesFile (file stream): el archivo donde se conglomeran las 
#       declaraciones de todos los servicios de esta bitacora
def createInventoryServiceFile(inputFile, servicesFile):
  # Ahora vamos a incluir los servicios para retornar la lista de inventario
  # de la bitacora
  if inputFile['services']['inventory'] is not None:
    # Creamos el archivo del servicio para capturar los datos de la bitacora
    outputFile = open(inputFile['path'] + 'inventory-' + inputFile['suffix'] 
      + '.php', 'w')
    outputFile.write(
      "<?php\n"
      "\n"
      "require_once realpath(dirname(__FILE__).'/../../../service_creators"
      ".php');\n"
      "\n"
      "\n"
      "$service = fsm\createInventoryService(\n"
      "  '" + inputFile['program'] + "',\n"
      "  '" + inputFile['module'] + "',\n" 
      "  '" + inputFile['log'] + "',\n"
      "  [\n"
      "    // TO DO\n"
      "  ],\n"
      "  function($scope, $request) {\n"
      "    // TO DO\n"
      "  }\n"
      ");\n"
      "\n"
      "?>"
    )
    outputFile.close()

    # Agregamos el archivo del servicio a nuestro archivo conglomerado
    servicesFile.write(
      "    'inventory-" + inputFile['suffix'] + "' =>\n"
      "      realpath(dirname(__FILE__).'/inventory-" + inputFile['suffix'] 
      + ".php'),\n"
    )

# Esta funcion crea el archivo donde se encontrara definido el servicio que
# permite al usuario agrigar un nuevo elemento al inventario de la bitacora
# [in]  inputFile (file stream): el archivo que fue ingresado al programa que 
#       contiene el JSON que define las caracteristicas del servicio
# [in]  servicesFile (file stream): el archivo donde se conglomeran las 
#       declaraciones de todos los servicios de esta bitacora
def createAddServiceFile(inputFile, servicesFile):
  # Agregamos el servicio para agregar un objeto al inventario
  if inputFile['services']['add'] is not None:
    # Creamos el archivo del servicio para capturar los datos de la bitacora
    outputFile = open(inputFile['path'] + 'add-' + inputFile['suffix'] + '.php',
      'w')
    outputFile.write(
      "<?php\n"
      "\n"
      "require_once realpath(dirname(__FILE__).'/../../../service_creators"
      ".php');\n"
      "\n"
      "\n"
      "$service = fsm\createAddService(\n"
      "  '" + inputFile['program'] + "',\n"
      "  '" + inputFile['module'] + "',\n" 
      "  '" + inputFile['log'] + "',\n"
      "  [\n"
      "    // TO DO\n"
      "  ],\n"
      "  function($scope, $request) {\n"
      "    // TO DO\n"
      "  }\n"
      ");\n"
      "\n"
      "?>"
    )
    outputFile.close()

    # Agregamos el archivo del servicio a nuestro archivo conglomerado
    servicesFile.write(
      "    'add-" + inputFile['suffix'] + "' =>\n"
      "      realpath(dirname(__FILE__).'/add-" + inputFile['suffix'] 
      + ".php'),\n"
    )

# Esta funcion crea el archivo donde se encontrara definido el servicio que
# permite al usuario activar o desactivar el estado de un elemento del 
# inventario de la bitacora
# [in]  inputFile (file stream): el archivo que fue ingresado al programa que 
#       contiene el JSON que define las caracteristicas del servicio
# [in]  servicesFile (file stream): el archivo donde se conglomeran las 
#       declaraciones de todos los servicios de esta bitacora
def createToggleServiceFile(inputFile, servicesFile):
  # Agregamos el servicio para activar o desactivar objetos del inventario
  if inputFile['services']['toggle'] is not None:
    # Creamos el archivo del servicio para capturar los datos de la bitacora
    outputFile = open(inputFile['path'] + 'toggle-' + inputFile['suffix'] 
      + '.php', 'w')
    outputFile.write(
      "<?php\n"
      "\n"
      "require_once realpath(dirname(__FILE__).'/../../../service_creators"
      ".php');\n"
      "\n"
      "\n"
      "$service = fsm\createToggleService(\n"
      "  '" + inputFile['program'] + "',\n"
      "  '" + inputFile['module'] + "',\n" 
      "  '" + inputFile['log'] + "',\n"
      "  '" + inputFile['services']['toggle']['dao_name'] + "'\n"
      ");\n"
      "\n"
      "?>"
    )
    outputFile.close()

    # Agregamos el archivo del servicio a nuestro archivo conglomerado
    servicesFile.write(
      "    'toggle-" + inputFile['suffix'] + "' =>\n"
      "      realpath(dirname(__FILE__).'/toggle-" + inputFile['suffix'] 
      + ".php'),\n"
    )

# Esta funcion crea el archivo donde se encontrara definido el servicio que
# permite al usuario cambiar el orden de un elemento del inventario de la
# bitacora
# [in]  inputFile (file stream): el archivo que fue ingresado al programa que 
#       contiene el JSON que define las caracteristicas del servicio
# [in]  servicesFile (file stream): el archivo donde se conglomeran las 
#       declaraciones de todos los servicios de esta bitacora
def createReorderServiceFile(inputFile, servicesFile):
  # Y agregamos el servicio para cambiar el orden de algun objeto en el
  # inventario
  if inputFile['services']['reorder'] is not None:
    # Creamos el archivo del servicio para capturar los datos de la bitacora
    outputFile = open(inputFile['path'] + 'reorder-' + inputFile['suffix'] 
      + '.php', 'w')
    outputFile.write(
      "<?php\n"
      "\n"
      "require_once realpath(dirname(__FILE__).'/../../../service_creators"
      ".php');\n"
      "\n"
      "\n"
      "$service = fsm\createReorderService(\n"
      "  '" + inputFile['program'] + "',\n"
      "  '" + inputFile['module'] + "',\n" 
      "  '" + inputFile['log'] + "',\n"
      "  '" + inputFile['services']['reorder']['dao_name'] + "'\n"
      ");\n"
      "\n"
      "?>"
    )
    outputFile.close()

    # Agregamos el archivo del servicio a nuestro archivo conglomerado
    servicesFile.write(
      "    'reorder-" + inputFile['suffix'] + "' =>\n"
      "      realpath(dirname(__FILE__).'/reorder-" + inputFile['suffix'] 
      + ".php'),\n"
    )

# Esta funcion crea el archivo donde se encontrara definido el servicio que
# permite al usuario modificar los datos de un reporte de la bitacora
# [in]  inputFile (file stream): el archivo que fue ingresado al programa que 
#       contiene el JSON que define las caracteristicas del servicio
# [in]  servicesFile (file stream): el archivo donde se conglomeran las 
#       declaraciones de todos los servicios de esta bitacora
def createUpdateServiceFile(inputFile, servicesFile):
  # Creamos el archivo del servicio para modificar los datos de la bitacora
  outputFile = open(inputFile['path'] + 'update-' + inputFile['suffix'] 
    + '.php', 'w')
  outputFile.write(
    "<?php\n"
    "\n"
    "require_once realpath(dirname(__FILE__).'/../../../service_creators.php');"
    "\n"
    "\n"
    "\n"
    "$service = fsm\createUpdateService(\n"
    "  '" + inputFile['program'] + "',\n"
    "  '" + inputFile['module'] + "',\n" 
    "  '" + inputFile['log'] + "',\n"
    "  [\n"
    "    // TO DO\n"
    "  ],\n"
  )

  # Dependiendo si se va a escribir una funcion personalizada o se utilizara el 
  # templete, decidimos como sera el siguiente parametro
  if inputFile['services']['capture'] is None:
    outputFile.write(
      "  function($scope, $request) {\n"
      "    // TO DO\n"
      "  },\n"
      "  TRUE"
    )
  else:
    if inputFile['services']['capture']['extra_info'] is None:
      outputFile.write(
        "  [\n"
        "    'extra_info' => NULL\n,"
        "    'function' => function($scope, $request) {\n"
        "      // TO DO\n"
        "    }\n"
        "  ]\n"
      )
    else:  
      outputFile.write(
        "  [\n"
        "    'extra_info' => [\n"
        "      '" + inputFile['services']['capture']['extra_info'][0] + "',\n"
      )
      if inputFile['services']['capture']['extra_info'][1] is not None:
        outputFile.write(
          "      '" + inputFile['services']['capture']['extra_info'][1] + "'\n"
        )
      outputFile.write(
        "    ],\n"
        "    'function' => function($scope, $request) {\n"
        "      // TO DO\n"
        "    }\n"
        "  ]\n"
      )

  # Continuamos escribiendo el archivo
  outputFile.write(
    ");\n"
    "\n"
    "?>"
  )
  outputFile.close()

  # Agregamos el archivo del servicio a nuestro archivo conglomerado
  servicesFile.write(
    "    'update-" + inputFile['suffix'] + "' =>\n"
    "      realpath(dirname(__FILE__).'/update-" + inputFile['suffix'] 
    + ".php'),\n"
  )

# Esta funcion crea el archivo donde se encontrara definido el servicio que
# retorna un reporte para su autorizacion o rechazo
# [in]  inputFile (file stream): el archivo que fue ingresado al programa que 
#       contiene el JSON que define las caracteristicas del servicio
# [in]  servicesFile (file stream): el archivo donde se conglomeran las 
#       declaraciones de todos los servicios de esta bitacora
def createAuthorizationReportServiceFile(inputFile, servicesFile):
  # Creamos el archivo del servicio para capturar los datos de la bitacora
  outputFile = open(inputFile['path'] + 'authorization-report-' 
    + inputFile['suffix'] + '.php', 'w')
  outputFile.write(
    "<?php\n"
    "\n"
    "require_once realpath(dirname(__FILE__).'/../../../service_creators.php');"
    "\n"
    "\n"
    "\n"
    "$service = fsm\createAuthorizationReportService(\n"
    "  '" + inputFile['program'] + "',\n"
    "  '" + inputFile['module'] + "',\n" 
    "  '" + inputFile['log'] + "',\n"
  )

  # Dependiendo si se va a escribir una funcion personalizada o se utilizara el 
  # templete, decidimos como sera el siguiente parametro
  if inputFile['services']['report'] is None:
    outputFile.write(
      "  function($scope, $request) {\n"
      "    // TO DO\n"
      "  },\n"
      "  TRUE"
    )
  else:
    if inputFile['services']['report']['extra_info'] is None:
      outputFile.write(
        "  [\n"
        "    'items_name' => '" + inputFile['services']['report']['items_name'] 
        + "',\n"
        "    'extra_info' => NULL,\n"
        "    'function' => function($scope, $segment, $logDate) {\n"
        "      // TO DO\n"
        "    }\n"
        "  ]\n"
      )
    else:
      outputFile.write(
        "  [\n"
        "    'items_name' => '" + inputFile['services']['report']['items_name'] 
        + "',\n"
        "    'extra_info' => [\n"
        "      '" + inputFile['services']['report']['extra_info'][0] + "',\n"
      )
      if inputFile['services']['report']['extra_info'][1] is not None:
        outputFile.write(
          "      '" + inputFile['services']['report']['extra_info'][1] + "'\n"
        )
      outputFile.write(
        "    ],\n"
        "    'function' => function($scope, $segment, $logDate) {\n"
        "      // TO DO\n"
        "    }\n"
        "  ]\n"
      )

  # Continuamos escribiendo el archivo
  outputFile.write(
    ");\n"
    "\n"
    "?>"
  )
  outputFile.close()

  # Agregamos el archivo del servicio a nuestro archivo conglomerado
  servicesFile.write(
    "    'report-" + inputFile['suffix'] + "' =>\n"
    "      realpath(dirname(__FILE__).'/authorization-report-" 
    + inputFile['suffix'] + ".php'),\n"
  )

# El JSON se espera que tenga la siguiente forma:
# {
#   "name": "string",
#   "path": "string"
#   "namespace": "program\\module\\log",
#   "program": "string",
#   "module": "string",
#   "log": "string",
#   "suffix": "string",
#   "services: {"
#     "log": null or {
#       "items_name": "string"
#     },
#     "capture": null or {
#       "extra_info": [
#         "string",
#         "string"
#       ]
#     },
#     "report": null or {
#       "items_name": "string",
#       "extra_info": [
#         "string",
#         "string"
#       ]
#     },
#     "inventory": any or null,
#     "add": any or null,
#     "toggle": null or {
#       "dao_name": "string"
#     },
#     "reorder": null or {
#       "dao_name": "string"
#     }
#   },
#   "manual_path": "string",
#   "tables": [{
#     "class": "String",
#     "table": "string_string",
#     "parent": "ClassName"
#   }]
# }

# Primero leemos el archivo JSON de entrada 
with open(sys.argv[1]) as fileData:
  inputFile = json.load(fileData)

# Comenzaremos creando el archivo donde se conglomeran los servicios y los DAOs
servicesFile = open(inputFile['path'] + 'services.php', 'w')
servicesFile.write(
  "<?php\n"
  "\n"
  "$" + inputFile['name'] + " = [\n"
  "  'tables' => [\n"
)

# Creamos los archivos de los DAOs que corresponden a esta bitacora
createDataBaseTableFiles(inputFile, servicesFile)

# Cerramos la declaracion de tablas en el archivo conglomerado
servicesFile.write(
  "  ],\n"
  "  'services' => [\n"
)

# Ahora, crearemos los archivos de los servicios
createUploadManualServiceFile(inputFile, servicesFile)
createLogServiceFile(inputFile, servicesFile)
createCaptureServiceFile(inputFile, servicesFile)
createReportServiceFile(inputFile, servicesFile)
createInventoryServiceFile(inputFile, servicesFile)
createAddServiceFile(inputFile, servicesFile)
createToggleServiceFile(inputFile, servicesFile)
createReorderServiceFile(inputFile, servicesFile)
createUpdateServiceFile(inputFile, servicesFile)
createAuthorizationReportServiceFile(inputFile, servicesFile)

# Finalmente, cerramos la lista de servicios
servicesFile.write(
  "  ]\n"
  "];\n"
  "\n"
  "?>"
)
servicesFile.close()