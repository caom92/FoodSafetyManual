// Wrapper for loading a Log Form. For convenience's sake, this name will
// be shared among all log types

function loadLogForm(htmlElement){
    $server.request({
        service: 'log-gmp-packing-scale-calibration',
        success: function(response) {
            if (response.meta.return_code == 0) {
                var report = response.data;
                var header = {"rows":[{"columns":[{"styleClasses":"col s12 m12 l12", "columnText":report.log_name, "id":"log_name"}]},{"columns":[{"styleClasses":"col s4 m4 l4","textClasses":"zone_name","columnText":report.zone_name},{"styleClasses":"col s4 m4 l4","textClasses":"program_name","columnText":report.program_name},{"styleClasses":"col s4 m4 l4","textClasses":"module_name","columnText":report.module_name}]},{"columns":[{"styleClasses":"col s6 m6 l6","textClasses":"date_name","columnText":getISODate(new Date())},{"styleClasses":"col s6 m6 l6","textClasses":"made_by","columnText":localStorage.first_name + " " + localStorage.last_name}]}]};
                $(htmlElement).append(logHeader(header));
                scaleCalibrationLog(report, htmlElement, false);
                loadFunctionality({"isPrefilled":false});
                $("#send_report").click(function(){
                    $(this).attr("disabled", true);
                    if($(this).data("waiting") === false){
                        $(this).data("waiting", true);
                        $("#sending_log").show();
                        sendScaleCalibrationReport();
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
        service: 'authorization-report-gmp-packing-scale-calibration',
        data: data,
        success: function(response) {
            if (response.meta.return_code == 0) {
                changesFlag = false;
                $(htmlElement).html("");
                var report = response.data;
                var header = {"rows":[{"columns":[{"styleClasses":"col s12 m12 l12", "columnText":report.log_name, "id":"log_name"}]},{"columns":[{"styleClasses":"col s4 m4 l4","textClasses":"zone_name","columnText":report.zone_name},{"styleClasses":"col s4 m4 l4","textClasses":"program_name","columnText":report.program_name},{"styleClasses":"col s4 m4 l4","textClasses":"module_name","columnText":report.module_name}]},{"columns":[{"styleClasses":"col s6 m6 l6","textClasses":"date_name","columnText":getISODate(new Date())},{"styleClasses":"col s6 m6 l6","textClasses":"made_by","columnText":localStorage.first_name + " " + localStorage.last_name}]}]};
                $(htmlElement).append(logHeader(header));
                scaleCalibrationLog(report, htmlElement, true);
                bindChangeListener();
                loadFunctionality({"isPrefilled":true});
                $("#send_report").click(function(){
                    $(this).attr("disabled", true);
                    $("#sending_log").show();
                    updateScaleCalibrationReport(parseInt(data.report_id));
                });
                bindAuthorizationButtonsFunctionality(htmlElement, data.report_id);
                changeLanguage();
                $("input").characterCounter();
                $("textarea").characterCounter();
                $("textarea").trigger("autoresize");
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
    scaleCalibrationFunctionality(data);
}

// Wrapper for showing a HTML report. For convenience's sake, this name will
// be shared among all log types

function loadReport(data){
    return scaleCalibrationReport(data);
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

function sendScaleCalibrationReport(){
    var report = new Object();

    report.date = getISODate(new Date());
    report.notes = $("#report_comment").val();
    report.corrective_action = $("#report_action").val();
    report.types = new Array();

    console.log(JSON.stringify(report));
    console.log(report);

    if(validateLog()){
        $(".type-card").each(function(){
            console.log("TYPE CARD " + $(this).data("id"));
            var type = new Object();
            var typeID = $(this).data("id");

            type.id = typeID;
            type.time = $("#time_" + typeID).val();
            type.items = new Array();

            $(this).children(".item-card").each(function(){
                var item = new Object();
                var itemID = $(this).data("id");
                item.id = itemID;
                item.test = Number($("#test_" + itemID).val());
                item.unit_id = parseInt($('input[name=unitRadio_' + itemID +']:checked').val());
                item.status = getBool($("input:radio[name='radio_" + itemID + "']:checked").val());
                if($("input[id='sanitation_" + itemID + "']:checked").length == 1){
                    item.is_sanitized = true;
                } else {
                    item.is_sanitized = false;
                }
                type.items.push(item);
            });

            report.types.push(type);
        });

        $server.request({
            service: 'capture-gmp-packing-scale-calibration',
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

function updateScaleCalibrationReport(reportID){
    var report = new Object();

    report.report_id = reportID;
    report.notes = $("#report_comment").val();
    report.corrective_action = $("#report_action").val();
    report.types = new Array();

    if(validateLog()){
        $(".type-card").each(function(){
            var type = new Object();
            var typeID = $(this).data("id");

            type.id = typeID;
            type.time = $("#time_" + typeID).val();
            type.items = new Array();

            $(this).children(".item-card").each(function(){
                var item = new Object();
                var itemID = $(this).data("id");
                item.id = itemID;
                item.test = Number($("#test_" + itemID).val());
                item.unit_id = parseInt($('input[name=unitRadio_' + itemID +']:checked').val());
                item.status = getBool($("input:radio[name='radio_" + itemID + "']:checked").val());
                if($("input[id='sanitation_" + itemID + "']:checked").length == 1){
                    item.is_sanitized = true;
                } else {
                    item.is_sanitized = false;
                }
                type.items.push(item);
            });

            report.types.push(type);
        });

        console.log(report);

        $server.request({
            service: 'update-gmp-packing-scale-calibration',
            data: report,
            success: function(response){
                if (response.meta.return_code == 0) {
                    Materialize.toast("Reporte actualizado con exito", 3000, "rounded");
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

function scaleCalibrationLog(data, htmlElement, isPrefilled){
    var log = $("<div>");
    var additionalData = $("<div>");
    var buttonRow = $("<div>");

    console.log(data);
    for(var type of data.types.scales){
        log.append(scaleCalibrationType(type, data.types.units));
    }

    additionalData.addClass("card-panel white");

    additionalData.append(createText({"type":"text","classes":"report_additional_info"}));
    additionalData.append(createInputRow({"columns":[scaleCalibrationComment(data.notes)]}));
    additionalData.append(createInputRow({"columns":[scaleCalibrationCorrectiveAction(data.corrective_action)]}));

    log.append(additionalData);
    
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

function scaleCalibrationComment(reportComment){
    var commentLabel = {"type":"label","contents":{"type":"text","classes":"comment_title"}};
    var commentInput = {"type":"textarea","id": "report_comment", "classes": "validate", "fieldType":"text","validations":{"type":"text","max":{"value":255}}};
    var commentFullInput = {"id":"reportCommentWrapper","classes":"input-field col s12 m12 l12","field":commentInput,"label":commentLabel};

    if(reportComment){
        commentInput.value = reportComment;
        commentLabel.classes = "active";
    }

    return commentFullInput;
}

function scaleCalibrationCorrectiveAction(reportComment){
    var commentLabel = {"type":"label","contents":{"type":"text","classes":"action_title"}};
    var commentInput = {"type":"input","id": "report_action", "classes": "validate", "fieldType":"text","validations":{"type":"text","max":{"value":255}}};
    var commentFullInput = {"id":"reportActionWrapper","classes":"input-field col s12 m12 l12","field":commentInput,"label":commentLabel};

    if(reportComment){
        commentInput.value = reportComment;
        commentLabel.classes = "active";
    }

    return commentFullInput;
}

function sendButton(){
    var button = {"type":"button","id":"send_report","icon":{"type":"icon","icon":"mdi-send","size":"mdi-18px", "text":{"type":"text","classes":"send_button"}},"align":"col s3 m3 l3","data":{"waiting":false}};

    return button;
}

function scaleCalibrationType(type, units){
    var typeCard = $("<div>");
    var title = $("<div>");

    typeCard.addClass("card-panel white type-card");
    typeCard.data("id", type.id);
    title.addClass("card-title");
    title.append(createText({"type":"text","classes":"blue-text","text":type.name}));
    typeCard.append(title);

    typeCard.append(createInputRow({"columns":[scaleCalibrationTypeTime(type.id, type.time)]}));

    for(var item of type.items){
        typeCard.append(scaleCalibrationItem(item, type.id, units));
    }

    return typeCard;
}

function scaleCalibrationTypeTime(typeID, time){
    var timeLabel = {"type":"label","contents":{"type":"text","classes":"time_title"},"for":"time_" + typeID,"classes":"active"};
    var timeInput = {"type":"input","id": "time_" + typeID, "classes": "validate", "fieldType":"text","disabled":true,"data":{"type_id":typeID},"value":getISOTime(new Date()),"isClearable":false};
    var timeFullInput = {"id":"timeWrapper_" + typeID,"classes":"input-field col s12 m12 l12","field":timeInput,"label":timeLabel};

    if(time){
        timeInput.value = time;
    }

    return timeFullInput;
}

function scaleCalibrationItem(item, typeID, units){
    var itemCard = $("<div>");    
    var itemRow = new Object();

    itemRow.columns = [scaleCalibrationItemTitle(item, typeID), scaleCalibrationItemTest(item, typeID), scaleCalibrationItemUnits(item, typeID, units), scaleCalibrationItemStatus(item, typeID), scaleCalibrationItemSanitation(item, typeID)];

    itemCard.append(createInputRow(itemRow).attr("style", "margin-top:15px;"));
    itemCard.addClass("item-card");
    itemCard.data("id", item.id);
    itemCard.append($("<div class='divider'>"));

    return itemCard;
}

function scaleCalibrationItemTitle(item, typeID){
    var itemTitle = {"type":"text","id":"title_" + item.id, "text":item.name};
    var titleInput = {"id":"titleWrapper_" + item.id,"classes":"card-title col s6 m2 l2","field": itemTitle};

    return titleInput;
}

function scaleCalibrationItemTest(item, typeID){
    var testLabel = {"type":"label","contents":{"type":"text","classes":"test_title"}};
    var testInput = {"type":"input","id": "test_" + item.id, "classes": "validate timeChanger", "fieldType":"text","data":{"type_id":typeID,"item_id":item.id},"validations":{"type":"number","toast":"gmp-packing-scale-calibration-test"}};
    var testFullInput = {"id":"testWrapper_" + item.id,"classes":"input-field col s6 m3 l3","field":testInput,"label":testLabel};

    if(item.test){
        testInput.value = item.test;
        testLabel.classes = "active";
    }

    return testFullInput;
}

function scaleCalibrationItemUnits(item, typeID, units){
    var radioArray = [];

    for(var unit of units){
        var radioIcon = {"type":"text","classes":"big", "text":unit.symbol};
        var radioButton = {"type":"radio","id":"unitType_" + item.id + "_" + unit.id,"classes":"timeChanger","value":unit.id,"label":{"type":"label","classes":"black-text","for":"unitType_" + item.id + "_" + unit.id,"contents": radioIcon},"data":{"type_id":typeID,"item_id":item.id,"unit_id":unit.id}};

        if(item.unit == unit.id){
            radioButton.checked = true;
        }

        radioArray.push(radioButton);
    }

    var itemRadioGroup = {"type": "radioGroup", "id":"unitRadio_"  + item.id,"classes":"col s12 m12 l12","group":"unitRadio_" + item.id,"radioArray":radioArray,"validations":{"type":"radio","required":{"value":true,"toast":"gmp-packing-scale-calibration-status"},"groupName":"unitRadio_"+item.id}};
    var groupInput = {"id":"unitRadioWrapper_" + item.id,"classes":"col s4 m2 l2","field":itemRadioGroup};

    return groupInput;
}

function scaleCalibrationItemStatus(item, typeID){
    var acceptableIcon = {"type":"text","classes":"pass_tag big"};
    var unacceptableIcon = {"type":"text","classes":"fail_tag big"};
    var radioAcceptable = {"type":"radio","id":"acceptable_" + item.id,"classes":"timeChanger","value":"true","label":{"type":"label","classes":"black-text","for":"acceptable_" + item.id,"contents": acceptableIcon},"data":{"type_id":typeID,"item_id":item.id}};
    var radioUnacceptable = {"type":"radio","id":"unacceptable_" + item.id,"classes":"timeChanger","value":"false","label":{"type":"label","classes":"black-text","for":"unacceptable_" + item.id,"contents": unacceptableIcon},"data":{"type_id":typeID,"item_id":item.id}};
    var itemRadioGroup = {"type": "radioGroup", "id":"radioGroup_"  + item.id,"classes":"col s12 m12 l12","group":"radio_" + item.id,"radioArray":[radioAcceptable, radioUnacceptable],"validations":{"type":"radio","required":{"value":true,"toast":"gmp-packing-scale-calibration-status"},"groupName":"radio_"+item.id}};
    var groupInput = {"id":"radioWrapper_" + item.id,"classes":"col s4 m2 l2","field":itemRadioGroup};

    if(item.status == 1){
        radioAcceptable.checked = true;
    } else if (item.status == 0){
        radioUnacceptable.checked = true;
    }

    return groupInput;
}

function scaleCalibrationItemSanitation(item, typeID){
    var checkboxLabel = {"type":"label","contents":{"type":"text","classes":"sanitized_title"},"for":"sanitation_" + item.id};
    var checkboxField = {"type":"checkbox", "id":"sanitation_" + item.id,"classes":"filled-in timeChanger", "data":{"type_id":typeID}};
    var checkboxFullInput = {"field":checkboxField, "label":checkboxLabel,"classes":"col s4 m3 l3"};

    if(item.is_sanitized == 1){
        checkboxField.checked = true;
    }

    return checkboxFullInput;
}

// Functionality

function scaleCalibrationFunctionality(data){
    if(data.isPrefilled){

    } else {
        $(".timeChanger").change(function(){
            console.log("Time changed");
            if($(this).data().type_id)
                $("#time_" + $(this).data().type_id).val(getISOTime(new Date()));
        });
    }
}

// Full report

function scaleCalibrationReport(data){
    var report = new Object();

    report.type = "table";
    report.classes = "bordered highlight";
    report.id = "report_" + data.report_id;

    report.thead = scaleCalibrationHeader();
    report.tbody = scaleCalibrationBody(data);
    report.tfoot = scaleCalibrationFooter(data);

    console.log(JSON.stringify(report));
    console.log(report);

    return report;
}

// Header containing Area, Time, Number, Name, Conditions, Corrective Actions
// and Comment. This header contain the classes to borrow the text from
// languages.xml, not strings

function scaleCalibrationHeader(){
    var header = {"type":"thead","rows":[{"type":"tr","columns":[{"type":"th","classes":"time_title timeColumn"},{"type":"th","classes":"number_title numberColumn"},{"type":"th","classes":"test_title testColumn"},{"type":"th","classes":"unit_title unitColumn"},{"type":"th","classes":"status_title statusColumn"},{"type":"th","classes":"sanitized_title sanitizedColumn"}]}]};

    return header;
}

// Body containing all the information, except for the report notes and album
// URL

function scaleCalibrationBody(data){
    var body = {"type":"tbody"};

    body.rows = new Array();

    var firstRowFlag = true;
    for(var type of data.types){
        var row = {"type":"tr"};
        row.columns = new Array();
        if(firstRowFlag){
            var rowspan = data.types.length;
            for(var count of data.types){
                rowspan += count.items.length;
            }
            row.columns.push(scaleCalibrationReportTypeTime(type.time, rowspan));
            row.columns.push(scaleCalibrationReportTypeTitle(type.name, 4));
            firstRowFlag = false;
        } else {
            row.columns.push(scaleCalibrationReportTypeTitle(type.name, 4));
        }
        body.rows.push(row);
        for(var item of type.items){
            var itemRow = {"type":"tr"};
            itemRow.columns = scaleCalibrationReportItem(item);
            body.rows.push(itemRow);
        }
    }

    var reportNotesRow = {"type":"tr"};
    var reportActionsRow = {"type":"tr"};
    reportNotesRow.columns = [scaleCalibrationReportNotes(data.notes, 5)];
    reportActionsRow.columns = [scaleCalibrationReportAction(data.corrective_action, 5)];

    body.rows.push(reportNotesRow);
    body.rows.push(reportActionsRow);

    return body;
}

function scaleCalibrationReportTypeTime(time, rowspan){
    var typeTime = {"type":"td","classes":"timeColumn","rowspan":rowspan,"contents":time};

    return typeTime;
}

function scaleCalibrationReportTypeTitle(title, colspan){
    var typeTitle = {"type":"td","classes":"typeTitle","colspan":colspan,"contents":title};

    return typeTitle;
}

function scaleCalibrationReportItem(itemData){
    var item = new Array();

    item.push({"type":"td","classes":"numberColumn","contents":itemData.name});
    item.push({"type":"td","classes":"testColumn","contents":itemData.test});
    item.push({"type":"td","classes":"unitColumn","contents":itemData.unit});
    if(itemData.status){
        item.push({"type":"td","classes":"statusColumn pass_tag"});
    } else {
        item.push({"type":"td","classes":"statusColumn fail_tag"});
    }
    if(itemData.is_sanitized){
        item.push({"type":"td","classes":"sanitizedColumn yes_tag"});
    } else {
        item.push({"type":"td","classes":"sanitizedColumn no_tag"});
    }    

    console.log(item);

    return item;
}

function scaleCalibrationReportNotes(notes, colspan){
    var reportNotes = {"type":"td","classes":"fullColumn","colspan":colspan,"contents":"<span class='report_notes_title'></span>: " + notes};

    return reportNotes;
}

function scaleCalibrationReportAction(action, colspan){
    var reportNotes = {"type":"td","classes":"fullColumn","colspan":colspan,"contents":"<span class='action_title'></span>: " + action};

    return reportNotes;
}

// Footer

function scaleCalibrationFooter(data){

}

function getCSS(){
    return '<style>table { font-family: arial, sans-serif; border-collapse: collapse; width: 100%;}td { border: 1px solid #000000; text-align: left;}th { border: 1px solid #000000; text-align: left; font-weight: bold; background-color: #4CAF50;}.even { background-color: #b8e0b9;}.typeTitle{ background-color: yellow; width:588px;}.fullColumn{ background-color: #D3D3D3;width:631px;}.testColumn{ width:77px;}.unitColumn{ width:70px;}.numberColumn{ width:147px;}.timeColumn{ width:43px;}.statusColumn{ width:147px;}.sanitizedColumn{ width:147px;}</style>';
}