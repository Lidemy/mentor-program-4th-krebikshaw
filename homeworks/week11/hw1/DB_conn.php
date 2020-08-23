<?php
  require_once('DB_config.php');

  class Db {
    public function __construct($servername, $username, $password, $db_name) {
      $this->server = $servername;
      $this->user = $username;
      $this->pass = $password;
      $this->db = $db_name;
      $this->init();
    }

    private function init() {
      $this->conn = mysqli_connect($this->server, $this->user, $this->pass, $this->db);
      if ($this->conn->connect_error) {
        die('資料庫連線錯誤：' . $this->conn->connect_error);
      }
      mysqli_query($this->conn, "SET NAMES utf8");
      mysqli_query($this->conn, 'SET time_zone = "+8:00"');
    }

    public function sqlQuery($str, $type = 's', ...$List) {
      $this->stmt = mysqli_prepare($this->conn, $str);
      mysqli_stmt_bind_param($this->stmt, $type, ...$List);
      $this->stmt_result = mysqli_stmt_execute($this->stmt);
      $this->checkResult();
      $this->result = $this->stmt->get_result();
    }

    private function checkResult() {
      if (!$this->stmt_result) {
        echo 'Failed' . $this->conn->error;
        exit;
      }
    }

    public function getResult() {
      return $this->result ? $this->result->fetch_assoc() : ''; 
    }
  }

  $db = new Db($servername, $username, $password, $db_name);
?>