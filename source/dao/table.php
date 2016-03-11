<?php

namespace espresso;

require_once "config.php";

// Data Access Object for accessing the elements of a specific table in 
// the database. The interface of this class provides the basic SELECT, INSERT,
// UPDATE and DELETE methods.
abstract class Table
{
    // The holder of the connection to the data base that stores our tables
    static protected $dataBaseConnection_;
     
    // The name of the table that this DAO represents
    protected $tableName_;
    
    
    // Creates a new DAO associated with the table of the specified name
    function __construct($tableName)
    {
        $tableName_ = $tableName;
    }
    
    
    // Returns an associative array of the data elements read from the table in
    // question that complied with the specified "where" clause.
    // [in]    columns: an array of strings where the name of the columns that 
    //         are going to be read from the table are defined
    // [in]    where: an associative array that defines the conditions 
    //         against which the data elements are going to be evaluated to be
    //         read from the table; the key of the array represents the 
    //         operation that is going to be performed and the element 
    //         the value to which the operation is going to be applied
    // [out]   return: the rows read from the table ordered as an associative 
    //         array using the column name as the key
    protected function select($columns, $where)
    {
        return $dataBaseConnection_->select($tableName_, $columns, $where);
    }
    
    
    // Inserts the specified data elements into the table in question
    // [in]    rows: an array of associative arrays that define the column 
    //         names and their corresponding values to be inserted into the 
    //         table
    // [out]   return: the ID of the last inserted row
    protected function insert($rows)
    {
        return $dataBaseConnection_->insert($tableName_, $rows);
    }
    
    
    // Changes the values of the elements of the table in question where the
    // specified condition is met to the specified values
    // [in]    newValues: an assocative array that defines the column names 
    //         that are going to be modified and with which corresponding value
    // [in]    where: an associative array that defines the conditions 
    //         against which the data elements are going to be evaluated to be 
    //         updated; the key of the array represents the operation that is
    //         going to be performed and the element the value to which the 
    //         operation is going to be applied
    // [out]   return: the number of rows updated
    protected function update($newValues, $where)
    {
        return $dataBaseConnection_->update($tableName_, $newValues, $where);
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
        return $dataBaseConnection_->delete($tableName_, $where);
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
    // [in]    where: an associative array that defines the conditions 
    //         against which the data elements are going to be evaluated to be
    //         read from the table; the key of the array represents the 
    //         operation that is going to be performed and the element 
    //         the value to which the operation is going to be applied
    // [out]   return: the rows read from the table ordered as an associative 
    //         array using the column name as the key
    protected function join($conditions, $columns, $where)
    {
        return $dataBaseConnection_->select($tableName_, $conditions, $columns, 
            $where);
    }
    
    
    // Returns the element which has the specified id in the table
    function findItemById($id)
    {
        return select(["*"], ["id" => $id]);
    }
}

// Establish a connection to the data base and store it in the DAO for future 
// use
Table::$dataBaseConnection = connectToDataBase();

?>