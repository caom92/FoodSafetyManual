#!/usr/bin/env python
import sys
import json

# Primero leemos el archivo JSON de entrada 
with open(sys.argv[1]) as fileData:
  inputFile = json.load(fileData)

# El JSON se espera que tenga la siguiente forma:
# {
#   "name": "string",
#   "path": "string"
#   "namespace": "program\\module\\log",
#   "services": ???
#   "tables": [{
#     "class": "String",
#     "table": "string_string",
#     "parent": "ClassName"
#   }]
# }

# Revisamos si pertenece a algun espacio de nombre
hasNamespace = inputFile['namespace'] is not None

# Comenzaremos creando el archivo donde se conglomeran los servicios y los DAOs
servicesFile = open(inputFile['path'] + 'services.php', 'w')
servicesFile.write(
  "<?php\n"
  "\n"
  "$" + inputFile['name'] + " = [\n"
  "  'tables' => [\n"
)

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
    "  // Crea una instancia de una interfaz a la base de datos para modificar \n"
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
      "  // [out]  return (dictionary): un arreglo asociativo que contiene los "
      "datos\n"
      "  //        de la tabla que tengan asignado el ID especificado organizados"
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

# Cerramos la declaracion de tablas en el archivo conglomerado
servicesFile.write(
  "  ],\n"
  "  'services' => [\n"
)

# Ahora, crearemos los archivos de los servicios

# Finalmente, cerramos la lista de servicios
servicesFile.write(
  "  ]\n"
  "];\n"
  "\n"
  "?>"
)
servicesFile.close()