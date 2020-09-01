<?php
  session_start();
  require_once('./DB_conn.php');
  require_once('./utils_general.php');

  $username = NULL;
  if (!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
    $nickname = getUser($username)['nickname'];
  } else {
    $nickname = getUser('admin')['nickname'];
  }

  $categoryCount = getCategoryCount()['count'];
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
                <h2><?php echo htmlspecialchars($nickname)?></h2>
                <hr>
                <ul class="heading__list">
                  <li><a href="./list.php">全文列表</a></li>
                  <li><a href="./index.php">首頁</a></li>
                  <?php if ($username && isAdmin($username)) { ?>
                    <li><a class="add_post_btn" href="add_post.php">發表文章</a></li>
                  <? } ?>
                </ul>
              </div>
            </div>
            <div class="content">
              <?php for ($i = 1; $i <= $categoryCount; $i++) { ?>
                <h2 class="category__name"><?php echo getCategoryName($i)['name']; ?></h2>
                <?php
                  $post = getPostByCategoryId($i);
                  for ($j = 0; $j < sizeof($post); $j++) {
                ?>
                  
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
              <?php } ?>
            </div>
          </div>
        </section>
      </div>
      <footer>
        <p>Design by krebikshaw</p>
      </footer>
  </body>
</html>
