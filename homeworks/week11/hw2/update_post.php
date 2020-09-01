<?php
  session_start();
  require_once('./DB_conn.php');
  require_once('./utils_general.php');

  $username = $_SESSION['username'];
  if (!isAdmin($username) || empty($_GET['id'])) {
    header("Location: index.php");
    exit;
  }

  $post_id = $_GET['id'];

  $msg = '';
  if (!empty($_GET['errCode'])) {
    $code = $_GET['errCode'];
    if ($code === '1') {
      $msg = '請將內容填寫完整';
    }
  }

  $sql = 'select * from krebikshaw_category order by ? asc';
  $db->sqlQuery($sql, 's', 'id');

  $category = array();
  while ($row = $db->getResult()) {
    array_push($category, array(
      'id' => $row['id'],
      'name' => $row['name']
    ));
  }

  $sql = 'select * from krebikshaw_post where id=?';
  $db->sqlQuery($sql, 'i', $post_id);
  $post = $db->getResult();

?>

<!DOCTYPE HTML>
<html>
  <head>
    <title>week11-hw2|by krebikshaw</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
    <link rel="stylesheet" href="main.css" />
    <script src="https://cdn.ckeditor.com/ckeditor5/21.0.0/classic/ckeditor.js"></script>
  </head>
  <body>
    <?php include './template/navbar.php'; ?>
    <!-- Wrapper -->
      <div class="wrapper">
        <!-- Main -->
        <section class="main">
          <div class="post">
            <h2>編輯文章</h2>
            <form method="post" action="./handling/handle_update_post.php">
              <input type="hidden" name="post_id" value="<?php echo $post_id ?>">
              <input type="text" name="title" value="<?php echo htmlspecialchars($post['title']) ?>">
              <select name="category">
                <?php for ($i = 0; $i < sizeof($category); $i++) { ?>
                  <?php if ($category[$i]['id'] === $post['category_id']) { ?>
                    <option selected="" value="<?php echo $category[$i]['id'] ?>"><?php echo htmlspecialchars($category[$i]['name']) ?></option>
                  <?php } else { ?>
                    <option value="<?php echo $category[$i]['id'] ?>"><?php echo htmlspecialchars($category[$i]['name']) ?></option>
                  <?php } ?>
                <?php } ?>
              </select>
              <textarea id="editor" name="content" rows="5" cols="80"><?php echo htmlspecialchars($post['content']) ?></textarea>
              <span class="strong" style="margin: 0 auto;"><?php echo $msg ?></span>
              <div class="two__btn">
                <input type="submit" value="送出">
                <a href="index.php">返回</a>
              </div>
              <input type="hidden" name="page" value="<?php echo $_SERVER['HTTP_REFERER'] ?>">
            </form>
          </div>
        </section>
      </div>
      <footer>
        <p>Design by krebikshaw</p>
      </footer>
      <script>
        ClassicEditor.create(document.querySelector('#editor'))
        .then(editor=>{
          console.log(editor);
        }) .catch(error=>{
          console.error(error);
        });
      </script>
  </body>
</html>

