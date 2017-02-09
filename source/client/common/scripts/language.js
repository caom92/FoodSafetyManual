/***
This set of functions is needed to switch between the supported languages.
As established in the requirements document, only two languages shall be
supported; english and spanish. In order to add new languages, both this
file and 'languages.xml' need to be updated as per the instructions on
the developer's manual
***/

/*
Default languages for the app. It must be noted that we follow the ISO 639-1
standard.
*/

var defaultLanguage = "en";

/*
function setLanguage(lang)

Sets the prefered language for the user in local storage.
*/

function setLanguage(lang){
    var supportedLanguages = ["es", "en"];
    if((supportedLanguages.indexOf(lang) > -1)){
        localStorage.defaultLanguage = lang;
    } else {
        localStorage.defaultLanguage = defaultLanguage;
    }
}

function getLanguage(){
    var supportedLanguages = ["es", "en"];
    if(!(supportedLanguages.indexOf(localStorage.defaultLanguage) > -1)){
        localStorage.defaultLanguage = defaultLanguage;
    }
    return localStorage.defaultLanguage;
}

function fromCodeToName(code){
    var lang = "english";
    switch(code){
        case "es": lang = "spanish"; break;
        case "en": lang = "english"; break;
    }
    return lang;
}

/*
function changeLanguage(lang)

Return value - none

Parameters

lang - Two letter code for the language, following the ISO 639-1 standard.

This functions changes the current view language to one chosen by the user.
It also changes the user language (in local storage) to the selected language.
*/

function changeLanguage(lang, callback){
    if(lang == undefined){
        lang = getLanguage();
    }
    if(lang == "es") {
        if(localStorage.spanish == undefined){
            $.ajax({
                url: $root + 'data/files/languages.xml',
                success: function(xml) {
                    var spanishData = [];
                    $(xml).find('translation').each(function(){
                        var tempObject = {};
                        var id = $(this).attr('id');
                        var text = $(this).find("spanish").text();
                        $("." + id).text(text);
                        tempObject.className = id;
                        tempObject.content = text;
                        spanishData.push(tempObject);
                    });
                    localStorage.spanish = JSON.stringify(spanishData);
                    $('select').material_select('destroy');
                    $('select').material_select();
                }
            });
        } else {
            console.log("idioma cambiado desde localStorage");
            var spanishData = JSON.parse(localStorage.spanish);
            for(var langField of spanishData){
                $("." + langField.className).text(langField.content);
            }
            $('select').material_select('destroy');
            $('select').material_select();
        }
    } else if (lang == "en") {
        if(localStorage.english == undefined){
            $.ajax({
                url: $root + 'data/files/languages.xml',
                success: function(xml) {
                    var englishData = [];
                    $(xml).find('translation').each(function(){
                        var tempObject = {};
                        var id = $(this).attr('id');
                        var text = $(this).find("english").text();
                        $("." + id).text(text);
                        tempObject.className = id;
                        tempObject.content = text;
                        englishData.push(tempObject);
                    });
                    localStorage.english = JSON.stringify(englishData);
                    $('select').material_select('destroy');
                    $('select').material_select();
                }
            });
        } else {
            var englishData = JSON.parse(localStorage.english);
            for(var langField of englishData){
                $("." + langField.className).text(langField.content);
            }
            $('select').material_select('destroy');
            $('select').material_select();
        }
    } else {
        changeLanguage(defaultLanguage);
    }

    loadSearchSuggestions(lang);

    if(typeof createDatePicker == "function"){
        // createDatePicker();
    } else {
        // console.log("datePicker not present");
    }

    if(typeof callback == "function"){
        callback();
    } else if (callback == undefined) {
        // console.log("not defined");
    } else {
        // console.log("not a function");
    }
}

function loadSearchSuggestions(lang){
    if(lang == "es") {
        $.ajax({
            url: $root + 'data/files/search-suggestions.xml',
            success: function(xml) {
                $(xml).find('translation').each(function(){
                    var id = $(this).attr('id');
                    var text = $(this).find("spanish").text();
                    $("." + id).attr("placeholder", text);
                });
            }
        });
    } else if (lang == "en") {
        $.ajax({
            url: $root + 'data/files/search-suggestions.xml',
            success: function(xml) {
                $(xml).find('translation').each(function(){
                    var id = $(this).attr('id');
                    var text = $(this).find("english").text();
                    $("." + id).attr("placeholder", text);
                });
            }
        });
    }
}

function loadDefaultLanguage(){
    changeLanguage(localStorage.defaultLanguage);
    console.log("Default language loaded: " +  localStorage.defaultLanguage);
}

function loadToast(id, time, style, prepend, append){
    var lang = fromCodeToName(getLanguage());
    var toast = "Undefined Toast Message";
    if(localStorage.toasts == undefined){
        console.log("toast sent from xml");
        $.ajax({
            url: $root + 'data/files/toasts.xml',
            success: function(xml) {
                var toastMessages = {};
                $(xml).find('translation').each(function(){
                    toastMessages[$(this).attr("id")] = {
                        "en": $(this).find("english").text(),
                        "es": $(this).find("spanish").text()
                    };
                    if($(this).attr("id") == id){
                        toast = $(this).find(lang).text();
                    }
                });
                if(prepend)
                    toast = prepend + toast;
                if(append)
                    toast += append;
                Materialize.toast(toast, time, style);
                localStorage.toasts = JSON.stringify(toastMessages);
            }
        });
    } else {
        console.log("toast sent from localStorage");
        var toastMessages = JSON.parse(localStorage.toasts);
        var toast = toastMessages[id][getLanguage()];
        if(prepend)
            toast = prepend + toast;
        if(append)
            toast += append;
        Materialize.toast(toast, time, style);
    }
}

function embedTooltip(element, position, delay, tooltip){
    $(element).attr("data-position", position);
    $(element).attr("data-delay", delay);
    $(element).attr("data-tooltip", tooltip);
    $(element).addClass("tooltipped");

    $('.tooltipped').tooltip({delay: delay})
}

function datePicker(nameHidden, maxDate, minDate){
    var lang = getLanguage();
    var datePickerConfig;
    switch (lang) {
        case "es":
            datePickerConfig = {
                selectMonths: true, // Creates a dropdown to control month
                selectYears: 1000,
                monthsFull: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                monthsShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dec'],
                weekdaysFull: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
                weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
                weekdaysLetter: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
                today: 'Hoy',
                clear: 'Borrar',
                close: 'Cerrar',
                formatSubmit: "yyyy-mm-dd",
                showMonthsShort: true,
                hiddenSuffix: nameHidden,
                max: maxDate,
                min: minDate
            };
        break;
        case "en":
            datePickerConfig = {
                selectMonths: true, // Creates a dropdown to control month
                selectYears: 1000,
                formatSubmit: "yyyy-mm-dd",
                showMonthsShort: true,
                hiddenSuffix: nameHidden,
                max: maxDate,
                min: minDate
            };
        break;
    }
    return datePickerConfig;
}
