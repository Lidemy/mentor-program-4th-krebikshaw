<?php
  session_start();
  require_once('./DB_conn.php');
  require_once('./utils_general.php');

  $username = NULL;
  if (!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
  }

  $page = 1;
  if (!empty($_GET['page'])) {
    $page = intval($_GET['page']);
  }
  
  $limit = 10;
  $offset = ($page - 1) * $limit;
  $totalPost = getTotalPage()['count'];
  $totalPage = ceil($totalPost / $limit);

  $post = getAllPost($limit, $offset);
?>

<!DOCTYPE HTML>
<html>
  <head>
    <title>week11-hw2|by krebikshaw</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
    <script src="https://cdn.ckeditor.com/ckeditor5/[version.number]/[distribution]/ckeditor.js"></script>
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
                <h2><?php echo htmlspecialchars($post[sizeof($post)-1]['nickname'])?></h2>
                <hr>
                <ul class="heading__list">
                  <li><a href="category.php">分類文章</a></li>
                  <li><a href="index.php">首頁</a></li>
                  <?php if ($username && isAdmin($username)) { ?>
                    <li><a class="add_post_btn" href="add_post.php">發表文章</a></li>
                  <? } ?>
                </ul>
              </div>
            </div>
            <div class="content">
              <?php for ($i = 0; $i < sizeof($post); $i++) { ?>
                <div class="card">
                  <div class="post__title">
                    <a href="post.php?id=<?php echo htmlspecialchars($post[$i]['id']) ?>"><h2><?php echo htmlspecialchars($post[$i]['title']) ?></h2></a>
                    <?php if ($username && isAdmin($username)) { ?>
                      <div class="option__btn">
                        <a href="update_post.php?id=<?php echo htmlspecialchars($post[$i]['id']) ?>">編輯</a>
                        <a href="./handling/handle_delete_post.php?id=<?php echo htmlspecialchars($post[$i]['id']) ?>">刪除</a>
                      </div>
                    <?php } ?>
                  </div>
                  <hr> 
                  <div>
                    <ul class="post__info">
                      <li><img/></li>
                      <li><?php echo htmlspecialchars($post[$i]['nickname']) ?></li>
                      <li><?php echo htmlspecialchars($post[$i]['updated_at']?$post[$i]['updated_at']:$post[$i]['created_at']) ?></li>
                      <li class="read__more__btn"><a href="post.php?id=<?php echo htmlspecialchars($post[$i]['id']) ?>">Read more</a></li>
                    </ul>
                  </div>
                </div>
              <?php } ?>
            </div>
          </div>
          <div class="pages">
            <?php if ($page && $page != 1) { ?>
              <a href="list.php"><img src="./images/first.svg"></a>
              <a href="list.php?page=<?echo $page - 1?>"><img src="./images/previous.svg"></a>
            <?php } else { ?>
              <a href="#"><img src="./images/first.svg"></a>
              <a href="#"><img src="./images/previous.svg"></a>
            <? } ?>
            <p>頁碼： <?php echo $page ?> / <?php echo $totalPage ?></p>
            <?php if ($page && $page != $totalPage) { ?>
              <a href="list.php?page=<?echo $page + 1?>"><img src="./images/next.svg"></a>
              <a href="list.php?page=<?echo $totalPage?>"><img src="./images/last.svg"></a>
            <?php } else { ?>
              <a href="#"><img src="./images/next.svg"></a>
              <a href="#"><img src="./images/last.svg"></a>
            <? } ?>
          </div>
        </section>
      </div>
      <footer>
        <p>Design by krebikshaw</p>
      </footer>
  </body>
</html>
