<?php
/**
 * Created by PhpStorm.
 * User: PC
 * Date: 2017/1/11
 * Time: 9:17
 */
namespace app\controller;

use \core\uek;
use \core\lib\model;
class admincontroller extends uek
{
    public function index(){
        include(CORE.'lib/model.php');
        $pdo=new model();
        $sql='select * from categories';
        $stmt=$pdo->prepare($sql);
        $stmt->execute();
        $rows=$stmt->fetchAll();
        $this->assign('cats',$rows);
        $this->display(VIEW.'admin/categories.html');
    }
    public function get_categories()
    {
        include(CORE.'lib/model.php');
        $pdo=new model();
        $sql='select cate_id as id,cate_name as name from categories';
        $stmt=$pdo->prepare($sql);
        $stmt->execute();
        $rows=$stmt->fetchAll();
        echo json_encode($rows);
    }
    public function add_cat()
    {
        include (CORE.'lib/model.php');
        $pdo = new model();
        $sql ='insert into categories (cate_name) values ("")';
        $stmt = $pdo->prepare($sql);
        $stmt -> execute();
        $id =$pdo->lastInsertId();
        echo json_encode($id);
    }
    public function delete_cat()
    {
        include (CORE.'lib/model.php');
        $pdo = new model();
        $sql ='delete from categories where cate_id = ?';
        $stmt = $pdo->prepare($sql);
        $stmt -> bindValue(1,$_GET['id']);
        $stmt ->execute();
        echo 5;
//        echo json_encode($_POST);
    }
    public function update_cat()
    {
        include (CORE.'lib/model.php');
        $pdo = new model();
        $sql ='update categories set cate_name = ? where cate_id = ?';
        $stmt = $pdo->prepare($sql);
        $stmt -> bindValue(1,$_POST['cate_name']);
        $stmt -> bindValue(2,$_POST['cate_id']);
        $stmt ->execute();
        echo 5;
    }
    ////////////////////////歌手管理///////////////////
    public function artist()
    {
        include(CORE.'lib/model.php');
        $pdo=new model();
        $sql="SELECT * FROM artist ORDER BY artist_id DESC ";
        $stmt=$pdo->prepare($sql);
        $stmt->execute();
        $result=$stmt->fetchAll();
        $this->assign('artists',$result);
        $this->display(VIEW.'admin/artist.html');
    }
    public function add_artist()
    {
        sleep(2);
        include(CORE.'lib/model.php');
        $pdo=new model();
        $sql='INSERT INTO artist (artist_name,artist_age,artist_gender,artist_avatar) VALUES ("","",1,"")';
        $stmt=$pdo->prepare($sql);
        $stmt->execute();
        $id=$pdo->lastInsertId();
        echo json_encode($id);
    }
    public function delete_artist()
    {
        sleep(2);
        include(CORE.'lib/model.php');
        $pdo=new model();
        $sql='delete from artist where artist_id=?';
        $stmt=$pdo->prepare($sql);
        $stmt -> bindValue(1,$_GET['id']);
        $stmt->execute();
        echo json_encode(200);
    }
    public function update_artist()
    {
        include(CORE.'lib/model.php');
        $pdo=new model();
        $sql='update artist set artist_name=?,artist_age=?,artist_gender=? where artist_id=?';
        $stmt=$pdo->prepare($sql);
        $stmt -> bindValue(1,$_POST['artist_name']);
        $stmt -> bindValue(2,$_POST['artist_age']);
        $stmt -> bindValue(3,$_POST['artist_gender']);
        $stmt -> bindValue(4,$_POST['artist_id']);
        $stmt->execute();
        echo json_encode(5);
    }
    public function upload_pic()
    {
        $src=$_FILES['file']['tmp_name'];
        $dist='/static/image/img/' . $_FILES['file']['name'];
        move_uploaded_file($src,UEK . $dist);
        include(CORE.'lib/model.php');
        $pdo=new model();
        $sql='update artist set artist_avatar=? where artist_id=?';
        $stmt=$pdo->prepare($sql);
        $stmt -> bindValue(1,"/music" . $dist);
        $stmt -> bindValue(2,$_POST['id']);
        $stmt->execute();
        echo json_encode("/music" . $dist);
    }


    /////////////////////////专辑管理/////////////////////////////////////////////////

    public function album()
    {
        include(CORE.'lib/model.php');
        $pdo=new model();

        $sql="SELECT * FROM album_list ORDER BY album_id DESC ";
        $stmt=$pdo->prepare($sql);
        $stmt->execute();
        $result=$stmt->fetchAll();

        $sql="SELECT * FROM categories";
        $st=$pdo->prepare($sql);
        $st->execute();
        $t=$st->fetchAll();

        $this->assign('albums',$result);
        $this->assign('cates',$t);
        $this->display(VIEW.'admin/album.html');
    }
    public function add_album()
    {
        include(CORE.'lib/model.php');
        $pdo=new model();
        $sql='insert into album (album_name,album_pic,artist_id,cate_id) values (?,?,?,?)';
        $stem=$pdo->prepare($sql);
        $stem->bindValue(1,'');
        $stem->bindValue(2,'');
        $stem->bindValue(3,1);
        $stem->bindValue(4,1);
        $stem->execute();
//        c($stem->execute());
        if($stem->execute()){
            echo json_encode($pdo->lastInsertId());
        }else{
            echo json_encode(500);
        }
    }
}