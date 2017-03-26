<?php
	namespace app\controller;
	use \core\uek;
	use \core\lib\model;
	class indexcontroller extends uek
	{
		public function index()
		{
			include(CORE.'lib/model.php');
			$db=new model();
			$con=$db->prepare('SELECT * FROM categories');
			$con->execute();
			$rows=$con->fetchAll();
			$this->assign("types",$rows);
			$this->display(VIEW.'index.html');
		}
		public function music(){
			include(CORE.'lib/model.php');
			$pdo=new model();
			$stmt=$pdo->prepare('select * from hot');
			$stmt->execute();
			$rows=$stmt->fetchAll();
			$this->assign('album',$rows);
		    $this->display(VIEW.'music.html');
		}
		public function play(){
			$this->display(VIEW.'play.html');
		}
		public function getdata(){
			$album_id=$_GET['aid'];

			include(CORE.'lib/model.php');
			$pdo=new model();
			$sql='select M.mid AS id,M.name,M.src,M.duration,AT.artist_name AS artist,AL.album_pic AS pic,AL.album_name from music AS M,artist AS AT,album AS AL WHERE M.album_id=AL.album_id AND AL.artist_id=AT.artist_id AND M.album_id=?';
			$stmt=$pdo->prepare($sql);
			$stmt->bindValue(1,$album_id);
			$stmt->execute();
			$rows=$stmt->fetchAll();
			JSON_encode($rows);
//			json是一种数据交换格式
//			javaScript Object Notation
		}
	}
?>