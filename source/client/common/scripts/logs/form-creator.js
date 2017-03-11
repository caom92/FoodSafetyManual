// Generic input creator

/*
{
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
    if($.type(fieldObject) == "object"){
        if(fieldObject.type == "input"){
            field = createTextField(fieldObject);
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

    if(selectObject.classes)
        select.addClass(selectObject.classes);

    for(var option of selectObject.options)
        select.append(createOption(option));

    if($.type(selectObject.validations) == "object"){
        select.data("validations", selectObject.validations);
        select.addClass("formValidator");
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

    buttonWrapper.addClass("center-align");
    button.addClass("waves-effect waves-light btn");

    if(buttonObject.id)
        button.attr("id", buttonObject.id);

    if(buttonObject.classes)
        buttonWrapper.addClass(classes);

    if(buttonObject.icon)
        button.append(createIcon(buttonObject.icon));

    buttonWrapper.append(button);

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

    if(buttonObject.classes)
        floatingButton.addClass(buttonObject.classes);

    if(buttonObject.icon)
        floatingButton.append(createIcon(buttonObject.icon));

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

/*$(function (){
    $.getScript( "source/client/supervisor/behaviors/gmp-packing-preop.js", function( data, textStatus, jqxhr ) {
        console.log( "Load was performed." );
        var header = {"rows":[{"columns":[{"styleClasses":"col s12 m12 l12", "columnText":"Pre-operational Log"}]},{"columns":[{"styleClasses":"col s4 m4 l4","textClasses":"zone_name","columnText":"LAW"},{"styleClasses":"col s4 m4 l4","textClasses":"program_name","columnText":"GMP"},{"styleClasses":"col s4 m4 l4","textClasses":"module_name","columnText":"Packing"}]},{"columns":[{"styleClasses":"col s6 m6 l6","textClasses":"date_name","columnText":"2017-01-23"},{"styleClasses":"col s6 m6 l6","textClasses":"made_by","columnText":"Empleado I"}]}]};
        $("#content_wrapper").append(logHeader(header));
        loadLogForm(null, "#content_wrapper");
        loadFunctionality();
        changeLanguage(localStorage.defaultLanguage);
    }); 
});*/

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
            //console.log("Type text");
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
        } else if (validations.type == "number"){
            //console.log("Type number");

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
            }
        } else if (validations.type == "select"){
            if($("#" + validations.wrapper).is(":hidden")){
                returnValue = true;
            } else {
                if(validations.required != undefined){
                    if(validations.required.value == true){
                        //console.log("Type select");
                        //console.log(element.val());
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
