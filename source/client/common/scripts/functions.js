// Checks if the provided varible is defined, returning true it this 
// is the case or false otherwise
function isDefined(variable)
{
    return typeof variable !== 'undefined';
}

// Checks if a string is a Whitespace, useful for fields where you should enter
// a name. True for whitespace or scape characters, false for anything else

function isWhitespace(variable)
{
    var white = new RegExp(/^\s$/);
    return white.test(variable.charAt(0));
}

// Stores in the local storage all the user profile data
function storeUserDataInLocalStorage(userData)
{
    localStorage.role = userData.role;
    localStorage.exclusive_access = userData.exclusive_access;
    localStorage.employee_num = userData.employee_num;
    localStorage.first_name = userData.first_name;
    localStorage.last_name = userData.last_name;
    localStorage.email = userData.email;
    localStorage.login_name = userData.login_name;

    if (isDefined(userData.zone)) {
        localStorage.zone = userData.zone;
    }

    if (isDefined(userData.privileges)) {
        localStorage.privileges = JSON.stringify(userData.privileges);
    }
}


// Converts data codified in a query string in the URL into a JSON object
// [out]    return: the JSON object which contains the data codified in the
//          URL query string
function getURLQueryStringAsJSON()
{
    // get the URL query string
    var query = window.location.href;
    
    // check if there is a query string
    var queryStartIdx = query.indexOf("?");
    var isQueryEmpty = queryStartIdx == -1;
    if (isQueryEmpty) {
        // if there is not, return an empty string
        return '';
    }

    // remove the site name and keep only the query data
    query = query.substr(queryStartIdx + 1);
    
    // parse the query data into a JSON object 
    // decodeURIComponent() requires that the input string follows the same
    // valid syntax for JSON objects so that it can be converted 
    // successfully 
    return $.parseJSON('{"' + decodeURIComponent(query
        .replace(/&/g, '","')   // replace & with ","
        .replace(/=/g, '":"')   // replace = with ":"
        .replace(/\+/g, " "))   // replace + with " "
    + '"}');
}


// Checks both the file name extension and binary magic number of an uploaded
// file before being sent to the server for further processing. 
// [in]     files: array of the File objects that are going to be checked
// [in]     formatsToCheck: JSON object which describes the file formats that
//          are going to be validated; supported file formats are png, gif, 
//          jpeg, bmp and pdf. To indicate which file formats to validate, just
//          assign true to any of the supported file formats, for example: 
//          { png: true, pdf: true }
// [in]     onInvalidFile: the function callback to be invoqued when the file
//          format is invalid; after invoquing this callback, the function will
//          exit
function validateFileFormats(files, formatsToValidate, onInvalid) 
{
    // iterate each file 
    for (var file of files) {
        // create a file reader to be able to read binary data from them
        var fileReader = new FileReader();

        // callback to invoque when the file reader finished reading the file
        fileReader.onloadend = function(event) {
            // temporal variable where to store the results of each format 
            // validation
            var isValid = formatsToValidate;

            // read the first 4 bytes of the file, usually these contain the
            // file format's magic number
            var buffer = new DataView(event.target.result.slice(0, 4));

            // get the magic number from the file bytes, usually 4 bytes is enough
            var magicnum = buffer.getUint32(0);

            // check for PNG files
            if (formatsToValidate.png) {
                isValid.png = (magicnum == 0x89504e47);
            }

            // check for 3 different versions of JPEG files
            if (formatsToValidate.jpeg) {
                isValid.jpeg = (magicnum == 0xffd8ffe0 
                    || magicnum == 0xffd8ffe1 
                    || magicnum == 0xffd8ffe2);
            }

            // check for BMP files
            if (formatsToValidate.bmp) {
                // BMP magic number actually consists of only 2 bytes
                var bmpBuffer = new DataView(event.target.result.slice(0, 2));
                isValid.bmp = (bmpBuffer.getUint16(0) == 0x424d);
            }

            // check for GIF files
            if (formatsToValidate.gif) {
                isValid.gif = (magicnum == 0x47494638);
            }

            // check for PDF files
            if (formatsToValidate.pdf) {
                isValid.pdf = (magicnum == 0x25504446);
            }

            // from all the available isValid, if none of them passed, then
            // invoque the user defined invalid callback
            if (!isValid.png && !isValid.jpeg && !isValid.bmp 
                && !isValid.gif && !isValid.pdf) 
            {
                onInvalid();
            }
        }
        
        // use the file reader that we created to read the data of the
        // file
        fileReader.readAsArrayBuffer(file);
    }
}


// Enables searching elements in a table dynamically hiding those elements that 
// do not match the search item
// [in]     input: name of the search text box element
// [in]     column: table column class upon which the search will be performed
function dynamicSearchBind(input, column) {
    function isBound(input) {
        return input.is('[class*="bound-by-"');
    }

    $("#" + input).keyup(function (e) {
        $("." + column).each(function (e) {
            if($(this).text().search($("#" + input).val()) != -1){
                if(isBound($(this).parent())){
                    $(this).parent().removeClass("bound-by-" + input);
                    if(!isBound($(this).parent())){
                        $(this).parent().attr("style", "");
                    }
                }
            } else {
                $(this).parent().attr("style", "display:none;");
                $(this).parent().addClass("bound-by-" + input);
            }
        });
    });
}