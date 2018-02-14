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
<<<<<<< HEAD
    setLanguage(lang);
    if(lang == "es") {
        $.ajax({
        url: $root + 'data/files/languages.xml',
        success: function(xml) {
            $(xml).find('translation').each(function(){
                var id = $(this).attr('id');
                var text = $(this).find("spanish").text();
                $("." + id).text(text);
            });
            $('select').material_select('destroy');
            $('select').material_select();
        }
    });
    } else if (lang == "en") {
        $.ajax({
            url: $root + 'data/files/languages.xml',
            success: function(xml) {
                $(xml).find('translation').each(function(){
                    var id = $(this).attr('id');
                    var text = $(this).find("english").text();
                    $("." + id).text(text);
                });
                $('select').material_select('destroy');
                $('select').material_select();
            }
        });
=======
    if(lang == undefined){
        lang = getLanguage();
    }
    if(lang == "es") {
        setLanguage("es");
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
        setLanguage("en");
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
>>>>>>> carlos
    } else {
        changeLanguage(defaultLanguage);
    }

    loadSearchSuggestions(lang);

<<<<<<< HEAD
    if(typeof callback == "function"){
        callback();
    } else if (callback == undefined) {
        console.log("not defined");
    } else {
        console.log("not a function");
=======
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
>>>>>>> carlos
    }
}

function loadSearchSuggestions(lang){
<<<<<<< HEAD
    if(lang == "es") {
        $.ajax({
            url: $root + '/data/files/search-suggestions.xml',
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
            url: $root + '/data/files/search-suggestions.xml',
            success: function(xml) {
                $(xml).find('translation').each(function(){
                    var id = $(this).attr('id');
                    var text = $(this).find("english").text();
                    $("." + id).attr("placeholder", text);
                });
            }
        });
=======
    var lang = fromCodeToName(getLanguage());
    if(localStorage.suggestions == undefined){
        $.ajax({
            url: $root + 'data/files/search-suggestions.xml',
            success: function(xml) {
                var searchSuggestions = {};
                $(xml).find('translation').each(function(){
                    var tempObject = {};
                    var id = $(this).attr('id');
                    var text = $(this).find(lang).text();
                    $("." + id).attr("placeholder", text);
                    searchSuggestions[$(this).attr("id")] = {
                        "en": $(this).find("english").text(),
                        "es": $(this).find("spanish").text()
                    };
                    localStorage.suggestions = JSON.stringify(searchSuggestions);
                });
            }
        });
    } else {
        var searchSuggestions = JSON.parse(localStorage.suggestions);
        for(var sug in searchSuggestions){
            $("." + sug).attr("placeholder", searchSuggestions[sug][getLanguage()]);
        }
>>>>>>> carlos
    }
}

function loadDefaultLanguage(){
    changeLanguage(localStorage.defaultLanguage);
    console.log("Default language loaded: " +  localStorage.defaultLanguage);
}

<<<<<<< HEAD
function loadToast(id, time, style){
    var lang = fromCodeToName(getLanguage());
    var toast = "Undefined Toast Message";
    $.ajax({
        url: $root + 'data/files/toasts.xml',
        success: function(xml) {
            $(xml).find('translation').each(function(){
                if($(this).attr("id") == id){
                    toast = $(this).find(lang).text();
                }
            });
            Materialize.toast(toast, time, style);
        }
    });
=======
function loadToast(id, time, style, prepend, append, subs){
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
                if($.isArray(subs)){
                    for(var sub of subs){
                        toast = toast.replace("{{value}}", sub);
                    }
                }
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
        if($.isArray(subs)){
            for(var sub of subs){
                toast = toast.replace("{{value}}", sub);
            }
        }
        toast = toast.replace(/{{value}}/g, "Undefined Value");
        if(prepend)
            toast = prepend + toast;
        if(append)
            toast += append;
        Materialize.toast(toast, time, style);
    }
>>>>>>> carlos
}

function embedTooltip(element, position, delay, tooltip){
    $(element).attr("data-position", position);
    $(element).attr("data-delay", delay);
    $(element).attr("data-tooltip", tooltip);
    $(element).addClass("tooltipped");

    $('.tooltipped').tooltip({delay: delay})
}

<<<<<<< HEAD
/* Incomplete errorMessage function. Uncomment at your own risk
function errorMessage(id){
    var description;
    var causes_heading;
    var causes;
    var suggestions_heading;
    var suggestions;
    if(localStorage.defaultLanguage == "es") {
        $.ajax({
        url: $root + 'data/files/errors.xml',
        success: function(xml) {
            $(xml).find('translation').each(function(){
                if($(this).attr('id') = id){
                    description = $(this).find("description").find("sp").text();
                    causes_heading = $(this).find("causes").find("heading").find("sp").text();
                    causes = $(this).find("causes").find("ul");
                    suggestions_heading = $(this).find("suggestions").find("heading").find("sp").text();
                    suggestions = $(this).find("causes").find("ul");
                }
                var id = $(this).attr('id');
                var text = $(this).find("spanish").text();
                $("." + id).text(text);
            });
        }
    });
    } else if(localStorage.defaultLanguage == "en") {

    } else {
        setLanguage(defaultLanguage);
        errorMessage(id);
    }
}
*/
=======
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
                onSet: function(change) {
                    if(change.select)
                        this.close();
                }
            };
        break;
        case "en":
            datePickerConfig = {
                selectMonths: true, // Creates a dropdown to control month
                selectYears: 1000,
                formatSubmit: "yyyy-mm-dd",
                showMonthsShort: true,
                onSet: function(change) {
                    if(change.select)
                        this.close();
                }
            };
        break;
    }

    if(nameHidden){
        datePickerConfig.hiddenSuffix = nameHidden;
    }

    if(maxDate){
        datePickerConfig.max = maxDate;
    }

    if(minDate){
        datePickerConfig.min = minDate;
    }

    return datePickerConfig;
}

function clearLanguageCache(){
    localStorage.removeItem("spanish");
    localStorage.removeItem("english");
    localStorage.removeItem("toasts");
    localStorage.removeItem("suggestions");
}
>>>>>>> carlos
