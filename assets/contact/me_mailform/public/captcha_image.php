<?php

error_reporting (E_ALL);

include('../script/kcaptcha/kcaptcha.php');

session_start();

$captcha = new KCAPTCHA();

if($_COOKIE[session_name()] || $_GET[session_name()]){
	$_SESSION['captcha_keystring'] = $captcha->getKeyString();
}

?>