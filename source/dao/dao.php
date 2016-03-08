<?php

namespace espresso;

require_once "config.php"

// Classic Data Access Object for accessing the elements of a specific table in 
// the database. The interface of this class provides the basic SELECT, INSERT,
// UPDATE and DELETE methods.
abstract class DAO 
{
    // The name of the table that this DAO represents
    protected $tableName_;
    
    
    // Creates a new DAO associated with the table of the specified name
    function __construct($tableName)
    {
        $tableName_ = $tableName;
    }
    
    
    // Returns an associative array of the data elements read from the table in
    // question that complied with the specified "where" clause. If the query 
    // fails, an exception is thrown.
    // [in] dataBaseConnection: the object representing a connection to the
    //      data base to be queried
    // [in] fields: a string that defines the columns that are going to be read
    //      from the table
    // [in] condition: a string that defines the condition against which the
    //      data elements are going to be evaluated; named or unnamed parameters
    //      may be used
    // [in] variables: if unnamed parameters where used in condition, then this 
    //      must be a sequential array with the input values for these 
    //      parameters; if named parameters where used instead, then this must
    //      be a associative array where the values for the parameters are 
    //      stored with corresponding parameter names as keys 
    // [return] The rows read from the table ordered as an associative array
    //      using the column name as the key
    // [throws] If the query failed, an exception will be thrown
    protected function 
    select($dataBaseConnection, $fields, $condition, $variables)
    {
        $dataBaseConnection->prepare("SELECT ".$columns." FROM ".$tableName_.
            " WHERE ".$condition);
        
        $result = $dataBaseConnection->execute($variables);
                
        return $result->fetchAll(PDO::FETCH_ASSOC);
    }
    
    
    // Inserts the specified data elements into the table in question
    // [in] dataBaseConnection: the object representing a connection to the
    //      data base to be queried
    // [in] fields: an string that defines the columns that are going to be 
    //      modified by the insertion of data
    // [in] values: a 2D array that organizes the data to be inserted
    //      as rows and columns
    // [throws] If the query failed, an exception will be thrown
    protected function insert($dataBaseConnection, $fields, $values)
    {
        $query = "INSER INTO ".$tableName_." (".$fields.") VALUES (";
        
        $numColumns = count($values[0]);
        for ($i = 0; $i < $numColumns; ++$i) {
            $query .= "?";
            $query .= ($i < $numColumns - 1) ? ", " : ")";
        }
        
        $dataBaseConnection->beginTransaction();
        $dataBaseConnection->prepare($query);
        
        foreach ($values as $row) {
            $dataBaseConnection->execute($row);
        }
        
        $dataBaseConnection->commit();
    }
    
    
    // Changes the values of the elements of the table in question where the
    // specified condition is met to the specified values and returns the number
    // of elements that where modified; if the query fails, an exception is 
    // thrown
    // [in] dataBaseConnection: the object representing a connection to the
    //      data base to be queried
    // [in] values: a string that defines the columns that are going to be 
    //      modified and how; named or unnamed parameters may be used
    // [in] condition: a string that defines the condition against which the
    //      data elements are going to be evaluated; named or unnamed parameters
    //      may be used
    // [in] variables: if unnamed parameters where used in condition, then this 
    //      must be a sequential array with the input values for these 
    //      parameters; if named parameters where used instead, then this must
    //      be a associative array where the values for the parameters are 
    //      stored with corresponding parameter names as keys 
    // [return] The number of rows update
    // [throws] If the query failed, an exception will be thrown
    protected function 
    update($dataBaseConnection, $values, $condition, $variables)
    {
        $dataBaseConnection->prepare("UPDATE ".$tableName_." SET ".$values.
            " WHERE ".$condition);
            
        $result = $dataBaseConnection->execute($variables);
        
        return $result->rowCount();
    }
    
    
    // Delete from the table in question all data elements that meet the 
    // specified condition and returns the number of rows deleted; if the query
    // fails, an exception is thrown
    // [in] dataBaseConnection: the object representing a connection to the
    //      data base to be queried
    // [in] condition: a string that defines the condition against which the
    //      data elements are going to be evaluated; named or unnamed parameters
    //      may be used
    // [in] variables: if unnamed parameters where used in condition, then this 
    //      must be a sequential array with the input values for these 
    //      parameters; if named parameters where used instead, then this must
    //      be an associative array where the values for the parameters are 
    //      stored with corresponding parameter names as keys 
    // [return] The number of rows deleted
    // [throws] If the query failed, an exception will be thrown
    protected function delete($dataBaseConnection, $condition, $variables)
    {
        $dataBaseConnection->prepare("DELETE FROM ".$tableName_." WHERE ".
            $condition);
        
        $result = $dataBaseConnection->execute($variables);
        
        return $result->rowCount();
    }
    
    
    // Reads data from the database after joining the table with another one
    // using the specified conditions; if the query fails, an exception is 
    // thrown
    // [in] dataBaseConnection: the object representing a connection to the
    //      data base to be queried
    // [in] joinTables: a sequential array of the DAO objects of every table
    //      that is going to be joined with this table
    // [in] fields: a string that defines the fields of any of the tables that
    //      are going to be read; for the purpose of providing a shorthand, 
    //      this functions use SQL alias "o" for this table and "tn" for 
    //      any subsequent joining table, where n is an integer that increments 
    //      by 1, so these aliases can be used in this string
    // [in] joinConditions: a sequential array of strings that define the 
    //      condition against which each corresponding table is going to be
    //      evaluated when joining; the same alias explained earlier, as well 
    //      as named and unnamed parameters can be used in this string
    // [in] selectCondition: a string that defines the condition against which
    //      the elements are going to be evaluated when reading them from the
    //      resulting table; the aliases as well as namedand unnamed parameters
    //      can be used in this string
    // [in] variables: if unnamed parameters where used in the conditions, then 
    //      this must be a sequential array with the input values for these 
    //      parameters; if named parameters where used instead, then this must
    //      be an associative array where the values for the parameters are 
    //      stored with corresponding parameter names as keys 
    // [return] The rows read from the table ordered as an associative array
    //      using the column name as the key
    // [throws] If the query failed, an exception will be thrown
    protected function 
    innerJoin($dataBaseConnection, $joinTables, $fields, $joinConditions, 
              $selectCondition, $variables)
    {
        $query = "SELECT ".$fields." FROM ".$tableName_." AS o ";
        
        for ($i = 0; $i < count($joinTables); ++$i) {
            $query .= "INNER JOIN ".$joinTables[$i]->$tableName_." AS t".$i." ";
            $query .= "ON ".$joinConditions[$i];
        }
        
        $query .= " WHERE ".$selectCondition;
        $dataBaseConnection->prepare($query);
        $result = $dataBaseConnection->execute($variables);
        
        return $result->fetchAll(PDO::FETCH_ASSOC);
    }
    
    
    // Returns the element which has the specified id in the table; if the query
    // fails, an exception is thrown
    // [in] dataBaseConnection: the object representing a connection to the
    //      data base to be queried
    // [in] id: the id of the element that we want to look for in the 
    //      table
    // [return] The row read from the table ordered as an associative array
    //      using the column name as the key
    // [throws] If the query failed, an exception will be thrown
    abstract function findById($dataBaseConnection, $id) {}
    
    
    // Returns a list of elements which have the specified name;
    // if the query fails, an exception is thrown
    // [in] dataBaseConnection: the object representing a connection to the
    //      data base to be queried
    // [in] name: the name of the element that we want to look for in the 
    //      table
    // [return] The rows read from the table ordered as an associative array
    //      using the column name as the key
    // [throws] If the query failed, an exception will be thrown
    abstract function findByName($dataBaseConnection, $name) {}
    
    
    // Returns a list of the elements which have the specified date;
    // if the query fails, an exception is thrown
    // [in] dataBaseConnection: the object representing a connection to the
    //      data base to be queried
    // [in] date: a string defining the date of the element that we want to 
    //      look for in the table
    // [return] The rows read from the table ordered as an associative array
    //      using the column name as the key
    // [throws] If the query failed, an exception will be thrown 
    abstract function findByDate($dataBaseConnection, $date) {}
}

?>