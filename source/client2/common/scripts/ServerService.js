// Angular service that provides a communication interface to the system's
// back end
class ServerService
{
  // Returns an instance of the server interface
  // [in]       $http: interface for performing AJAX calls
  // [in]       site: description of the system's frontend directory tree
  constructor($http, site) {
    this.ajax = $http
    this.host = site.services
  }


  // Requests a service to the server and perform some action after it responses
  // [in]       service: a string that defines the name of the service being 
  //            requested
  // [in]       options: JSON object that contains additional information about 
  //            the request, the contents can be:
  //            - data: a JSON object that contains the data to be appended 
  //              along the request and sent to the server
  //            - success: a callback function to be executed if the server 
  //              responded successfully to the request
  //            - error: a callback function to be executed if the server did 
  //              not responded to the request
  request(service, options) {
    // start constructing the configuration object for the AJAX petition
    let config = {
      url: this.host + service,  // URL of the service to be requested
      responseType: 'json'       // we expect to recieve a JSON as response
    }

    // let isCacheDefined = isDefined(options.cache) 
    // let usePostMethod =
    //   isDefined(options.data) ||
    //   !isCacheDefined
    // if (usePostMethod) {

    // indicate the HTTP method to use
    config.method = 'POST'

    // check if the data to be sent is from an HTML5 form
    let isFormData = options.data instanceof FormData
    if (!isFormData) {
      // if it is not, append it normally
      config.data = options.data
    } else {
      // if it is, we need additional configuration so that the data is 
      // sent correctly
      config.headers = { 
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
      config.params = options.data
    }

    // } else {
    //   config.method = 'GET'
    //   config.cache = (isCacheDefined) ? options.data : false
    // }

    // defined a default on-error callback function it none was provided 
    // by the user
    let error = (!isDefined(options.error)) ?
      function(response) {
        console.log(`Server says: (${response.status}) ${response.statusText}`)
      } :
      options.error
    
    // finally, perform the AJAX request
    this.ajax(config).then(options.success, error)
  }
}