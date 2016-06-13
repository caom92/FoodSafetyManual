// This function adds an onchange listener to the especified select input field 
// where we check if the user changed its value when it was previously missing 
// and, if she did, remove the invalid mark left on it
// [in]     id: the HTML tag ID for the select input field to which the 
//          listener is going to be added 
function setOnChangeListenerToRequiredSelectField(id) {
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
function isRequiredSelectFieldValid(id) {
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
function isTextAreaLengthValid(id) {
    return !$(id).hasClass("invalid");
}


// This function checks if a the especified required text area input has 
// content or is empty, returning true if it has content or false otherwise
// [in]    id: the HTML tag ID of the input field which we want to 
//         validate
// [out]   return: true if the field has content of false otherwise
function isRequiredTextAreaValid(id) {
    if ($(id).val().length == 0) {
        $(id).addClass("invalid");
        return false;
    }
    return true;
}


// This function injects the proper messages to the select fields by brute force
// depending on the language that the user selected, we do it this way since
// Materialize takes the select fields and move them to different objects in
// order to create the proper select input field, also the language method 
// as for now cannot access the the option elements
function changeLanguageForSelectFields(lang) {
    switch (lang) {
        case "es":
            $("#zone-selection__label").text("Zona Defectuosa*");
            $("#procedure-selection__label").text("Procedimiento Defectuoso*");
            $("#browser-selection__label").text("Navegador Web que usa*");
            $("#severity-selection__label").text("Severidad del problema*");
            $("option:disabled").text("Selecciona una opción");
            $("#browser-selection > option:disabled").text(
                "Marca las opciones");
            $("option[value='other']").text("Otro");
            $("option[value='blocker']").text("Crash o bloqueo");
            $("option[value='no-workaround']").text("Sin solución alternativa");
            $("option[value='has-workaround']").text(
                "Con solución alternativa");
            $("option[value='doc-error']").text("Error de documentación");
            $("option[value='trivial']").text("Problema trivial");
            $("option[value='ui-error']").text("Defecto visual");
            $("option[value='enhancement']").text("Sugerencia de Mejora");
        break;
            
        case "en":
            $("#zone-selection__label").text("Defective Zone*");
            $("#procedure-selection__label").text("Defective Process*");
            $("#browser-selection__label").text("Web browser you use*");
            $("#severity-selection__label").text("Severity of the issue*");
            $("option:disabled").text("Select an option");
            $("#browser-selection > option:disabled").text(
                "Indicate which options");
            $("option[value='other']").text("Other");
            $("option[value='blocker']").text("Crash");
            $("option[value='no-workaround']").text("No workaround");
            $("option[value='has-workaround']").text(
                "Has workaround");
            $("option[value='doc-error']").text("Documentation error");
            $("option[value='trivial']").text("Trivial");
            $("option[value='ui-error']").text("Visual defect");
            $("option[value='enhancement']").text("Enhancement");
        break;
    }
}


// The main function which starts execution of this controller, call only
// when its corresponding view is ready
function onReportProblemViewReady() {
    // Hide the progress bar
    $(".progress").hide();
    
    // set the user name, employee id, email and preferred language
    $("#user-name").val(sessionStorage.login_name);
    $("#user-id").val(sessionStorage.employee_id_num);
    $("#user-email").val(sessionStorage.email);
    $("#lang").val(localStorage.defaultLanguage);
    
    // hide the language and email fields
    $("#user-email").hide();
    $("#lang").hide();
    
    // change a previously invalid select field to valid when the user finally
    // selects a valid option
    setOnChangeListenerToRequiredSelectField("#zone-selection");
    setOnChangeListenerToRequiredSelectField("#procedure-selection");
    setOnChangeListenerToRequiredSelectField("#browser-selection");
    setOnChangeListenerToRequiredSelectField("#severity-selection");
    
    // change the language of the select input fields and the option 
    // elements before initializing materialize objects
    changeLanguageForSelectFields(localStorage.defaultLanguage);
    
    // Initialize select inputs
    $("select").material_select();
    
    // Initialize text area character counters
    $("textarea").characterCounter();
    
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
                    loadToast(
                        "only_images",
                        3500, "rounded");
                }
            }
            
            // use the file reader that we created to read the data of the
            // file
            fileReader.readAsArrayBuffer(file);
        }
    });
    
    // validate the form before submitting
    $("#send").click(function(e) {
        // prevent authomatic submission, we'll do it manually
        e.preventDefault();
        
        // check if the required select inputs have a value selected;
        // if any of those is empty, mark it on the form
        zoneIsValid = isRequiredSelectFieldValid("#zone-selection");
        procedureIsValid = isRequiredSelectFieldValid("#procedure-selection")
        browserIsValid = isRequiredSelectFieldValid("#browser-selection");
        severityIsValid = isRequiredSelectFieldValid("#severity-selection");
        
        // check if the required text area inputs have text inside
        summaryIsValid = isRequiredTextAreaValid("#summary");
        
        // check that all area inputs have the proper length
        summaryLengthIsValid = isTextAreaLengthValid("#summary");
        stepsLengthIsValid = isTextAreaLengthValid("#steps");
        expectationLengthIsValid = isTextAreaLengthValid("#expectation");
        realityLengthIsValid = isTextAreaLengthValid("#reality");
        
        // check if the user is attaching valid image files
        attachmentIsValid = !$(".file-path").hasClass("invalid"); 
        
        // if there is at least one invalid missing, prevent submition and 
        // display the error mesage
        if (!zoneIsValid || !procedureIsValid || !browserIsValid 
            || !severityIsValid || !summaryIsValid || !summaryLengthIsValid 
            || !stepsLengthIsValid || !expectationLengthIsValid
            || !realityLengthIsValid || !attachmentIsValid) {
            loadToast("incorrect_fields", 
                3500, "rounded");
        } else {
            // retrieve the data from the form
            formData = new FormData($("#bug-report")[0]);
            
            // show the progress bar
            $(".progress").show();
            
            // if all form fields are valid, send the data to the server
            $.ajax({
                // URL of the requested service
                url: "/espresso/bug-reports/send",

                // the HTTP method to use
                method: "POST",

                // the input data to be sent along with the request
                data: formData,

                // indicate that we expect to recieve a JSON as response
                dataType: "json",

                // indicate that we do not want the response to be stored in 
                // cache
                cache: false,

                // magic options required for FormData to work
                processData: false,
                contentType: false,

                // request successful callback
                success: function(response, message, xhr) {
                    // check that the result was successful
                    if (response.meta.return_code == 0) {
                        loadToast(
                            "report_sent", 
                            3500, "rounded"
                        );
                    } else {
                        console.log("server says: " + response.meta.message);
                        loadToast(
                            "report_failed",
                            3500, "rounded"
                        );
                    }
                    $(".progress").hide();
                },

                // request error callback
                error: function(xhr, status, message) {
                    // display the server result and the proper status icon
                    console.log("server says: " + status + ", " + message);
                    loadToast(
                        "report_failed", 
                        3500, "rounded"
                    );
                    $(".progress").hide();
                }
            });
        }
    });
}