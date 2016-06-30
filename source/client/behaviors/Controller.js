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


// Checks if the service provided is registered in the service list, returning
// true if this is the case or false otherwise
Controller.prototype.isServiceRegistered = function(service)
{
    return typeof this.services[service] !== 'undefined';
}


// The default callback to invoque when the request failed to be delivered
// to the server
Controller.prototype.defaultErrorCallback = function(xhr, status, message)
{
    console.log('server says: ' + status + ', ' + message);
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
    if (!this.isServiceRegistered(service)) {
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
    if (!this.isServiceRegistered(service)) {
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
// [in]     service: the name of the service that we are requesting for
// [in]     data: JSON object that specifies the data to be appended with
//          our request
// [in]     success: the callback to invoque when the server answered to
//          our request successfully
// [in]     [error]: the callback to invoque when the request failed to 
//          be delivered to the server
Controller.prototype.request = function(service, data, success,
    error = this.defaultErrorCallback)
{
    // throw an exception if the requested service is not provided by
    // the server
    if (!this.isServiceRegistered(service)) {
        throw 'The requested service ' + service + ' is not registered.';
    }

    // check if the response of this request should be cached or not
    var cacheResponse = this.services[service]; 

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
$server = new Controller('/espresso/services/', {
    'status': false,
    'login': false,
    'logout': false,
    'check-session': false,
    'password-recovery': false,
    'token-validation': false,
    'change-username': false,
    'change-password': false,
    'change-password-by-recovery': false,
    'change-email': false,
    'send-bug-report': false,
    'list-zones': true,
    'list-programs': true,
    'list-modules': true
});