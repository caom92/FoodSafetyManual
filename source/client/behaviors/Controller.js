// Interface for communicating with the server
// [in]     host: the URL of the host to which the services will be requested
// [in]     services: associative array that indicate the services that the 
//          host provide where the key specifies the service name and the 
//          value especifies the URL 
Controller = function(host, services)
{
    this.host = host;
    this.services = services;
}


// The default callback to invoque when the request failed to be delivered
// to the server
Controller.prototype.defaultErrorCallback = function(xhr, status, message)
{
    console.log('server says: ' + status + ', ' + message);
}


// Sends a service request to the server
// [in]     service: the name of the service that we are requesting for
// [in]     cache: flag that indicates if we want the response to be
//          cached or not
// [in]     data: JSON object that specifies the data to be appended with
//          our request
// [in]     success: the callback to invoque when the server answered to
//          our request successfully
// [in]     [error]: the callback to invoque when the request failed to 
//          be delivered to the server
// [in]     [isFormData]: flag that indicates if the data that was 
//          appended to our request is an instance of FormData
Controller.prototype.request = function(service, data, success, 
    error = this.defaultErrorCallback, isFormData = false)
{
    // throw an exception if the requested service is not provided by
    // the server
    if (this.services.indexOf(service) == -1) {
        throw 'The requested service ' + service + ' is not registered.';
    }

    // check if the data appended is an instance of FormData
    if (!isFormData) {
        $.ajax({
            // the complete URL of the service that will be requested
            url: this.host + service,

            // the HTTP method to use 
            method: 'POST',

            // the data to be sent to the server
            data: data,

            // indicates that we expect to recieve a JSON object as response
            dataType: 'json',

            // callback to invoque when the communication was successful
            success: success,

            // callback to invoque when the communication failed
            error: error
        });
    } else {
        $.ajax({
            // the complete URL of the service that will be requested
            url: this.host + service,

            // the HTTP method to use 
            method: 'POST',

            // the data to be sent to the server
            data: data,

            // indicates that we expect to recieve a JSON object as response
            dataType: 'json',

            // indicates that we don't want jQuery to transform the data into a 
            // URL query string
            processData: false,

            // indicates that we don't want jQuery to set a content-type header
            contentType: false,

            // callback to invoque when the communication was successful
            success: success,

            // callback to invoque when the communication failed
            error: error
        });
    }
}


// Instantiate the controller class that we have just created as a global 
// variable
$server = new Controller('/espresso/services/', [
    'status',
    'login',
    'logout',
    'check-session',
    'password-recovery',
    'token-validation',
    'change-username',
    'change-password',
    'change-password-by-recovery',
    'change-email',
    'send-bug-report',
    'list-zones',
    'list-programs',
    'list-modules'
]);