<?php
  require_once('DB_conn.php');

  function getAllUsers() {
  	global $db;
  	$sql = 'select * from krebikshaw_users order by ? asc';
  	return $db->sqlQuery($sql, 's', 'id');
  }

  function getUser($username) {
    global $db;
    $sql = 'select * from krebikshaw_users where username=?';
    $db->sqlQuery($sql, 's', $username);
    return $db->getResult();
  }

  function getRole($id) {
  	global $db;
  	$sql = 'select * from krebikshaw_roles where id=?';
  	$db->sqlQuery($sql, 'i', $id);
  	return $db->getResult();
  }

  function getComment($id) {
  	global $db;
  	$sql = 'select * from krebikshaw_comments where id=?';
  	$db->sqlQuery($sql, 'i', $id);
  	return $db->getResult();
  }

  function getAllComments($limit, $offset) {
  	global $db;
  	$sql = 'select ' .
		'U.nickname, U.username, C.created_at, C.comment, C.id, C.updated_at ' .
		'from krebikshaw_comments as C ' .
		'left join krebikshaw_users as U on C.user_id = U.id ' .
		'where C.is_deleted is NULL ' .
		'order by C.id desc limit ? offset ?';
		return $db->sqlQuery($sql, 'ii', $limit, $offset);
  }

  function getTotalPage() {
  	global $db;
  	$sql = 'select count(?) as count from krebikshaw_comments where is_deleted is NULL';
  	$db->sqlQuery($sql, 's', 'id');
  	return $db->getResult();
  }

  function getAllRoles() {
  	global $db;
  	$sql = 'select * from krebikshaw_roles order by ? asc';
  	return $db->sqlQuery($sql, 's', 'id');
  }

  class CheckPermission {
  	public function __construct($username, $action, $comment_id) {
  		$this->username = $username;
  		$this->action = $action;
  		$this->comment_id = $comment_id;
  		$this->init();
  	}

  	private function init() {
  		$this->userData = getUser($this->username);
  		$this->roleData = getRole($this->userData['role']);
  		$this->commentData = getComment($this->comment_id);
  	}

  	public function isAdmin() {
  		return !empty($this->roleData['is_admin']);
  	}

  	public function hasPermission() {
  		if ( !$this->checkAction()) return false ;
  		if ( !$this->checkBelonging()) return false ;
  		return true;
  	}

  	private function checkAction() {
  		if ($this->action === 'create') {
  			return !empty($this->roleData['create_comment']);
  		}
			if ($this->action === 'update') {
				return !empty($this->roleData['update_oneself']) || !empty($this->roleData['update_all']);
  		}
  		if ($this->action === 'delete') {
  			return !empty($this->roleData['delete_oneself']) || !empty($this->roleData['delete_all']);
  		}  		
  	}

  	private function checkBelonging() {
  		if (empty($this->comment_id) || $this->action === 'create') return true ;
  		if ($this->action === 'update' && !empty($this->roleData['update_all'])) return true ;
  		if ($this->action === 'delete' && !empty($this->roleData['delete_all'])) return true ;
  		return ($this->userData['id'] === $this->commentData['user_id']);
  	}
  }

?>
