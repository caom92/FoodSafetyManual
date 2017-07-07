// Wrapper for loading a Log Form. For convenience's sake, this name will
// be shared among all log types

function loadLogForm(htmlElement){
    $server.request({
        service: 'log-gmp-packing-hand-washing',
        success: function(response) {
            if (response.meta.return_code == 0) {
                var report = response.data;
                var header = {"rows":[{"columns":[{"styleClasses":"col s12 m12 l12", "columnText":report.log_name, "id":"log_name"}]},{"columns":[{"styleClasses":"col s4 m4 l4","textClasses":"zone_name","columnText":report.zone_name},{"styleClasses":"col s4 m4 l4","textClasses":"program_name","columnText":report.program_name},{"styleClasses":"col s4 m4 l4","textClasses":"module_name","columnText":report.module_name}]},{"columns":[{"styleClasses":"col s6 m6 l6","textClasses":"date_name","columnText":getISODate(new Date())},{"styleClasses":"col s6 m6 l6","textClasses":"made_by","columnText":localStorage.first_name + " " + localStorage.last_name}]}]};
                $(htmlElement).append(logHeader(header));
                gmpPackingHandWashingLog(report, htmlElement);
                loadFunctionality({"isPrefilled":false});
                changeLanguage();
                $("#send_report").click(function(){
                    $(this).attr("disabled", true);
                    sendGmpPackingHandWashingReport();
                });
                $('.log_title').html($("#log_name").text());
                changeLanguage();
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
        service: 'authorization-report-gmp-packing-hand-washing',
        data: data,
        success: function(response) {
            if (response.meta.return_code == 0) {
                $(htmlElement).html("");
                var report = response.data;
                var header = {"rows":[{"columns":[{"styleClasses":"col s12 m12 l12", "columnText":report.log_name, "id":"log_name"}]},{"columns":[{"styleClasses":"col s4 m4 l4","textClasses":"zone_name","columnText":report.zone_name},{"styleClasses":"col s4 m4 l4","textClasses":"program_name","columnText":report.program_name},{"styleClasses":"col s4 m4 l4","textClasses":"module_name","columnText":report.module_name}]},{"columns":[{"styleClasses":"col s6 m6 l6","textClasses":"date_name","columnText":getISODate(new Date())},{"styleClasses":"col s6 m6 l6","textClasses":"made_by","columnText":localStorage.first_name + " " + localStorage.last_name}]}]};
                $(htmlElement).append(logHeader(header));
                gmpPackingHandWashingLog(report, htmlElement);
                loadFunctionality({"isPrefilled":true});
                $("#send_report").click(function(){
                    updateGmpPackingHandWashingReport(parseInt(data.report_id));
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

function loadFunctionality(data){
    return;
}

// Wrapper for showing a HTML report. For convenience's sake, this name will
// be shared among all log types

function loadReport(data){
    return gmpPackingHandWashingReport(data);
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

/******************************************************************************
A collection of functions to display the Log Form. This will be related to the
name of the log, located in the name_suffix field on the database. Usually, we
are going to divide them into full log, area log and individual item log.
******************************************************************************/

function sendGmpPackingHandWashingReport(){
    var report = new Object();

    report.date = getISODate(new Date());
    report.notes = $("#report_comment").val();
    report.items = new Array();

    if(validateLog()){
        $(".item-card").each(function(){
            console.log("Entered group card");
            var item = new Object();
            var itemID = $(this).data("id");
            item.id = itemID;
            if($("input[id='approved_" + itemID + "']:checked").length == 1){
                item.is_acceptable = true;
            } else {
                item.is_acceptable = false;
            }
            report.items.push(item);
        });

        console.log(report);

        $server.request({
            service: 'capture-gmp-packing-hand-washing',
            data: report,
            success: function(response){
                if (response.meta.return_code == 0) {
                    Materialize.toast("Reporte enviado con exito", 3000, "rounded");
                    clearLog();
                } else {
                    Materialize.toast(response.meta.message, 3000, "rounded");
                }
                $("#send_report").removeAttr("disabled");
            }
        });
    } else {
        $("#send_report").removeAttr("disabled");
    }
}

function updateGmpPackingHandWashingReport(reportID){
    var report = new Object();

    report.report_id = reportID;
    report.notes = $("#report_comment").val();
    report.items = new Array();

    if(validateLog()){
        $(".item-card").each(function(){
            var item = new Object();
            var itemID = $(this).data("id");
            item.id = itemID;
            if($("input[id='approved_" + itemID + "']:checked").length == 1){
                item.is_acceptable = true;
            } else {
                item.is_acceptable = false;
            }
            report.items.push(item);
        });

        console.log(report);

        $server.request({
            service: 'update-gmp-packing-hand-washing',
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

function gmpPackingHandWashingLog(data, htmlElement){
    var log = $("<div>");
    var itemsCard = $("<div>");
    var additionalData = $("<div>");

    for(var item of data.items){
        itemsCard.append(gmpPackingHandWashingItem(item));
    }

    itemsCard.addClass("card-panel white");
    additionalData.addClass("card-panel white");

    additionalData.append(createText({"type":"text","classes":"report_additional_info"}));
    additionalData.append(createInputRow({"columns":[gmpPackingHandWashingComment(data.notes)]}));

    log.append(itemsCard);
    log.append(additionalData);
    log.append($("<div class='row'>").append(createButton(gmpPackingHandWashingSendButton())));

    $(htmlElement).append(log);
}

function gmpPackingHandWashingComment(reportComment){
    var commentLabel = {"type":"label","contents":{"type":"text","classes":"comment_title"}};
    var commentInput = {"type":"textarea","id": "report_comment", "classes": "validate", "fieldType":"text","validations":{"type":"text","max":{"value":65535}}};
    var commentFullInput = {"id":"reportCommentWrapper","classes":"input-field col s12 m12 l12","field":commentInput,"label":commentLabel};

    if(reportComment){
        commentInput.value = reportComment;
        commentLabel.classes = "active";
    }

    return commentFullInput;
}

function gmpPackingHandWashingSendButton(){
    var button = {"type":"button","id":"send_report","icon":{"type":"icon","icon":"mdi-send","size":"mdi-18px", "text":{"type":"text","classes":"send_button"}}};

    return button;
}

function gmpPackingHandWashingItem(item){
    var itemCard = $("<div>");
    var row = new Object();

    row.columns = [gmpPackingHandWashingTitle(item), gmpPackingHandWashingInspection(item)];

    itemCard.append(createInputRow(row).attr("style", "margin-top:15px;"));

    itemCard.addClass("item-card");
    itemCard.data("id", item.id);
    itemCard.append($("<div class='divider'>"));

    return itemCard;
}

function gmpPackingHandWashingTitle(item){
    var itemTitle = {"type":"text","id":"title_" + item.id,"classes":"", "text":item.name};
    var titleInput = {"id":"titleWrapper_" + item.id,"classes":"card-title col s10 m10 l10","field": itemTitle};

    return titleInput;
}

function gmpPackingHandWashingInspection(item){
    var checkboxLabel = {"type":"label","contents":{"type":"text","classes":"approved_tag"},"for":"approved_" + item.id};
    var checkboxField = {"type":"checkbox", "id":"approved_" + item.id,"classes":"filled-in timeChanger", "data":{"group_id":item.id}};
    var checkboxFullInput = {"field":checkboxField, "label":checkboxLabel,"classes":"col s2 m2 l2"};

    if(item.is_acceptable == 1){
        checkboxField.checked = true;
    }

    return checkboxFullInput;
}

// Full report

function gmpPackingHandWashingReport(data){
    var report = new Object();

    report.type = "table";
    report.classes = "bordered highlight";
    report.id = "report_" + data.report_id;

    report.thead = gmpPackingHandWashingReportHeader();
    report.tbody = gmpPackingHandWashingReportBody(data);

    return report;
}

// Header containing Area, Time, Number, Name, Conditions, Corrective Actions
// and Comment. This header contain the classes to borrow the text from
// languages.xml, not strings

function gmpPackingHandWashingReportHeader(){
    var header = {"type":"thead","rows":[{"type":"tr","columns":[{"type":"th","classes":"description groupColumn"},{"type":"th","classes":"approved_title approvedColumn"}]}]};

    return header;
}

// Body containing all the information, except for the report notes and album
// URL

function gmpPackingHandWashingReportBody(data){
    var body = {"type":"tbody"};

    body.rows = new Array();

    for(var item of data.items){
        var row = {"type":"tr"};
        row.columns = gmpPackingHandWashingReportItem(item)
        body.rows.push(row);
    }

    var reportNotesRow = new Object();

    reportNotesRow.columns = [gmpPackingHandWashingReportNotes(data.notes, 2)];

    body.rows.push(reportNotesRow);

    console.log(body);

    return body;
}

// A row with seven 'td' elements, including the number, name, status,
// corrective action text and comment

function gmpPackingHandWashingReportItem(itemData){
    var item = new Array();

    item.push({"type":"td","classes":"groupColumn","contents":itemData.name});

    if(itemData.is_acceptable == 1){
        item.push({"type":"td","classes":"approvedColumn yes_tag"});
    } else {
        item.push({"type":"td","classes":"approvedColumn no_tag"});
    }

    return item;
}

// Notes for the report. They will go in the footer. Colspan equal to the
// number of columns

function gmpPackingHandWashingReportNotes(notes, colspan){
    var reportNotes = {"type":"td","classes":"fullColumn","colspan":colspan,"contents":"<span class='report_notes_title'></span>: " + notes};

    return reportNotes;
}

function getCSS(){
    return '<style> table { font-family: arial, sans-serif; border-collapse: collapse; width: 100%; } td { border: 1px solid #000000; text-align: left; } th { border: 1px solid #000000; text-align: left; font-weight: bold; background-color: #4CAF50; } .fullColumn { background-color: #D3D3D3; width: 631px; } .groupColumn { width: 531px; } .approvedColumn { width: 100px; }</style>';
}
