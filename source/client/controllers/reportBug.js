
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
// content is ofthe allowed length, returning true if this is the case or false 
// otherwise
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
    
    // hide the general error message when trying to submit an invalid form
    $(".form-error").hide();
    
    // change a previously invalid select field valid when the user finally
    // selects a valid option
    requredSelectFieldChanged("#zone-selection");
    requredSelectFieldChanged("#procedure-selection");
    requredSelectFieldChanged("#browser-selection");
    requredSelectFieldChanged("#severity-selection");
    
    // validate the form before submitting
    $("#bug-report").submit(function(e) {
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
        stepsIsValid = textAreaFieldValidate("#steps");
        expectationIsValid = textAreaFieldValidate("#expectation");
        realityIsValid = textAreaFieldValidate("#reality");
        
        // if there is at least one missing, prevent submition and display the
        // error mesage
        if (!zoneIsValid || !procedureIsValid || !browserIsValid 
            || !severityIsValid || !summaryIsValid || !expectationIsValid
            || !realityIsValid) {
            e.preventDefault();
            $(".form-error").show();
        }
    });
});