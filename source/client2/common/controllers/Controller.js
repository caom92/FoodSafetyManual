// Basic definition of an Angular controller for this system; any code that 
// will be shared among all controllers should be placed here
class Controller
{
  // Returns an instance of the controller
  // [in]     $scope: interface for accessing the model of the page being 
  //          presented
  // [in]     site: description of the system's frontend directory tree
  // [in]     server: interface for communicating with the system's backend
  constructor($scope, site, server) {
    this.scope = $scope
    this.site = site
    this.server = server
  }
}