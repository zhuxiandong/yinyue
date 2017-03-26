
<?php
	
	//整个框架所在的根目录
	define('UEK',realpath('./'));
	
	//核心类所在根目录
	define('CORE',UEK.'/core/');
	
	//APP开发目录
	define('APP',UEK.'/app/');
	
	//views目录
	define('VIEW',UEK.'/app/views/');
	
	//是否开始调试模式
	define('DEBUG',true);
	
	define('CSS_PATH','/music/static/css/');
	define('JS_PATH','/music/static/js/');
	define('IMG_PATH','/music/static/image/');
	
	if(DEBUG){
		ini_set('display_errors','On');
	}else{
		ini_set('display_errors','Off');
	}
	//引入公共函数库
	include(CORE . 'lib/function.php');
	//引入核心类
	include(CORE . 'uek.php');
	\core\uek::run();
?>