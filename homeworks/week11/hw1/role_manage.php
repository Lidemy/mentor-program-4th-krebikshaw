<?
  session_start();
  require_once('./utils_general.php');

  $username = $_SESSION['username'];
  $cp = new CheckPermission($username, NULL, NULL);
  if (!$cp->isAdmin()) {
    header("Location: index.php");
    exit;
  }
  
  getAllRoles();
?>

<!DOCTYPE HTML>
<html>
  <head>
    <title>week11-hw1|by krebikshaw</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
    <link rel="stylesheet" href="main.css" />
  </head>
  <body>
      <nav class="navbar">
        <ul class="nav__list">
          <li><a href="index.php">首頁</a></li>
          <li><a href="./handling/handle_logout.php">登出</a></li>
        </ul>
      </nav>
    <!-- Wrapper -->
      <div id="wrapper">

        <!-- Main -->
        <section id="main">
          <div class="main__inner" style="width: 900px;">
            <h2>權限管理頁面</h2>
            <div>
              <!-- table -->
              <table class="backstage__table">
                <tr>
                  <th>id</th>
                  <th>權限名稱</th>
                  <th>新增留言</th>
                  <th>修改自己留言</th>
                  <th>刪除自己留言</th>
                  <th>修改所有留言</th>
                  <th>刪除所有留言</th>
                  <th>進入後台權限</th>
                  <th>修改</th>
                </tr>
                <?php while ($row = $db->getResult()) { ?>
                  <form method="post" action="./handling/handle_role_manage.php">
                    <input type="hidden" name="id" value="<?php echo $row['id']; ?>">
                    <tr>
                      <td><?php echo $row['id']; ?></td>
                      <td><input type="text" name="role_name" value="<?php echo $row['name']; ?>"></td>
                      <td><input type="checkbox" name="create_comment"<?php echo $row['create_comment']?'checked':''; ?> ></td>
                      <td><input type="checkbox" name="update_oneself"<?php echo $row['update_oneself']?'checked':''; ?> ></td>
                      <td><input type="checkbox" name="delete_oneself"<?php echo $row['delete_oneself']?'checked':''; ?> ></td>
                      <td><input type="checkbox" name="update_all"<?php echo $row['update_all']?'checked':''; ?> ></td>
                      <td><input type="checkbox" name="delete_all"<?php echo $row['delete_all']?'checked':''; ?> ></td>
                      <td><input type="checkbox" name="is_admin"<?php echo $row['is_admin']?'checked':''; ?> ></td>
                      <td>
                        <input type="submit" value="更新">
                      </td>
                    </tr>
                  </form>
                <?php } ?>
                  <form method="post" action="./handling/handle_new_role.php">
                    <tr>
                      <td>新建權限</td>
                      <td><input type="text" name="role_name" placeholder="權限名稱"></td>
                      <td><input type="checkbox" name="create_comment"></td>
                      <td><input type="checkbox" name="update_oneself"></td>
                      <td><input type="checkbox" name="delete_oneself"></td>
                      <td><input type="checkbox" name="update_all"></td>
                      <td><input type="checkbox" name="delete_all"></td>
                      <td><input type="checkbox" name="is_admin"></td>
                      <td>
                        <input type="submit" value="新增">
                      </td>
                    </tr>
                  </form>
               </table>  
            </div>
            <form class="form__regist form__backstage" method="post" action="handling/handle_user_role.php">
              <div class="two__btn" style="">
                <a href="backstage.php"><input style="width: 100px" type="button" value="返回後台" /></a>
              </div>
            </form>
            <hr>
          </div>
        </section>
      </div>
  </body>
</html>
