<?php

// Namespace for the project's Data Access Objects
namespace fsm\database;

// Importing the configuration file
require_once realpath(dirname(__FILE__)."/../config/database_config.php");

// Import Medoo library for interfacing with SQL
require_once realpath(dirname(__FILE__)."/../../../external/autoload.php");


// Attempts to connect to the database and returns an interface to it if 
// succeeded
function connectToDataBase()
{
    // We are using medoo as the backend of our model and corresponding daos
    return new \medoo([
        "database_type" => "mysql",
        "database_name" => DATA_BASE,
        "server" => HOST,
        "username" => USER,
        "password" => PASSWORD,
        "charset" => "utf8",
        "option" => [
            \PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION,
            \PDO::ATTR_EMULATE_PREPARES => false
        ] 
    ]);
}


// An interface for the data base of the project which provides the basic 
// SELECT, INSERT, UPDATE, DELETE and JOIN methods.
class DataAccessObject
{
    // The holder of the connection to the data base that stores our tables
    protected $dataBaseConnection;
     
    // The name of the table that this DAO represents
    protected $tableName;
    
    
    // Creates a new DAO connected to the specified data base and associated 
    // with the table of the specified name
    // [in]    dataBaseConnection: the object that represents the interface to
    //         the data base to be queried
    // [in]    tableName: a string describing the name of the table to be 
    //         queried
    function __construct($dataBaseConnection, $tableName)
    {
        $this->dataBaseConnection = $dataBaseConnection;
        $this->tableName = $tableName;
    }
    
    
    // Returns an associative array of the data elements read from the table in
    // question that complied with the specified "where" clause.
    // [in]    columns: an array of strings where the name of the columns that 
    //         are going to be read from the table are defined
    // [in]    where (optional): an associative array that defines the 
    //         conditions against which the data elements are going to be 
    //         evaluated to be read from the table; the key of the array 
    //         represents the operation that is going to be performed and the 
    //         element the value to which the operation is going to be applied
    // [out]   return: the rows read from the table ordered as an associative 
    //         array using the column name as the key
    protected function select($columns, $where = [])
    {
        return $this->dataBaseConnection->select($this->tableName, $columns, 
            $where);
    }
    
    
    // Inserts the specified data elements into the table in question
    // [in]    rows: an array of associative arrays that define the column 
    //         names and their corresponding values to be inserted into the 
    //         table
    // [out]   return: the ID of the last inserted row
    protected function insert($rows)
    {
        return $this->dataBaseConnection->insert($this->tableName, $rows);
    }
    
    
    // Changes the values of the elements of the table in question where the
    // specified condition is met to the specified values
    // [in]    newValues: an assocative array that defines the column names 
    //         that are going to be modified and with which corresponding value
    // [in]    where: an associative array that defines the 
    //         conditions against which the data elements are going to be 
    //         evaluated to be updated; the key of the array represents the 
    //         operation that is going to be performed and the element the 
    //         value to which the operation is going to be applied
    // [out]   return: the number of rows updated
    protected function update($newValues, $where)
    {
        return $this->dataBaseConnection->update($this->tableName, 
            $newValues, $where);
    }
    
    
    // Deletes from the table in question all data elements that meet the 
    // specified condition
    // [in]    where: an associative array that defines the conditions 
    //         against which the data elements are going to be evaluated to be 
    //         updated; the key of the array represents the operation that is
    //         going to be performed and the element the value to which the 
    //         operation is going to be applied
    // [out]   return: the number of rows deleted
    protected function delete($where)
    {
        return $this->dataBaseConnection->delete($this->tableName, $where);
    }
    
    
    // Reads data from the database after joining the table with others using
    // the specified conditions
    // [in]    conditions: an associative array that specifies the tables to be
    //         joined and how; the key expresses the table and type of join 
    //         while the value is a pair that indicate the columns which are 
    //         going to be compared, one for the right table and the other for
    //         the left table
    // [in]    columns: an array of strings where the name of the columns that 
    //         are going to be read from the table are defined
    // [in]    where (optional): an associative array that defines the 
    //         conditions against which the data elements are going to be 
    //         evaluated to be read from the table; the key of the array 
    //         represents the operation that is going to be performed and the 
    //         element the value to which the operation is going to be applied
    // [out]   return: the rows read from the table ordered as an associative 
    //         array using the column name as the key
    protected function join($conditions, $columns, $where = [])
    {
        return $this->dataBaseConnection->select($this->tableName, 
            $conditions, $columns, $where);
    }
}

?>