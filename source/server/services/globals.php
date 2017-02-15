<?php

namespace fsm;


// Recieves a PDF file and stores it as the new manual for the especified log
function uploadManualFile($program, $module, $log)
{
    // if it was, compute the full directory path where the file will be 
    // stored
    $uploadDir = realpath(
        dirname(__FILE__).'/../../../'.
        "data/documents/manuals/$program/$module/$log/actual_manual.pdf"
    );

    // then, compute the name that will be assigned to the current manual 
    // file so that we keep a backup copy of it
    $backupFile = date('Y-m-d_H-i-s').'.pdf';

    // rename the current manual file to keep a backup copy
    $backupFile = str_replace('actual_manual.pdf', $backupFile, $uploadDir);
    rename($uploadDir, $backupFile);

    // finally save the uploaded file as the current manual file
    $wasMoveSuccessful = move_uploaded_file(
        $_FILES['manual_file']['tmp_name'], 
        $uploadDir
    );

    // and check if the file was saved successfully
    if (!$wasMoveSuccessful) {
        // if it wasn't, restore the last backup copy as the current manual 
        // file
        rename($backupFile, $uploadDir);

        // and notify the user of the error
        throw new \Exception(
            'The file '.$_FILES['manual_file']['name'].' could not be '.
            'uploaded.'
        );
    }
}

?>