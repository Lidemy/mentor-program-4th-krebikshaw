<?php
  require_once('DB_conn.php');

  function getUser($username) {
    global $db;
    $sql = 'select * from krebikshaw_users where username=?';
    $db->sqlQuery($sql, 's', $username);
    return $db->getResult();
  }

  function getPost($id) {
  	global $db;
  	$sql = 'select * from krebikshaw_post where id=?';
  	$db->sqlQuery($sql, 'i', $id);
  	return $db->getResult();
  }

  function getAllCategory() {
    global $db;
    $sql = 'select * from krebikshaw_category where is_deleted=?';
    $db->sqlQuery($sql, 'i', 0);

    $category = array();
    while ($row = $db->getResult()) {
      array_push($category, array(
        'id' => $row['id'],
        'name' => $row['name'],
        'text' => $row['text'],
        'created_at' => $row['created_at'],
        'updated_at' => $row['updated_at']
      ));
    }
    return $category;
  }

  function getAllPost($limit, $offset) {
  	global $db;
  	$sql = 'select ' .
        'U.nickname as nickname, ' .
        'P.id as id, ' .
        'P.category_id as category_id, ' .
        'P.title as title, ' .
        'P.content as content, ' .
        'P.created_at as created_at, ' .
        'P.updated_at as updated_at ' .
        'from krebikshaw_post as P ' .
        'left join krebikshaw_users as U on P.user_id=U.id ' .
        'where P.is_deleted = 0 ' .
        'order by P.id desc ' .
        'limit ? offset ?';
    $db->sqlQuery($sql, 'ii', $limit, $offset);

    $post = array();
    while ($row = $db->getResult()) {
      array_push($post, array(
        'id' => $row['id'],
        'nickname' => $row['nickname'],
        'category_id' => $row['category_id'],
        'title' => $row['title'],
        'content' => $row['content'],
        'created_at' => $row['created_at'],
        'updated_at' => $row['updated_at']
      ));
    }
    return $post;
  }

  function getCategoryCount() {
    global $db;
    $sql = 'select count(?) as count from krebikshaw_category';
    $db->sqlQuery($sql, 's', 'id');
    return $db->getResult();
  }

  function getPostByCategoryId($id) {
    global $db;
    $sql = 'select * from krebikshaw_post where is_deleted=0 and category_id=? order by id desc';
    $db->sqlQuery($sql, 'i', $id);

    $post = array();
    while ($row = $db->getResult()) {
      array_push($post, array(
        'id' => $row['id'],
        'category_id' => $row['category_id'],
        'title' => $row['title'],
        'content' => $row['content'],
        'created_at' => $row['created_at'],
        'updated_at' => $row['updated_at']
      ));
    }
    return $post;
  }

  function getCategoryName($id) {
    global $db;
    $sql = 'select name from krebikshaw_category where id=?';
    $db->sqlQuery($sql, 'i', $id);
    return $db->getResult();
  }

  function getPostJoinCategory() {
    global $db;
    $sql = 'select ' .
      'C.id as cat_id, ' .
      'C.name as cat_name, ' .
      'P.id as post_id, ' .
      'P.title as post_title, ' .
      'P.content as content, ' .
      'P.created_at, ' .
      'P.updated_at ' .
      'from krebikshaw_post as P ' .
      'left join krebikshaw_category as C on P.category_id = C.id ' .
      'where P.is_deleted = ? ' .
      'order by C.id asc';
    $db->sqlQuery($sql, 'i', 0);

    $post = array();
    while ($row = $db->getResult()) {
      array_push($post, array(
        'category_id' => $row['cat_id'],
        'category_name' => $row['cat_name'],
        'post_id' => $row['post_id'],
        'title' => $row['post_title'],
        'content' => $row['content'],
        'created_at' => $row['created_at'],
        'updated_at' => $row['updated_at']
      ));
    }
    return $post;
  }


  function getTotalPage() {
  	global $db;
  	$sql = 'select count(?) as count from krebikshaw_post where is_deleted = 0';
  	$db->sqlQuery($sql, 's', 'id');
  	return $db->getResult();
  }

  function isAdmin($username) {
    return $username === 'admin';
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
