/*
Form Object
{
    type: form,
    id: id,
    classes: classes,
    name: name,
    method: post | get
    style: style,
    form: form, organized by rows
}
*/

function createForm(formData){
    var form = $("<form>");

    if(formData.id)
        form.attr("id", formData.id);

    if(formData.classes)
        form.addClass(formData.classes);

    if(formData.name)
        form.attr("name", formData.name);

    if(formData.action)
        form.attr("action", formData.action);

    if(formData.enctype)
        form.attr("enctype", formData.enctype);

    if(formData.method == "post" || formData.method == "get")
        form.attr("method", formData.method);

    if(formData.style)
        form.attr("style", formData.style);

    if(formData.form){
        if(formData.form.rows){
            for(var row of formData.form.rows){
                form.append(createInputRow(row));
            }
        } else if (formData.form.sections){
            for(var section of formData.form.sections){
                form.append(formSection(section));
            }
        }
    }

    return form;
}

/*
Form Object
{
    type: section,
    opening: Section Object OR Rows Array,
    closing: Section Object OR Rows Array,
    rows: | sections:
}
*/

function formSection(sectionObject) {
    var section = $("<div>");

    if(sectionObject.classes)
        section.addClass(sectionObject.classes);

    if(sectionObject.id)
        section.attr("id", sectionObject.id);

    if(sectionObject.opening){
        if(sectionObject.opening.type == "section"){
            section.append(formSection(sectionObject.opening));
        }
        if(sectionObject.opening.type == "rows"){
            for(var row of sectionObject.opening.rows){
                section.append(createInputRow(row));
            }    
        }
    }

    if(sectionObject.rows){
        for(var row of sectionObject.rows){
            section.append(createInputRow(row));
        }
    }
    else if(sectionObject.sections){
        for(var sec of sectionObject.sections){
            section.append(formSection(sec));
        }
    }

    if(sectionObject.closing){
        if(sectionObject.closing.type == "section"){
            section.append(formSection(sectionObject.closing));
        }
        if(sectionObject.closing.type == "rows"){
            for(var row of sectionObject.closing.rows){
                section.append(createInputRow(row));
            }    
        }
    }

    return section;
}

/*
Rows Object
{
    "type":"rows"
    "rows":[{rowObject}, {rowObject}, {rowObject}]
}
*/

function createInputRows(rows){

}

// Generic input row creator

/*
{
    "type":"row"
    "columns":[{inputObject}, {inputObject}, {inputObject}]
}
*/

function createInputRow(row){
    var inputRow = $("<div>");

    inputRow.addClass("row no-margin-bottom");

    for(var column of row.columns)
        inputRow.append(createInput(column));

    return inputRow;
}

/*
An input is a wrapper for an input of any type, be it text, password, or even
select, radio, paired with a label and using the proper 

Input Object
{
    "id": "id",
    "classes": "classes",
    "hidden": "true or false",
    "field": "field input",
    "label": "Label Object"
}
*/

function createInput(inputObject){
    var input = $("<div>");

    if(inputObject.id)
        input.attr("id", inputObject.id);

    if(inputObject.classes)
        input.addClass(inputObject.classes);

    if(inputObject.hidden)
        input.hide();

    if(inputObject.field)
        input.append(createField(inputObject.field));

    if(inputObject.label)
        input.append(createLabel(inputObject.label));

    return input;
}

/*
Essentially, a wrapper for all types of form fiels, with not only inputs, but
also for selects, textareas, buttons and also Materialize exclusive inputs,
like switches, files and ranges.

Field Object
{
    "type": "input", "select", "textarea", "button", "switch", "file", "range"
    "fieldType": "text", "password"
}
*/

function createField(fieldObject){
    var field = $("<span>");
    if(!fieldObject.classes){
        fieldObject.classes = "";
    }
    if(!(fieldObject.isClearable === false))
        fieldObject.classes = fieldObject.classes + " clearable";
    if($.type(fieldObject) == "object"){
        if(fieldObject.type == "input"){
            field = createTextField(fieldObject);
        }
        if(fieldObject.type == "date"){
            field = createDateInput(fieldObject);
        }
        if(fieldObject.type == "time"){
            field = createTimeInput(fieldObject);
        }
        if(fieldObject.type == "select"){
            field = createSelect(fieldObject);
        }
        if(fieldObject.type == "radioGroup"){
            field = createRadioGroup(fieldObject);
        }
        if(fieldObject.type == "checkbox"){
            field = createCheckbox(fieldObject);
        }
        if(fieldObject.type == "switch"){
            field = createSwitch(fieldObject);
        }
        if(fieldObject.type == "text"){
            field = createText(fieldObject);
        }
        if(fieldObject.type == "button"){
            field = createButton(fieldObject);
        }
        if(fieldObject.type == "floating"){
            field = createFloatingButton(fieldObject);
        }
        if(fieldObject.type == "textarea"){
            field = createTextarea(fieldObject);
        }
        if(fieldObject.type == "file"){
            field = createFileInput(fieldObject);
        }
    }
    return field;
}

/*
For simple text fields and password fields

Text Field Object
{
    "type": "input",
    "fieldType": "text or password",
    "id": "ID for the text input",
    "classes": "Classes for the text input",
    "value": "Default value",
    "size": "Number",
    "maxlength": "Number",
    "min": "Number or text",
    "max": "Number or text",
    "placeholder": "Number or text",
    "readonly": "true or false",
    "disabled": "true or false",
    "required": "true or false",
    "data": [{"key": "value"},{"key": "value"}, ...]
    "validations": {
        
    }
}
*/

function createTextField(fieldObject){
    var field = $("<input>");

    if(fieldObject.fieldType)
        field.attr("type", fieldObject.fieldType);
    else
        field.attr("type", "text");

    if(fieldObject.id)
        field.attr("id", fieldObject.id);

    if(fieldObject.name)
        field.attr("name", fieldObject.name);

    if(fieldObject.classes)
        field.attr("class", fieldObject.classes);

    if(fieldObject.value)
        field.attr("value", fieldObject.value);

    if(fieldObject.size)
        field.attr("size", fieldObject.size);

    if(fieldObject.maxlength)
        field.attr("maxlength", fieldObject.maxlength);

    if(fieldObject.min)
        field.attr("min", fieldObject.min);

    if(fieldObject.max)
        field.attr("max", fieldObject.max);

    if(fieldObject.placeholder)
        field.attr("placeholder", fieldObject.placeholder);

    if(fieldObject.readonly)
        field.prop("readonly", true);

    if(fieldObject.disabled)
        field.prop("disabled", true);

    if(fieldObject.required)
        field.prop("required", true);

    if(fieldObject.hidden)
        field.hide();

    if($.type(fieldObject.data) == "object"){
        field.data(fieldObject.data);
    }

    if($.type(fieldObject.validations) == "object"){
        field.data("validations", fieldObject.validations);
        field.addClass("formValidator");
        if(fieldObject.validations.max != undefined && fieldObject.validations.type == "text"){
            if(fieldObject.validations.max.value != undefined){
                field.attr("length", fieldObject.validations.max.value);
            }
        }
    }

    return field;
}

function createTextarea(fieldObject){
    var field = $("<textarea>");

    if(fieldObject.fieldType)
        field.attr("type", fieldObject.fieldType);
    else
        field.attr("type", "text");

    if(fieldObject.id)
        field.attr("id", fieldObject.id);

    if(fieldObject.name)
        field.attr("name", fieldObject.name);

    if(fieldObject.classes)
        field.attr("class", fieldObject.classes);

    field.addClass("materialize-textarea");

    if(fieldObject.value){
        field.val(fieldObject.value);
    }

    if(fieldObject.size)
        field.attr("size", fieldObject.size);

    if(fieldObject.maxlength)
        field.attr("maxlength", fieldObject.maxlength);

    if(fieldObject.min)
        field.attr("min", fieldObject.min);

    if(fieldObject.max)
        field.attr("max", fieldObject.max);

    if(fieldObject.placeholder)
        field.attr("placeholder", fieldObject.placeholder);

    if(fieldObject.readonly)
        field.prop("readonly", true);

    if(fieldObject.disabled)
        field.prop("disabled", true);

    if(fieldObject.required)
        field.prop("required", true);

    if($.type(fieldObject.data) == "object"){
        field.data(fieldObject.data);
    }

    if($.type(fieldObject.validations) == "object"){
        field.data("validations", fieldObject.validations);
        field.addClass("formValidator");
        if(fieldObject.validations.max != undefined && fieldObject.validations.type == "text"){
            if(fieldObject.validations.max.value != undefined){
                field.attr("length", fieldObject.validations.max.value);
            }
        }
    }

    return field;
}

function createDateInput(fieldObject){
    var field = $("<input>");

    field.attr("type", "date");

    if(fieldObject.id)
        field.attr("id", fieldObject.id);

    if(fieldObject.name)
        field.attr("name", fieldObject.name);

    if(fieldObject.classes)
        field.attr("class", fieldObject.classes);

    if(fieldObject.value)
        field.attr("value", fieldObject.value);

    if(fieldObject.size)
        field.attr("size", fieldObject.size);

    if(fieldObject.maxlength)
        field.attr("maxlength", fieldObject.maxlength);

    if(fieldObject.min)
        field.attr("min", fieldObject.min);

    if(fieldObject.max)
        field.attr("max", fieldObject.max);

    if(fieldObject.placeholder)
        field.attr("placeholder", fieldObject.placeholder);

    if(fieldObject.readonly)
        field.prop("readonly", true);

    if(fieldObject.disabled)
        field.prop("disabled", true);

    if(fieldObject.required)
        field.prop("required", true);

    if($.type(fieldObject.data) == "object"){
        field.data(fieldObject.data);
    }

    if($.type(fieldObject.validations) == "object"){
        field.data("validations", fieldObject.validations);
        field.addClass("formValidator");
        if(fieldObject.validations.max != undefined && fieldObject.validations.type == "text"){
            if(fieldObject.validations.max.value != undefined){
                field.attr("length", fieldObject.validations.max.value);
            }
        }
    }

    //field.addClass("datepicker");

    return field;
}

function createTimeInput(fieldObject){
    var field = $("<input>");

    field.attr("type", "date");

    if(fieldObject.id)
        field.attr("id", fieldObject.id);

    if(fieldObject.name)
        field.attr("name", fieldObject.name);

    if(fieldObject.classes)
        field.attr("class", fieldObject.classes);

    if(fieldObject.value)
        field.attr("value", fieldObject.value);

    if(fieldObject.size)
        field.attr("size", fieldObject.size);

    if(fieldObject.maxlength)
        field.attr("maxlength", fieldObject.maxlength);

    if(fieldObject.min)
        field.attr("min", fieldObject.min);

    if(fieldObject.max)
        field.attr("max", fieldObject.max);

    if(fieldObject.placeholder)
        field.attr("placeholder", fieldObject.placeholder);

    if(fieldObject.readonly)
        field.prop("readonly", true);

    if(fieldObject.disabled)
        field.prop("disabled", true);

    if(fieldObject.required)
        field.prop("required", true);

    if($.type(fieldObject.data) == "object"){
        field.data(fieldObject.data);
    }

    if($.type(fieldObject.validations) == "object"){
        field.data("validations", fieldObject.validations);
        field.addClass("formValidator");
        if(fieldObject.validations.max != undefined && fieldObject.validations.type == "text"){
            if(fieldObject.validations.max.value != undefined){
                field.attr("length", fieldObject.validations.max.value);
            }
        }
    }

    //field.addClass("timepicker");

    return field;
}

/*
Select Object

{
    "type": "select",
    "id": "id",
    "classes": "classes",
    "options": [optionObjects]
}
*/

function createSelect(selectObject){
    var select = $("<select>");

    if(selectObject.id)
        select.attr("id", selectObject.id);

    if(selectObject.name)
        select.attr("name", selectObject.name);

    if(selectObject.classes)
        select.addClass(selectObject.classes);

    for(var option of selectObject.options)
        select.append(createOption(option));

    if($.type(selectObject.validations) == "object"){
        select.data("validations", selectObject.validations);
        select.addClass("formValidator");
    }

    if($.type(selectObject.data) == "object"){
        select.data(selectObject.data);
    }

    return select;
}

/*
Option object

{
    "id": "id",
    "classes": "class",
    "value": "Int or String",
    "disabled": "true or false",
    "selected": "true or false",
    "text": "String" 
}
*/

function createOption(optionObject){
    var option = $("<option>");

    if(optionObject.id)
        option.attr("id", optionObject.id);

    if(optionObject.classes)
        option.addClass(optionObject.classes);

    if(optionObject.value != undefined)
        option.attr("value", optionObject.value);

    if(optionObject.disabled)
        option.prop("disabled", true);

    if(optionObject.selected)
        option.prop("selected", true);

    if(optionObject.text)
        option.append(optionObject.text);

    if($.type(optionObject.data) == "object"){
        option.data(optionObject.data);
    }

    return option;
}

/*
Radio Group Object

{
    "id": "radioGroup",
    "classes": ,
    "group": "string",
    "label":label Object,
    "radioArray": [Radio Button Object],
}
*/

function createRadioGroup(groupObject){
    var group = $("<div>");

    if(groupObject.id)
        group.attr("id", groupObject.id);

    if(groupObject.classes)
        group.addClass(groupObject.classes);

    if($.type(groupObject.validations) == "object"){
        group.data("validations", groupObject.validations);
        group.addClass("formValidator");
    }

    if(groupObject.label)
        group.append(createLabel(groupObject.label));

    for(var radio of groupObject.radioArray)
        group.append(createRadioOption(radio, groupObject.group));

    return group;
}

/*
Radio button Object

{
    "type": "radio",
    "id": "id",
    "classes": "classes",
    "value": any value,
    "checked": true or false,
    "disabled": true or false,
    "label": Label Object
}
*/

function createRadioOption(radioObject, groupName){
    var radioWrapper = $("<div>");
    var radio = $("<input>");

    //radioWrapper.addClass("row");
    if(!radioObject.classes){
        radioObject.classes = "";
    }
    if(!(radioObject.isClearable === false))
        radioObject.classes = radioObject.classes + " clearable";

    // TODO all of assignations to radioButton

    radio.attr("type", "radio");

    if(radioObject.id)
        radio.attr("id", radioObject.id);

    if(radioObject.classes)
        radio.addClass(radioObject.classes);

    if(groupName)
        radio.attr("name", groupName);

    if(radioObject.value != undefined)
        radio.attr("value", radioObject.value);

    if(radioObject.checked)
        radio.prop("checked", true);

    if(radioObject.disabled)
        radio.prop("disabled", true);

    if($.type(radioObject.data) == "object"){
        radio.data(radioObject.data);
    }

    radioWrapper.append(radio);

    if($.type(radioObject.label) == "object")
        radioWrapper.append(createLabel(radioObject.label));

    return radioWrapper;
}

/*
Checkbox Object
{
    "type":"checkbox",
    "id":"id",
    "classes": "classes",
    "value": any value,
    "checked": true or false,
    "disabled": true or false,
    "label": Label Object
}
*/

function createCheckbox(checkboxObject){
    var checkbox = $("<input>");

    checkbox.attr("type", "checkbox");

    if(checkboxObject.id)
        checkbox.attr("id", checkboxObject.id);

    if(checkboxObject.name)
        checkbox.attr("name", checkboxObject.name);

    if(checkboxObject.classes)
        checkbox.addClass(checkboxObject.classes);

    if(checkboxObject.value != undefined)
        checkbox.attr("value", checkboxObject.value);

    if(checkboxObject.checked)
        checkbox.prop("checked", true);

    if(checkboxObject.disabled)
        checkbox.prop("disabled", true);

    if($.type(checkboxObject.data) == "object"){
        checkbox.data(checkboxObject.data);
    }

    if($.type(checkboxObject.label) == "object")
        checkboxWrapper.append(createLabel(checkboxObject.label));

    return checkbox;
}

/*
Switch Object
{
    "type":"switch",
    "id":"id",
    "classes": "classes",
    "value": any value,
    "checked": true or false,
    "disabled": true or false,
    "onLabel": Label Object,
    "offLabel": Label Object,
    "data":
}
*/

function createSwitch(switchObject){
    var switchWrapper = $("<div>");
    var labelWrapper = $("<label>");
    var switchInput = $("<input>");
    var switchLever = $("<span>");

    switchWrapper.addClass("switch");
    switchInput.attr("type", "checkbox");
    switchLever.addClass("lever");

    if(switchObject.id)
        switchInput.attr("id", switchObject.id);

    if(switchObject.name)
        switchInput.attr("name", switchObject.name);

    if(switchObject.classes)
        switchInput.addClass(switchObject.classes);

    if(switchObject.value)
        switchInput.attr("value", switchObject.value);

    if(switchObject.checked)
        switchInput.prop("checked", true);

    if(switchObject.disabled)
        switchInput.prop("disabled", true);

    if($.type(switchObject.data) == "object"){
        switchInput.data(switchObject.data);
    }

    if(switchObject.offLabel)
        labelWrapper.append(createLabel(switchObject.offLabel));

    labelWrapper.append(switchInput);
    labelWrapper.append(switchLever);

    if(switchObject.onLabel)
        labelWrapper.append(createLabel(switchObject.onLabel));

    switchWrapper.append(labelWrapper);

    return switchWrapper;
}

/*
Label Object
{
    "type": "label",
    "id": "id",
    "classes": "classes",
    "for": 
    "contents": Icon Object, Text Object, text
}
*/

function createLabel(labelObject){
    var label = $("<label>");

    if(labelObject.id)
        label.attr("id", labelObject.id);

    if(labelObject.classes)
        label.addClass(labelObject.classes);

    if(labelObject.for)
        label.attr("for", labelObject.for);

    if(labelObject.contents){
        if($.type(labelObject.contents) == "object"){
            switch(labelObject.contents.type){
                case "icon": label.append(createIcon(labelObject.contents)); break;
                case "text": label.append(createText(labelObject.contents)); break;
            }
        } else {
            label.append(labelObject.contents);
        }
    }
    
    return label;
}

/*
Icon Object description

{
    "type": "icon",
    "icon": "mdi-name-of-icon",
    "size": "mdi-Npx",
    "color": "color-text",
    "text": "Any text you want. It may be a String or a textObject"
}
*/

function createIcon(iconObject){
    var iconWrapper = $("<div>");
    var icon = $("<i>");

    icon.addClass("mdi");

    if(iconObject.icon)
        icon.addClass(iconObject.icon);
    else
        icon.addClass("mdi-checkbox-blank-circle");

    if(iconObject.size)
        icon.addClass(iconObject.size);
    else
        icon.addClass("mdi-18px");

    if(iconObject.color)
        icon.addClass(iconObject.color);

    if($.type(iconObject.text) == "string"){
        iconWrapper.append(iconObject.text);
        iconWrapper.append(" ");
        iconWrapper.append(icon);
        return iconWrapper;
    } else if ($.type(iconObject.text) == "object") {
        iconWrapper.append(createText(iconObject.text));
        iconWrapper.append(" ");
        iconWrapper.append(icon);
        return iconWrapper;
    }

    return icon;
}

/*
File Object description

{
    "type": "file",
    "classes": "Classes for the language"
    "name": Name for the form that contains the file,
    "additional_fields":
}
*/

function createFileInput(fileObject){
    //var formWrapper = $("<form>");
    var fileInputWrapper = $("<div>");
    var buttonWrapper = $("<div>");
    var buttonText = $("<span>");
    var buttonInput = $("<input>");
    var pathWrapper = $("<div>");
    var pathInput = $("<input>");

    fileInputWrapper.addClass("file-field input-field");

    buttonWrapper.addClass("btn");
    buttonText.addClass(fileObject.classes);
    buttonInput.attr("type", "file");

    if(fileObject.multiple === true)
        buttonInput.prop("multiple", true);

    if(fileObject.name)
        buttonInput.attr("name", fileObject.name);
    //buttonInput.attr("id", fileObject.id);

    buttonWrapper.append(buttonText);
    buttonWrapper.append(buttonInput);

    pathWrapper.addClass("file-path-wrapper");
    pathInput.addClass("file-path validate");
    pathInput.attr("type", "text");

    pathWrapper.append(pathInput);

    fileInputWrapper.append(buttonWrapper);
    fileInputWrapper.append(pathWrapper);

    /*formWrapper.attr("id", fileObject.id);
    formWrapper.attr("enctype", "multipart/form-data");
    formWrapper.append(fileInputWrapper);

    if(fileObject.additional_fields){
        for(var field of fileObject.additional_fields){
            formWrapper.append(createField(field));
        }
    }*/

    return fileInputWrapper;

    /*<div class="file-field input-field">
        <div class="btn">
            <span>File</span>
            <input type="file">
        </div>
        <div class="file-path-wrapper">
            <input class="file-path validate" type="text">
        <div>
    <div>*/
}

/*
Text Object description

{
    "type": "text",
    "id": "id to be used in the HTML element",
    "classes": "class or classes for the HTML element 
                (to be used with languages.xml, mostly)",
    "text": "Just a String"
}
*/

function createText(textObject){
    var text = $("<span>");

    if(textObject.id)
        text.attr("id", textObject.id);

    if(textObject.classes)
        text.addClass(textObject.classes);

    if(textObject.text)
        text.append(textObject.text);

    return text;
}

/*
Button Object

{
    "type":"button",
    "id": ,
    "classes": ,
    "icon": iconObject
}
*/

function createButton(buttonObject){
    var buttonWrapper = $("<div>");
    var button = $("<a>");
    var buttonText = $("<span>");

    buttonWrapper.addClass("center-align");
    button.addClass("waves-effect waves-light btn");

    if(buttonObject.id)
        button.attr("id", buttonObject.id);

    if(buttonObject.name)
        button.attr("name", buttonObject.name);

    if(buttonObject.classes)
        buttonText.addClass(buttonObject.classes);

    button.append(buttonText);

    if(buttonObject.icon)
        button.append(createIcon(buttonObject.icon));

    if(buttonObject.align)
        buttonWrapper.addClass(buttonObject.align);

    buttonWrapper.append(button);

    if($.type(buttonObject.data) == "object"){
        button.data(buttonObject.data);
    }

    return buttonWrapper;
}

/*
Floating Button Object
{
    "type":"button",
    "id": ,
    "classes": ,
    "icon": iconObject
}
*/

function createFloatingButton(buttonObject){
    var floatingButton = $("<a>");

    if(buttonObject.id)
        floatingButton.attr("id", buttonObject.id);

    if(buttonObject.name)
        floatingButton.attr("name", buttonObject.name);

    if(buttonObject.classes)
        floatingButton.addClass(buttonObject.classes);

    if(buttonObject.icon)
        floatingButton.append(createIcon(buttonObject.icon));

    if($.type(buttonObject.data) == "object"){
        floatingButton.data(buttonObject.data);
    }

    return floatingButton;
}

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
        ISOTime += "0" + date.getMinutes();// + ":";
    } else {
        ISOTime += date.getMinutes();// + ":";
    }

    /*if(date.getSeconds()<10){
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


// Generic Log Form functions

function logHeader(header){
    var headerCard = $("<div>");

    headerCard.addClass("card-panel white");

    for(var row of header.rows){
        headerCard.append(logHeaderRow(row));
    }

    return headerCard;
}

function logHeaderRow(row){
    var headerRow = $("<div>");

    headerRow.addClass("row");

    for(var column of row.columns){
        headerRow.append(logHeaderColumn(column));
    }

    return headerRow;
}

function logHeaderColumn(column){
    var headerColumn = $("<span>");
    var textSpan = $("<span>");
    var contents = $("<span>");

    if(column.styleClasses){
        headerColumn.addClass(column.styleClasses);
    }

    if(column.textClasses){
        textSpan.addClass(column.textClasses);
        headerColumn.append(textSpan);
    }

    if(column.textClasses && column.columnText){
        headerColumn.append(": ");
    }

    if(column.id){
        contents.attr("id", column.id);
    }

    if(column.columnText){
        contents.append(column.columnText);
        headerColumn.append(contents);
    }

    return headerColumn;
}

$(function(){
    $.fn.validate = function(){
        var errorCounter = 0;
        var returnValue = true;
        var validations = null;
        var element = $(this);

        if (false == element.hasClass("formValidator")) {
            return true;
        } else {
            validations = element.data("validations");
        }

        if(validations == undefined){
            return true;
        }

        if(element.is(":hidden") && element.hasClass("initialized") == false){
            return true;
        }

        if(validations.type == "text"){
            if(validations.max != undefined){
                if(validations.max.value != undefined){
                    if(element.val().length > validations.max.value){
                        if(validations.max.toast != undefined){
                            loadToast(validations.max.toast, 2500, "rounded", null, null, [validations.max.value]);
                        } else {
                            loadToast("generic-text-max", 2500, "rounded", null, null, [validations.max.value]);
                        }
                        element.addClass("invalid");
                        returnValue = false;
                    }
                }
            }

            if(validations.min != undefined){
                if(validations.min.value != undefined){
                    if(element.val().length < validations.min.value){
                        if(validations.min.toast != undefined){
                            loadToast(validations.min.toast, 2500, "rounded", null, null, [validations.min.value]);
                        } else {
                            loadToast("generic-text-min", 2500, "rounded", null, null, [validations.min.value]);
                        }
                        element.addClass("invalid");
                        returnValue = false;
                    }
                }
            }

            if(validations.required != undefined){
                if(validations.required.value == true){
                    if(element.val().length == 0){
                        if(validations.required.toast != undefined){
                            loadToast(validations.required.toast, 2500, "rounded");
                        } else {
                            loadToast("generic-text-required", 2500, "rounded");
                        }
                        element.addClass("invalid");
                        returnValue = false;
                    }
                }
            }
        } else if (validations.type == "number"){
            if(element.val() != Number(element.val())){
                if(validations.toast != undefined){
                    loadToast(validations.toast, 2500, "rounded");
                } else {
                    loadToast("generic-number-required", 2500, "rounded");
                }
                element.addClass("invalid");
                returnValue = false;
            } else {
                if(validations.max != undefined){
                    if(validations.max.value != undefined){
                        if(element.val() > validations.max.value){
                            if(validations.max.toast != undefined){
                                loadToast(validations.max.toast, 2500, "rounded", null, null, [validations.max.value]);
                            } else {
                                loadToast("generic-number-max", 2500, "rounded", null, null, [validations.max.value]);
                            }
                            element.addClass("invalid");
                            returnValue = false;
                        }
                    }
                }

                if(validations.min != undefined){
                    if(validations.min.value != undefined){
                        if(element.val() < validations.min.value){
                            if(validations.min.toast != undefined){
                                loadToast(validations.min.toast, 2500, "rounded", null, null, [validations.min.value]);
                            } else {
                                loadToast("generic-number-min", 2500, "rounded", null, null, [validations.min.value]);
                            }
                            element.addClass("invalid");
                            returnValue = false;
                        }
                    }
                }

                if(validations.required != undefined){
                    if(validations.required.value == true){
                        if(element.val().length == 0){
                            if(validations.required.toast != undefined){
                                loadToast(validations.required.toast, 2500, "rounded");
                            } else {
                                loadToast("generic-number-required", 2500, "rounded");
                            }
                            element.addClass("invalid");
                            returnValue = false;
                        }
                    }
                }
            }
        } else if (validations.type == "select"){
            if($("#" + validations.wrapper).is(":hidden")){
                returnValue = true;
            } else {
                if(validations.required != undefined){
                    if(validations.required.value == true){
                        if(validations.invalidValues != undefined){
                            for(var invalid of validations.invalidValues){
                                if(element.val() == invalid){
                                    returnValue = false;
                                    if(validations.required.toast != undefined){
                                        loadToast(validations.required.toast, 2500, "rounded");
                                    } else {
                                        loadToast("generic-select-required", 2500, "rounded");
                                    }
                                }
                            }
                        } else {
                            if(element.val() == undefined){
                                returnValue = false;
                                if(validations.required.toast != undefined){
                                    loadToast(validations.required.toast, 2500, "rounded");
                                } else {
                                    loadToast("generic-select-required", 2500, "rounded");
                                }
                            } else {
                                returnValue = true;
                            }
                        }                                       
                    }
                }
            }
        } else if (validations.type == "radio"){
            if(validations.required.value == true){
                if($("input[name='" + validations.groupName + "']:checked").val() == undefined){
                    returnValue = false;
                    if(validations.required.toast != undefined){
                        loadToast(validations.required.toast, 2500, "rounded");
                    } else {
                        loadToast("generic-radio-required", 2500, "rounded");
                    }
                }
            }
        }

        return returnValue;
    } 
});
