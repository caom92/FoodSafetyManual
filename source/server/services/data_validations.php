<?php

// Checks if the input argument is an integer, returning true if this is the 
// case or false otherwise
function validateInteger($number)
{
    $isSet = isset($number);
    $isInteger = is_numeric($number);
    return ($isSet && $isInteger);
}


// Checks if the input argument is a string and its length respects the given
// limits, returning true if this is the case or false otherwise
function validateString($string, $minLength = 1, $maxLength = PHP_INT_MAX)
{
    $isSet = isset($string);
    $isString = is_string($string);
    $length = strlen($string);
    $isLengthValid = $length >= $minLength && $length <= $maxLength;
    return ($isSet && $isSet && $isLengthValid);
}


// Checks if the input argument is a string that contains a valid email address
// returning true if this is the case or false otherwise 
function validateEmail($string)
{
    $isSet = isset($string);
    $isString = is_string($string);
    $isEmail = filter_var($string, FILTER_VALIDATE_EMAIL);
    return ($isSet && $isEmail); 
}


// Checks if the input argument is a string that contains the system's language
// code of 'es' for spanish and 'en' for enlgish, returning true if this 
// is the case or false otherwise
function validateLanguageCode($string)
{
    $isSet = isset($string);
    $isValid = $string == 'es' || $string == 'en';
    return ($isSet && $isValid);
}


// Checks if the input argument is a string that contains a valid password
// recovery token
function validateStringToken($string)
{
    $isSet = isset($string);
    $isString = is_string($string);
    $isLengthValid = strlen($string) == 128;
    return ($isSet && $isSet && $isLengthValid);
}


// Checks the contents of the especified file to see if it is a bitmap file
// returning true if this is the case or false otherwise
function checkBitmapFileFormat($file)
{
    // check the contents of the file and deduce the file type from there
    $fileType = exif_imagetype($file);

    // check if the file type is a bitmap
    $isJPEG = $fileType == IMAGETYPE_JPEG;
    $isPNG = $fileType == IMAGETYPE_PNG;
    $isGIF = $fileType == IMAGETYPE_GIF;
    $isBMP = $fileType == IMAGETYPE_BMP;

    // return true if the file type is a bitmap
    return ($isJPEG || $isPNG || $isGIF || $isBMP);
}


// Checks the contents of the especified file to see if it is a PDF file
// returning true if this is the case or false otherwise
function checkDocumentFileFormat($file)
{
    // check the contents of the file to get the file type
    $fileInfo = new \finfo();
    $fileType = $fileInfo->file($file);

    // check if the file type is a PDF
    $pos = strpos($fileType, 'PDF');

    // return true if the file type is a PDF
    return ($pos !== FALSE);
}

?>