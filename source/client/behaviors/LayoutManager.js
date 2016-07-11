// Interface for displaying layouts to the screen and executing their
// corresponding behavior after it loads
// [in]     root: the root URL from which every layout is going to be 
//          requested
// [in]     container: the DOM container which the layour is going to be 
//          loaded to
LayoutManager = function(root, container)
{
    this.root = root;
    this.container = container;

    // asscociative array where the behaviors are stored; key indicates
    // the name of the layout and value is the behavior itself
    this.behaviors = [];
}


// Laods the especified layout and executes its corresponding behavior
// [in]     layout: the name of the layout to load
// [in]     [container]: the selector of the HTML tag where to load the
//          especified layout; the default value is the container 
//          especified in the layout manager's constructor
LayoutManager.prototype.load = function(layout)
{
    // check if the layout behavior exists
    try {
        isBehaviorDefined = isDefined(this.behaviors[layout]); 
        if (isBehaviorDefined) {
            // if it does, load the layout to the container and then 
            // execute the behavior
            $(this.container).load(this.root + layout, this.behaviors[layout]);
        } else {
            // if not, throw an error
            throw 'The requested behavior "' + layout + '" is undefined.';
        }
    } catch (e) {
        this.handleException(e);
    }
}


// Catches an exception and process it properly
LayoutManager.prototype.handleException = function(exception)
{
    // for now, simply print to console
    console.log(exception);
}


// Instantiate the LayoutManager clas that we just created as a global
// variable
$app = new LayoutManager($root + '/layouts/', '#page-content');