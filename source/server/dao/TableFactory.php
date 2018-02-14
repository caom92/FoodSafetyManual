<?php

namespace fsm\database;


// Interfaz que administra la creacion de interfaces de tablas
// a la base de datos
class TableFactory
{
  // Crea una nueva instancia del administrador de tablas
  // [in]   namespace (string): el espacio de nombre donde las clases de las 
  //        tablas fueron definidas
  // [in]   tablesClassDefinitions (dictionary): arreglo asociativo
  //        que define las direcciones de los archivos que contienen las
  //        definiciones de las clases que representan las tablas en la
  //        base de datos organizados por nombre de clase
  function __construct($namespace, $tablesClassDefinitions) {
    $this->namespace = $namespace;
    $this->classDefinitions = $tablesClassDefinitions;
  }

  // Retorna una instancia de la interfaz de tabla con el nombre especificado
  // [in]   tableName (string): el nombre de la interfaz de tabla que queremos
  //        instanciar
  // [out]  return (object): una instancia de la clase de tabla que fue 
  //        especificada
  // [out]  throw (Exception): en caso de que la clase no este definida, se 
  //        lanza una excepcion
  function get($tableName) {
    // primero revisamos si la tabla ya habia sido instanciada antes
    $isTableInitialized =
      isset($this->tables[$tableName])
      && array_key_exists($tableName, $this->tables);

    if ($isTableInitialized) {
      // si la tabla ya habia sido instanciada, regresamos dicha instancia
      return $this->tables[$tableName];
    } else {
      // si no, revisamos si tenemos la direccion del archivo en donde se 
      // encuentra definida la clase
      $isTableDefined =
        isset($this->classDefinitions[$tableName])
        && array_key_exists($tableName, $this->classDefinitions);

      if ($isTableDefined) {
        // hay que revisar si la direccion del archivo fue capturada 
        // correctamente
        if (strlen($this->classDefinitions[$tableName]) <= 0) {
          // si no lo fue, lanzamos una excepcion
          throw new \Exception("Failed to create an instance of '$tableName', ".
            "the file path associated to this class name could not be ".
            "resolved to any file. Maybe the file path is misspelled.");
        }

        // si tenemos el archivo, lo incluimos
        include $this->classDefinitions[$tableName];

        // instanciamos la clase
        $className = $this->namespace . $tableName;
        $this->tables[$tableName] = new $className;

        // y retornamos dicha instancia
        return $this->tables[$tableName];
      } else {
        // si no tenemos el archivo, lanzamos una excepcion
        throw new \Exception(
          "Failed to create an instance of '$tableName', no class file is ".
          "associated to this class name. Maybe the class name is misspelled.");
      }
    }
  }


  // El espacio de nombre donde las clases de las tablas fueron definidas
  private $namespace;

  // Lista de instancias de tablas creadas previamente
  private $tables = [];

  // Lista de direcciones de archivo donde se encuentran las definiciones
  // de clases de las diferentes tablas de la base de dato
  private $classDefinitions = [];
}

?>