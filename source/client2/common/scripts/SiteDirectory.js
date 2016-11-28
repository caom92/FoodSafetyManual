// Angular service that contains links that describe the directory tree for
// accessing different parts of the system's front end
class SiteDirectory
{
  // Returns an objects that describes the directory tree
  constructor() {
    this.root = '/espresso/'
    this.data = {
      files: this.root + 'data/files/'
    }
    this.services = this.root + 'services/'
    this.scripts = this.root + 'scripts/'
    this.common = {
      views: this.root + 'common/views/',
      controllers: this.root + 'common/controllers/'
    }
    this.administrator = {
      views: this.root + 'administrator/views/',
      controllers: this.root + 'administrator/controllers/'
    }
  }
}
