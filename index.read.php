<?php
date_default_timezone_set('Asia/Shanghai'); // 设置时区
//ini_set('display_errors', 'On'); //打开错误提示
//ini_set('error_reporting', E_ALL); //显示所有错误

// 替换字段
function replace_string($old_txt, $new_txt, $string){
    return str_replace($old_txt, $new_txt, $string);
}
// 读取文件内容
function read_html($html_file){
    $fp = fopen($html_file, 'r');
    if (!feof($fp)){ // 文件存在
        $contents = fread($fp, filesize($html_file));
    }else{
        $contents = 'null file';
    }
    fclose($fp);
    return $contents;
}

// 输出内容
$html_file = './view.html';
echo read_html($html_file);
exit();