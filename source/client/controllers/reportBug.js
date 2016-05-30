
// This function adds an onchange listener to the especified select input field 
// where we check if the user changed its value when it was previously missing 
// and, if she did, remove the invalid mark left on it
// [in]     id: the HTML tag ID for the select input field to which the 
//          listener is going to be added 
function requredSelectFieldChanged(id) {
    $(id).change(function() {
        label = "#" + $(this).attr("id") + "__label";
        if ($(this).val() 
            && $(label).hasClass("invalid-select")) {
            $(label).removeClass("invalid-select");
        }
    })
}


// This function checks if a required select input field is empty and if it is
// it marks it as invalid in the form
// [in]    id: the HTML tag ID of the input field which we want to 
//         validate
// [out]   return: true if the field was valid or false otherwise
function requiredSelectFieldValidate(id) {
    // first check if the field is a multiple selection
    if (!$(id).attr("multiple")) {
        // if it is not, then just check if its value is empty
        if (!$(id).val()) {
            $(id + "__label").addClass("invalid-select");
            return false;
        }
    // if it is, then check that no option was selected
    } else if ($(id).val().length == 0) {
        $(id + "__label").addClass("invalid-select");
        return false;
    }
    return true;
}


// This function checks if the especified non-required text area input's 
// content is of the allowed length, returning true if this is the case or 
// false otherwise
// [in]    id: the HTML tag ID of the input field which we want to 
//         validate
// [out]   return: true if the field was valid or false otherwise
function textAreaFieldValidate(id) {
    return !$(id).hasClass("invalid");
}


// This function checks if a the especified required text area input has 
// content or is empty, returning true if it has content or false otherwise
// [in]    id: the HTML tag ID of the input field which we want to 
//         validate
// [out]   return: true if the field has content of false otherwise
function requiredTextAreaFieldValidate(id) {
    if ($(id).val().length == 0) {
        $(id).addClass("invalid");
        return false;
    }
    return true;
}

// Entry point for the program that controls the bug report form
$(function() {
    // Initialize select inputs
    $("select").material_select();
    
    // Initialize text area character counters
    $("textarea").characterCounter();
    
    // Hide the progress bar
    $(".progress").hide();
    
    // change a previously invalid select field to valid when the user finally
    // selects a valid option
    requredSelectFieldChanged("#zone-selection");
    requredSelectFieldChanged("#procedure-selection");
    requredSelectFieldChanged("#browser-selection");
    requredSelectFieldChanged("#severity-selection");
    
    // when the user uploads one or more screenshots, we must check the MIME 
    // type to make sure that the uploaded files are only images and not any
    // other kind of file; if any of the files are not an image, prevent upload
    $("#screenshot-attachment").change(function() {
        // retrieve the files uploaded
        files = document.getElementById("screenshot-attachment").files;
        
        // iterate each file 
        for (file of files) {
            // create a file reader to be able to read binary data from them
            fileReader = new FileReader();
            
            // set a callback function for checking the real mime type of the 
            // uploaded file
            fileReader.onloadend = function(e) {
                // read the first 4 bytes of the file, usually these contain the
                // file format's magic number
                headerBytes = (new Uint8Array(e.target.result)).subarray(0, 4);
                
                // initialize a string where we can store the magic number in
                // a readable format
                mime = "";
                
                // store each byte read from the header in the string
                for (word of headerBytes) {
                    mime += word.toString(16);
                }
                
                // now do the actual MIME checking
                // we check in the following order: 
                // image/png, image/gif, image/jpeg (3 versions), and image/bmp
                if (mime != "89504e47" && mime != "47494638" 
                    && mime != "ffd8ffe0" && mime != "ffd8ffe1" 
                    && mime != "ffd8ffe2" && mime.substr(0, 4) != "424d") {
                    // if the file is invalid, mark the field in the form
                    $(".file-path").removeClass("valid");
                    $(".file-path").addClass("invalid");
                    Materialize.toast(
                        "S&oacute;lo se permite adjuntar im&aacute;genes", 
                        3500, "rounded");
                }
            }
            
            // use the file reader that we created to read the data of the
            // file
            fileReader.readAsArrayBuffer(file);
        }
    });
    
    // validate the form before submitting
    $("#bug-report").submit(function(e) {
        // prevent authomatic submission, we'll do it manually
        e.preventDefault();
        
        // check if the required select inputs have a value selected;
        // if any of those is empty, mark it on the form
        zoneIsValid = requiredSelectFieldValidate("#zone-selection");
        procedureIsValid = requiredSelectFieldValidate("#procedure-selection")
        browserIsValid = requiredSelectFieldValidate("#browser-selection");
        severityIsValid = requiredSelectFieldValidate("#severity-selection");
        
        // check if the required text area inputs have text inside
        summaryIsValid = requiredTextAreaFieldValidate("#summary");
        
        // check that all area inputs have the proper length
        summaryLengthIsValid = textAreaFieldValidate("#summary");
        stepsLengthIsValid = textAreaFieldValidate("#steps");
        expectationLengthIsValid = textAreaFieldValidate("#expectation");
        realityLengthIsValid = textAreaFieldValidate("#reality");
        
        // check if the user is attaching valid image files
        attachmentIsValid = !$(".file-path").hasClass("invalid"); 
        
        // if there is at least one invalid missing, prevent submition and 
        // display the error mesage
        if (!zoneIsValid || !procedureIsValid || !browserIsValid 
            || !severityIsValid || !summaryIsValid || !summaryLengthIsValid 
            || !stepsLengthIsValid || !expectationLengthIsValid
            || !realityLengthIsValid || !attachmentIsValid) {
            Materialize.toast("Por favor corrija los campos incorrectos", 
                3500, "rounded");
        } else {
            // retrieve the data from the form
            formData = new FormData($(this)[0]);
            
            // show the progress bar
            $(".progress").show();
            
            // if all form fields are valid, send the data to the server
            $.ajax({
                type: "POST",
                url: "/espresso/services/others/mail-bug-report",
                data: formData,
                success: function(result) {
                    Materialize.toast(
                        "El reporte ha sido enviado con &eacute;xito", 
                        3500, "rounded"
                    );
                    console.log("server says: " + result);
                    $(".progress").hide();
                },
                contentType: false,
                processData: false
            });
        }
    });
});