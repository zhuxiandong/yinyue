<?php
/**
 * Created by PhpStorm.
 * User: PC
 * Date: 2016/12/30
 * Time: 10:45
 */
namespace core\lib;
class model extends \PDO
{
    public function __construct()
    {
        $dsn=('mysql:host=localhost;dbname=music;charset=utf8');
        $username='root';
        $passwd='';
        //让默认取出的数组只包含键值对
        $options=array(
            parent::ATTR_DEFAULT_FETCH_MODE=>parent::FETCH_ASSOC
        );
        parent::__construct($dsn, $username, $passwd, $options);
    }
}