var incID = 0;

// DatePicker is common to all reports. It's used to select a range of dates
// to display in report form

// Wrapper for loading a Log Form. For convenience's sake, this name will
// be shared among all log types

function loadLogForm(htmlElement){
    $server.request({
        service: 'log-gmp-doc-control-doc-control',
        success: function(response) {
            if (response.meta.return_code == 0) {
                console.log(response);
                var report = response.data;
                var header = {"rows":[{"columns":[{"styleClasses":"col s12 m12 l12", "columnText":report.log_name, "id":"log_name"}]},{"columns":[{"styleClasses":"col s4 m4 l4","textClasses":"zone_name","columnText":report.zone_name},{"styleClasses":"col s4 m4 l4","textClasses":"program_name","columnText":report.program_name},{"styleClasses":"col s4 m4 l4","textClasses":"module_name","columnText":report.module_name}]},{"columns":[{"styleClasses":"col s6 m6 l6","textClasses":"date_name","columnText":getISODate(new Date())},{"styleClasses":"col s6 m6 l6","textClasses":"made_by","columnText":localStorage.first_name + " " + localStorage.last_name}]}]};
                $(htmlElement).append(logHeader(header));
                gmpPackingDocRegistryForm(report.documents, htmlElement, false);
                dateActivator();
                loadFunctionality({"isPrefilled":false});
                $("#send_report").click(function(){
                    $(this).attr("disabled", true);
                    if($(this).data("waiting") === false){
                        $(this).data("waiting", true);
                        $("#sending_log").show();
                        sendGmpPackingDocControlReport();
                    }
                });
                /*$('.log_title').html(report.log_name);
                $("input").characterCounter();
                $("textarea").characterCounter();
                $(htmlElement).append(report.html_footer);*/
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
        service: 'authorization-report-gmp-doc-control-doc-control',
        data: data,
        success: function(response) {
            if (response.meta.return_code == 0) {
                $(htmlElement).html("");
                var report = response.data;
                var header = {"rows":[{"columns":[{"styleClasses":"col s12 m12 l12", "columnText":report.log_name}]},{"columns":[{"styleClasses":"col s4 m4 l4","textClasses":"zone_name","columnText":report.zone_name},{"styleClasses":"col s4 m4 l4","textClasses":"program_name","columnText":report.program_name},{"styleClasses":"col s4 m4 l4","textClasses":"module_name","columnText":report.module_name}]},{"columns":[{"styleClasses":"col s6 m6 l6","textClasses":"date_name","columnText":report.creation_date},{"styleClasses":"col s6 m6 l6","textClasses":"made_by","columnText":report.created_by}]}]};
                $(htmlElement).append(logHeader(header));
                gmpPackingDocControlLog(report, htmlElement, true);
                loadFunctionality({"isPrefilled":true});
                $("#send_report").click(function(){
                    $(this).attr("disabled", true);
                    $("#sending_log").show();
                    updateGmpPackingDocControlReport(parseInt(data.report_id));
                });
                bindAuthorizationButtonsFunctionality(htmlElement, data.report_id);
                changeLanguage();
                $("input").characterCounter();
                $("textarea").characterCounter();
                $("textarea").trigger("autoresize");
                window.scrollTo(0, 0);
                $(htmlElement).fadeIn(500);
            } else {
                Materialize.toast(response.meta.message, 3000, "rounded");
                throw response.meta.message;
            }
        }
    });
}

function loadFunctionality(data){
    gmpPackingDocControlFunctionality(data);
}

// Wrapper for showing a HTML report. For convenience's sake, this name will
// be shared among all log types

function loadReport(data){
    return gmpPackingDocControlReport(data);
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

function dateActivator(){
    $(".datepicker").pickadate();;
}

/******************************************************************************
A collection of functions to display the Log Form. This will be related to the
name of the log, located in the name_suffix field on the database. Usually, we
are going to divide them into full log, area log and individual item log.
******************************************************************************/

function sendGmpPackingDocControlReport(){
    var report = new Object();

    report.user_id = localStorage.user_id;
    report.date = getISODate(new Date());
    report.notes = $("#report_comment").val();
    report.album_url = $("#report_url").val();
    report.areas = new Array();

    if(validateLog()){
        var formData = new FormData($('#document_registry_form')[0]);

        console.log(formData);

        $server.request({
            service: 'capture-gmp-doc-control-doc-control',
            data: formData,
            success: function(response){
                if (response.meta.return_code == 0) {
                    Materialize.toast("Reporte enviado con exito", 3000, "rounded");
                    //clearLog();
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

function updateGmpPackingDocControlReport(reportID){
    var report = new Object();

    report.report_id = reportID;
    report.notes = $("#report_comment").val();
    report.album_url = $("#report_url").val();
    report.areas = new Array();

    if(validateLog()){
        $(".area-card").each(function(){
            var area = new Object();
            var areaID = $(this).data("id");
            area.id = areaID;
            area.time = $("#time_" + areaID).val();
            area.notes = $("#notes_" + areaID).val();
            area.person_performing_sanitation = $("#sanitation_" + areaID).val();
            area.items = new Array();
            $(this).children(".item-card").each(function(){
                var item = new Object();
                var itemID = $(this).data("id");
                item.id = itemID;
                item.is_acceptable = getBool($("input:radio[name='radio_" + itemID + "']:checked").val());
                if(item.is_acceptable){
                    item.corrective_action_id = 1;
                    item.comment = "";
                } else {
                    item.corrective_action_id = parseInt($("#correctiveAction_" + itemID).val());
                    item.comment = $("#comment_" + itemID).val();
                }
                area.items.push(item);
            });
            report.areas.push(area);
        });

        $server.request({
            service: 'update-gmp-doc-control-doc-control',
            data: report,
            success: function(response){
                if (response.meta.return_code == 0) {
                    Materialize.toast("Reporte enviado con exito", 3000, "rounded");
                    $("#send_report").removeAttr("disabled");
                    $("#sending_log").hide();
                } else {
                    Materialize.toast(response.meta.message, 3000, "rounded");
                    $("#send_report").removeAttr("disabled");
                    $("#sending_log").hide();
                }
            }
        });
    } else {
        $("#send_report").removeAttr("disabled");
        $("#sending_log").hide();
    }
}

/***************************************************************************/

function gmpPackingDocRegistryForm(data, htmlElement, isPrefilled){
    var form = {"type":"form","id":"document_registry_form","method":"post","enctype":"multipart/form-data","name":"document_registry_form","form":{"sections":[]},"action":"tester.php"};
    var buttonRow = $("<div>");
    var controlsRow = $("<div>");

    controlsRow.addClass("card-panel white");

    $(controlsRow).append(createInputRow(gmpPackingAtpTestingAreaControls(data)));
    $(htmlElement).append(controlsRow);

    form.form.sections.push({"type":"section","rows":[{"type":"row","columns":[gmpPackingDocRegistryDate(getISODate(new Date()))]}]});

    /*var entryNumber = 0;
    for(var log of data){
        log.no = entryNumber++;
        console.log(log);
        form.form.sections.push(gmpPackingDocRegistryItem(log));
    }*/

    $(htmlElement).append(createForm(form));

    buttonRow.attr("id", "button_row");
    buttonRow.addClass("row");
    buttonRow.append(createButton(sendButton()));
    
    if(isPrefilled === true){
        buttonRow.append(createButton(approveButton()));
        buttonRow.append(createButton(rejectButton()));
        buttonRow.append(createButton(returnButton()));
    }

    $(htmlElement).append(buttonRow);

    return form;
}

function sendButton(){
    var button = {"type":"button","id":"send_report","icon":{"type":"icon","icon":"mdi-send","size":"mdi-18px", "text":{"type":"text","classes":"send_button"}},"align":"col s3 m3 l3","data":{"waiting":false}};

    return button;
}

function gmpPackingDocRegistryDate(date){
    var dataLabel = {"type":"label","contents":{"type":"text","classes":"date_name"}};
    var dataInput = {"type":"date","id":"report_date","name":"date","classes":"validate datepicker","fieldType":"text","validations":{"type":"text","max":{"value":65535}}};
    var dataFullInput = {"id":"reportDateWrapper","classes":"input-field col s12 m12 l12","field":dataInput,"label":dataLabel};

    if(date){
        dataInput.value = date;
        dataLabel.classes = "active";
    }

    return dataFullInput;
}

function gmpPackingDocRegistryItem(item, registerNumber){
    var documentItem = {"type":"section","classes":"card-panel white","rows":[]};
    var identityRow = {"type":"row","columns":[]};
    var dataRow = {"type":"row","columns":[]};
    var filesRow = {"type":"row","columns":[]};

    identityRow.columns = [gmpPackingDocRegistryHiddenID(item, registerNumber), gmpPackingDocRegistryTitle(item, registerNumber), gmpPackingDocRegistryItemDate(item, registerNumber), gmpPackingDocRegistryItemUser(item, registerNumber)];
    dataRow.columns = [gmpPackingDocRegistryItemData(item, registerNumber), gmpPackingDocRegistryItemUrl(item, registerNumber)];
    filesRow.columns = [gmpPackingDocRegistryItemFile(item, registerNumber)];

    documentItem.rows.push(identityRow);
    documentItem.rows.push(dataRow);
    documentItem.rows.push(filesRow);

    return documentItem;
}

function gmpPackingDocRegistryHiddenID(item, registerNumber){
    var idLabel = {"type":"label","contents":{"type":"text"}};
    var idInput = {"type":"text","id":"id_" + item.id,"name":"documents[" + item.no + "][id]","classes":"validate","fieldType":"text","validations":{"type":"text","max":{"value":65535}}};
    var idFullInput = {"id":"dateWrapper_" + item.id,"classes":"input-field col s12 m12 l12","field":idInput,"label":idLabel};

    if(item.id){
        idInput.value = item.id;
        idLabel.classes = "active";
    }

    return idFullInput;
}

function gmpPackingDocRegistryTitle(item, registerNumber){
    var logTitle = {"type":"text","id":"title_" + item.id,"classes":"blue-text", "text":item.name};
    var titleInput = {"id":"titleWrapper_" + item.id,"classes":"card-title col s12 m12 l12","field": logTitle};

    return titleInput;
}

function gmpPackingDocRegistryItemDate(item, registerNumber){
    var dataLabel = {"type":"label","contents":{"type":"text","classes":"date_name"}};
    var dataInput = {"type":"date","id":"data_" + item.id,"name":"documents[" + item.no + "][entries][" + registerNumber + "][date]","classes":"validate datepicker","fieldType":"text","validations":{"type":"text","max":{"value":65535}}};
    var dataFullInput = {"id":"dateWrapper_" + item.id,"classes":"input-field col s6 m6 l6","field":dataInput,"label":dataLabel};

    if(item.date){
        dataInput.value = item.date;
        dataLabel.classes = "active";
    }

    return dataFullInput;
}

function gmpPackingDocRegistryItemUser(item, registerNumber){
    var userLabel = {"type":"label","contents":{"type":"text","classes":"users_sidenav"}};
    var userInput = {"type":"input","id":"user_" + item.id,"name":"documents[" + item.no + "][entries][" + registerNumber + "][employee]","classes":"validate","fieldType":"text","validations":{"type":"text","max":{"value":65535}}};
    var userFullInput = {"id":"userWrapper_" + item.id,"classes":"input-field col s6 m6 l6","field":userInput,"label":userLabel};

    if(item.user){
        userInput.value = item.user;
        userLabel.classes = "active";
    }

    return userFullInput;
}

function gmpPackingDocRegistryItemData(item, registerNumber){
    var dataLabel = {"type":"label","contents":{"type":"text","classes":"notes_title"}};
    var dataInput = {"type":"textarea","id":"data_" + item.id,"name":"documents[" + item.no + "][entries][" + registerNumber + "][notes]","classes":"validate","fieldType":"text","validations":{"type":"text","max":{"value":65535}}};
    var dataFullInput = {"id":"dataWrapper_" + item.id,"classes":"input-field col s6 m6 l6","field":dataInput,"label":dataLabel};

    if(item.data){
        dataInput.value = item.data;
        dataLabel.classes = "active";
    }

    return dataFullInput;
}

function gmpPackingDocRegistryItemUrl(item, registerNumber){
    var urlLabel = {"type":"label","contents":{"type":"text","classes":"url_title"}};
    var urlInput = {"type":"textarea","id":"album_url_" + item.id,"name":"documents[" + item.no + "][entries][" + registerNumber + "][additional_info_url]","classes":"validate","fieldType":"text","validations":{"type":"text","max":{"value":65535}}};
    var urlFullInput = {"id":"urlWrapper_" + item.id,"classes":"input-field col s6 m6 l6","field":urlInput,"label":urlLabel};

    if(item.album_url){
        urlInput.value = item.album_url;
        urlLabel.classes = "active";
    }

    return urlFullInput;
}

function gmpPackingDocRegistryItemFile(item, registerNumber){
    var logoField = {"type":"file","id":"log_files_" + item.id,"classes":"select_logo_button","name":"documents[" + item.no + "][entries][" + registerNumber + "][pictures][]","multiple":true};
    var logoInput = {"id":"filesWrapper_" + item.id,"classes":"input-field col s12 m12 l12","field":logoField};

    return logoInput;
}

/***************************************************************************/

function gmpPackingAtpTestingAreaControls(data){
    var controlsRow = new Object();

    controlsRow.columns = [gmpPackingAtpTestingAreaControlsSelect(data), gmpPackingAtpTestingAreaControlsAddButton(data), gmpPackingAtpTestingAreaControlsDelButton(data)];

    return controlsRow;
}

function gmpPackingAtpTestingAreaControlsSelect(data){
    var logs = new Array();

    for(var log of data){
        var tempOption = {"value":JSON.stringify(log),"text":log.name,"data":log};
        logs.push(tempOption);
    }

    var selectLabel = {"type":"label","contents":{"type":"text","classes":"production_area_title"}};
    var actionSelect =  {"type":"select","id":"productionArea","options":logs,"wrapper":"productionAreaWrapper"};
    var actionSelectInput = {"id":"productionAreaWrapper","classes":"input-field col s10 m10 l10","field":actionSelect,"label":selectLabel};

    return actionSelectInput;
}

function gmpPackingAtpTestingAreaControlsAddButton(data){
    var areaAddInput = {"id":"addAreaButtonWrapper","classes":"input-field col s1 m1 l1"};
    var areaAddButton = {"type":"floating","id":"add_area","classes":"btn-floating waves-effect waves-light green right","data":{"last_test":1}};
    var areaAddIcon = {"type":"icon","icon":"mdi-plus","size":"mdi-24px"};
    areaAddButton.icon = areaAddIcon;
    areaAddInput.field = areaAddButton;

    return areaAddInput;
}  

function gmpPackingAtpTestingAreaControlsDelButton(data){
    var areaDelInput = {"id":"delAreaButtonWrapper","classes":"input-field col s1 m1 l1"};
    var areaDelButton = {"type":"floating","id":"del_area","classes":"btn-floating waves-effect waves-light grey","data":{"last_test":1}};
    var areaDelIcon = {"type":"icon","icon":"mdi-minus","size":"mdi-24px"};
    areaDelButton.icon = areaDelIcon;
    areaDelInput.field = areaDelButton;

    return areaDelInput;
}

/***************************************************************************/

function gmpPackingDocControlFunctionality(data){
    if(data.isPrefilled){
        $(".test_button").remove();
        $(".delete_button").remove();
    } else {
        $("#productionArea").on("change", function(e){
            if($(this).val() == "0"){
                $("#newAreaInput").prop('disabled', false);
            } else {
                $("#newAreaInput").prop('disabled', true);
            }
        });

        $("#add_area").on("click", function(e){
            var tempObject = JSON.parse($("#productionArea").val());
            tempObject.no = incID++;
            console.log(tempObject);
            $("#document_registry_form").append(formSection(gmpPackingDocRegistryItem(tempObject, 0)));
            $("option[value='" + $("#productionArea").val() + "']").prop("disabled", true);
            gmpPackingAtpTestingAddDelTestsFunctionality(data);
            dateActivator();
            changeLanguage();
            //loadToast("new-atp-area-add", 2500, "rounded", null, null, [$("#newAreaInput").val()]);
            /*if($("#productionArea").val() == "0"){
                $server.request({
                    service: 'add-gmp-packing-atp-testing',
                    data: {"name":$("#newAreaInput").val()},
                    success: function(response){
                        console.log(response);
                        if (response.meta.return_code == 0) {
                            Materialize.toast("Area añadida", 3000, "rounded");
                            $("#areas_wrapper").append(gmpPackingAtpTestingArea({"id":parseInt(response.data),"name":$("#newAreaInput").val()}));
                            $("#add_production_area_option").before($("<option>", {
                                value: parseInt(response.data),
                                text: $("#newAreaInput").val(),
                                disabled: true
                            }));
                            $("#newAreaInput").val("")
                            $('select').material_select('destroy');
                            $('select').material_select();
                            gmpPackingAtpTestingAddDelTestsFunctionality(data);
                            changeLanguage();
                        } else {
                            Materialize.toast(response.meta.message, 3000, "rounded");
                        }
                    }
                });
            } else {
                $("#areas_wrapper").append(gmpPackingAtpTestingArea(JSON.parse($("#productionArea").val())));
                $("option[value='" + $("#productionArea").val() + "']").prop("disabled", true);
                gmpPackingAtpTestingAddDelTestsFunctionality(data);
                changeLanguage();
            }*/
        });
    }
}

function gmpPackingAtpTestingAddDelTestsFunctionality(data){
    $(".test_button").off();
    $(".delete_button").off();

    $(".test_button").on("click", function(e){
        var areaID = $(this).data("area_id");
        var lastTest = $(this).data("last_test");
        $("#tests_wrapper_" + areaID).append(gmpPackingAtpTestingItem({"id":areaID}, lastTest + 1));
        $(this).data("last_test", lastTest + 1);
        $("#del_area_test_" + areaID).data("last_test", lastTest + 1);
        if($("#del_area_test_" + areaID).hasClass("grey")){
            $("#del_area_test_" + areaID).removeClass("grey");
            $("#del_area_test_" + areaID).addClass("red");
        }
        changeLanguage();
    });

    $(".delete_button").on("click", function(e){
        var areaID = $(this).data("area_id");
        var lastTest = $(this).data("last_test");
        if(lastTest > 1){
            $("#test_row_" + areaID + "_" + lastTest).remove();
            $(this).data("last_test", lastTest - 1);
            $("#add_area_test_" + areaID).data("last_test", lastTest - 1);
            changeLanguage();
        }
        if(lastTest - 1 == 1){
            $(this).removeClass("red");
            $(this).addClass("grey");
        }
    });
}


// Full report

function gmpPackingDocControlReport(data){
    var report = new Object();

    report.type = "table";
    report.classes = "bordered highlight";
    report.id = "report_" + data.report_id;

    report.thead = gmpPackingDocControlReportHeader();
    report.tbody = gmpPackingDocControlReportBody(data);
    report.tfoot = gmpPackingDocControlReportFooter(data);

    return report;
}

// Header containing Area, Time, Number, Name, Conditions, Corrective Actions
// and Comment. This header contain the classes to borrow the text from
// languages.xml, not strings

function gmpPackingDocControlReportHeader(){
    var header = {"type":"thead","rows":[{"type":"tr","columns":[{"type":"th","classes":"area_title areaColumn"},{"type":"th","classes":"time_title timeColumn"},{"type":"th","classes":"number_title numberColumn"},{"type":"th","classes":"name_title nameColumn"},{"type":"th","classes":"status_title statusColumn"},{"type":"th","classes":"action_title actionColumn"},{"type":"th","classes":"comment_title commentColumn"}]}]};

    return header;
}

// Body containing all the information, except for the report notes and album
// URL

function gmpPackingDocControlReportBody(data){
    var body = {"type":"tbody"};

    body.rows = new Array();

    for(var area of data.areas){
        var firstRowFlag = true;
        for(var type of area.types){
            var row = {"type":"tr"};
            row.columns = new Array();
            if(firstRowFlag){
                var rowspan = area.types.length;
                for(var count of area.types){
                    rowspan += count.items.length;
                }
                row.columns.push(gmpPackingDocControlReportAreaName(area.name, rowspan));
                row.columns.push(gmpPackingDocControlReportAreaTime(area.time, rowspan));
                row.columns.push(gmpPackingDocControlReportTypeTitle(type.name, 5));
                firstRowFlag = false;
            } else {
                row.columns.push(gmpPackingDocControlReportTypeTitle(type.name, 5));
            }
            body.rows.push(row);
            for(var item of type.items){
                var itemRow = {"type":"tr"};
                itemRow.columns = gmpPackingDocControlReportItem(item);
                body.rows.push(itemRow);
            }
        }
        var notesRow = {"type":"tr"};
        var sanitationRow = {"type":"tr"};
        notesRow.columns = [gmpPackingDocControlReportAreaNotes(area.notes, 7)];
        sanitationRow.columns = [gmpPackingDocControlReportAreaSanitation(area.person_performing_sanitation, 7)];
        body.rows.push(notesRow);
        body.rows.push(sanitationRow);
    }

    var reportNotesRow = {"type":"tr"};
    var reportAlbumURL = {"type":"tr"};
    reportNotesRow.columns = [gmpPackingDocControlReportNotes(data.notes, 7)];
    reportAlbumURL.columns = [gmpPackingDocControlReportAlbumURL(data.album_url, 7)];

    body.rows.push(reportNotesRow);
    body.rows.push(reportAlbumURL);

    return body;
}

// Type title, colspan 5
// Example: Food Contact - Daily and Non Food Contact - Daily

function gmpPackingDocControlReportTypeTitle(title, colspan){
    var typeTitle = {"type":"td","classes":"typeTitle","colspan":colspan,"contents":title};

    return typeTitle;
}

// A row with five 'td' elements, including the number, name, status,
// corrective action text and comment

function gmpPackingDocControlReportItem(itemData){
    var item = new Array();

    item.push({"type":"td","classes":"numberColumn","contents":itemData.order});
    item.push({"type":"td","classes":"nameColumn","contents":itemData.name});
    if(itemData.status){
        item.push({"type":"td","classes":"statusColumn acceptable_tag"});
    } else {
        item.push({"type":"td","classes":"statusColumn unacceptable_tag"});
    }    
    item.push({"type":"td","classes":"actionColumn","contents":itemData.corrective_action});
    item.push({"type":"td","classes":"commentColumn","contents":itemData.comment});

    return item;
}

// Area name. It will have a rowspan equal to the number of items + the
// number of types

function gmpPackingDocControlReportAreaName(name, rowspan){
    var areaName = {"type":"td","classes":"areaColumn","rowspan":rowspan,"contents":name};

    return areaName;
}

// Area time. It will have a rowspan equal to the number of items + the
// number of types

function gmpPackingDocControlReportAreaTime(time, rowspan){
    var areaTime = {"type":"td","classes":"timeColumn","rowspan":rowspan,"contents":time};

    return areaTime;
}

// Area notes. It will have a colspan equal to the number of columns

function gmpPackingDocControlReportAreaNotes(notes, colspan){
    var areaNotes = {"type":"td","classes":"fullColumn","colspan":colspan,"contents":"<span class='notes_title'></span>: " + notes};

    return areaNotes;
}

// Area sanitation. It will have a colspan equal to the number of columns

function gmpPackingDocControlReportAreaSanitation(sanitation, colspan){
    var areaSanitation = {"type":"td","classes":"fullColumn","colspan":colspan,"contents":"<span class='person_performing_sanitation_title'></span>: " + sanitation};

    return areaSanitation;
}

// Footer

function gmpPackingDocControlReportFooter(data){

}

// Notes for the report. They will go in the footer. Colspan equal to the
// number of columns

function gmpPackingDocControlReportNotes(notes, colspan){
    var reportNotes = {"type":"td","classes":"fullColumn","colspan":colspan,"contents":"<span class='report_notes_title'></span>: " + notes};

    return reportNotes;
}

// Album URL. It will go in the footer. Colspan equal to the
// number of columns

function gmpPackingDocControlReportAlbumURL(albumURL, colspan){
    var reportURL = {"type":"td","classes":"fullColumn","colspan":colspan,"contents":"<span class='url_title'></span>: <a href='" + albumURL + "' >" + albumURL + "</a>"};

    return reportURL;
}

function getCSS(){
    return '<style>table { font-family: arial, sans-serif; border-collapse: collapse; width: 100%;}td { border: 1px solid #000000; text-align: left;}th { border: 1px solid #000000; text-align: left; font-weight: bold; background-color: #4CAF50;}.even { background-color: #b8e0b9;}.verticaltext{ writing-mode:tb-rl; transform: rotate(90deg); white-space:nowrap; word-break:break-word; bottom:0;}.typeTitle{ background-color: yellow; width:501px;}.fullColumn{ background-color: #D3D3D3;width:631px;}.nameColumn{ width:116px;}.numberColumn{ width:30px;}.timeColumn{ width:40px;}.areaColumn{ width:90px;}.statusColumn{ width:85px;}.actionColumn{ width:70px;}.commentColumn{ width:200px;}</style>';
}