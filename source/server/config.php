<?php

// Namespace for the project's Data Access Objects
namespace espresso\dao   
{   
    // Database connection information
    const HOST = "localhost";
    const DATA_BASE = "espresso_test";
    const USER = "espresso";
    const PASSWORD = "awesomesupersecretcode";
}


// Namespace for the project's mailing system
namespace espresso\mail
{
    // Mail content information
    const CHARSET = "UTF-8";
    const USER_NAME = [
        "en" => "Espresso mailing system",
        "es" => "Sistema de mensajería de Espresso"
    ];

    // Email host information
    const HOST = "smtp.gmail.com";
    const PORT = 587;

    // OAuth2 authentication information 
    const OAUTH_USER_EMAIL = "caom92@gmail.com";
    const OAUTH_CLIENT_ID = 
    "400565202453-2816cv5dbclt3s8l2u5p0qq8f713orrf.apps.googleusercontent.com";
    const OAUTH_CLIENT_SECRET = "PJdHoakwXn2IQ4p0L52eu9NW";
    const OAUTH_REFRESH_TOKEN = "1/SQZQxNs4NhjJcAYN6JWHYvsKcWQL0XRsQAaHsfuH3iI";
}

?>