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
    setLanguage(lang);
    if(lang == "es") {
        $.ajax({
        url: $root + '/data/files/languages.xml',
        success: function(xml) {
            $(xml).find('translation').each(function(){
                var id = $(this).attr('id');
                var text = $(this).find("spanish").text();
                $("." + id).text(text);
            });
        }
    });
    } else if (lang == "en") {
        $.ajax({
            url: $root + '/data/files/languages.xml',
            success: function(xml) {
                $(xml).find('translation').each(function(){
                    var id = $(this).attr('id');
                    var text = $(this).find("english").text();
                    $("." + id).text(text);
                });
            }
        });
    } else {
        changeLanguage(defaultLanguage);
    }

    if(typeof callback == "function"){
        callback();
    } else if (callback == undefined) {
        console.log("not defined");
    } else {
        console.log("not a function");
    }
}

function loadDefaultLanguage(){
    changeLanguage(localStorage.defaultLanguage);
    console.log("Default language loaded: " +  localStorage.defaultLanguage);
}

function loadToast(id, time, style){
    var lang = fromCodeToName(getLanguage());
    var toast = "Undefined Toast Message";
    $.ajax({
        url: $root + '/data/files/toasts.xml',
        success: function(xml) {
            $(xml).find('translation').each(function(){
                if($(this).attr("id") == id){
                    toast = $(this).find(lang).text();
                }
            });
            Materialize.toast(toast, time, style);
        }
    });
}

/* Incomplete errorMessage function. Uncomment at your own risk
function errorMessage(id){
    var description;
    var causes_heading;
    var causes;
    var suggestions_heading;
    var suggestions;
    if(localStorage.defaultLanguage == "es") {
        $.ajax({
        url: $root + '/data/files/errors.xml',
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