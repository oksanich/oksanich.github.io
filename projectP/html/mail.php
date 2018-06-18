<?php

    $recepient = "a.oksanych.90@gmail.com";
    $sitename = "Equatorica";

    $name = trim($_POST["name"]);
    $phone = trim($_POST["phone"]);
    $text = trim($_POST["test"]);
    $message = "Name: $name \Phone: $phone \Text: $text";

    $pagetitle = "Site name \"$sitename\"";
    mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");

?>
