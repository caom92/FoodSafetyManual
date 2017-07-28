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
                changesFlag = false;
                $(htmlElement).html("");
                var report = response.data;
                var header = {"rows":[{"columns":[{"styleClasses":"col s12 m12 l12", "columnText":report.log_name}]},{"columns":[{"styleClasses":"col s4 m4 l4","textClasses":"zone_name","columnText":report.zone_name},{"styleClasses":"col s4 m4 l4","textClasses":"program_name","columnText":report.program_name},{"styleClasses":"col s4 m4 l4","textClasses":"module_name","columnText":report.module_name}]},{"columns":[{"styleClasses":"col s6 m6 l6","textClasses":"date_name","columnText":report.creation_date},{"styleClasses":"col s6 m6 l6","textClasses":"made_by","columnText":report.created_by}]}]};
                $(htmlElement).append(logHeader(header));
                gmpPackingDocRegistryForm(report.documents, htmlElement, true);
                bindChangeListener();
                dateActivator();
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
    gmpPackingDocControlFunctionality(data);
}

// Wrapper for showing a HTML report. For convenience's sake, this name will
// be shared among all log types

function loadReport(data){
    return gmpPackingDocControlReport(data);
}

function additionalLoadReportControls(htmlDocument, data){
    console.log("additionalLoadReportControls");
    $server.request({
        service: 'log-gmp-doc-control-doc-control',
        success: function(response){
            console.log(response.data.documents);
            var documentList = createDocumentSelect(response.data.documents);
            console.log(documentList);
            console.log(createField(documentList));
            $(htmlDocument).append(createInput(documentList));
            $("select").material_select();
            changeLanguage();
        }
    });
}

function createDocumentSelect(data){
    var logs = new Array();

    logs.push({"classes":"any_document"});

    for(var log of data){
        var tempOption = {"value":log.id,"text":log.name,"data":log};
        logs.push(tempOption);
    }

    var selectLabel = {"type":"label","contents":{"type":"text","classes":"production_area_title"}};
    var actionSelect =  {"type":"select","id":"reportProductionArea","classes":"report_param","options":logs,"wrapper":"reportProductionAreaWrapper","data":{"param_name":"document_id"}};
    var actionSelectInput = {"id":"reportProductionAreaWrapper","classes":"input-field col s12 m12 l12","field":actionSelect,"label":selectLabel};

    return actionSelectInput;
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
    $(".document-wrapper").remove();
    $("option").prop("disabled", false);
    $("select").material_select("destroy");
    $("select").material_select();
    incID = 0;

    return;
}

function dateActivator(){
    $(".datepicker").pickadate();
    $(".entry_date").each(function(){
        var dateObj = datePicker($(this).data("name"), null, null);
        $(this).pickadate(dateObj);
    });
}

/******************************************************************************
A collection of functions to display the Log Form. This will be related to the
name of the log, located in the name_suffix field on the database. Usually, we
are going to divide them into full log, area log and individual item log.
******************************************************************************/

function sendGmpPackingDocControlReport(){
    if(validateLog()){
        $(".optional").each(function() {
            console.log($(this).attr("name"));
            if($(this).val() == ""){
                $(this).data("temp-name", $(this).attr("name"));
                $(this).removeAttr("name");
            }
        });

        var formData = new FormData($('#document_registry_form')[0]);

        console.log(formData);

        var fileCurrentIndex = 0;

        $("input:file[id^=log_images]").each(function () {
            if($(this)[0].files.length){
                /*console.log("Documento actual: " + $(this).data("document_index"));
                console.log("Entrada actual: " + $(this).data("entry_index"));
                console.log("Longitud de entradas: " + $(this)[0].files.length);*/
                console.log("Datos de imagenes");
                console.log($(this).data());
                console.log("A guardar image_index = " + fileCurrentIndex + ", image_lenght = " + $(this)[0].files.length);
                formData.append("documents[" + $(this).data("document_index") + "][entries][" + $(this).data("entry_index") + "][pictures_start]", fileCurrentIndex);
                formData.append("documents[" + $(this).data("document_index") + "][entries][" + $(this).data("entry_index") + "][pictures_length]", $(this)[0].files.length);
                fileCurrentIndex += $(this)[0].files.length;
            }
        });

        fileCurrentIndex = 0;

        $("input:file[id^=log_files]").each(function () {
            if($(this)[0].files.length){
                /*console.log("Documento actual: " + $(this).data("document_index"));
                console.log("Entrada actual: " + $(this).data("entry_index"));
                console.log("Longitud de entradas: " + $(this)[0].files.length);*/
                console.log("A guardar image_index = " + fileCurrentIndex + ", image_lenght = " + $(this)[0].files.length);
                formData.append("documents[" + $(this).data("document_index") + "][entries][" + $(this).data("entry_index") + "][files_start]", fileCurrentIndex);
                formData.append("documents[" + $(this).data("document_index") + "][entries][" + $(this).data("entry_index") + "][files_length]", $(this)[0].files.length);
                fileCurrentIndex += $(this)[0].files.length;
            }
        });

        $server.request({
            service: 'capture-gmp-doc-control-doc-control',
            data: formData,
            success: function(response){
                if (response.meta.return_code == 0) {
                    Materialize.toast("Reporte enviado con exito", 3000, "rounded");
                    $('ul.tabs').tabs('select_tab', 'manual_tab');
                } else {
                    Materialize.toast(response.meta.message, 3000, "rounded");
                }
                $(".optional").each(function() {
                    $(this).attr("name", $(this).data("temp-name"));
                });
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
    if(validateLog()){
        $(".optional").each(function() {
            console.log($(this).attr("name"));
            if($(this).val() == ""){
                $(this).data("temp-name", $(this).attr("name"));
                $(this).removeAttr("name");
            }
        });
        /*$(".area-card").each(function(){
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
        });*/

        var formData = new FormData($('#document_registry_form')[0]);

        formData.append("report_id", reportID);

        $server.request({
            service: 'update-gmp-doc-control-doc-control',
            data: formData,
            success: function(response){
                if (response.meta.return_code == 0) {
                    Materialize.toast("Reporte enviado con exito", 3000, "rounded");
                    changesFlag = false;
                } else {
                    Materialize.toast(response.meta.message, 3000, "rounded");
                }
                $("#send_report").removeAttr("disabled");
                $("#sending_log").hide();
                $(".optional").each(function() {
                    $(this).attr("name", $(this).data("temp-name"));
                });
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

    if(!(isPrefilled === true)){
        controlsRow.addClass("card-panel white");
        $(controlsRow).append(createInputRow(gmpPackingAtpTestingAreaControls(data)));
        //$("body").append(createBottomModal({"id":"document-select-modal","classes":"modal-80","content":gmpPackingAtpTestingAreaControls(data)}));
    }

    form.form.sections.push({"type":"section","rows":[{"type":"row","columns":[gmpPackingDocRegistryDate(getISODate(new Date()))]}]});

    if(isPrefilled === true){
        var entryNumber = 0;
        for(var log of data){
            log.no = entryNumber;
            console.log(log);
            form.form.sections.push(gmpPackingDocRegistryItem(log, entryNumber++));
        }
    }

    $(htmlElement).append(createForm(form));

    buttonRow.attr("id", "button_row");
    buttonRow.addClass("row");
    buttonRow.append(createButton(sendButton()));
    
    if(isPrefilled === true){
        buttonRow.append(createButton(approveButton()));
        buttonRow.append(createButton(rejectButton()));
        buttonRow.append(createButton(returnButton()));
    }

    $(htmlElement).append(controlsRow);
    $(htmlElement).append(buttonRow);

    /*$("body").append(createBottomModal({"id":"document-select-modal","content":"<h4>Test Modal</h4>","footer":"<p>Footer</p>"}));

    $(htmlElement).append(`<div class="fixed-action-btn">
                        <a class="btn-floating btn-large orange modal-trigger mdi mdi-plus mdi-48px" href="#document-select-modal">
                            
                        </a>
                    </div>`);

    $(".modal-trigger").leanModal({dismissible: true});*/

    return form;
}

function sendButton(){
    var button = {"type":"button","id":"send_report","icon":{"type":"icon","icon":"mdi-send","size":"mdi-18px", "text":{"type":"text","classes":"send_button"}},"align":"col s3 m3 l3","data":{"waiting":false}};

    return button;
}

function gmpPackingDocRegistryDate(date){
    var dataLabel = {"type":"label","contents":{"type":"text","classes":"date_name"}};
    var dataInput = {"type":"date","id":"report_date","name":"date","classes":"validate pickadate","fieldType":"text","validations":{"type":"text","max":{"value":65535}}};
    var dataFullInput = {"id":"reportDateWrapper","classes":"input-field col s12 m12 l12","field":dataInput,"label":dataLabel,"hidden":true};

    if(date){
        dataInput.value = date;
        dataLabel.classes = "active";
    }

    return dataFullInput;
}

function gmpPackingDocRegistryItem(item, registerNumber){
    var documentItem = {"type":"section","id":"documentWrapper_" + item.id,"classes":"card-panel white document-wrapper","sections":[]};
    var identitySection = {"type":"section","id":"identityWrapper_" + item.id,"rows":[]};
    var identityRow = {"type":"row","columns":[]};
    var controlsSection = {"type":"section","id":"controlsWrapper_" + item.id,"rows":[]};
    var controlsRow = {"type":"row","columns":[]};

    identityRow.columns = [gmpPackingDocRegistryHiddenID(item, registerNumber), gmpPackingDocRegistryTitle(item, registerNumber)];
    
    identitySection.rows.push(identityRow);

    controlsRow.columns = [gmpDocControlItemAddEntryButton(item), gmpDocControlItemDelEntryButton(item)];

    controlsSection.rows.push(controlsRow);

    documentItem.sections.push(identitySection);

    if(item.entries){
        var entryNumber = 0;
        for(var entry of item.entries){
            entry.id = item.id;
            entry.no = registerNumber;
            documentItem.sections.push(gmpPackingDocRegistryItemEntry(entry, entryNumber++, true));
        }
    } else {
        documentItem.sections.push(gmpPackingDocRegistryItemEntry(item, registerNumber));
    }
    documentItem.sections.push(controlsSection);

    return documentItem;
}

function gmpPackingDocRegistryItemEntry(item, registerNumber, isPrefilled){
    var entrySection = {"type":"section","id":"entryWrapper_" + item.id + "_" + registerNumber,"classes":"card-panel white","rows":[]};

    var employeeRow = {"type":"row","columns":[]};
    var dataRow = {"type":"row","columns":[]};

    employeeRow.columns = [gmpPackingDocRegistryItemDate(item, registerNumber), gmpPackingDocRegistryItemUser(item, registerNumber)];
    dataRow.columns = [gmpPackingDocRegistryItemData(item, registerNumber), gmpPackingDocRegistryItemUrl(item, registerNumber)];

    entrySection.rows.push(employeeRow);
    entrySection.rows.push(dataRow);

    if(!(isPrefilled === true)){
        var imagesRow = {"type":"row","columns":[]};
        var filesRow = {"type":"row","columns":[]};
        imagesRow.columns = [gmpPackingDocRegistryItemImage(item, registerNumber)];
        filesRow.columns = [gmpPackingDocRegistryItemFile(item, registerNumber)];
        entrySection.rows.push(imagesRow);
        entrySection.rows.push(filesRow);
    } else {
        console.log("Entrada prefilled");
        console.log(item);
        if(item.pictures != null && item.pictures != ""){
            var imgArray = JSON.parse(item.pictures);

            entrySection.rows.push({"type":"row","columns":[gmpDocControlFileTitle("Imagenes adjuntas")]});

            for(var img of imgArray){
                entrySection.rows.push({"type":"row","columns":[gmpDocControlFileTitle("<a href='" + $domain + $root + "data/images/gmp/doc_control/doc_control/" + img + "'>" + img + "</a>")]});
            }
        }

        if(item.files != null && item.files != ""){
            var fileArray = JSON.parse(item.files);

            entrySection.rows.push({"type":"row","columns":[gmpDocControlFileTitle("Archivos adjuntos")]});

            for(var file of fileArray){
                entrySection.rows.push({"type":"row","columns":[gmpDocControlFileTitle("<a href='" + $domain + $root + "data/documents/gmp/doc_control/doc_control/" + file + "'>" + file + "</a>")]});
            }
        }
    }

    return entrySection;
}

function gmpDocControlFileTitle(item){
    var itemTitle = {"type":"text","classes":"","text":item};
    var titleInput = {"classes":"card-title col s12 m12 l12","field": itemTitle};

    return titleInput;
}

function gmpPackingDocRegistryHiddenID(item, registerNumber){
    var idLabel = {"type":"label","contents":{"type":"text"}};
    var idInput = {"type":"input","id":"id_" + item.id + "_" + registerNumber,"name":"documents[" + item.no + "][id]","classes":"validate","fieldType":"text","validations":{"type":"text","max":{"value":65535}}};
    var idFullInput = {"id":"idWrapper_" + item.id + "_" + registerNumber,"classes":"input-field col s12 m12 l12","field":idInput,"label":idLabel,"hidden":true};

    if(item.id){
        idInput.value = item.id;
        idLabel.classes = "active";
    }

    return idFullInput;
}

function gmpPackingDocRegistryTitle(item, registerNumber){
    var logTitle = {"type":"text","id":"title_" + item.id + "_" + registerNumber,"classes":"blue-text", "text":item.name};
    var titleInput = {"id":"titleWrapper_" + item.id + "_" + registerNumber,"classes":"card-title col s12 m12 l12","field": logTitle};

    return titleInput;
}

function gmpPackingDocRegistryItemDate(item, registerNumber){
    var dataLabel = {"type":"label","contents":{"type":"text","classes":"date_name"}};
    var dataInput = {"type":"date","id":"date_" + item.id + "_" + registerNumber,"classes":"validate entry_date","fieldType":"text","validations":{"type":"text","max":{"value":65535}},"data":{"name":"documents[" + item.no + "][entries][" + registerNumber + "][date]"}};
    var dataFullInput = {"id":"dateWrapper_" + item.id + "_" + registerNumber,"classes":"input-field col s6 m6 l6","field":dataInput,"label":dataLabel};

    if(item.date){
        dataInput.value = item.date;
        dataLabel.classes = "active";
    }

    return dataFullInput;
}

function gmpPackingDocRegistryItemUser(item, registerNumber){
    console.log("Item en authorization");
    console.log(item);
    var userLabel = {"type":"label","contents":{"type":"text","classes":"users_sidenav"}};
    var userInput = {"type":"input","id":"user_" + item.id + "_" + registerNumber,"name":"documents[" + item.no + "][entries][" + registerNumber + "][employee]","classes":"validate","fieldType":"text","validations":{"type":"text","max":{"value":65535}}};
    var userFullInput = {"id":"userWrapper_" + item.id + "_" + registerNumber,"classes":"input-field col s6 m6 l6","field":userInput,"label":userLabel};

    if(item.employee){
        userInput.value = item.employee;
        userLabel.classes = "active";
    }

    return userFullInput;
}

function gmpPackingDocRegistryItemData(item, registerNumber){
    var dataLabel = {"type":"label","contents":{"type":"text","classes":"notes_title"}};
    var dataInput = {"type":"textarea","id":"data_" + item.id + "_" + registerNumber,"name":"documents[" + item.no + "][entries][" + registerNumber + "][notes]","classes":"validate optional","fieldType":"text","validations":{"type":"text","max":{"value":65535}}};
    var dataFullInput = {"id":"dataWrapper_" + item.id + "_" + registerNumber,"classes":"input-field col s6 m6 l6","field":dataInput,"label":dataLabel};

    if(item.notes){
        dataInput.value = item.notes;
        dataLabel.classes = "active";
    }

    return dataFullInput;
}

function gmpPackingDocRegistryItemUrl(item, registerNumber){
    var urlLabel = {"type":"label","contents":{"type":"text","classes":"url_title"}};
    var urlInput = {"type":"textarea","id":"album_url_" + item.id + "_" + registerNumber,"name":"documents[" + item.no + "][entries][" + registerNumber + "][additional_info_url]","classes":"validate optional","fieldType":"text","validations":{"type":"text","max":{"value":65535}}};
    var urlFullInput = {"id":"urlWrapper_" + item.id + "_" + registerNumber,"classes":"input-field col s6 m6 l6","field":urlInput,"label":urlLabel};

    if(item.additional_info_url){
        urlInput.value = item.additional_info_url;
        urlLabel.classes = "active";
    }

    return urlFullInput;
}

function gmpPackingDocRegistryItemImage(item, registerNumber){
    var logoField = {"type":"file","id":"log_images_" + item.id + "_" + registerNumber,"classes":"select_image_button","name":"pictures[]","multiple":true,"optional":true,"data":{"document_index":item.no,"entry_index":registerNumber}};
    var logoInput = {"id":"imagesWrapper_" + item.id + "_" + registerNumber,"classes":"input-field col s12 m12 l12","field":logoField};

    return logoInput;
}

function gmpPackingDocRegistryItemFile(item, registerNumber){
    var logoField = {"type":"file","id":"log_files_" + item.id + "_" + registerNumber,"classes":"select_file_button","name":"files[]","multiple":true,"optional":true,"data":{"document_index":item.no,"entry_index":registerNumber}};
    var logoInput = {"id":"filesWrapper_" + item.id + "_" + registerNumber,"classes":"input-field col s12 m12 l12","field":logoField};

    return logoInput;
}

function gmpDocControlItemAddEntryButton(area){
    var areaAddInput = {"id":"addTestButtonWrapper_" + area.id,"classes":"input-field col s1 offset-s10 m1 offset-m10 l1 offset-l10"};
    var areaAddButton = {"type":"floating","id":"add_area_test_" + area.id,"classes":"btn-floating waves-effect waves-light green right test_button","data":{"document_id":area.id,"document_no":area.no,"last_test":1}};
    var areaAddIcon = {"type":"icon","icon":"mdi-plus","size":"mdi-24px"};
    areaAddButton.icon = areaAddIcon;
    areaAddInput.field = areaAddButton;

    return areaAddInput;
}

function gmpDocControlItemDelEntryButton(area){
    var areaAddInput = {"id":"delTestButtonWrapper_" + area.id,"classes":"input-field col s1 m1 l1"};
    var areaAddButton = {"type":"floating","id":"del_area_test_" + area.id,"classes":"btn-floating waves-effect waves-light grey right delete_button","data":{"document_id":area.id,"document_no":area.no,"last_test":1}};
    var areaAddIcon = {"type":"icon","icon":"mdi-minus","size":"mdi-24px"};
    areaAddButton.icon = areaAddIcon;
    areaAddInput.field = areaAddButton;

    return areaAddInput;
}

/***************************************************************************/

function gmpPackingAtpTestingAreaControls(data){
    var controlsRow = new Object();

    controlsRow.type = "row";
    controlsRow.columns = [gmpPackingAtpTestingAreaControlsSelect(data), gmpPackingAtpTestingAreaControlsAddButton(data)];

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
    var actionSelectInput = {"id":"productionAreaWrapper","classes":"input-field col s11 m11 l11","field":actionSelect,"label":selectLabel};

    return actionSelectInput;
}

function gmpPackingAtpTestingAreaControlsAddButton(data){
    var areaAddInput = {"id":"addAreaButtonWrapper","classes":"input-field col s1 m1 l1 modal-close"};
    var areaAddButton = {"type":"floating","id":"add_area","classes":"btn-floating waves-effect waves-light green right","data":{"last_test":1}};
    var areaAddIcon = {"type":"icon","icon":"mdi-plus","size":"mdi-24px"};
    areaAddButton.icon = areaAddIcon;
    areaAddInput.field = areaAddButton;

    return areaAddInput;
}

/*function gmpPackingAtpTestingAreaControlsDelButton(data){
    var areaDelInput = {"id":"delAreaButtonWrapper","classes":"input-field col s1 m1 l1"};
    var areaDelButton = {"type":"floating","id":"del_area","classes":"btn-floating waves-effect waves-light grey","data":{"last_test":1}};
    var areaDelIcon = {"type":"icon","icon":"mdi-minus","size":"mdi-24px"};
    areaDelButton.icon = areaDelIcon;
    areaDelInput.field = areaDelButton;

    return areaDelInput;
}*/

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
            gmpDocControlAddDelEntryFunctionality(data);
            dateActivator();
            changeLanguage();
        });
    }
}

function gmpDocControlAddDelEntryFunctionality(data){
    $(".test_button").off();
    $(".delete_button").off();

    $(".test_button").on("click", function(e){
        var tempObject = {};
        var docID = $(this).data("document_id");
        var lastTest = $(this).data("last_test");
        var docNo = $(this).data("document_no");
        tempObject.id = docID;
        tempObject.no = docNo;
        $("#entryWrapper_" + docID + "_" + (lastTest - 1)).after(formSection(gmpPackingDocRegistryItemEntry(tempObject, lastTest)));
        $(this).data("last_test", lastTest + 1);
        $("#del_area_test_" + docID).data("last_test", lastTest + 1);
        if($("#del_area_test_" + docID).hasClass("grey")){
            $("#del_area_test_" + docID).removeClass("grey");
            $("#del_area_test_" + docID).addClass("red");
        }
        dateActivator();
        changeLanguage();
    });

    $(".delete_button").on("click", function(e){
        var docID = $(this).data("document_id");
        var lastTest = $(this).data("last_test");
        if(lastTest > 1){
            $("#entryWrapper_" + docID + "_" + (lastTest-1)).remove();
            $(this).data("last_test", lastTest - 1);
            $("#add_area_test_" + docID).data("last_test", lastTest - 1);
            changeLanguage();
        }
        if((lastTest - 1) == 1){
            console.log("Solo queda 1");
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
    var header = {"type":"thead","rows":[{"type":"tr","columns":[{"type":"th","classes":"users_sidenav userColumn"},{"type":"th","classes":"date_name dateColumn"},{"type":"th","classes":"notes_title notesColumn"},{"type":"th","classes":"url_title urlColumn"}]}]};

    return header;
}

// Body containing all the information, except for the report notes and album
// URL

function gmpPackingDocControlReportBody(data){
    var body = {"type":"tbody"};
    body.rows = new Array();

    console.log(data);

    var doc = data.document;
        // Title row
        var titleRow = {"type":"tr","columns":[]};

        // Create and append the Log Title in one full row
        titleRow.columns.push(gmpPackingDocControlReportLogTitle(doc.name, 4));
        body.rows.push(titleRow);

        // Go trough entries, print them all
        for(var entry of doc.entries){
            // Entry row
            var entryRow = {"type":"tr","columns":[]};

            entryRow.columns = gmpPackingDocControlReportItem(entry);

            body.rows.push(entryRow);

            // For the time being, add pictures one by one. If there are more pictures,
            // change this with a loop
            if(entry.pictures != null && entry.pictures != ""){
                var imgArray = JSON.parse(entry.pictures);

                for(var img of imgArray){
                    var pictureRow = {"type":"tr","columns":[]};

                    pictureRow.columns = gmpPackingDocControlImageColumn(img, 4);

                    body.rows.push(pictureRow);
                }
            }

            if(entry.files != null && entry.files != ""){
                var fileArray = JSON.parse(entry.files);

                for(var file of fileArray){
                    var fileRow = {"type":"tr","columns":[]};

                    fileRow.columns = gmpPackingDocControlFileColumn(file, 4);

                    body.rows.push(fileRow);
                }
            }
            /*if(entry.picture1){
                var picture1Row = {"type":"tr","columns":[]};

                picture1Row.columns = gmpPackingDocControlImageColumn(entry.picture1, 4);

                body.rows.push(picture1Row);
            }

            if(entry.picture2){
                var picture2Row = {"type":"tr","columns":[]};

                picture2Row.columns = gmpPackingDocControlImageColumn(entry.picture2, 4);

                body.rows.push(picture2Row);
            }*/
        }

    return body;
}

// Type title, colspan usually 4
// For printing the log code (name used in the inventory)

function gmpPackingDocControlReportLogTitle(title, colspan){
    var logTitle = {"type":"td","classes":"logTitle","colspan":colspan,"contents":title};

    return logTitle;
}

// A row with five 'td' elements, including the number, name, status,
// corrective action text and comment

function gmpPackingDocControlReportItem(itemData){
    var item = new Array();

    item.push({"type":"td","classes":"userColumn","contents":itemData.employee});
    item.push({"type":"td","classes":"dateColumn","contents":itemData.date});
    item.push({"type":"td","classes":"notesColumn","contents":itemData.notes});
    if(itemData.additional_info_url){
        item.push({"type":"td","classes":"urlColumn","contents":"<a href='" + itemData.additional_info_url + "' ><span class='open_url'></span></a>"});
    } else {
        item.push({"type":"td","classes":"urlColumn"});
    }

    return item;
}

function gmpPackingDocControlImageColumn(imageAddress, colspan){
    var item = new Array();

    item.push({"type":"td","classes":"imageColumn","colspan":colspan,"contents":'<div style="text-align: center;"><img src="' + $domain + $root + 'data/images/gmp/doc_control/doc_control/' + imageAddress + '" alt="report_image" class="report_image"></div>'/*,"style":"text-align:center;"*/});

    //style="display:block;height:auto;width:100%;height:100%;

    return item;
}

function gmpPackingDocControlFileColumn(fileAddress, colspan){
    var item = new Array();

    item.push({"type":"td","classes":"imageColumn","colspan":colspan,"contents":"<a href='" + $domain + $root + "data/documents/gmp/doc_control/doc_control/" + fileAddress + "' target='_blank'><span class='open_file'></span><a>"});

    //style="display:block;height:auto;width:100%;height:100%;

    return item;
}

// Footer

function gmpPackingDocControlReportFooter(data){

}

// CSS for the server to correctly display the HTML table

function getCSS(){
    return '<style>table { font-family: arial, sans-serif; border-collapse: collapse; width: 100%;}td { border: 1px solid #000000; text-align: left;}th { border: 1px solid #000000; text-align: left; font-weight: bold; background-color: #4CAF50;}.even { background-color: #b8e0b9;}.verticaltext{ writing-mode:tb-rl; transform: rotate(90deg); white-space:nowrap; word-break:break-word; bottom:0;}.typeTitle{ background-color: yellow; width:501px;}.fullColumn{ background-color: #D3D3D3;width:631px;}.nameColumn{ width:116px;}.numberColumn{ width:30px;}.timeColumn{ width:40px;}.areaColumn{ width:90px;}.statusColumn{ width:85px;}.actionColumn{ width:70px;}.commentColumn{ width:200px;} .report_image{width:350px !important; padding-left: 140px;}</style>';
}