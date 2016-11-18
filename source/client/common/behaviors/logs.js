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
    $(".log_title").html("Module name");
    $('ul.tabs').tabs();
    $('.indicator').addClass("green");
    createDatePicker();
    loadLogForm("SSOP", testData());

    // We load the tabs; we have 2 or 3 depending on the privileges of the user
    // Read means we can load the PDF manual and see past logs
    // Write means we can read and also submit a new log with the current date
    changeLanguage(localStorage.defaultLanguage);
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

    wrapper.append(reportHeader("LAW", "Introduction", "SSOP", "PRE-OPERATIONAL LOG"));

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
        sendSSOPReport();
    });
}

function SSOPPreOperativeArea(area){
    var areaCard = divWrapper("area_report_" + area.area_id, "card-panel white" + area.area_id);
    var title = cardTitle(null, "card-title", area.area_name);

    areaCard.append(title);

    for (var item of area.items){
        areaCard.append(SSOPPreoperativeItem(item, area.area_id));
    }

    return areaCard;
}

function sendSSOPReport(){
    var report = new Object();
    var hardware_log = new Array();
    var area_log = new Array();
    report.capture_date = getISODate(new Date());
    
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
        area.items = new Array();

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
                hardware.acceptable = getBool($("input:radio[name='radio_" + id[0] +"_" + id[1] +"']:checked").val());
                if(!hardware.acceptable)
                    hardware.corrective_action_id = Number($("#select_" + id[0] + "_" + id[1]).val());
                else
                    hardware.corrective_action_id = 3;
                hardware.comment = $("#comment_" + id[0] + "_" + id[1]).val();

                hardware_log.push(hardware);
            }
        });

        area.items = hardware_log;

        area_log.push(area);
    });

    report.log = area_log;

    console.log(JSON.stringify(report));
}

function SSOPPreoperativeItem(item, areaID){
    var itemCard = divWrapper(null, "card-panel white");
    var firstRow = divWrapper(null, "row");
    var secondRow = divWrapper(null, "row");
    var title = cardTitle(null, "card-title col s4", item.item_name);
    var acceptable = logRadioButtonInput("acceptable_" + item.item_id + "_" + areaID, null, logLabel(null, "col s4", "acceptable_" + item.item_id + "_" + areaID, '<i class="mdi mdi-checkbox-marked-circle mdi-18px green-text"></i>'), "radio_" + item.item_id + "_" + areaID, true);
    var unacceptable = logRadioButtonInput("unacceptable_" + item.item_id + "_" + areaID, null, logLabel(null, "col s4", "unacceptable_" + item.item_id + "_" + areaID, '<i class="mdi mdi-close-circle mdi-18px red-text"></i>'), "radio_" + item.item_id + "_" + areaID, false);
    var status = logRadioButtonGroup("radio_" + item.item_id + "_" + areaID, "col s4", [acceptable, unacceptable]);
    var actionEmpty = logSelectOption(null, null, "", true, true, "Seleccione la acción correctiva");
    var actionWSR = logSelectOption(null, null, "1", false, false, "W/S/R - Wash/Rinse/Sanitize");
    var actionRC = logSelectOption(null, null, "2", false, false, "RC - Reclean");;
    var actionsSelect = logSelectInput("select_" + item.item_id + "_" + areaID, "input-field col s4", [actionEmpty, actionWSR, actionRC], logLabel(null, null, "select_" + item.item_id + "_" + areaID, 'Acción correctiva'));
    var comments = logTextField("comment_wrapper_" + item.item_id + "_" + areaID, logTextInput("comment_" + item.item_id + "_" + areaID, "validate", "text", null), logLabel(null, null, "comment_" + item.item_id + "_" + areaID, "Comentarios"), "input-field col s12");

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

function testData(){
    return {"areas":[
    {
        "area_id": 1,
        "area_name": "Area #1 Congeladores",
        "items": [
            {
                "item_id": 1,
                "item_name": "Cuarto frío"
            },
            {
                "item_id": 2,
                "item_name": "Termómetros"
            }
        ]
    },
    {
        "area_id": 2,
        "area_name": "Area #2 Empaque",
        "items": [
            {
                "item_id": 3,
                "item_name": "Mesas"
            },
            {
                "item_id": 4,
                "item_name": "Pisos"
            }
        ]
    }
]};
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
        ISOTime += "0" + date.getMinutes() + ":";
    } else {
        ISOTime += date.getMinutes() + ":";
    }

    if(date.getSeconds()<10){
        ISOTime += "0" + date.getSeconds();
    } else {
        ISOTime += date.getSeconds();
    }

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

    row.append(contents);

    return row;
}

function rowColumn(id, classes, contents){
    var col = $("<tr>");

    col.addClass(classes);

    if(id)
        col.attr("id", id);

    col.append(contents);

    return col;
}

function headerColumn(id, classes, contents){
    var col = $("<tr>");

    col.addClass(classes);

    if(id)
        col.attr("id", id);

    col.append(contents);

    return col;
}