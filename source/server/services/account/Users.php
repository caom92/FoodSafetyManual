<?php

namespace fsm\database;
require_once realpath(dirname(__FILE__).'/../../dao/ToggableItemsTable.php');
use fsm\database as db;


// Interfaz para la tabla users
class Users extends db\ToggableItemsTable
{
  // Crea una instancia de una interfaz a la base de datos para modificar 
  // la tabla users
  function __construct() { 
    parent::__construct('users');
  }

  // Returns an associative array containing the data of the which
  // has the especified identifier; it can also search for an 
  // identifier and password combination
  // [in]     identifier: the identifier of the element that we want 
  //          to look for; in this case, this can be either the ID, the
  //          user name, the employee number
  // [out]    return: an associative array with the data of the element
  //          that contained the especified identifier and password 
  //          combination, or an empty string in case none was found
  function getByIdentifier($identifier) {
    $rows = parent::select(
      [
        "$this->table.id(user_id)", 'r.id(role_id)', 
        'r.name(role_name)', 
        'z.id(zone_id)', 'z.name(zone_name)', 'z.company_name(zone_company)',
        'z.address(zone_address)', 'z.logo_path(zone_logo)',
        'employee_num', 'first_name', 'last_name', 'login_name', 
        'login_password'
      ], 
      [ 
        'AND' => [
          "OR" => [
            "$this->table.id" => $identifier,
            "employee_num" => $identifier,
            "login_name" => $identifier
          ],
          "$this->table.is_active" => 1    
        ]
      ],
      [
        '[><]roles(r)' => [ 'role_id' => 'id' ],
        '[><]zones(z)' => [ 'zone_id' => 'id' ]
      ]
    );
    
    $isEmpty = count($rows) == 0;
    return (!$isEmpty) ? $rows[0] : NULL; 
  }

  // Returns true if there is data in the data base that shares the given 
  // user name
  function hasByLogInName($username) {
    return parent::has([ 'login_name' => $username ]);
  }

  // Returns the data of every user that shares the given employee number
  function hasByEmployeeNum($employeeNum) {
    return parent::has([ 'employee_num' => $employeeNum ]);
  }

  function hasByEmployeeNumAndDifferentId($employeeNum, $userId) {
    return parent::has([ 
      'AND' => [
        'employee_num' => $employeeNum,
        'id[!]' => $userId
      ]
    ]);
  }

  function hasUserId($userId) {
    return parent::has([ 
      'id' => $userId
    ]);
  }

  // Returns an associative with the basic information of every user in the 
  // data base which is not an administrator, where the key is the field name
  // and the value is the field value
  function selectAll() {
    return parent::$dataBase->query(
      "SELECT 
        $this->table.id,
        zone_id,
        z.name AS zone_name,
        role_id,
        r.name AS role_name,
        employee_num,
        login_name,
        first_name,
        last_name,
        is_active
      FROM $this->table 
      INNER JOIN roles AS r
      ON role_id = r.id
      INNER JOIN zones AS z
      ON zone_id = z.id
      WHERE $this->table.id != {$_SESSION['fsm']['user_id']}"
    )->fetchAll();
  }

  // Changes the login password field of the element in the table which has 
  // the especified user ID
  // [in]     id: the user ID of the elemente which login password we 
  //          want to change
  // [in]     newPassword: the new password value that is to be assigned
  //          to the element found
  // [out]    return: the number of rows affected
  function updatePasswordByUserID($id, $newPassword) {
    parent::update(
      [ "login_password" => $newPassword ], 
      [ "id" => $id ]
    );
  }

  // Changes the login name field of the element in the table which has the 
  // especified user ID
  // [in]     id: the user ID of the element which login name we 
  //          want to change
  // [in]     newName: the new login name value that is to be assigned
  //          to the element found
  // [out]    return: the number of rows affected
  function updateLogInNameByUserID($id, $newName) {
    parent::update(
      [ "login_name" => $newName ],
      [ "id" => $id ]
    );
  }

  // Deletes the user which has the specified ID
  function deleteByID($id) {
    return parent::delete(['id' => $id]);
  }

  // Edits the role of the user with the especified ID to the one with the
  // specified ID
  function updateRoleByID($userID, $roleID) {
    return parent::update(
      ['role_id' => $roleID],
      ['id' => $userID]
    );
  }

  // Returns the name of the role of the user which has the especified 
  // employee number
  function getRoleByEmployeeNum($employeeNum) {
    $rows = parent::select(
      ['r.name(role_name)'], 
      ['employee_num' => $employeeNum],
      ['[><]roles(r)' => ['role_id' => "id"]]
    );
    return (count($rows) > 0) ? $rows[0]['role_name'] : NULL;
  }

  // Returns the name of the role of the user which has the especified 
  // employee number
  function getRoleByID($userID) {
    $rows = parent::select(
      ['r.name(role_name)'], 
      ["$this->table.id" => $userID],
      ['[><]roles(r)' => ['role_id' => "id"]]
    );
    return (count($rows) > 0) ? $rows[0]['role_name'] : NULL;
  }

  // Returns the zone ID of the user with the especified ID
  function getZoneIDByID($userID) {
    $rows = parent::get(
      ['zone_id'], 
      ['id' => $userID]
    );
    return (count($rows) > 0) ? $rows['zone_id'] : NULL;
  }
    
  // Returns a list of all the users that are supervisors and belong to the
  // especified zone
  function selectSupervisorsNameByZoneID($zoneID) {
    return parent::select(
      ["$this->table.id(id)", 'first_name', 'last_name'],
      ['AND' => [
        'zone_id' => $zoneID,
        'r.name' => 'Supervisor',
        'is_active[!]' => FALSE
      ]],
      ['[><]roles(r)' => [
        'role_id' => 'id'
      ]]
    );
  }

  // Returns a list of all the users that are supervisors and belong to the
  // especified zone
  function selectInfoAndSignatureByZoneID($zoneID) {
    return parent::select(
      [
        "$this->table.id(id)", 
        'first_name', 
        'last_name',
        'employee_num',
        'login_name(username)',
        'signature_path'
      ],
      ['AND' => [
        'zone_id' => $zoneID,
        'r.name' => 'Supervisor',
        'is_active[!]' => FALSE
      ]],
      ['[><]roles(r)' => [
        'role_id' => 'id'
      ]]
    );
  }

  // Returns a list of all the users that are active GP Supervisors
  function selectGpSupervisors() {
    return parent::select(
      [
        "$this->table.id(id)", 
        'first_name', 
        'last_name',
        'employee_num',
        'login_name(username)',
        'signature_path'
      ],
      [
        'AND' => [
          'r.name' => 'GP Supervisor',
          'is_active[!]' => FALSE
        ]
      ],
      [
        '[><]roles(r)' => [
          'role_id' => 'id'
        ]
      ]
    );
  }

  // Updates the zone ID of the user with the especified ID to the provided 
  // zone ID
  function updateZoneIDByID($userID, $zoneID) {
    return parent::update(
      ['zone_id' => $zoneID],
      ['id' => $userID]
    );
  }

  // Returns the name of the user with the especified ID
  function getNameByID($userID) {
    return parent::get(
      ['first_name', 'last_name', 'signature_path'],
      ['id' => $userID]
    );
  }

  // Returns the ID of the user with the especified eployee number
  function getIDByEmployeeNum($employeeNum) {
    return parent::get('id', ['employee_num' => $employeeNum]);
  }

  // Updates the path of the signature file of the user with the specified user 
  // ID, to the path given
  function updateSignaturePathByID($userID, $path) {
    return parent::update(['signature_path' => $path], ['id' => $userID]);
  }

  function updateNameAndEmployeeNumByID(
    $userID, $employeeNum, $firstName, $lastName
  ) {
    return parent::update(
      [
        'employee_num' => $employeeNum, 
        'first_name' => $firstName,
        'last_name' => $lastName
      ],
      [
        'id' => $userID
      ]
    );
  }

  function selectSupervisorsAndEmployeesByZoneID($zoneID) {
    return parent::select(
      [
        'id',
        'first_name',
        'last_name',
        'role_id'
      ],
      [
        'AND' => [
          'zone_id' => $zoneID,
          'role_id' => [3, 5],
          'is_active' => 1
        ],
        'ORDER' => ['first_name' => 'ASC']
      ]
    );
  }

  function isUserEmployee($userID) {
    return parent::has(['AND' => [
      'id' => $userID,
      'role_id' => 5
    ]]);
  }

  function isUserActive($userID) {
    return parent::has(['AND' => [
      'id' => $userID,
      'is_active' => 1
    ]]);
  }
}

?>