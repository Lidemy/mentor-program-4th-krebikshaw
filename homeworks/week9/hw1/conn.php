<?php
  
  $servername = 'mentor-program.co';
  $username = 'mtr04group5';
  $password = 'Lidemymtr04group5';
  $db_name = 'mtr04group5';

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

    public function sqlQuery($str) {
      $this->result = mysqli_query($this->conn, $str);
    }
  
    public function getNickname($str) {
      $sql = sprintf("select * from krebikshaw_users where username='%s'", $str);
      $this->sqlQuery($sql);
      if (!$this->result) {
        die($this->conn->error);
      }
      return $this->result->fetch_assoc()['nickname'];
    }

  }

  $db = new Db($servername, $username, $password, $db_name);
?>
