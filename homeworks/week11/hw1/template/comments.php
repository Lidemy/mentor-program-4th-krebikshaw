<?php
  require_once('DB_conn.php');
  
  $page = 1;
  if (!empty($_GET['page'])) {
    $page = intval($_GET['page']);
  }
  $limit = 10;
  $offset = ($page - 1) * $limit;

  $comment = array();
  getAllComments($limit, $offset);
  while($row = $db->getResult()) {
    array_push($comment, array(
      'nickname' => htmlspecialchars($row['nickname']),
      'created_at' => htmlspecialchars($row['created_at']),
      'updated_at' => htmlspecialchars($row['updated_at']?$row['updated_at']:''),
      'id' => htmlspecialchars($row['id']),
      'comment' => htmlspecialchars($row['comment'])
    ));
  }
  $username = !empty($user['username']) ? $user['username'] : ''; 

?>


<div class="cards">
  <?php for ($i = 0; $i < sizeof($comment); $i++) { ;?>
  <div class="card">
    <div class="avatar">
    </div>
    <div>
      <div class="card__top">
        <div class="author">
          <span class="nickname"><?php echo $comment[$i]['nickname']; ?></span>
          <span><?php echo $comment[$i]['updated_at']?$comment[$i]['updated_at']:$comment[$i]['created_at']; ?></span>
        </div>
        <div class="card__option">
          <ul>
            <?php 
              if (!empty($user['username'])) {
                $cp = new CheckPermission($username, 'update', $comment[$i]['id']);
                if ($cp->hasPermission()) { 
            ?>  
              <li><a class="pen" href="update_comment.php?id=<?php echo $comment[$i]['id'] ?>"><img src="images/pencil.svg"></a></li>
            <?php
                } 
              }
              if (!empty($user['username'])) {
                $cp = new CheckPermission($username, 'delete', $comment[$i]['id']);
                if ($cp->hasPermission()) { 
            ?>
              <li><a class="trash__can" href="handling/handle_delete_comment.php?id=<?php echo $comment[$i]['id'] ?>"><img src="images/delete.svg"></a></li>
            <?php
                }
              }
            ?>
            </ul>
        </div>
      </div>
      <p><?php echo $comment[$i]['comment']; ?></p>
    </div>
  </div>
  <? } ?>
</div>
