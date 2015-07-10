<?php

if(!isset($_REQUEST['name'])||strlen($_REQUEST['name'])<=0){
    echo json_encode(array('error'=>'name','success'=>false));
    return;
}

if(!isset($_REQUEST['phone'])||strlen($_REQUEST['phone'])<=0||strpos($_REQUEST['phone'],'_')!=false){
    echo json_encode(array('error'=>'phone','success'=>false));
    return;
}

if(mail('sashasansay@gmail.com','Сообщение с формы обратной связи WiFiX',$_REQUEST['name'].'     '.$_REQUEST['phone'])){
    echo json_encode(array('error'=>'null','success'=>true));
}else{
    echo json_encode(array('error'=>'php_mail_error','success'=>false));
}

?>