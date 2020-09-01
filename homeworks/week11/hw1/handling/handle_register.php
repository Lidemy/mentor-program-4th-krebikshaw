<?php
  session_start();
  require_once('./../DB_conn.php');

  if (
  	empty($_POST['nickname']) ||
  	empty($_POST['username']) || 
  	empty($_POST['password'])) {
    header("Location: ./../register.php?errCode=1");
    exit;
  }

  $nickname = trim($_POST['nickname']);
  $username = trim($_POST['username']);
  $password = trim($_POST['password']);

  $password = password_hash($password, PASSWORD_DEFAULT);

  $sql = 'insert into krebikshaw_users(nickname, username, password) ' .
  'values(?, ?, ?) ';
  
  $stmt = $db->conn->prepare($sql);
  $stmt->bind_param('sss', $nickname, $username, $password);
  $stmt->execute();
  $result = $stmt->get_result();

  if (!$result) {
  	$code = $db->conn->errno;
  	if ($code === 1062) {
  	  header("Location: ./../register.php?errCode=2");
      exit;
  	}
  }

  $_SESSION['username'] = $username;
  header("Location: ./../index.php");

?>