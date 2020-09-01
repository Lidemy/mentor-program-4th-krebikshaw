<?php
  session_start();
  require_once('./DB_conn.php');
  require_once('./utils_general.php');

  if (empty($_GET['id'])) {
    header("Location: index.php");
    exit;
  }

  $id = $_GET['id'];
  if (!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
  }
  
  $sql = 'select ' .
    'U.nickname as nickname, ' .
    'P.category_id as category_id, ' .
    'P.title as title, ' .
    'P.content as content, ' .
    'P.created_at as created_at, ' .
    'P.updated_at as updated_at, ' .
    'P.is_deleted as is_deleted ' .
    'from krebikshaw_post as P ' .
    'left join krebikshaw_users as U on P.user_id=U.id ' .
    'where P.id = ? ' .
    'order by P.id desc ';
  $db->sqlQuery($sql, 'i', $id);

  $post = array();
  while ($row = $db->getResult()) {
    array_push($post, array(
      'nickname' => $row['nickname'],
      'category_id' => $row['category_id'],
      'title' => $row['title'],
      'content' => $row['content'],
      'created_at' => $row['created_at'],
      'updated_at' => $row['updated_at'],
      'is_deleted' => $row['is_deleted']
    ));
  }

  if ($post[0]['is_deleted'] == '1') {
    header("Location: index.php");
    exit;
  }

?>

<!DOCTYPE HTML>
<html>
  <head>
    <title>week11-hw2|by krebikshaw</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
    <script src="ckeditor/ckeditor.js"></script>
    <link rel="stylesheet" href="main.css" />
  </head>
  <body>
    <?php include './template/navbar.php'; ?>
    <!-- Wrapper -->
      <div class="wrapper">
        <!-- Main -->
        <section class="main">
          <div class="main__inner">
            <div class="heading">
              <div class="avatar"><img/></div>
              <div class="info">
                <h2><?php echo htmlspecialchars($post[0]['nickname'])?></h2>
                <hr>
                <ul class="heading__list">
                  <li><a href="category.php">分類文章</a></li>
                  <li><a href="list.php">全文列表</a></li>
                  <? if ($username && isAdmin($username)) { ?>
                    <li><a class="add_post_btn" href="add_post.php">發表文章</a></li>
                  <? } ?>
                </ul>
              </div>
            </div>
            <div class="card" style="margin-top: 80px;">
              <div class="post__title">
                <a href="post.php?id=<?php echo htmlspecialchars($id) ?>"><h2><?php echo htmlspecialchars($post[0]['title']) ?></h2></a>
                <?php if ($username && isAdmin($username)) { ?>
                  <div class="option__btn">
                    <a href="update_post.php?id=<?php echo htmlspecialchars($id) ?>">編輯</a>
                    <a href="./handling/handle_delete_post.php?id=<?php echo htmlspecialchars($id) ?>">刪除</a>
                  </div>
                <?php } ?>
              </div>
              <hr> 
              <div class="post__content">
                <p><?php echo $post[0]['content'] ?></p>
              </div>
              <div>
                <ul class="post__info">
                  <li><img/></li>
                  <li><?php echo htmlspecialchars($post[0]['nickname']) ?></li>
                  <li><?php echo htmlspecialchars($post[0]['updated_at']?$post[0]['updated_at']:$post[0]['created_at']) ?></li>
                </ul>
              </div>
            </div>
            <div class="two__btn">
              <a href="<?php echo $_SERVER['HTTP_REFERER'] ?>">返回</a>
            </div>
          </div>
        </section>
      </div>
      <footer>
        <p>Design by krebikshaw</p>
      </footer>
  </body>
</html>

