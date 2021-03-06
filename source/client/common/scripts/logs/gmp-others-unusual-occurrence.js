function loadLogForm(htmlElement){
    $server.request({
        service: 'log-gmp-others-unusual-occurrence',
        success: function(response) {
            if (response.meta.return_code == 0) {
                var item = new Object();
                var report = response.data;
                var header = {"rows":[{"columns":[{"styleClasses":"col s12 m12 l12", "columnText":report.log_name, "id":"log_name"}]},{"columns":[{"styleClasses":"col s4 m4 l4","textClasses":"zone_name","columnText":report.zone_name},{"styleClasses":"col s4 m4 l4","textClasses":"program_name","columnText":report.program_name},{"styleClasses":"col s4 m4 l4","textClasses":"module_name","columnText":report.module_name}]},{"columns":[{"styleClasses":"col s6 m6 l6","textClasses":"date_name","columnText":getISODate(new Date())},{"styleClasses":"col s6 m6 l6","textClasses":"made_by","columnText":localStorage.first_name + " " + localStorage.last_name}]}]};
                $(htmlElement).append(logHeader(header));
                item.id = 1;
                item.production_areas = report.items.areas;
                item.product_codes = report.items.products;
                item.shifts = report.items.shifts;
                gmpPackingUnusualOccurrenceLog(item, htmlElement, false);
                $("#send_report").click(function(){
                    $(this).attr("disabled", true);
                    if($(this).data("waiting") === false){
                        $(this).data("waiting", true);
                        $("#sending_log").show();
                        sendGmpPackingFinishedProductReport();
                    }
                    
                });
                $('.timepicker').pickatime({
                    autoclose: false,
                    vibrate: true,
                    twelvehour: false,
                    afterDone: function(Element, Time) {
                        
                    }
                });
                gmpPackingFinishedProductFunctionality();
                $("input").characterCounter();
                $("textarea").characterCounter();
                dateActivator();
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
        service: 'authorization-report-gmp-others-unusual-occurrence',
        data: data,
        success: function(response) {
            if (response.meta.return_code == 0) {
                changesFlag = false;
                $(htmlElement).html("");
                var item = new Object();
                var report = response.data;
                var header = {"rows":[{"columns":[{"styleClasses":"col s12 m12 l12", "columnText":report.log_name}]},{"columns":[{"styleClasses":"col s4 m4 l4","textClasses":"zone_name","columnText":report.zone_name},{"styleClasses":"col s4 m4 l4","textClasses":"program_name","columnText":report.program_name},{"styleClasses":"col s4 m4 l4","textClasses":"module_name","columnText":report.module_name}]},{"columns":[{"styleClasses":"col s6 m6 l6","textClasses":"date_name","columnText":report.creation_date},{"styleClasses":"col s6 m6 l6","textClasses":"made_by","columnText":report.created_by}]}]};
                $(htmlElement).append(logHeader(header));
                item.id = 1;
                /*item.production_areas = report.items.areas;
                item.product_codes = report.items.products;*/
                item.shifts = report.items.shifts;
                item.entry = report.items.entry;
                gmpPackingUnusualOccurrenceLog(item, htmlElement, true);
                bindChangeListener();
                loadFunctionality({"isPrefilled":true});
                $("#send_report").click(function(){
                    $(this).attr("disabled", true);
                    $("#sending_log").show();
                    updateGmpPackingFinishedProductReport(parseInt(data.report_id));
                });
                $('.timepicker').pickatime({
                    autoclose: false,
                    vibrate: true,
                    twelvehour: false,
                    afterDone: function(Element, Time) {
                        
                    }
                });
                bindAuthorizationButtonsFunctionality(htmlElement, data.report_id);
                $("input").characterCounter();
                $("textarea").characterCounter();
                dateActivator();
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
    gmpPackingFinishedProductFunctionality(data);
}

// Wrapper for showing a HTML report. For convenience's sake, this name will
// be shared among all log types

function loadReport(data){
    return gmpPackingFinishedProductReport(data);
    //return;
}

function additionalLoadReportControls(htmlDocument, data){
    return;
}

function sendEmail(data){
    $server.request({
        service: 'send-report-gmp-others-unusual-occurrence',
        data: data,
        success: function(response) {
            if (response.meta.return_code == 0) {
                loadToast("email_report_success", 3500, "rounded");
            } else {
                Materialize.toast(response.meta.message, 3500, "rounded");
                throw response.meta.message;
            }
        }
    });
}

function logHasEmail(){
    return true;
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
    $('.incident_datepicker').each(function(index, element){
        var itemID = $(this).data("item_id");
        var dateObj = datePicker("incidentHidden_" + itemID, null, null);
        $(this).pickadate(dateObj);
    });
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

function sendGmpPackingFinishedProductReport(){
    var report = new Object();

    report.date = getISODate(new Date());
    //report.entries = [];

    if(validateLog()){
        $(".item-card").each(function(){
            var item = new Object();
            var itemID = $(this).data("id");
            console.log("ID: " + itemID);
            report.time = $("#time_" + itemID).val();
            report.incident_date = $("input[name='incidentHidden_" + itemID + "']").val();
            report.shift_id = parseInt($("#shift_" + itemID).val());
            report.area_id = $("#productionArea_" + itemID).val();
            report.product_id = $("#product_" + itemID).val();
            report.batch = $("#batch_" + itemID).val();
            report.description = $("#description_" + itemID).val();
            report.corrective_action = $("#action_" + itemID).val();
            report.album_url = $("#report_url").val();
        });

        $server.request({
            service: 'capture-gmp-others-unusual-occurrence',
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

function updateGmpPackingFinishedProductReport(reportID){
    var report = new Object();

    report.report_id = reportID;

    if(validateLog()){
        $(".item-card").each(function(){
            var item = new Object();
            var itemID = $(this).data("id");
            report.time = $("#time_" + itemID).val();
            report.incident_date = $("input[name='incidentHidden_" + itemID + "']").val();
            report.shift_id = parseInt($("#shift_" + itemID).val());
            report.area_id = $("#productionArea_" + itemID).val();
            report.product_id = $("#product_" + itemID).val();
            report.batch = $("#batch_" + itemID).val();
            report.description = $("#description_" + itemID).val();
            report.corrective_action = $("#action_" + itemID).val();
            report.album_url = $("#report_url").val();
        });

        $server.request({
            service: 'update-gmp-others-unusual-occurrence',
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

function gmpPackingUnusualOccurrenceLog(data, htmlElement, isPrefilled){
    var log = $("<div>");
    var itemsCard = $("<div>");
    var buttonRow = $("<div>");

    itemsCard.attr("id", "items-wrapper");

    itemsCard.append(gmpPackingUnusualOccurrenceItem(data));

    log.append(itemsCard);

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

function sendButton(){
    var button = {"type":"button","id":"send_report","icon":{"type":"icon","icon":"mdi-send","size":"mdi-18px", "text":{"type":"text","classes":"send_button"}},"align":"col s3 m3 l3","data":{"waiting":false}};

    return button;
}

function gmpPackingUnusualOccurrenceItem(item){
    var itemCard = $("<div>");
    var shiftRow = new Object();
    var productRow = new Object();
    var descriptionRow = new Object();
    var actionRow = new Object();
    var urlRow = new Object();

    shiftRow.columns = [gmpPackingUnusualOccurrenceItemShift(item), gmpPackingUnusualOccurrenceItemTime(item), gmpPackingUnusualOccurrenceItemDate(item)];
    productRow.columns = [gmpPackingUnusualOccurrenceItemProductionArea(item), gmpPackingUnusualOccurrenceItemProduct(item), gmpPackingUnusualOccurrenceItemBatch(item)];
    descriptionRow.columns = [gmpPackingUnusualOccurrenceItemDescription(item)];
    actionRow.columns = [gmpPackingUnusualOccurrenceItemAction(item)];
    urlRow.columns = [gmpPackingUnusualOccurrenceAlbumURL(item)];

    itemCard.append(createInputRow(shiftRow));
    itemCard.append(createInputRow(productRow));
    itemCard.append(createInputRow(descriptionRow));
    itemCard.append(createInputRow(actionRow));
    itemCard.append(createInputRow(urlRow));

    itemCard.addClass("card-panel white item-card");
    itemCard.attr("id", "item_" + item.id);
    itemCard.data("id", item.id);

    return itemCard;
}

function gmpPackingUnusualOccurrenceItemShift(item){
    var shifts = new Array();

    for(var shift of item.shifts){
        var tempOption = {"value":shift.shift_id,"text":shift.name,"data":{"item_id":item.id}};
        if(item.entry){
            if(item.entry.shift_id == shift.id){
                tempOption.selected = true;
            }
        }
        shifts.push(tempOption);
    }

    var selectLabel = {"type":"label","contents":{"type":"text","classes":"shift_title"}};
    var actionSelect =  {"type": "select", "id": "shift_" + item.id, "options": shifts,"data":{"item_id":item.id},"validations":{"type":"select","required":{"value":true,"toast":"gmp-packing-preop-item-corrective-action"},"wrapper":"supplierWrapper_" + item.id}};
    var actionSelectInput = {"id":"shiftWrapper_" + item.id,"classes":"input-field col s4 m4 l4","field":actionSelect,"label":selectLabel,"data":{"item_id":item.id}};

    return actionSelectInput;
}

function gmpPackingUnusualOccurrenceItemTime(item){
    console.log(item);
    var batchLabel = {"type":"label","classes":"active","contents":{"type":"text","classes":"time_title"},"for":"time_" + item.id};
    var batchInput = {"type":"time","id": "time_" + item.id, "classes": "timepicker validate", "fieldType":"text","validations":{"type":"text","max":{"value":80},"required":{"value":true}}};
    var batchFullInput = {"id":"batchWrapper","classes":"input-field col s4 m4 l4","field":batchInput,"label":batchLabel};

    if(item.entry){
        if(item.entry.time){
            batchInput.value = item.entry.time;
            batchLabel.classes = "active";
        }
    }

    return batchFullInput;
}

function gmpPackingUnusualOccurrenceItemDate(item){
    var incidentLabel = {"type":"label","classes":"active","contents":{"type":"text","classes":"incident_date"},"for":"incident_" + item.id};
    var incidentInput = {"type":"date","id": "incident_" + item.id, "classes":"incident_datepicker validate", "fieldType":"text","validations":{"type":"text","max":{"value":80},"required":{"value":true}},"data":{"item_id":item.id}};
    var incidentFullInput = {"id":"incidentWrapper_" + item.id,"classes":"input-field col s4 m4 l4","field":incidentInput,"label":incidentLabel};

    if(item.entry){
        if(item.entry.incident_date){
            incidentInput.value = item.entry.incident_date;
            incidentLabel.classes = "active";
        }
    }

    return incidentFullInput;
}

function gmpPackingUnusualOccurrenceItemProductionArea(item){
    var productionAreaLabel = {"type":"label","contents":{"type":"text","classes":"production_area_title"}};
    var productionAreaInput = {"type":"input","id": "productionArea_" + item.id, "classes": "validate", "fieldType":"text","validations":{"type":"text","max":{"value":255},"required":{"value":true}}};
    var productionAreaFullInput = {"id":"productionAreaWrapper_","classes":"input-field col s4 m4 l4","field":productionAreaInput,"label":productionAreaLabel};

    if(item.entry){
        if(item.entry.area){
            productionAreaInput.value = item.entry.area;
            productionAreaLabel.classes = "active";
        }
    }

    return productionAreaFullInput;
}

function gmpPackingUnusualOccurrenceItemProduct(item){
    var productLabel = {"type":"label","contents":{"type":"text","classes":"products"}};
    var productInput = {"type":"input","id": "product_" + item.id, "classes": "validate", "fieldType":"text","validations":{"type":"text","max":{"value":255},"required":{"value":true}}};
    var productFullInput = {"id":"productWrapper_","classes":"input-field col s4 m4 l4","field":productInput,"label":productLabel};

    if(item.entry){
        if(item.entry.product_name){
            productInput.value = item.entry.product_name;
            productLabel.classes = "active";
        }
    }

    return productFullInput;
}

// Uncomment when we start using the Production Area Table

/*function gmpPackingUnusualOccurrenceItemProductionArea(item){
    var areas = new Array();

    for(var area of item.production_areas){
        var tempOption = {"value":area.id,"text":area.name,"data":{"item_id":item.id}};
        if(item.area_id == area.id){
            tempOption.selected = true;
        }
        areas.push(tempOption);
    }

    var selectLabel = {"type":"label","contents":{"type":"text","classes":"production_area_title"}};
    var actionSelect =  {"type": "select", "id": "productionArea_" + item.id,"options": areas,"data":{"item_id":item.id},"validations":{"type":"select","required":{"value":true,"toast":"gmp-packing-preop-item-corrective-action"},"wrapper":"productionAreaWrapper_" + item.id}};
    var actionSelectInput = {"id":"productionAreaWrapper_" + item.id,"classes":"input-field col s4 m4 l4","field":actionSelect,"label":selectLabel,"data":{"item_id":item.id}};

    return actionSelectInput;
}*/

// Uncomment when we start using the Production Area Table

/*function gmpPackingUnusualOccurrenceItemProduct(item){
    var products = new Array();

    for(var product of item.product_codes){
        var tempOption = {"value":product.id,"text":product.code + ", " + product.name,"data":{"item_id":item.id}};
        if(item.product_id == product.id){
            tempOption.selected = true;
        }
        products.push(tempOption);
    }

    var selectLabel = {"type":"label","contents":{"type":"text","classes":"products"}};
    var actionSelect =  {"type": "select", "id": "product_" + item.id, "options": products,"data":{"item_id":item.id},"validations":{"type":"select","required":{"value":true,"toast":"gmp-packing-preop-item-corrective-action"},"wrapper":"productWrapper_" + item.id}};
    var actionSelectInput = {"id":"productWrapper_" + item.id,"classes":"input-field col s8 m8 l8","field":actionSelect,"label":selectLabel,"data":{"item_id":item.id}};

    return actionSelectInput;
}*/

function gmpPackingUnusualOccurrenceItemBatch(item){
    var batchLabel = {"type":"label","contents":{"type":"text","classes":"batch_title"}};
    var batchInput = {"type":"input","id": "batch_" + item.id, "classes": "validate", "fieldType":"text","validations":{"type":"text","max":{"value":255},"required":{"value":true}}};
    var batchFullInput = {"id":"batchWrapper","classes":"input-field col s4 m4 l4","field":batchInput,"label":batchLabel};

    if(item.entry){
        if(item.entry.batch){
            batchInput.value = item.entry.batch;
            batchLabel.classes = "active";
        }
    }

    return batchFullInput;
}

function gmpPackingUnusualOccurrenceItemDescription(item){
    var descriptionLabel = {"type":"label","contents":{"type":"text","classes":"description"},"for":"description_" + item.id};
    var descriptionInput = {"type":"textarea","id": "description_" + item.id, "classes": "validate", "fieldType":"text","data":{"id":item.id},"validations":{"type":"text","max":{"value":65535},"required":{"value":true}}};
    var descriptionFullInput = {"id":"descriptionWrapper_" + item.id,"classes":"input-field col s12 m12 l12","field":descriptionInput,"label":descriptionLabel};

    if(item.entry){
        if(item.entry.description){
            descriptionInput.value = item.entry.description;
            descriptionLabel.classes = "active";
        }
    }

    return descriptionFullInput;
}

function gmpPackingUnusualOccurrenceItemAction(item){
    var actionLabel = {"type":"label","contents":{"type":"text","classes":"action_title"},"for":"action_" + item.id};
    var actionInput = {"type":"textarea","id": "action_" + item.id, "classes": "validate", "fieldType":"text","data":{"id":item.id},"validations":{"type":"text","max":{"value":65535},"required":{"value":true}}};
    var actionFullInput = {"id":"actionWrapper_" + item.id,"classes":"input-field col s12 m12 l12","field":actionInput,"label":actionLabel};

    if(item.entry){
        if(item.entry.corrective_action){
            actionInput.value = item.entry.corrective_action;
            actionLabel.classes = "active";
        }
    }

    return actionFullInput;
}

function gmpPackingUnusualOccurrenceAlbumURL(item){
    var urlLabel = {"type":"label","contents":{"type":"text","classes":"url_title"}};
    var urlInput = {"type":"textarea","id": "report_url", "classes": "validate", "fieldType":"text","validations":{"type":"text","max":{"value":65535,"toast":"gmp-packing-preop-report-url"},"required":{"value":true}}};
    var urlFullInput = {"id":"reportUrlWrapper","classes":"input-field col s12 m12 l12","field":urlInput,"label":urlLabel};

    if(item.entry){
        if(item.entry.album_url){
            urlInput.value = item.entry.album_url;
            urlLabel.classes = "active";
        }
    }

    return urlFullInput;
}

function gmpPackingFinishedProductFunctionality(data){
    console.log("Cargando funcionalidad");

    $(".test_button").on("click", function(e){
        console.log($(this).data());
        var lastTest = $(this).data("last_test");
        var newItem = $(this).data("item_data");
        newItem.id = lastTest + 1;
        $("#items-wrapper").append(gmpPackingFinishedProductItem(newItem));
        $(this).data("last_test", lastTest + 1);
        $("#del_area_test_1").data("last_test", lastTest + 1);
        if($("#del_area_test_1").hasClass("grey")){
            $("#del_area_test_1").removeClass("grey");
            $("#del_area_test_1").addClass("red");
        }
        changeLanguage();
    });

    $(".delete_button").on("click", function(e){
        var lastTest = $(this).data("last_test");
        if(lastTest > 1){
            $("#item_" + lastTest).remove();
            $(this).data("last_test", lastTest - 1);
            $("#add_area_test_1").data("last_test", lastTest - 1);
            changeLanguage();
        }
        if(lastTest - 1 == 1){
            $(this).removeClass("red");
            $(this).addClass("grey");
        }
    });
}

// Full report

function gmpPackingFinishedProductReport(data){
    var report = new Object();

    report.type = "table";
    report.classes = "bordered highlight";
    report.id = "report_" + data.report_id;

    report.tbody = gmpPackingUnusualOccurrenceBody(data);
    
    console.log(JSON.stringify(report));
    console.log(report);

    return report;
}

// Body

function gmpPackingUnusualOccurrenceBody(data){
    var form = {"type":"tbody"};
    var shiftRow = {"type":"tr"};
    var productRow = {"type":"tr"};
    var descriptionRow = {"type":"tr"};
    var actionRow = {"type":"tr"};
    var urlRow = {"type":"tr"};

    form.rows = [];

    console.log(data);

    shiftRow.columns = [gmpPackingUnusualOccurrenceReportShift(data), gmpPackingUnusualOccurrenceReportTime(data), gmpPackingUnusualOccurrenceReportProductionArea(data)];
    productRow.columns = [gmpPackingUnusualOccurrenceReportProduct(data), gmpPackingUnusualOccurrenceReportBatch(data)];
    descriptionRow.columns = [gmpPackingUnusualOccurrenceReportDescription(data)];
    actionRow.columns = [gmpPackingUnusualOccurrenceReportAction(data)];
    urlRow.columns = [gmpPackingUnusualOccurrenceReportAlbumURL(data)];

    console.log("TERMINO EL CUERPO");

    form.rows.push(shiftRow);
    form.rows.push(productRow);
    form.rows.push(descriptionRow);
    form.rows.push(actionRow);
    form.rows.push(urlRow);

    return form;
}

function gmpPackingUnusualOccurrenceReportShift(item){
    return {"type":"td","classes":"shiftColumn","contents":"<span class='shift_title'></span>: " + item.entry[0].shift};
}

function gmpPackingUnusualOccurrenceReportTime(item){
    return {"type":"td","classes":"timeColumn","contents":"<span class='time_title'></span>: " + item.entry[0].time};
}

function gmpPackingUnusualOccurrenceReportProductionArea(item){
    return {"type":"td","classes":"areaColumn","contents":"<span class='production_area_title'></span>: " + item.entry[0].area};
}

function gmpPackingUnusualOccurrenceReportProduct(item){
    return {"type":"td","classes":"productColumn","colspan":2,"contents":"<span class='products'></span>: " + item.entry[0].product_code + ", " + item.entry[0].product_name};
}

function gmpPackingUnusualOccurrenceReportBatch(item){
    return {"type":"td","classes":"batchColumn","contents":"<span class='batch_title'></span>: " + item.entry[0].batch};
}

function gmpPackingUnusualOccurrenceReportDescription(item){
    return {"type":"td","classes":"fullColumn","colspan":3,"contents":"<span class='description'></span>: " + item.entry[0].description};
}

function gmpPackingUnusualOccurrenceReportAction(item){
    return {"type":"td","classes":"fullColumn","colspan":3,"contents":"<span class='action_title'></span>: " + item.entry[0].corrective_action};
}

function gmpPackingUnusualOccurrenceReportAlbumURL(item){
    return {"type":"td","classes":"fullColumn","colspan":3,"contents":"<span class='url_title'></span>: <a href='" + item.entry[0].album_url + "' >" + item.entry[0].album_url + "</a>"};
}

function getCSS(){
    return '<style>table { font-family: arial, sans-serif; border-collapse: collapse; width: 100%; } td { border: 1px solid #000000; text-align: left; } th { border: 1px solid #000000; text-align: left; font-weight: bold; background-color: #4CAF50; } .fullColumn { width: 631px; } .shiftColumn { width: 211px; } .areaColumn { width: 210px; } .timeColumn { width: 210px; } .productColumn { width: 316px; } .batchColumn { width: 315px; }</style>';
}
