<?php
  session_start();
  require_once('./DB_conn.php');
  require_once('./utils_general.php');

  $username = $_SESSION['username'];
  if (!isAdmin($username)) {
    header("Location: index.php");
    exit;
  }

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
            <h2>發表文章</h2>
            <form method="post" action="./handling/handle_add_post.php">
              <input type="text" name="title" placeholder="請輸入文章標題">
              <select name="category">
                <?php for ($i = 0; $i < sizeof($category); $i++) { ?>
                  <option value="<?php echo $category[$i]['id'] ?>"><?php echo $category[$i]['name'] ?></option>
                <?php } ?>
              </select>
              <textarea id="editor" name="content" rows="5" cols="80"></textarea>
              <span class="strong" style="margin: 0 auto;"><?php echo $msg ?></span>
              <div class="two__btn">
                <input type="submit" value="送出">
                <a href="index.php">返回</a>
              </div>
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

