// Interface for communicating with the server
// [in]     host: the URL of the host to which the services will be requested
// [in]     services: associative array that indicate the services that the 
//          host provide where the key specifies the service name and the 
//          value is a flag that defines if the response of that service should 
//          be cached or not 
Controller = function(host, services)
{
    this.host = host;
    this.services = services;
}


// Sends a service request to the server using the HTTP GET method;
// GET responses are always cached
// [in]     service: the name of the service that we are requesting for
// [in]     data: JSON object that specifies the data to be appended with
//          our request
// [in]     success: the callback to invoque when the server answered to
//          our request successfully
// [in]     error: the callback to invoque when the request failed to 
//          be delivered to the server
Controller.prototype.get = function(service, data, success, error)
{
    // throw an exception if the requested service is not provided by
    // the server
    if (this.services.indexOf(service) == -1) {
        throw 'The requested service ' + service + ' is not registered.';
    }

    $.ajax({
        // the complete URL of the service that will be requested
        url: this.host + service,

        // the HTTP method to use 
        method: 'GET',

        // the data to be sent to the server
        data: data,

        // indicates that we expect to recieve a JSON object as response
        dataType: 'json',

        // callback to invoque when the communication was successful
        success: success,

        // callback to invoque when the communication failed
        error: error
    });
}


// Sends a service request to the server using the HTTP POST method;
// POST responses are never cached and they will always send data to the
// server
// [in]     service: the name of the service that we are requesting for
// [in]     data: JSON object that specifies the data to be appended with
//          our request
// [in]     success: the callback to invoque when the server answered to
//          our request successfully
// [in]     error: the callback to invoque when the request failed to 
//          be delivered to the server
Controller.prototype.post = function(service, data, success, error)
{
    // throw an exception if the requested service is not provided by
    // the server
    if (this.services.indexOf(service) == -1) {
        throw 'The requested service ' + service + ' is not registered.';
    }

    // check if the data appended is an instance of FormData
    var dataIsFormData = data instanceof FormData; 
    if (!dataIsFormData) {
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


// Sends a service request to the server
// [in]     options: JSON object that configures the request and its contents; 
//          the available options are the following:
//          -   [service]: the name of the service which we want to request
//          -   [data]: JSON object which defines the data to be sent alongside
//              the request as input parameters for the service
//          -   [cache]: flag that indicates if the response should be cached 
//              or not
//          -   [success]: callback to invoque when the server replied to our 
//              request successfully 
//          -   [error]: callback to invoque when the server could not reply to
//              our request 
Controller.prototype.request = function(options)
{
    // throw an exception if the requested service is not provided by
    // the server
    if (this.services.indexOf(options.service) == -1) {
        throw 'The requested service ' + options.service 
            + ' is not registered.';
    }

    // retrieve the values of the input parameters or fall back to the
    // default values if they are undefined
    var service = (isDefined(options.service)) ? options.service : '';
    var data = (isDefined(options.data)) ? options.data : {};
    var success = (isDefined(options.success)) ? 
        options.success : function() {};
    var error = (isDefined(options.error)) ? options.error : function() {
        console.log('server says: ' + status + ', ' + message);
    };

    // checks if the response should be cached
    var cacheResponse = (isDefined(options.cache)) ? options.cache : false;

    if (cacheResponse) {
        // if it should be cached, send request using the GET method
        this.get(service, data, success, error);
    } else {
        // if it should not be cached, send request using the POST method
        this.post(service, data, success, error);
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