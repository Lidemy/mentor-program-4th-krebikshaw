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
  $roles = array(); 
  while ($role = $db->getResult()) {
    array_push($roles, array(
      "id" => $role['id'],
      "name" => $role['name'],
    )); 
  }

  getAllUsers();

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
            <h2>後台管理頁面</h2>
            <p class="strong">若欲更改使用者權限，請於選擇完成後，點選右側的更新按鈕！</p>
            <div>
              <!-- table -->
              <table class="backstage__table">
                <tr>
                  <th>id</th>
                  <th>nickname</th>
                  <th>username</th>
                  <th>created_at</th>
                  <th>updated_at</th>
                  <th>role</th>
                </tr>
                <?php while ($row = $db->getResult()) { ?>
                  <tr>
                    <td><?php echo $row['id']; ?></td>
                    <td><?php echo $row['nickname']; ?></td>
                    <td><?php echo $row['username']; ?></td>
                    <td><?php echo $row['created_at']; ?></td>
                    <td><?php echo $row['updated_at']; ?></td>
                    <td>
                      <form method="post" action="./handling/handle_user_role.php">
                        <input type="hidden" name="id" value="<?php echo $row['id'] ?>">
                        <select name="role">
                          <?php for ($i=0; $i<sizeof($roles); $i++) { ?>
                            <?php if ($roles[$i]['id'] === $row['role']) { ?>
                              <option selected="" value="<?php echo $roles[$i]['id'];?>"><?php echo $roles[$i]['name'] ?></option>
                            <?php } else { ?>
                              <option value="<?php echo $roles[$i]['id'];?>"><?php echo $roles[$i]['name'] ?></option>
                            <?php } ?>
                          <?php } ?>
                        </select>
                        <input style="border:none; height: 30px; width: 40px; margin: 0;" type="submit" value="更新">
                      </form>
                    </td>
                  </tr>
                <?php } ?>
               </table>  
            </div>
            <form class="form__regist form__backstage" method="post" action="handling/handle_user_role.php">
              <div class="two__btn" style="width: 300px">
                <a href="role_manage.php"><input style="width: 7em;" type="button" value="權限管理" /></a>
                <a href="index.php"><input type="button" value="完成" /></a>
              </div>
            </form>
            <hr>
          </div>
        </section>
      </div>
  </body>
</html>
