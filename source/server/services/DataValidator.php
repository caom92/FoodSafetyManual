<?php

namespace fsm\services;

// Abstract interface that provides functions for validating if data variables 
// are of a certain type of have a certain format
class DataValidator 
{
    // Checks if the specified variable has a set value and is not NULL, 
    // returning true if this is the case or false otherwise
    static function isDefined($data)
    {
        return isset($data);
    }


    // Checks if the specified variable equals the specified value, returning 
    // true if this is the case or false otherwise
    static function equalsValue($data, $value)
    {
        $isDefined = $dataIsDefined();
        if ($isDefined) {
            return $data === $value;
        } 
        return false;
    }


    // Checks if the specified variable is a numeric value, returning true if 
    // this is the case or false otherwise
    static function isNumeric($data)
    {
        return is_numeric($data);
    }


    // Checks if the specified variable has an integer value, returning true if 
    // this is the case or false otherwise
    static function isInteger($data)
    {
        return filter_var($data, \FILTER_VALIDATE_INT) != NULL;
    }


    // Checks if the specified variable has a floating point value, returning 
    // true if this is the case or false otherwise
    static function isFloat($data)
    {
        return filter_var(
            $data, 
            \FILTER_VALIDATE_FLOAT,
            \FILTER_FLAG_ALLOW_THOUSAND
        ) != NULL;
    }


    // Checks if the specified variable has an integer value that is between 
    // the two specified lower and upper limits, returning true if this is the 
    // case or false otherwise
    static function integerIsBetweenValues($data, $min, $max)
    {
        return filter_var(
            $data, 
            \FILTER_VALIDATE_INT, 
            [ 'options' => [
                'min_range' => $min,
                'max_range' => $max
            ]]
        ) != NULL;
    }


    // Checks if the specified variable is a string, returning true if this is 
    // the case or false otherwise
    static function isString($data)
    {
        return is_string($data);
    }


    // Checks if the specified variable is a string with the specified number 
    // of characters, returning true if this is the case or false otherwise
    static function stringHasLength($string, $length)
    {
        if (self::isString($string)) {
            $currentLength = strlen($string);
            return $currentLength === $length;
        }
        return false;
    }


    // Checks if the specified variable is a string with a length that is 
    // between the specified lower and upper characters number limit, returning 
    // true if this is the case or false otherwise
    static function stringHasLengthInterval($string, $min, $max)
    {
        if (self::isString($string)) {
            $currentLength = strlen($string);
            return $min <= $currentLength && $currentLength <= $max;
        }
    }


    // Checks if the input argument is a string that contains a valid email 
    // address returning true if this is the case or false otherwise 
    static function stringIsEmail($string)
    {
        return filter_var($string, \FILTER_VALIDATE_EMAIL) != NULL;
    }


    // Checks if the input argument is a string that contains the system's 
    // language code of 'es' for spanish and 'en' for enlgish, returning true 
    // if this is the case or false otherwise
    static function stringIsLanguageCode($string)
    {
        if (self::isString($string)) {
            return $string === 'es' || $string === 'en';
        }
        return false;
    }


    // Checks the contents of the especified file to see if it is a PDF file
    // returning true if this is the case or false otherwise
    static function isDocumentFile($file)
    {
        if (self::isDefined($file)) {
            // check the contents of the file to get the file type
            $fileInfo = new \finfo();
            $fileType = $fileInfo->file($file);

            // check if the file type is a PDF
            $pos = strpos($fileType, 'PDF');

            // return true if the file type is a PDF
            return ($pos !== FALSE);
        }
        return false;
    }


    // Checks the contents of the especified file to see if it is a bitmap file
    // returning true if this is the case or false otherwise
    static function isBitmapFile($file)
    {
        if (self::isDefined($file)) {
          // check the contents of the file and deduce the file type from there
            $fileType = exif_imagetype($file);

            // check if the file type is a bitmap
            $isJPEG = $fileType === IMAGETYPE_JPEG;
            $isPNG = $fileType === IMAGETYPE_PNG;
            $isGIF = $fileType === IMAGETYPE_GIF;
            $isBMP = $fileType === IMAGETYPE_BMP;

            // return true if the file type is a bitmap
            return ($isJPEG || $isPNG || $isGIF || $isBMP);
        }
        return false;
    }
}

?>