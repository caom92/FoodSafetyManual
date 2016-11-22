function createDatePicker(){
    $("#report_date_start").html("");
    $("#report_date_end").html("");
    $("#report_date_start").append('<input id="start_date" type="date" class="datepicker"><label id="start_date_label" class="select_start_date active" for="start_date"></label>');
    $("#start_date").pickadate(datePicker("start_hidden", new Date(), new Date("2016-10-01T00:00:00")));
    $("#report_date_end").append('<input id="end_date" type="date" class="datepicker"><label id="end_date_label" class="select_end_date active" for="end_date"></label>');
    $("#end_date").pickadate(datePicker("end_hidden", new Date(), new Date("2016-10-01T00:00:00")));
}

function isDateValid(startDate, endDate){

}

$(function (){
    // First we change the title to that of the current 
    $('ul.tabs').tabs();
    $('.indicator').addClass("green");
    createDatePicker();

    $server.request({
        service: 'get-items-of-zone',
        success: function(response) {
            if (response.meta.return_code == 0) {
                console.log(response.data);
                loadLogForm("SSOP", response.data);
                changeLanguage(localStorage.defaultLanguage);
                $('select').material_select();
            } else {
                throw response.meta.message;
            }
        }
    });

    // We load the tabs; we have 2 or 3 depending on the privileges of the user
    // Read means we can load the PDF manual and see past logs
    // Write means we can read and also submit a new log with the current date
});


function loadLogForm(type, data){
    // With type we will know which functions to call, with data we will know what to display
    functionArray[type](data);
}

// Function array

var functionArray = [];

functionArray["SSOP"] = SSOPPreOperative;

// SSOP Pre Operation Functions

function SSOPPreOperative(data){
    var wrapper = $("<div>");
    $(".log_title").html(data.log_name);
    wrapper.append(reportHeader(data.zone_name, data.program_name, data.module_name, data.log_name));

    for(area of data.areas)
        wrapper.append(SSOPPreOperativeArea(area));

    wrapper.append(sendButton("sendSSOP"));

    $("#logs_tab").append(wrapper);

    // Bind functionality

    $("input[id^='acceptable_']").change(function(){
        if($(this).is(":checked")){
            var tag = $(this).attr("id");
            var id = tag.match(/[0-9]+_[0-9]+/g);
            $("#wrapper_select_" + id[0]).hide(500);
            $("#comment_wrapper_" + id[0]).hide(500);
            console.log("POSSITIVE CHECKED");
        }
    });

    $("input[id^='unacceptable_']").change(function(){
        if($(this).is(":checked")){
            var tag = $(this).attr("id");
            var id = tag.match(/[0-9]+_[0-9]+/g);
            $("#wrapper_select_" + id[0]).show(500);
            $("#comment_wrapper_" + id[0]).show(500);
            console.log("NEGATIVE CHECKED");
        }
    });

    $("#sendSSOP").click(function(){
        if(isSSOPReportValid()){
            sendSSOPReport();
        } else {
            Materialize.toast("Por favor rellene todos los campos", 3000, "rounded");
        }
    });
}

function isSSOPReportValid(){
    // Check for the next things for the report to be considered valid:
    // 1. All radio buttons must have a value
    // 2. If radio buttons are selected to unnaceptable, both corrective action and
    //    comment should be filled
    // 3. If radio buttons are selected to acceptable, corrective action defaults to 1
    //    and comment will be empty

    // First condition, we make sure that the total number of radio button elements is
    // Equal to two times those selected (two times because we can only select one radio)
    // button at a time

    var errors = 0;

    if($("input[name^='radio_']").length == (($("input[id^='acceptable_']:checked").length + $("input[id^='unacceptable_']:checked").length)*2)){
        $("input[id^='acceptable_']").each(function(index){
            // Basically, for each ID in index
            if($("input[name^='radio_" + index + "_']:checked").val() == "false"){
                // If unacceptable is selected we must verify if a corrective action and comment are selected

                // Corrective action selected means there is a value other than null
                if($("select[id^='select_" + index + "_']").val() === null){
                    errors++;
                }

                // Comment must have a length other than zero
                if($("input[id^='comment_" + index + "_']").val().length == 0){
                    errors++;
                }
            }
        });
    } else {
        errors++;
    }

    if(errors == 0) {
        console.log("true part achieved");
        return true;
    } else {
        console.log("Errors: " + errors);
        return false;
    }

}

function SSOPPreOperativeArea(area){
    var areaCard = divWrapper("area_report_" + area.id, "card-panel white");
    var title = cardTitle(null, "card-title", area.name);
    var notesRow = divWrapper(null, "row");
    var sanitationRow = divWrapper(null, "row");

    areaCard.append(title);

    for (var type of area.types){
        for (var item of type.items){
            areaCard.append(SSOPPreoperativeItem(item, area.id));
        }
    }
    
    notesRow.append(logTextField("note_wrapper_" + area.id, logTextInput("area_notes_" + area.id, "validate", "text", null), logLabel(null, null, null, "Notas"), "input-field col s12"));
    sanitationRow.append(logTextField("sanitation_wrapper_" + area.id, logTextInput("area_sanitation_" + area.id, "validate", "text", null), logLabel(null, null, null, "Persona a cargo de la sanitizacion"), "input-field col s12"));

    areaCard.append(notesRow);
    areaCard.append(sanitationRow);

    return areaCard;
}

function loadSSOPReport(startDate){
    var wrapper = divWrapper(null, null);
    var reportWrapper = divWrapper(null, "card-panel white");

    wrapper.append(reportHeader("LAW", "Introduction", "SSOP", "PRE-OPERATIONAL LOG"));

    $("#report_tab").append(wrapper);

    var report = divWrapper(null, null);
    var reportTable = table(null, "striped");
    var headers = ["ID", "Nombre", "Condiciones", "Acción Correctiva", "Comentarios"];
    var testContent = [["1", "Mesas", "Aceptable", "N/A", "Comentarios"],["2", "Pisos", "Inceptable", "WSR", "Comentarios"]];

    reportTable.append(tableHeader(null, null, headers));

    testContent.forEach(function(index){
        reportTable.append(tableRow(null, null, index));
    });

    reportWrapper.append(reportTable);

    wrapper.append(reportWrapper);

    changeLanguage(localStorage.defaultLanguage);
}

function sendSSOPReport(){
    var report = new Object();
    var hardware_log = new Array();
    var area_log = new Array();
    report.user_id = localStorage.user_id;
    report.date = getISODate(new Date());
    
    var idArray = new Array();
    var areaArray = new Array();


    // Get Area IDs
    $("div[id^='area_report_']").each(function(index){
        var tag = $(this).attr("id");
        var id = tag.match(/[0-9]+/g);
        areaArray.push(id[0]);
    });

    areaArray.forEach(function(areaID){
        var area = new Object();

        area.time = getISOTime(new Date());
        area.area_id = areaID;
        area.item_logs = new Array();

        idArray = new Array();
        hardware_log = new Array();

        // We get all item id, we treat each one with their respective area
        $("input[id^='acceptable_']").each(function(index){
            var tag = $(this).attr("id");
            var id = tag.match(/[0-9]+/g);
            if(areaID == id[1]){
                console.log("entrado");
                var hardware = new Object();

                hardware.item_id = Number(id[0]);
                hardware.is_acceptable = getBool($("input:radio[name='radio_" + id[0] +"_" + id[1] +"']:checked").val());
                if(hardware.is_acceptable === false) {
                    console.log("lmao inaceptable");
                    hardware.corrective_action_id = Number($("#select_" + id[0] + "_" + id[1]).val());
                } else {
                    console.log("lmao aceptable");
                    hardware.corrective_action_id = 1;
                }
                hardware.comment = $("#comment_" + id[0] + "_" + id[1]).val();

                hardware_log.push(hardware);
            }
        });

        area.item_logs = hardware_log;

        area.notes = $("#area_notes_" + areaID).val();
        area.person_performing_sanitation = $("#area_sanitation_" + areaID).val();

        area_log.push(area);
    });

    report.area_log = area_log;

    $server.request({
        service: 'capture-gmp-packing-preop',
        data: report,
        success: function(response) {
            if (response.meta.return_code == 0) {
                Materialize.toast("Reporte enviado con exito", 3000, "rounded");
            } else {
                Materialize.toast("Reporte no enviado, verifique la red", 3000, "rounded");
                throw response.meta.message;
            }
        }
    });

    console.log(report);
    console.log(JSON.stringify(report));
}

function SSOPPreoperativeItem(item, areaID){
    var itemCard = divWrapper(null, "card-panel white");
    var firstRow = divWrapper(null, "row");
    var secondRow = divWrapper(null, "row");
    var title = cardTitle(null, "card-title col s4", item.name);
    var acceptable = logRadioButtonInput("acceptable_" + item.id + "_" + areaID, null, logLabel(null, "col s4", "acceptable_" + item.id + "_" + areaID, '<i class="mdi mdi-checkbox-marked-circle mdi-18px green-text"></i>'), "radio_" + item.id + "_" + areaID, true);
    var unacceptable = logRadioButtonInput("unacceptable_" + item.id + "_" + areaID, null, logLabel(null, "col s4", "unacceptable_" + item.id + "_" + areaID, '<i class="mdi mdi-close-circle mdi-18px red-text"></i>'), "radio_" + item.id + "_" + areaID, false);
    var status = logRadioButtonGroup("radio_" + item.id + "_" + areaID, "col s4", [acceptable, unacceptable]);
    var actionEmpty = logSelectOption(null, null, "", true, true, "Seleccione la acción correctiva");
    var actionNone = logSelectOption(null, null, "1", false, false, "None HARDCODE");
    var actionRC = logSelectOption(null, null, "2", false, false, "Re-cleaned HARDCODE");
    var actionWSR = logSelectOption(null, null, "3", false, false, "Wash/Rinse/Sanitize HARDCODE");;
    var actionsSelect = logSelectInput("select_" + item.id + "_" + areaID, "input-field col s4", [actionEmpty, actionNone, actionRC, actionWSR], logLabel(null, null, "select_" + item.id + "_" + areaID, 'Acción correctiva'));
    var comments = logTextField("comment_wrapper_" + item.id + "_" + areaID, logTextInput("comment_" + item.id + "_" + areaID, "validate", "text", null), logLabel(null, null, "comment_" + item.id + "_" + areaID, "Comentarios"), "input-field col s12");

    // console.log("Ay lmao" + item["item_name"]);
    comments.hide();
    actionsSelect.hide();

    firstRow.append(title);
    firstRow.append(status);
    firstRow.append(actionsSelect);

    secondRow.append(comments);

    itemCard.append(firstRow);
    itemCard.append(secondRow);

    return itemCard;
}

// General functions for date/time formatting

function getISODate(date){
    var ISODate = "";

    ISODate += date.getFullYear() + "-";

    if((date.getMonth() + 1) < 9){
        ISODate += "0" + (date.getMonth() + 1)+ "-";
    } else {
        ISODate += (date.getMonth() + 1) + "-";
    }

    if(date.getDate()<9){
        ISODate += "0" + date.getDate();
    } else {
        ISODate += date.getDate();
    }

    return ISODate;
}

function getISOTime(date){
    var ISOTime = "";

    if(date.getHours()<10){
        ISOTime += "0" + date.getHours() + ":";
    } else {
        ISOTime += date.getHours() + ":";
    }

    if(date.getMinutes()<10){
        ISOTime += "0" + date.getMinutes();
    } else {
        ISOTime += date.getMinutes();
    }
/*
    if(date.getSeconds()<10){
        ISOTime += "0" + date.getSeconds();
    } else {
        ISOTime += date.getSeconds();
    }*/
    
    return ISOTime;
}

function getBool(val) {
    var num;
    return val != null && (!isNaN(num = +val) ? !!num : !!String(val).toLowerCase().replace(!!0, ''));
}

// General functions for form creation

// A header containing the information of the current report, including who made it, the date,
// Zone and program

function reportHeader(zone, program, module, log){
    var reportCard = divWrapper(null, "card-panel white");
    var titleRow = divWrapper(null, "row");
    var infoRow = divWrapper(null, "row");
    var moduleRow = divWrapper(null, "row");
    var logTitle = cardTitle(null, "col s12", log);
    var zoneTitle = cardTitle(null, "col s4", "<span class='zone_name'></span>: " + zone);
    var programTitle = cardTitle(null, "col s4", "<span class='program_name'></span>: " + program);
    var moduleTitle = cardTitle(null, "col s4", "<span class='module_name'></span>: " + module);
    var date = cardTitle(null, "col s4", "<span class='date_name'></span>: " + new Date().getDate() + "-" + new Date().getMonth() + "-" + new Date().getFullYear());
    var employeeName = cardTitle(null, "col s4", "<span class='made_by'></span>: " + localStorage.first_name + " " + localStorage.last_name);

    titleRow.append(logTitle);
    moduleRow.append(zoneTitle);
    moduleRow.append(programTitle);
    moduleRow.append(moduleTitle);
    infoRow.append(date);
    infoRow.append(employeeName);

    reportCard.append(titleRow);
    reportCard.append(moduleRow);
    reportCard.append(infoRow);

    return reportCard;
}

// A generic div wrapper

function divWrapper(id, classes){
    var div = $("<div>");

    div.addClass(classes);
    if(id)
        div.attr("id", id);

    return div;
}

// A card title

function cardTitle(id, classes, contents){
    var title = $("<span>");

    title.addClass(classes);
    if(id)
        title.attr("id", id);

    title.append(contents);

    return title;
}

// A text input/label pair, used very often

function logTextField(id, textInput, label, classes){
    var textField = $("<div>");

    if(id)
        textField.attr("id", id);

    textField.addClass(classes);
    textField.append(textInput);
    textField.append(label);

    return textField;
}

// A text input with the desired id, classes and disabled status
// if necessary

function logTextInput(id, classes, type, isDisabled){
    var disabled = "";
    (typeof id == "string") ? id = 'id="' + id + '"' : id = '';
    (typeof classes == "string") ? classes = 'class="' + classes + '"' : classes = '';
    (typeof type == "string") ? type = 'type="' + type + '"' : type = '';
    isDisabled ? disabled = "disabled" : disabled = ""; 

    var input = '<input ' + disabled + ' ' + id + ' ' + classes + ' ' + type + '>';

    input = $(input);

    return input;
}

// A label, usable for text inputs, text areas, radio buttons and pretty
// much everything

function logLabel(id, classes, labelFor, contents){
    (typeof id == "string") ? id = 'id="' + id + '"' : id = '';
    (typeof classes == "string") ? classes = 'class="' + classes + '"' : classes = '';
    (typeof labelFor == "string") ? labelFor = 'for="' + labelFor + '"' : labelFor = '';

    var label = '<label ' + id + ' ' + classes + ' ' + labelFor + '></label>';

    label = $(label);

    if (contents)
        label.append(contents);

    return label;
}

// Icon wrapper. 

function logIcon(classes){
    var icon = $("<i>");

    icon.addClass(classes);

    return icon;
}

// A way to group radio buttons; buttons must be an array of buttons
// created with logRadioButtonInput

function logRadioButtonGroup(id, classes, buttons){
    var wrapper = $("<div>");

    wrapper.addClass(classes);

    if(id)
        wrapper.attr("id", id);

    for(var button of buttons){
        wrapper.append(button);
    }

    return wrapper;
}

// An individual radio button with all of its elements

function logRadioButtonInput(id, classes, label, groupName, value){
    var wrapper = $("<div>");

    (typeof id == "string") ? id = 'id="' + id + '"' : id = '';
    (typeof classes == "string") ? classes = 'class="' + classes + '"' : classes = '';
    (typeof groupName == "string") ? groupName = 'name="' + groupName + '"' : groupName = '';
    (typeof value != "undefined") ? value = 'value="' + value + '"' : value = '';

    var radioButton = '<input ' + groupName + ' ' + id + ' ' + classes + ' ' + value + ' type="radio" />';

    radioButton = $(radioButton);

    wrapper.append(radioButton);
    wrapper.append(label);

    return wrapper;
}

// A way to group select options; options must be an array of options
// created with logSelectOption

function logSelectInput(id, classes, options, label){
    var wrapper = $("<div>");
    var selectInput = $("<select>");

    wrapper.addClass(classes);
    wrapper.attr("id", "wrapper_" + id);
    selectInput.attr("id", id);

    for(var option of options){
        selectInput.append(option);
    }

    wrapper.append(selectInput);
    wrapper.append(label);

    return wrapper;
}

// An individual select option with all of its elements

function logSelectOption(id, classes, value, isDisabled, isSelected, contents){
    var disabled = "";
    var selected = "";

    (typeof id == "string") ? id = 'id="' + id + '"' : id = '';
    (typeof classes == "string") ? classes = 'class="' + classes + '"' : classes = '';
    (typeof value == "string") ? value = 'value="' + value + '"' : value = '';
    isDisabled ? disabled = "disabled" : disabled = ""; 
    isSelected ? selected = "selected" : selected = ""; 

    var option = '<option ' + id + ' ' + classes + ' ' + value + ' ' + disabled + ' ' + selected + '>' + contents + '</option>';

    return option;
}

// A generic send button. This function only returns 

function sendButton(id){
    return $('<div class="center-align"><a id="' + id + '" class="waves-effect waves-light btn"><span class="send_button"></span>  <i class="mdi mdi-send mdi-18px"></i></a><div>');
}

// Functions for report generation

function table(id, classes){
    var table = $("<table>");

    table.addClass(classes);

    if(id)
        table.attr("id", id);

    return table;
}

function tableRow(id, classes, contents){
    var row = $("<tr>");

    row.addClass(classes);

    if(id)
        row.attr("id", id);

    contents.forEach(function(index){
        row.append(rowColumn(null, null, index));
    });

    return row;
}

function rowColumn(id, classes, contents){
    var row = $("<td>");

    row.addClass(classes);

    if(id)
        row.attr("id", id);

    row.append(contents);

    return row;
}

function headerColumn(id, classes, contents){
    var row = $("<th>");

    row.addClass(classes);

    if(id)
        row.attr("id", id);

    row.append(contents);

    return row;
}

function tableHeader(id, classes, contents){
    var col = $("<tr>");

    col.addClass(classes);

    if(id)
        col.attr("id", id);

    contents.forEach(function(index){
        col.append(headerColumn(null, null, index));
    });

    return col;
}