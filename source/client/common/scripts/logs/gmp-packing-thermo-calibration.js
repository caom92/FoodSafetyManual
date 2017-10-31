// Wrapper for loading a Log Form. For convenience's sake, this name will
// be shared among all log types

function loadLogForm(htmlElement){
    $server.request({
        service: 'log-gmp-packing-thermo-calibration',
        success: function(response) {
            if (response.meta.return_code == 0) {
                var report = response.data;
                var header = {"rows":[{"columns":[{"styleClasses":"col s12 m12 l12", "columnText":report.log_name, "id":"log_name"}]},{"columns":[{"styleClasses":"col s4 m4 l4","textClasses":"zone_name","columnText":report.zone_name},{"styleClasses":"col s4 m4 l4","textClasses":"program_name","columnText":report.program_name},{"styleClasses":"col s4 m4 l4","textClasses":"module_name","columnText":report.module_name}]},{"columns":[{"styleClasses":"col s6 m6 l6","textClasses":"date_name","columnText":getISODate(new Date())},{"styleClasses":"col s6 m6 l6","textClasses":"made_by","columnText":localStorage.first_name + " " + localStorage.last_name}]}]};
                $(htmlElement).append(logHeader(header));
                gmpPackingThermoCalibrationLog(report, htmlElement, false);
                loadFunctionality({"isPrefilled":false});
                changeLanguage();
                $("#send_report").click(function(){
                    $(this).attr("disabled", true);
                    if($(this).data("waiting") === false){
                        $(this).data("waiting", true);
                        $("#sending_log").show();
                        sendGmpPackingThermoCalibrationReport();
                    }
                    
                });
                $('.log_title').html(report.log_name);
                $("input").characterCounter();
                $("textarea").characterCounter();
                $(htmlElement).append(report.html_footer);
                changeLanguage();
            } else {
                Materialize.toast(response.meta.message, 3000, "rounded");
                throw response.meta.message;
            }
        }
    });
}

function loadPrefilledLogForm(htmlElement, data){
    $server.request({
        service: 'authorization-report-gmp-packing-thermo-calibration',
        data: data,
        success: function(response) {
            if (response.meta.return_code == 0) {
                changesFlag = false;
                $(htmlElement).html("");
                var report = response.data;
                var header = {"rows":[{"columns":[{"styleClasses":"col s12 m12 l12", "columnText":report.log_name}]},{"columns":[{"styleClasses":"col s4 m4 l4","textClasses":"zone_name","columnText":report.zone_name},{"styleClasses":"col s4 m4 l4","textClasses":"program_name","columnText":report.program_name},{"styleClasses":"col s4 m4 l4","textClasses":"module_name","columnText":report.module_name}]},{"columns":[{"styleClasses":"col s6 m6 l6","textClasses":"date_name","columnText":report.creation_date},{"styleClasses":"col s6 m6 l6","textClasses":"made_by","columnText":report.created_by}]}]};
                $(htmlElement).append(logHeader(header));
                gmpPackingThermoCalibrationLog(report, htmlElement, true);
                bindChangeListener();
                loadFunctionality({"isPrefilled":true});
                $("#send_report").click(function(){
                    $(this).attr("disabled", true);
                    $("#sending_log").show();
                    updateGmpPackingThermoCalibrationReport(parseInt(data.report_id));
                });
                bindAuthorizationButtonsFunctionality(htmlElement, data.report_id);
                $("input").characterCounter();
                $("textarea").characterCounter();
                $("textarea").trigger("autoresize");
                $(htmlElement).append(report.html_footer);
                changeLanguage();
                window.scrollTo(0, 0);
                $("#preloader_wrapper").hide();
                $(htmlElement).fadeIn(500);
            } else {
                Materialize.toast(response.meta.message, 3000, "rounded");
                throw response.meta.message;
            }
        }
    });
}

function loadFunctionality(data){
    gmpPackingThermoCalibrationFunctionality(data);
}

// Wrapper for showing a HTML report. For convenience's sake, this name will
// be shared among all log types

function loadReport(data){
    return gmpPackingThermoCalibrationReport(data);
}

function additionalLoadReportControls(htmlDocument, data){
    return;
}

function logHasEmail(){
    return false;
}

function validateLog(){
    var errorCounter = 0;
    var returnValue = false;

    $('.formValidator').each(function(){
        if(!$(this).validate()){
            console.log("Invalid input");
            errorCounter++;
        }
    });

    if(errorCounter == 0){
        returnValue = true;
        Materialize.toast("Bitacora valida", 2500, "rounded");
    } else {
        Materialize.toast("Bitacora no valida", 2500, "rounded");
    }

    return returnValue;
}

function specialClearLog(){
    return;
}

function pdfReportOrientation(){
    return "P";
}

function pdfReportFontsize(){
    return "10";
}

function loadImageArray(data){
    return null;
}

/******************************************************************************
A collection of functions to display the Log Form. This will be related to the
name of the log, located in the name_suffix field on the database. Usually, we
are going to divide them into full log, area log and individual item log.
******************************************************************************/

function sendGmpPackingThermoCalibrationReport(){
    var report = new Object();

    report.date = getISODate(new Date());
    report.time = $("#time").val();
    report.items = new Array();

    if(validateLog()){
        $(".item-card").each(function(){
            var item = new Object();
            var itemID = $(this).data("id");
            item.id = itemID;
            item.test = Number($("#test_" + itemID).val());
            item.calibration = getBool($("input:radio[name='radio_" + itemID + "']:checked").val());
            if($("input[id='sanitized_" + itemID + "']:checked").length == 1){
                item.sanitization = true;
            } else {
                item.sanitization = false;
            }
            item.deficiencies = $("#deficiencies_" + itemID).val();
            item.corrective_action = $("#correctiveAction_" + itemID).val();
            report.items.push(item);
        });

        console.log(report);

        $server.request({
            service: 'capture-gmp-packing-thermo-calibration',
            data: report,
            success: function(response){
                if (response.meta.return_code == 0) {
                    Materialize.toast("Reporte enviado con exito", 3000, "rounded");
                    clearLog();
                    $('ul.tabs').tabs('select_tab', 'manual_tab');
                } else {
                    Materialize.toast(response.meta.message, 3000, "rounded");
                }
                $("#send_report").removeAttr("disabled");
                $("#send_report").data("waiting", false);
                $("#sending_log").hide();
            }
        });
    } else {
        $("#send_report").removeAttr("disabled");
        $("#send_report").data("waiting", false);
        $("#sending_log").hide();
    }
}

function updateGmpPackingThermoCalibrationReport(reportID){
    var report = new Object();

    report.report_id = reportID;
    report.time = $("#time").val();
    report.items = new Array();

    if(validateLog()){
        $(".item-card").each(function(){
            var item = new Object();
            var itemID = $(this).data("id");
            item.id = itemID;
            item.test = Number($("#test_" + itemID).val());
            item.calibration = getBool($("input:radio[name='radio_" + itemID + "']:checked").val());
            if($("input[id='sanitized_" + itemID + "']:checked").length == 1){
                item.sanitization = true;
            } else {
                item.sanitization = false;
            }
            item.deficiencies = $("#deficiencies_" + itemID).val();
            item.corrective_action = $("#correctiveAction_" + itemID).val();
            report.items.push(item);
        });

        console.log(report);

        $server.request({
            service: 'update-gmp-packing-thermo-calibration',
            data: report,
            success: function(response){
                if (response.meta.return_code == 0) {
                    Materialize.toast("Reporte enviado con exito", 3000, "rounded");
                    changesFlag = false;
                } else {
                    Materialize.toast(response.meta.message, 3000, "rounded");
                }
                $("#send_report").removeAttr("disabled");
                $("#sending_log").hide();
            }
        });
    } else {
        $("#send_report").removeAttr("disabled");
        $("#sending_log").hide();
    }
}

function gmpPackingThermoCalibrationLog(data, htmlElement, isPrefilled){
    var log = $("<div>");
    var logCard = $("<div>");
    var buttonRow = $("<div>");

    logCard.append(createInputRow({"columns":[gmpPackingThermoCalibrationTime(data.time)]}));

    for(var item of data.items){
        logCard.append(gmpPackingThermoCalibrationItem(item));
    }

    logCard.addClass("card-panel white");

    log.append(logCard);

    buttonRow.attr("id", "button_row");
    buttonRow.addClass("row");
    buttonRow.append(createButton(sendButton()));
    
    if(isPrefilled === true){
        buttonRow.append(createButton(approveButton()));
        buttonRow.append(createButton(rejectButton()));
        buttonRow.append(createButton(returnButton()));
    }

    log.append(buttonRow);

    $(htmlElement).append(log);
}

function gmpPackingThermoCalibrationTime(time){
    var timeLabel = {"type":"label","contents":{"type":"text","classes":"time_title"},"for":"time","classes":"active"};
    var timeInput = {"type":"input","id": "time", "classes": "validate", "fieldType":"text","readonly":true,"value":getISOTime(new Date()),"isClearable":false};
    var timeFullInput = {"id":"timeWrapper","classes":"input-field col s12 m12 l12","field":timeInput,"label":timeLabel};

    if(time){
        timeInput.value = time;
    }

    return timeFullInput;
}

function sendButton(){
    var button = {"type":"button","id":"send_report","icon":{"type":"icon","icon":"mdi-send","size":"mdi-18px", "text":{"type":"text","classes":"send_button"}},"align":"col s3 m3 l3","data":{"waiting":false}};

    return button;
}

function gmpPackingThermoCalibrationItem(item){
    var itemCard = $("<div>");
    var topRow = new Object();
    var bottomRow = new Object();

    topRow.columns = [gmpPackingThermoCalibrationTitle(item), gmpPackingThermoCalibrationTest(item), gmpPackingThermoCalibrationPass(item), gmpPackingThermoCalibrationSanitized(item)];
    bottomRow.columns = [gmpPackingThermoCalibrationDeficiencies(item), gmpPackingThermoCalibrationCorrectiveAction(item)];

    itemCard.append(createInputRow(topRow).attr("style", "margin-top:15px;"));
    itemCard.append(createInputRow(bottomRow).attr("style", "margin-top:15px;"));

    itemCard.addClass("item-card");
    itemCard.data("id", item.id);
    itemCard.append($("<div class='divider'>"));

    return itemCard;
}

function gmpPackingThermoCalibrationTitle(item){
    var itemTitle = {"type":"text","id":"title_" + item.id,"classes":"blue-text", "text":item.name};
    var titleInput = {"id":"titleWrapper_" + item.id,"classes":"card-title col s2 m2 l2","field": itemTitle};

    return titleInput;
}

function gmpPackingThermoCalibrationTest(item){
    var testLabel = {"type":"label","contents":{"type":"text","classes":"thermometer_test_title"}};
    var testInput = {"type":"input","id": "test_" + item.id, "classes": "validate timeChanger", "fieldType":"text","data":{"item_id":item.id},"validations":{"type":"number","required":{"value":true,"toast":"gmp-packing-thermo-calibration-test"}}};
    var testFullInput = {"id":"testWrapper_" + item.id,"classes":"input-field col s4 m4 l4","field":testInput,"label":testLabel};

    if(item.test){
        testInput.value = item.test;
        testLabel.classes = "active";
    }

    return testFullInput;
}

function gmpPackingThermoCalibrationPass(item){
    var calibrationPassLabel = {
    "type": "label",
    "contents": {"type":"text","classes":"thermometer_calibration_title"}
};
    var acceptableIcon = {"type":"text","classes":"yes_tag big"};
    var unacceptableIcon = {"type":"text","classes":"no_tag big"};
    var radioApproved = {"type":"radio","id":"approved_" + item.id,"classes":"timeChanger","value":"true","label":{"type":"label","classes":"black-text","for":"approved_" + item.id,"contents": acceptableIcon},"data":{"item_id":item.id}};
    var radioUnapproved = {"type":"radio","id":"unapproved_" + item.id,"classes":"timeChanger","value":"false","label":{"type":"label","classes":"black-text","for":"unapproved_" + item.id,"contents": unacceptableIcon},"data":{"item_id":item.id}};
    var itemRadioGroup = {"type": "radioGroup", "id":"radioGroup_"  + item.id,"classes":"col s12 m12 l12","group":"radio_" + item.id,"label":calibrationPassLabel,"radioArray":[radioApproved, radioUnapproved],"validations":{"type":"radio","required":{"value":true,"toast":"gmp-packing-thermo-calibration-status"},"groupName":"radio_" + item.id}};
    var groupInput = {"id":"radioWrapper_" + item.id,"classes":"col s3 m3 l3","field":itemRadioGroup};

    if(item.calibration == true){
        radioApproved.checked = true;
    } else if (item.calibration == false){
        radioUnapproved.checked = true;
    }

    return groupInput;
}

function gmpPackingThermoCalibrationSanitized(item){
    var checkboxLabel = {"type":"label","contents":{"type":"text","classes":"sanitized_thermo"},"for":"sanitized_" + item.id};
    var checkboxField = {"type":"checkbox", "id":"sanitized_" + item.id,"classes":"filled-in timeChanger", "data":{"item_id":item.id}};
    var checkboxFullInput = {"field":checkboxField, "label":checkboxLabel,"classes":"col s3 m3 l3"};

    if(item.sanitization == 1){
        checkboxField.checked = true;
    }

    return checkboxFullInput;
}

function gmpPackingThermoCalibrationDeficiencies(item){
    var deficienciesLabel = {"type":"label","contents":{"type":"text","classes":"deficiencies_title"}};
    var deficienciesInput = {"type":"textarea","id": "deficiencies_" + item.id, "classes": "validate timeChanger", "fieldType":"text","data":{"item_id":item.id},"validations":{"type":"text","max":{"value":65535}}};
    var deficienciesFullInput = {"id":"deficienciesWrapper_" + item.id,"classes":"input-field col s6 m6 l6","field":deficienciesInput,"label":deficienciesLabel};

    if(item.deficiencies){
        deficienciesInput.value = item.deficiencies;
        deficienciesLabel.classes = "active";
    }

    return deficienciesFullInput;
}

function gmpPackingThermoCalibrationCorrectiveAction(item){
    var actionLabel = {"type":"label","contents":{"type":"text","classes":"action_title"}};
    var actionInput = {"type":"textarea","id": "correctiveAction_" + item.id, "classes": "validate timeChanger", "fieldType":"text","data":{"item_id":item.id},"validations":{"type":"text","max":{"value":65535}}};
    var actionFullInput = {"id":"correctiveActionWrapper_" + item.id,"classes":"input-field col s6 m6 l6","field":actionInput,"label":actionLabel};

    if(item.corrective_action){
        actionInput.value = item.corrective_action;
        actionLabel.classes = "active";
    }

    return actionFullInput;
}

function gmpPackingThermoCalibrationFunctionality(data){
    if(data.isPrefilled){
        
    } else {
        $(".timeChanger").change(function(){
            console.log("time change");
            $("#time").val(getISOTime(new Date()));
        });
    }
}

// Full report

function gmpPackingThermoCalibrationReport(data){
    var report = new Object();

    report.type = "table";
    report.classes = "bordered highlight";
    report.id = "report_" + data.report_id;

    report.thead = gmpPackingThermoCalibrationReportHeader();
    report.tbody = gmpPackingThermoCalibrationReportBody(data);
    //report.tfoot = gmpPackingThermoCalibrationReportFooter(data);

    return report;
}

function gmpPackingThermoCalibrationReportHeader(){
    var header = {"type":"thead","rows":[{"type":"tr","columns":[{"type":"th","classes":"time_title timeColumn"},{"type":"th","classes":"number_title numberColumn"},{"type":"th","classes":"thermometer_test_title testColumn"},{"type":"th","classes":"thermometer_calibration_title calibrationColumn"},{"type":"th","classes":"deficiencies_title deficienciesColumn"},{"type":"th","classes":"action_title actionColumn"}]}]};

    return header;
}

function gmpPackingThermoCalibrationReportBody(data){
    var body = {"type":"tbody"};

    body.rows = new Array();

    var firstRow = true;

    for(var item of data.items){
        var row = {"type":"tr"};
        row.columns = new Array();
        if(firstRow){
            row.columns.push({"type":"td","rowspan":data.items.length,"classes":"timeColumn","contents":data.time});
            for(var col of gmpPackingThermoCalibrationReportItem(item)){
                row.columns.push(col);
            }
            firstRow = false;
        } else {
            row.columns = gmpPackingThermoCalibrationReportItem(item);
        }
        body.rows.push(row);
    }

    console.log(body);

    return body;
}

function gmpPackingThermoCalibrationReportItem(itemData){
    var item = new Array();

    item.push({"type":"td","classes":"numberColumn","contents":itemData.name});
    item.push({"type":"td","classes":"testColumn","contents":itemData.test});
    if(itemData.calibration){
        item.push({"type":"td","classes":"calibrationColumn yes_tag"});
    } else {
        item.push({"type":"td","classes":"calibrationColumn no_tag"});
    }
    item.push({"type":"td","classes":"deficienciesColumn","contents":itemData.deficiencies});
    item.push({"type":"td","classes":"actionColumn","contents":itemData.corrective_action});

    return item;
}

function getCSS(){
    return "<style> table { font-family: arial, sans-serif; border-collapse: collapse; width: 100%; } td { border: 1px solid #000000; text-align: left; } th { border: 1px solid #000000; text-align: left; font-weight: bold; background-color: #4CAF50; } .even { background-color: #b8e0b9; } .timeColumn { width: 40px; } .numberColumn { width: 71px; } .testColumn { width: 90px; } .calibrationColumn { width: 90px; } .deficienciesColumn { width: 170px; } .actionColumn { width: 170px; } </style>";
}
