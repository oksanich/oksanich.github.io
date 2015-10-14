<?php

    $recepient = "olesshulga@ukr.net";
    $sitename = "vybory2015in.kiev.ua";

    $name = trim($_POST["name"]);
    $phone = trim($_POST["phone"]);
    $text = trim($_POST["text"]);
    $message = "Имя: $name \nТелефон: $phone \nТекст: $text";

    $pagetitle = "Новая заявка с сайта \"$sitename\"";
    mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");

?>