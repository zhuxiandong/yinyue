<?php
	namespace core\lib;
	use app\controller\indexcontroller;

	class route
	{
		public $controller;
		public $action;
		public function __construct()
		{
//			1.直接用 / 访问  indexcontroller
			//$_SERVER接收数据并且结构化数据
			if($_SERVER['REQUEST_URI']=='/music/index.php'){
				$this -> controller ='index';
				$this -> action = 'index';
				return;
			}
			$path=$_SERVER['REQUEST_URI'];
			$tmp=explode('/',$path);
			$this -> controller = $tmp[3];
			$this -> action = $tmp[4];
			if(empty($tmp[4])){
				$this -> action = 'index';
			}else{
				$this -> action = $tmp[4];
			}
			if(isset($tmp[5])&&isset($tmp[6])){
				$_GET[$tmp[5]]=$tmp[6];//$_GET在任何文件都可用，创建一个全局变量
			}
		}
	}
?>