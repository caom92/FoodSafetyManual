#!/usr/bin/env python
import sys
import json

# Primero leemos el archivo JSON de entrada 
inputFile = sys.argv[1]
with open(inputFile) as fileData:
  files = json.load(fileData)

# El JSON se espera que tenga la siguiente forma:
# [{
#   "file": "String.php",
#   "class": "String",
#   "table": "string_string",
#   "namespace": "program\\module\\log",
#   "parent": "ClassName"
# }]

# Ahora vamos a crear un archivo PHP por cada elemento del
# arreglo del JSON
for data in files:
  # Ahora abrimos el archivo de salida
  outputFile = open(data['file'], 'w')

  # Y comenzamos a escribir el programa en el
  outputFile.write(
    "<?php\n"
    "\n"
  )

  # Revisamos si pertenece a algun espacio de nombre
  hasNamespace = data['namespace'] is not None

  # Escribimos el nombre de espacio adecuado
  if hasNamespace:
    outputFile.write(
      "namespace fsm\\database\\" + data['namespace'] + ";\n"
    )
  else:
    outputFile.write(
      "namespace fsm\\database;\n"
    )

  # Revisamos si la clase hereda de algun padre
  isChildClass = data['parent'] is not None

  # Escribimos la sentencia de importacion de la clase padre
  if isChildClass:
    outputFile.write(
      "require_once realpath(dirname(__FILE__).'/../../../../dao/" 
      + data['parent'] + ".php');\n"
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
    "// Interfaz para la tabla " + data['table'] + "\n"
    "class " + data['class'] + " extends db\\"
  )

  # Dependiendo de la clase padre, la declaracion de la clase cambia
  if isChildClass:
    outputFile.write(data['parent'] + "\n")
  else:
    outputFile.write('DataBaseTable\n')

  # Continuamos escribiendo el archivo
  outputFile.write(
    "{\n"
    "  // Crea una instancia de una interfaz a la base de datos para modificar \n"
    "  // la tabla " + data['table'] + "\n"
    "  function __construct() { \n"
    "    parent::__construct('" + data['table'] + "');\n"
    "  }\n"
    "\n"
  )

  # Dependiendo de la clase padre, habra que agregar algunas funciones
  if data['parent'] == 'LogTable':
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