<?php

namespace fsm\database;
require_once realpath(dirname(__FILE__)."/../config/database_config.php");
// Medoo:
require_once realpath(dirname(__FILE__)."/../../../external/autoload.php");


// Una interfaz para acceder a y modificar los datos almacenados dentro de una 
// tabla especifica en la base de datos
class DataBaseTable
{  
  // Crea una interfaz para interactuar con la tabla en la base de datos que 
  // tenga el nombre especificado
  // [in]   table (string): el nombre de la tabla que el objeto representara
  function __construct($table) {
    $this->table = $table;
  }

  // Intenta establecer una conexion a la base de datos y almacena una instancia
  // de la interfaz que representa dicha conexion para su uso futuro
  static function connectToDataBase() {
    self::$dataBase = new \medoo([
      "database_type" => "mysql",
      "database_name" => DATA_BASE,
      "server" => HOST,
      "username" => USER,
      "password" => PASSWORD,
      "charset" => "utf8",
      "option" => [
        \PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION,
        \PDO::ATTR_EMULATE_PREPARES => false,
        \PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_ASSOC
      ] 
    ]);
  }

  // Retorna verdadero si la conexion a la base de datos fue establecida o falso
  // en caso contrario
  static function isDataBaseConnectionEstablished() {
    return isset(self::$dataBase);
  }


  // Interfaz que representa la conexion a la base de datos
  protected static $dataBase;
     
  // El nombre de la tabla que este objeto representa
  protected $table;

  // Retorna los datos de un solo renglon de la tabla 
  // [in]   columns (array<string>): la lista de los nombres de las columnas 
  //        que van a ser leidas
  // [in]   [where] (dictionary): un arreglo asociativo que define las
  //        condiciones con las que los datos seran filtrados ordenados por
  //        nombre de la operacion y nombre del valor al cual le sera aplicada
  //        dicha operacion
  // [out]  return (dictionary): un arreglo que contiene los datos leidos
  //        organizados por columnas
  protected function get($columns, $where = []) {
    return self::$dataBase->get($this->table, $columns, $where);
  }

  // Retorna los datos de la tabla que cumplan con las condiciones especificadas
  // [in]   columns (array<string>): la lista de los nombres de las columnas 
  //        que van a ser leidas
  // [in]   [where] (dictionary): un arreglo asociativo que define las
  //        condiciones con las que los datos seran filtrados ordenados por
  //        nombre de la operacion y nombre del valor al cual le sera aplicada
  //        dicha operacion
  // [in]   [joins] (dictionary): un arreglo asociativo que define las tablas 
  //        con las que los datos leidos seran mezclados organizados por nombre
  //        de las tablas y tipo de mezclado y la condicion que debe cumplirse 
  //        para que la mezcla se lleve a cabo
  // [out]  return (dictionary): un arreglo asociativo que contiene todos los 
  //        datos leidos de la tabla organizados por renglones y columnas
  protected function select($columns, $where = [], $joins = NULL) {
    $hasJoins = isset($joins);
    return ($hasJoins) ?
      self::$dataBase->select($this->table, $joins, $columns, $where) :
      self::$dataBase->select($this->table, $columns, $where);
  }

  // Revisa si hay datos en la tabla que cumplen con la condicion especificada
  // [in]   where (dictionary): un arreglo asociativo que define las
  //        condiciones con las que los datos seran filtrados ordenados por
  //        nombre de la operacion y nombre del valor al cual le sera aplicada
  //        dicha operacion
  // [in]   [joins] (dictionary): un arreglo asociativo que define las tablas 
  //        con las que los datos leidos seran mezclados organizados por nombre
  //        de las tablas y tipo de mezclado y la condicion que debe cumplirse 
  //        para que la mezcla se lleve a cabo
  // [out]  return (boolean): verdadero o falso dependiendo si habia valores en 
  //        tabla que cumplian con la condicion especificada o no
  protected function has($where, $joins = NULL) {
    $hasJoins = isset($joins);
    return ($hasJoins) ?
      self::$dataBase->has($this->table, $joins, $where) :
      self::$dataBase->has($this->table, $where);
  }

  // Inserta nuevos datos a la tabla
  // [in]   rows (dictionary): arreglo asociativo que define los datos a 
  //        insertar en la tabla organizados por renglones y columnas
  // [out]  return (uint): el ID del ultimo renglon insertado
  protected function insert($rows) {
    return self::$dataBase->insert($this->table, $rows);
  }
  
  // Modifica los valores en la tabla que cumplan con las condiciones 
  // especificadas
  // [in]   newValues (dictionary): arreglo asociativo que define las columnas 
  //        que seran modificadas y los nuevos valores que seran añadidos 
  //        organizados por renglones y columnas
  // [in]   where (dictionary): un arreglo asociativo que define las
  //        condiciones con las que los datos seran filtrados ordenados por
  //        nombre de la operacion y nombre del valor al cual le sera aplicada
  //        dicha operacion
  // [out]  return (uint): el numero de renglones que fueron modificados
  protected function update($newValues, $where) {
    return self::$dataBase->update($this->table, $newValues, $where);
  }
  
  // Borra de la tabla todos los renglones que cumplan con las condiciones 
  // especificadas
  // [in]   where (dictionary): un arreglo asociativo que define las
  //        condiciones con las que los datos seran filtrados ordenados por
  //        nombre de la operacion y nombre del valor al cual le sera aplicada
  //        dicha operacion
  // [out]  return (uint): el numero de renglones que fueron borrados
  protected function delete($where) {
    return self::$dataBase->delete($this->table, $where);
  }

  // Cuenta el numero de renglones en la tabla que cumplan con las condiciones
  // especificadas
  // [in]   [where] (dictionary): un arreglo asociativo que define las
  //        condiciones con las que los datos seran filtrados ordenados por
  //        nombre de la operacion y nombre del valor al cual le sera aplicada
  //        dicha operacion
  // [in]   [joins] (dictionary): un arreglo asociativo que define las tablas 
  //        con las que los datos leidos seran mezclados organizados por nombre
  //        de las tablas y tipo de mezclado y la condicion que debe cumplirse 
  //        para que la mezcla se lleve a cabo
  // [out]  return (uint): el numero de renglones contados
  protected function count($where = [], $joins = NULL) {
    $hasJoins = isset($joins);
    return ($hasJoins) ?
      self::$dataBase->count($this->table, $joins, $column, $where) :
      self::$dataBase->count($this->table, $where);
  }
}   // class DataBaseTable


// Intenta conectarse a la base de datos
DataBaseTable::connectToDataBase();

?>