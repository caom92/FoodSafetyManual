#!/usr/bin/env python
import sys
import json

# Primero leemos el archivo JSON de entrada 
inputFile = sys.argv[1]
with open(inputFile) as fileData:
  files = json.load(fileData)

# El JSON se espera que tenga la siguiente forma:
# [{
#   "file": "string-string.php"
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
    "$service = [\n"
    "  'requirements_desc' => [\n"
    "  ],\n"
    "  'callback' => function($scope, $request) {\n"
    "  }\n"
    "];\n"
    "\n"
    "?>"
  )

  # Finalmente, cerramos el archivo
  outputFile.close()