<?php

// Namespace for the project's Data Access Objects
namespace fsm\database;

// Importing the configuration file
require_once realpath(dirname(__FILE__)."/../config/database_config.php");

// Import Medoo library for interfacing with SQL
require_once realpath(dirname(__FILE__)."/../../../external/autoload.php");


// An interface for the data base of the project which provides access to an 
// individual table
class DataAccessObject
{
    // The holder of the connection to the data base that stores our tables
    protected static $dataBase;
     
    // The name of the table that this DAO represents
    protected $table;
    
    
    // Creates a new DAO connected to the specified data base and associated 
    // with the table of the specified name
    // [in]    table: a string describing the name of the table to be 
    //         queried
    function __construct($table)
    {
        $this->table = $table;
    }


    // Returns the data of a single row element read from the table
    // [in]    columns: an array of strings where the name of the columns that 
    //         are going to be read from the table are defined
    // [in]    [where]: an associative array that defines the 
    //         conditions against which the data elements are going to be 
    //         evaluated to be read from the table; the key of the array 
    //         represents the operation that is going to be performed and the 
    //         element the value to which the operation is going to be applied
    // [out]   return: an associative array containing the values of the table 
    //         row that was read; the key is the column name
    protected function get($columns, $where = [])
    {
        return self::$dataBase->get($this->table, $columns, $where);
    }


    // Returns an associative array of the data elements read from the table in
    // question that complied with the specified "where" clause
    // [in]    columns: an array of strings where the name of the columns that 
    //         are going to be read from the table are defined
    // [in]    [where]: an associative array that defines the 
    //         conditions against which the data elements are going to be 
    //         evaluated to be read from the table; the key of the array 
    //         represents the operation that is going to be performed and the 
    //         element the value to which the operation is going to be applied
    // [in]    [joins]: an associative array that specifies the tables to be
    //         joined and how; the key expresses the table and type of join 
    //         while the value is a pair that indicate the columns which are 
    //         going to be compared, one for the right table and the other for
    //         the left table
    // [out]   return: the rows read from the table ordered as an associative 
    //         array using the column name as the key
    protected function select($columns, $where = [], $joins = NULL)
    {
        $hasJoins = isset($joins);
        return ($hasJoins) ?
            self::$dataBase->select($this->table, $joins, $columns, $where) :
            self::$dataBase->select($this->table, $columns, $where);
    }


    // Checks if there is any data in the table that complies to the specified 
    // where clause, returning true if this is the case or false otherwise 
    // [in]    where: an associative array that defines the 
    //         conditions against which the data elements are going to be 
    //         evaluated to be read from the table; the key of the array 
    //         represents the operation that is going to be performed and the 
    //         element the value to which the operation is going to be applied
    // [in]    [joins]: an associative array that specifies the tables to be
    //         joined and how; the key expresses the table and type of join 
    //         while the value is a pair that indicate the columns which are 
    //         going to be compared, one for the right table and the other for
    //         the left table
    // [out]   return: true if the where clause returned data from the table or 
    //         false otherwise
    protected function has($where, $joins = NULL)
    {
        $hasJoins = isset($joins);
        return ($hasJoins) ?
            self::$dataBase->has($this->table, $joins, $where) :
            self::$dataBase->has($this->table, $where);
    }


    // Inserts the specified data elements into the table in question
    // [in]    rows: an array of associative arrays that define the column 
    //         names and their corresponding values to be inserted into the 
    //         table
    // [out]   return: the ID of the last inserted row
    protected function insert($rows)
    {
        return self::$dataBase->insert($this->table, $rows);
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
        return self::$dataBase->update($this->table, $newValues, $where);
    }


    // Replaces old data in the table columns to new data as specified
    // [in]    columns: an array of strings where the name of the columns that 
    //         are going to be read from the table are defined
    // [in]    [where]: an associative array that defines the data to be 
    //         searched 
    //         in a column and the data it will be replaced with; the key of 
    //         the array represents the column and the value is another array 
    //         of key-value pair that defines the data to be searched and the 
    //         values that data is going to be replaced with
    // [out]   return: the number of columns that where affected
    protected function replace($columns, $where = [])
    {
        return self::$dataBase->replace($this->table, $columns, $where);
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
        return self::$dataBase->delete($this->table, $where);
    }


    // Counts the number of rows of data read from the table that comply to the 
    // specified "where" condition
    // [in]    [where]: an associative array that defines the conditions 
    //         against which the data elements are going to be evaluated to be 
    //         updated; the key of the array represents the operation that is
    //         going to be performed and the element the value to which the 
    //         operation is going to be applied
    // [in]    [joins]: an associative array that specifies the tables to be
    //         joined and how; the key expresses the table and type of join 
    //         while the value is a pair that indicate the columns which are 
    //         going to be compared, one for the right table and the other for
    //         the left table
    // [out]   return: the number of rows read from the table
    protected function count($where = [], $joins = NULL)
    {
        $hasJoins = isset($joins);
        return ($hasJoins) ?
            self::$dataBase->count($this->table, $joins, $column, $where) :
            self::$dataBase->count($this->table, $where);
    }


    // Retrieves the smallest value of the specified column
    // [in]    column: a string that contains the name of the column that is 
    //         going to be operated upon
    // [in]    [where]: an associative array that defines the conditions 
    //         against which the data elements are going to be evaluated to be 
    //         updated; the key of the array represents the operation that is
    //         going to be performed and the element the value to which the 
    //         operation is going to be applied
    // [in]    [joins]: an associative array that specifies the tables to be
    //         joined and how; the key expresses the table and type of join 
    //         while the value is a pair that indicate the columns which are 
    //         going to be compared, one for the right table and the other for
    //         the left table
    // [out]   return: the smallest number of the specified column
    protected function min($column, $where = [], $joins = NULL)
    {
        $hasJoins = isset($joins);
        return ($hasJoins) ?
            self::$dataBase->min($this->table, $joins, $column, $where) :
            self::$dataBase->min($this->table, $column, $where);
    }


    // Retrieves the largest value of the specified column
    // [in]    column: a string that contains the name of the column that is 
    //         going to be operated upon
    // [in]    [where]: an associative array that defines the conditions 
    //         against which the data elements are going to be evaluated to be 
    //         updated; the key of the array represents the operation that is
    //         going to be performed and the element the value to which the 
    //         operation is going to be applied
    // [in]    [joins]: an associative array that specifies the tables to be
    //         joined and how; the key expresses the table and type of join 
    //         while the value is a pair that indicate the columns which are 
    //         going to be compared, one for the right table and the other for
    //         the left table
    // [out]   return: the largest number of the specified column
    protected function max($column, $where = [], $joins = NULL)
    {
        $hasJoins = isset($joins);
        return ($hasJoins) ?
            self::$dataBase->max($this->table, $joins, $column, $where) :
            self::$dataBase->max($this->table, $column, $where);
    }


    // Computes the total sum of the values of the specified column
    // [in]    column: a string that contains the name of the column that is 
    //         going to be operated upon
    // [in]    [where]: an associative array that defines the conditions 
    //         against which the data elements are going to be evaluated to be 
    //         updated; the key of the array represents the operation that is
    //         going to be performed and the element the value to which the 
    //         operation is going to be applied
    // [in]    [joins]: an associative array that specifies the tables to be
    //         joined and how; the key expresses the table and type of join 
    //         while the value is a pair that indicate the columns which are 
    //         going to be compared, one for the right table and the other for
    //         the left table
    // [out]   return: the sum of the values of the specified column
    protected function sum($column, $where = [], $joins = NULL)
    {
        $hasJoins = isset($joins);
        return ($hasJoins) ?
            self::$dataBase->sum($this->table, $joins, $column, $where) :
            self::$dataBase->sum($this->table, $column, $where);
    }


    // Computes the average of the values of the specified column
    // [in]    column: a string that contains the name of the column that is 
    //         going to be operated upon
    // [in]    [where]: an associative array that defines the conditions 
    //         against which the data elements are going to be evaluated to be 
    //         updated; the key of the array represents the operation that is
    //         going to be performed and the element the value to which the 
    //         operation is going to be applied
    // [in]    [joins]: an associative array that specifies the tables to be
    //         joined and how; the key expresses the table and type of join 
    //         while the value is a pair that indicate the columns which are 
    //         going to be compared, one for the right table and the other for
    //         the left table
    // [out]   return: the average of the values of the specified column
    protected function avg($column, $where = [], $joins = NULL)
    {
        $hasJoins = isset($joins);
        return ($hasJoins) ?
            self::$dataBase->avg($this->table, $joins, $column, $where) :
            self::$dataBase->avg($this->table, $column, $where);
    }
}   // class DataAccessObject


// Attempts to connect to the database and returns an interface to it if 
// succeeded
DataAccessObject::$dataBase = new \medoo([
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

?>