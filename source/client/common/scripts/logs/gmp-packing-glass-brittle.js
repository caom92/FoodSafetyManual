// Wrapper for loading a Log Form. For convenience's sake, this name will
// be shared among all log types

function loadLogForm(htmlElement){
    $server.request({
        service: 'log-gmp-packing-glass-brittle',
        success: function(response) {
            if (response.meta.return_code == 0) {
                var report = response.data;
                var header = {"rows":[{"columns":[{"styleClasses":"col s12 m12 l12", "columnText":report.log_name, "id":"log_name"}]},{"columns":[{"styleClasses":"col s4 m4 l4","textClasses":"zone_name","columnText":report.zone_name},{"styleClasses":"col s4 m4 l4","textClasses":"program_name","columnText":report.program_name},{"styleClasses":"col s4 m4 l4","textClasses":"module_name","columnText":report.module_name}]},{"columns":[{"styleClasses":"col s6 m6 l6","textClasses":"date_name","columnText":getISODate(new Date())},{"styleClasses":"col s6 m6 l6","textClasses":"made_by","columnText":localStorage.first_name + " " + localStorage.last_name}]}]};
                $(htmlElement).append(logHeader(header));
                gmpPackingGlassBrittleLog(report, htmlElement);
                loadFunctionality({"isPrefilled":false});
                changeLanguage();
                $("#send_report").click(function(){
                    sendGmpPackingGlassBrittleReport();
                });
                $("input").characterCounter();
            } else {
                Materialize.toast("Some error", 3000, "rounded");
                throw response.meta.message;
            }
        }
    });
}

function loadPrefilledLogForm(htmlElement, data){
    $server.request({
        service: 'authorization-report-gmp-packing-glass-brittle',
        data: data,
        success: function(response) {
            if (response.meta.return_code == 0) {
                $(htmlElement).html("");
                var report = response.data;
                var header = {"rows":[{"columns":[{"styleClasses":"col s12 m12 l12", "columnText":report.log_name}]},{"columns":[{"styleClasses":"col s4 m4 l4","textClasses":"zone_name","columnText":report.zone_name},{"styleClasses":"col s4 m4 l4","textClasses":"program_name","columnText":report.program_name},{"styleClasses":"col s4 m4 l4","textClasses":"module_name","columnText":report.module_name}]},{"columns":[{"styleClasses":"col s6 m6 l6","textClasses":"date_name","columnText":report.creation_date},{"styleClasses":"col s6 m6 l6","textClasses":"made_by","columnText":report.created_by}]}]};
                $(htmlElement).append(logHeader(header));
                gmpPackingGlassBrittleLog(report, htmlElement);
                loadFunctionality({"isPrefilled":true});
                $("#send_report").click(function(){
                    updateGmpPackingGlassBrittleReport(parseInt(data.report_id));
                });
                changeLanguage();
                $("input").characterCounter();
            } else {
                Materialize.toast("Some error", 3000, "rounded");
                throw response.meta.message;
            }
        }
    });
}

function loadManual(htmlElement, titleElement){
    $server.request({
        service: 'get-log-manual-url',
        data: {"log-suffix":"gmp-packing-glass-brittle"},
        success: function(response){
            $(titleElement).html(response.data.log_name);
            $(htmlElement).append('<iframe src = "' + $root + 'external/ViewerJS/#../../' + response.data.manual_location + 'actual_manual.pdf" width="100%" height="100%" style="min-height: 300px" allowfullscreen webkitallowfullscreen></iframe>');
            console.log(response);
        }
    });
}

function loadFunctionality(data){
    gmpPackingGlassBrittleFunctionality(data);
}

// Wrapper for showing a HTML report. For convenience's sake, this name will
// be shared among all log types

function loadReport(data){
    return gmpPackingGlassBrittleReport(data);
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

/******************************************************************************
A collection of functions to display the Log Form. This will be related to the
name of the log, located in the name_suffix field on the database. Usually, we
are going to divide them into full log, area log and individual item log.
******************************************************************************/

function sendGmpPackingGlassBrittleReport(){
    var report = new Object();

    report.date = getISODate(new Date());
    report.notes = $("#report_comment").val();
    report.time = $("#time").val();
    report.areas = new Array();

    if(validateLog()){
        $(".area-card").each(function(){
            var area = new Object();
            var areaID = $(this).data("id");
            area.id = areaID;
            area.items = new Array();
            $(this).children(".item-card").each(function(){
                var item = new Object();
                var itemID = $(this).data("id");
                item.id = itemID;
                item.is_acceptable = getBool($("input:radio[name='radio_" + itemID + "']:checked").val());
                area.items.push(item);
            });
            report.areas.push(area);
        });

        console.log(report);

        $server.request({
            service: 'capture-gmp-packing-glass-brittle',
            data: report,
            success: function(response){
                if (response.meta.return_code == 0) {
                    Materialize.toast("Reporte enviado con exito", 3000, "rounded");
                } else {
                    Materialize.toast(response.meta.message, 3000, "rounded");
                }
            }
        });
    }
}

function updateGmpPackingGlassBrittleReport(reportID){
    var report = new Object();

    report.report_id = reportID;
    report.notes = $("#report_comment").val();
    report.time = $("#time").val();
    report.areas = new Array();

    if(validateLog()){
        $(".area-card").each(function(){
            var area = new Object();
            var areaID = $(this).data("id");
            area.id = areaID;
            area.items = new Array();
            $(this).children(".item-card").each(function(){
                var item = new Object();
                var itemID = $(this).data("id");
                item.id = itemID;
                item.is_acceptable = getBool($("input:radio[name='radio_" + itemID + "']:checked").val());
                area.items.push(item);
            });
            report.areas.push(area);
        });

        console.log(report);

        $server.request({
            service: 'update-gmp-packing-glass-brittle',
            data: report,
            success: function(response){
                if (response.meta.return_code == 0) {
                    Materialize.toast("Reporte actualizado con exito", 3000, "rounded");
                    $("#content_wrapper").hide();
                    $("#authorizations_wrapper").show();
                } else {
                    Materialize.toast(response.meta.message, 3000, "rounded");
                }
            }
        });
    }
}


function gmpPackingGlassBrittleLog(data, htmlElement){
    var log = $("<div>");
    var timeLog = $("<div>");
    var additionalData = $("<div>");

    timeLog.addClass("card-panel white");
    timeLog.append(createInputRow({"columns":[gmpPackingGlassBrittleTime(data.time)]}));
    log.append(timeLog);

    for(var area of data.areas){
        log.append(gmpPackingGlassBrittleArea(area));
    }

    additionalData.addClass("card-panel white");
    additionalData.append(createText({"type":"text","classes":"report_additional_info"}));
    additionalData.append(createInputRow({"columns":[gmpPackingGlassBrittleComment(data.notes)]}));

    log.append(additionalData);
    log.append($("<div class='row'>").append(createButton(gmpPackingGlassBrittleSendButton())));

    $(htmlElement).append(log);
}

function gmpPackingGlassBrittleTime(time){
    var timeLabel = {"type":"label","contents":{"type":"text","classes":"time_title"},"for":"time","classes":"active"};
    var timeInput = {"type":"input","id": "time", "classes": "validate", "fieldType":"text","disabled":true,"value":getISOTime(new Date())};
    var timeFullInput = {"id":"timeWrapper","classes":"input-field col s12 m12 l12","field":timeInput,"label":timeLabel};

    if(time){
        timeInput.value = time;
    }

    return timeFullInput;
}

function gmpPackingGlassBrittleComment(reportComment){
    var commentLabel = {"type":"label","contents":{"type":"text","classes":"comment_title"}};
    var commentInput = {"type":"input","id": "report_comment", "classes": "validate", "fieldType":"text","validations":{"type":"text","max":{"value":80,"toast":"gmp-packing-preop-report-notes"}}};
    var commentFullInput = {"id":"reportCommentWrapper","classes":"input-field col s12 m12 l12","field":commentInput,"label":commentLabel};

    if(reportComment){
        commentInput.value = reportComment;
        commentLabel.classes = "active";
    }

    return commentFullInput;
}

function gmpPackingGlassBrittleSendButton(){
    var button = {"type":"button","id":"send_report","icon":{"type":"icon","icon":"mdi-send","size":"mdi-18px", "text":{"type":"text","classes":"send_button"}}};

    return button;
}

function gmpPackingGlassBrittleArea(area){
    var areaCard = $("<div>");
    var title = $("<div>");

    areaCard.addClass("card-panel white area-card");
    areaCard.data("id", area.id);
    title.addClass("card-title");
    title.append(createIcon({"type":"icon","icon":"mdi-cube-outline","size":"mdi-18px","color":"blue-text", "text":{"type":"text","classes":"blue-text","text":area.name}}));
    areaCard.append(title);

    for(var item of area.items){
        areaCard.append(gmpPackingGlassBrittleItem(item, area.id));
    }

    return areaCard;
}

function gmpPackingGlassBrittleItem(item, areaID){
    var itemCard = $("<div>");    
    var row = new Object();

    row.columns = [gmpPackingGlassBrittleItemTitle(item, areaID), gmpPackingGlassBrittleItemElements(item, areaID), gmpPackingGlassBrittleItemStatus(item, areaID)];

    itemCard.append(createInputRow(row));
    itemCard.addClass("item-card");
    itemCard.data("id", item.id);
    itemCard.append($("<div class='divider'>"));

    return itemCard;
}

function gmpPackingGlassBrittleItemTitle(item, areaID){
    var itemTitle = {"type":"text","id":"title_" + item.id, "text":item.name};
    var titleInput = {"id":"titleWrapper_" + item.id,"classes":"card-title col s4 m4 l4","field": itemTitle};

    return titleInput;
}

function gmpPackingGlassBrittleItemElements(item, areaID){
    var itemTitle = {"type":"text","id":"elements_" + item.id, "text":item.quantity + " <span class='elements_title'>elemento(s)</span>"};
    var titleInput = {"id":"elementsWrapper_" + item.id,"classes":"card-title col s4 m4 l4","field": itemTitle};

    return titleInput;
}

function gmpPackingGlassBrittleItemStatus(item, areaID){
    var statusLabel = {"type": "label","contents": {"type":"text","classes":"status_title"}};
    var acceptableIcon = {"type":"text","classes":"acceptable_tag big"};
    var unacceptableIcon = {"type":"text","classes":"unacceptable_tag big"};
    var radioAcceptable = {"type":"radio","id":"acceptable_" + item.id,"classes":"timeChanger","value":"true","label":{"type":"label","classes":"black-text","for":"acceptable_" + item.id,"contents": acceptableIcon},"data":{"area_id":areaID,"item_id":item.id}};
    var radioUnacceptable = {"type":"radio","id":"unacceptable_" + item.id,"classes":"timeChanger","value":"false","label":{"type":"label","classes":"black-text","for":"unacceptable_" + item.id,"contents": unacceptableIcon},"data":{"area_id":areaID,"item_id":item.id}};
    var itemRadioGroup = {"type": "radioGroup", "id":"radioGroup_"  + item.id,"classes":"col s12 m12 l12","group":"radio_" + item.id,"radioArray":[radioAcceptable, radioUnacceptable],"validations":{"type":"radio","required":{"value":true,"toast":"gmp-packing-preop-item-status"},"groupName":"radio_" + item.id},"label":statusLabel};
    var groupInput = {"id":"radioWrapper_" + item.id,"classes":"col s8 m8 l4","field":itemRadioGroup};

    if(item.status == 1){
        radioAcceptable.checked = true;
    } else if (item.status == 0){
        radioUnacceptable.checked = true;
    }

    return groupInput;
}

function gmpPackingGlassBrittleFunctionality(data){
    if(data.isPrefilled){
        
    } else {
        $(".timeChanger").change(function(){
            console.log("time change");
            $("#time").val(getISOTime(new Date()));
        });
    }
}

// Full report

function gmpPackingGlassBrittleReport(data){
    var report = new Object();

    report.type = "table";
    report.classes = "bordered highlight";
    report.id = "report_" + data.report_id;

    report.thead = gmpPackingGlassBrittleReportHeader();
    report.tbody = gmpPackingGlassBrittleReportBody(data);
    //report.tfoot = gmpPackingGlassBrittleReportFooter(data);

    return report;
}

// Header containing Area, Time, Number, Name, Conditions, Corrective Actions
// and Comment. This header contain the classes to borrow the text from
// languages.xml, not strings

function gmpPackingGlassBrittleReportHeader(){
    var header = {"type":"thead","rows":[{"type":"tr","columns":[{"type":"th","classes":"area_title areaColumn"},{"type":"th","classes":"time_title timeColumn"},{"type":"th","classes":"number_title numberColumn"},{"type":"th","classes":"description_title descriptionColumn"},{"type":"th","classes":"inventory_title inventoryColumn"},{"type":"th","classes":"status_title statusColumn"}]}]};

    return header;
}

function gmpPackingGlassBrittleReportBody(data){
    var body = {"type":"tbody"};

    body.rows = new Array();

    for(var area of data.areas){
        var firstRowFlag = true;
        for(var item of area.items){
            var row = {"type":"tr"};
            row.columns = new Array();
            if(firstRowFlag){
                var rowspan = area.items.length;
                row.columns.push(gmpPackingGlassBrittleReportAreaName(area.name, rowspan));
                row.columns.push(gmpPackingGlassBrittleReportAreaTime(data.time, rowspan));
                for(var itemCol of gmpPackingGlassBrittleReportItem(item)){
                    row.columns.push(itemCol);
                }
                firstRowFlag = false;
            } else {
                row.columns = gmpPackingGlassBrittleReportItem(item);
            }
            body.rows.push(row);
        }
    }

    var reportNotesRow = {"type":"tr"};
    reportNotesRow.columns = [gmpPackingGlassBrittleReportNotes(data.notes, 6)];

    body.rows.push(reportNotesRow);

    return body;
}

function gmpPackingGlassBrittleReportAreaName(name, rowspan){
    var areaName = {"type":"td","classes":"areaColumn","rowspan":rowspan,"contents":name};

    return areaName;
}

// Area time. It will have a rowspan equal to the number of items + the
// number of types

function gmpPackingGlassBrittleReportAreaTime(time, rowspan){
    var areaTime = {"type":"td","classes":"timeColumn","rowspan":rowspan,"contents":time};

    return areaTime;
}

function gmpPackingGlassBrittleReportItem(itemData){
    var item = new Array();

    item.push({"type":"td","classes":"numberColumn","contents":itemData.order});
    item.push({"type":"td","classes":"descriptionColumn","contents":itemData.name});
    item.push({"type":"td","classes":"inventoryColumn","contents":itemData.quantity});
    if(itemData.status){
        item.push({"type":"td","classes":"statusColumn acceptable_tag"});
    } else {
        item.push({"type":"td","classes":"statusColumn unacceptable_tag"});
    }

    return item;
}

function gmpPackingGlassBrittleReportNotes(notes, colspan){
    var reportNotes = {"type":"td","classes":"fullColumn","colspan":colspan,"contents":"<span class='report_notes_title'></span>: " + notes};

    return reportNotes;
}

function getCSS(){
    return '<style>table {font-family: arial, sans-serif;border-collapse: collapse;width: 100%;}td {border: 1px solid #000000;text-align: left;}th {border: 1px solid #000000;text-align: left;font-weight: bold;background-color: #4CAF50;}.fullColumn {background-color: #D3D3D3;width: 631px;}.descriptionColumn {width: 346px;}.numberColumn {width: 30px;}.timeColumn {width: 40px;}.areaColumn {width: 90px;}.statusColumn {width: 85px;}.inventoryColumn {width: 40px;}</style>';
}
