<?php
  session_start();
  require_once('./DB_conn.php');
  require_once('./utils_general.php');

  $username = $_SESSION['username'];
  if (!isAdmin($username)) {
    header("Location: index.php");
    exit;
  }

  $limit = 999;
  $offset = 0;
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
              <div class="info">
                <ul class="heading__list">
                  <li><a href="./category.php">分類文章</a></li>
                  <li><a href="./list.php">全文列表</a></li>
                  <li><a href="./index.php">首頁</a></li>
                  <?php if ($username && isAdmin($username)) { ?>
                    <li><a class="add_post_btn" href="add_post.php">發表文章</a></li>
                  <? } ?>
                </ul>
              </div>
            </div>
            <div class="content">
                <?php for ($j = 0; $j < sizeof($post); $j++) { ?>
                    <div class="post__title" style="margin: 30px 50px; font-size: 12px; font-weight: inherit;">
                      <a href="post.php?id=<?php echo htmlspecialchars($post[$j]['id']) ?>"><h2><?php echo htmlspecialchars($post[$j]['title']) ?></h2></a>
                      <?php if ($username && isAdmin($username)) { ?>
                        <div class="option__btn">
                          <a href="update_post.php?id=<?php echo htmlspecialchars($post[$j]['id']) ?>">編輯</a>
                          <a href="./handling/handle_delete_post.php?id=<?php echo htmlspecialchars($post[$j]['id']) ?>">刪除</a>
                        </div>
                      <?php } ?>
                    </div>
                <?php } ?>
            </div>
          </div>
        </section>
        <div class="two__btn">
          <a href="category_manage.php">類別管理</a>
          <a href="index.php">返回</a>
        </div>
      </div>
      <footer>
        <p>Design by krebikshaw</p>
      </footer>
  </body>
</html>
