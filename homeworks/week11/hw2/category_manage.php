<?php
  session_start();
  require_once('./DB_conn.php');
  require_once('./utils_general.php');

  $username = $_SESSION['username'];
  if (!isAdmin($username)) {
    header("Location: index.php");
    exit;
  }

  $category = getAllCategory();

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
            <div class="content" >
               <table class="category__table">
                 <tr>
                   <th>id</th>
                   <th>類別名稱</th>
                   <th>類別說明</th>
                   <th>建立時間</th>
                   <th>修改時間</th>
                   <th>編輯</th>  
                 </tr>
                 <?php for ($i = 0; $i < sizeof($category); $i++) { ?>
                   <tr>
                     <form method="post" action="./handling/handle_update_category.php">
                       <input type="hidden" name="id" value="<?php echo $category[$i]['id'] ?>">
                       <td><?php echo htmlspecialchars($category[$i]['id']) ?></td>
                       <td><input type="text" name="name" value="<?php echo htmlspecialchars($category[$i]['name']) ?>"></td>
                       <td><textarea name="text"><?php echo htmlspecialchars($category[$i]['text']) ?></textarea></td>
                       <td><?php echo htmlspecialchars($category[$i]['created_at']) ?></td>
                       <td><?php echo htmlspecialchars($category[$i]['updated_at']) ?></td>
                       <td><input type="submit" value="更新" style="cursor: pointer;"></td>
                     </form>
                   </tr>  
                 <?php } ?>
                <tr>
                  <form method="post" action="./handling/handle_create_category.php">
                    <input type="hidden" name="id" value="<?php echo $category[$i]['id'] ?>">
                    <td>建立類別</td>
                    <td><input type="text" name="name"></td>
                    <td><textarea name="text"></textarea></td>
                    <td></td>
                    <td></td>
                    <td><input type="submit" value="新增" style="cursor: pointer;"></td>
                  </form>
                </tr>
               </table>
            </div>
          </div>  
        </section>
        <div class="two__btn">
          <a href="backstage.php">返回</a>
        </div>
      </div>
      <footer>
        <p>Design by krebikshaw</p>
      </footer>
  </body>
</html>

