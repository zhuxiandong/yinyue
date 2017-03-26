<?php
	namespace core;
	class uek
	{
		public static function run(){
			include(CORE .'lib/route.php');
			$route = new \core\lib\route();
			$controller= $route->controller;
			$action=$route->action;
			include (APP."controller/".$controller."controller.php");
			$class_name='\\app\\controller\\'.$controller.'controller';
			$o=new $class_name();
			$o -> $action();//可变函数
		}
		public $data=array();
		public function assign($key,$value)
		{
			$this->data[$key]=$value;
		}
		public function display($file)
		{
			extract($this->data);//申明变量
			include($file);
		}
	}
?>