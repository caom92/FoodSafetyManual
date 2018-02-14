<?php

    namespace fsm\report\html;

    require_once realpath(dirname(__FILE__)."/../Controller.php");

    use fsm\validations as val;
    use fsm\database as db;

    class HTMLElement {
        private $tag;
        private $classes = "";
        private $attributes = array();
        private $content = array();

        public function addClass($classes){
            if($this->classes=="")
                $this->classes .= $classes;
            else
                $this->classes .= " ".$classes;
        }

        public function attr($attribute, $value){
            $this->attributes[$attribute] = $value;
        }

        public function append($content){
            array_push($this->content, $content);
        }

        public function echoContents(){
            echo json_encode($this->content);
        }

        public function __construct($tag){
            $this->tag = $tag;
        }

        public function __toString(){
            $text = "";

            // Opening tag without a >, we must first append classes and attributes

            $text .= "<";
            $text .= $this->tag;

            // Append classes

            $text .= " class=\"".$this->classes."\"";

            // Add attributes

            foreach ($this->attributes as $key => $value) {
                $text .= " ".$key."=\"".$value."\"";
                // $text .= $key."lmao";
            }

            // Close opening tag

            $text .= ">";

            // Append contents

            foreach (array_flatten($this->content) as $value) {
                $text .= $value;
            }

            // Add closing tag

            $text .= "</".$this->tag.">";

            return $text;
        }
    }

    function decomposeArray($input){
        // Must return either an string or a unidimensional string array
        $returnArray = array();
        if(is_array($input)){
            foreach ($input as $key => $value) {
                array_push($returnArray, decomposeArray($value));
            }
        } else {
            return $input;
        }

        return $returnArray;
    }

    function flatten_array($array) {
        // Continue until $array is a one-dimensional array.
        $continue = TRUE;
        while ($continue) {
            $continue = FALSE;

            // Walk through top and second level of $array and move 
            // all values in the second level up one level.
            foreach ($array as $key => $value) {
                if (is_array($value)) {
                    // Second level found, therefore continue.
                    $continue = TRUE;

                    // Move each value a level up.
                    foreach ($value as $child_key => $child_value) {
                        array_push($array, $child_value);
                    }

                    // Remove second level array from top level.
                    unset($array[$key]);
                }
            }
        }

        return $array;
    }

    function array_flatten($array) {
        $return = array();

        foreach ($array as $key => $value) {
            if (is_array($value)){ $return = array_merge($return, array_flatten($value));}
            else {$return[$key] = $value;}
        }

        return $return;
    }

    class stdObject {
        public function __construct(array $arguments = array()) {
            if (!empty($arguments)) {
                foreach ($arguments as $property => $argument) {
                    $this->{$property} = $argument;
                }
            }
        }

        public function __call($method, $arguments) {
            $arguments = array_merge(array("stdObject" => $this), $arguments); // Note: method argument 0 will always referred to the main class ($this).
            if (isset($this->{$method}) && is_callable($this->{$method})) {
                return call_user_func_array($this->{$method}, $arguments);
            } else {
                throw new Exception("Fatal error: Call to undefined method stdObject::{$method}()");
            }
        }
    }

    function reportTable($id, $classes, $header, $body, $footer){
        $table = new HTMLElement("table");

        $table->addClass($classes);

        if($id)
            $table->attr("id", $id);

        $table->append($header);
        $table->append($body);
        // $table->append($footer);

        return $table;
    }

    function reportBody($id, $classes, $rowsArray){

        $body = new HTMLElement("tbody");

        $body->addClass($classes);

        if($id)
            $body->attr("id", $id);

        foreach($rowsArray as $value){
            $body->append(reportRow($id, $classes, $value));
        };

        return $body;
    }

    function reportFooter(){

    }

    function reportTitle($id, $classes, $titleArray){
        // Title Array must be as follows
        // An array of objects with attributes classes and colspan
        // Classes will be the classes added to the <th>
        // colspan will be the number of columns the <th> will span
        // {classes: "class", colspan: 2}

        $header = new HTMLElement("thead");
        $headerRow = new HTMLElement("tr");

        $headerRow->addClass($classes);

        if($id)
            $headerRow->attr("id", $id);

        
        foreach ($titleArray as $index){
            $th = new HTMLElement("th");

            if(property_exists($index, "classes"))
                $th->addClass($index->classes);

            if(property_exists($index, "colspan"))
                $th->attr("colspan", $index->colspan);

            if(property_exists($index, "contents"))
                $th->append($index->contents);

            $headerRow->append($th);
        };

        $header->append($headerRow);

        return $header;
    }

    function reportRow($id, $classes, $columnArray){
        // Column Array must be as follows
        // An array of objects with attributes classes, rowspan and contents
        // Classes will be the classes added to the <td>
        // rowspan will be the rows the <td> will span
        // contents will be the contents to be shown on the <td>
        // {classes: "class", rowspan: 2, contents: "Hello World"}

        $row = new HTMLElement("tr");

        $row->addClass($classes);

        if($id)
            $row->attr("id", $id);

        foreach($columnArray as $column){
            $row->append(reportRowColumn($column));
        }

        return $row;
    }

    function reportRowColumn($columnObject){
        // Column Array must be as follows
        // A singlem object with attributes
        // Classes will be the classes added to the <td>
        // rowspan will be the rows the <td> will span
        // contents will be the contents to be shown on the <td>
        // {classes: "class", rowspan: 2, contents: "Hello World"}

        $column = new HTMLElement("td");

        if(property_exists($columnObject, "classes"))
            $column->addClass($columnObject->classes);

        if(property_exists($columnObject, "rowspan"))
            $column->attr("rowspan", $columnObject->rowspan);

        if(property_exists($columnObject, "contents"))
                $column->append($columnObject->contents);

        return $column;
    }

    function headerTestData(){
        $headers = json_decode('[
            {"contents": "Área", "classes":"area_title areaColumn"},
            {"contents": "Hora", "classes":"time_title timeColumn"},
            {"contents": "#", "classes":"number_title numberColumn"},
            {"contents": "Nombre", "classes":"name_title nameColumn"},
            {"contents": "Condiciones", "classes":"status_title statusColumn"},
            {"contents": "Acción correctiva", "classes":"action_title actionColumn"},
            {"contents": "Comentarios", "classes":"comment_title commentColumn"}
        ]');

        return $headers;
    }

    function testData(){
        return json_decode('[[{"rowspan":7,"contents":"Warehouse","classes":"areaColumn"},{"rowspan":7,"contents":"12:09","classes":"timeColumn"},{"contents":1,"classes":"numberColumn"},{"contents":"Floors","classes":"nameColumn"},{"contents": "Aceptable", "classes":"green-text acceptable_tag statusColumn"},{"contents":"N/A","classes":"actionColumn"},{"contents":"","classes":"commentColumn"}],[{"contents":2,"classes":"numberColumn"},{"contents":"Ceiling Lights","classes":"nameColumn"},{"contents": "Aceptable", "classes":"green-text acceptable_tag statusColumn"},{"contents":"N/A","classes":"actionColumn"},{"contents":"","classes":"commentColumn"}],[{"contents":3,"classes":"numberColumn"},{"contents":"Trash Recepticales","classes":"nameColumn"},{"contents": "Aceptable", "classes":"green-text acceptable_tag statusColumn"},{"contents":"N/A","classes":"actionColumn"},{"contents":"","classes":"commentColumn"}],[{"contents":4,"classes":"numberColumn"},{"contents":"Equipment Tomatoes","classes":"nameColumn"},{"contents": "Aceptable", "classes":"green-text acceptable_tag statusColumn"},{"contents":"N/A","classes":"actionColumn"},{"contents":"","classes":"commentColumn"}],[{"contents":5,"classes":"numberColumn"},{"contents":"Stainless Table (5)","classes":"nameColumn"},{"contents": "Aceptable", "classes":"green-text acceptable_tag statusColumn"},{"contents":"N/A","classes":"actionColumn"},{"contents":"","classes":"commentColumn"}],[{"contents":6,"classes":"numberColumn"},{"contents":"Roll Up Loading Doors","classes":"nameColumn"},{"contents": "Aceptable", "classes":"green-text acceptable_tag statusColumn"},{"contents":"N/A","classes":"actionColumn"},{"contents":"","classes":"commentColumn"}],[{"contents":7,"classes":"numberColumn"},{"contents":"Forklift/Palletjack/Wave","classes":"nameColumn"},{"contents": "Aceptable", "classes":"green-text acceptable_tag statusColumn"},{"contents":"N/A","classes":"actionColumn"},{"contents":"","classes":"commentColumn"}],[{"rowspan":7,"contents":"Cooler #1","classes":"areaColumn"},{"rowspan":7,"contents":"12:09","classes":"timeColumn"},{"contents":1,"classes":"numberColumn"},{"contents":"Floors","classes":"nameColumn"},{"contents": "Aceptable", "classes":"green-text acceptable_tag statusColumn"},{"contents":"N/A","classes":"actionColumn"},{"contents":"","classes":"commentColumn"}],[{"contents":2,"classes":"numberColumn"},{"contents":"Cool Care Fans","classes":"nameColumn"},{"contents": "Aceptable", "classes":"green-text acceptable_tag statusColumn"},{"contents":"N/A","classes":"actionColumn"},{"contents":"","classes":"commentColumn"}],[{"contents":3,"classes":"numberColumn"},{"contents":"Ceiling Lights","classes":"nameColumn"},{"contents": "Aceptable", "classes":"green-text acceptable_tag statusColumn"},{"contents":"N/A","classes":"actionColumn"},{"contents":"","classes":"commentColumn"}],[{"contents":4,"classes":"numberColumn"},{"contents":"Trash Recepticales","classes":"nameColumn"},{"contents": "Aceptable", "classes":"green-text acceptable_tag statusColumn"},{"contents":"N/A","classes":"actionColumn"},{"contents":"","classes":"commentColumn"}],[{"contents":5,"classes":"numberColumn"},{"contents":"Walls","classes":"nameColumn"},{"contents": "Aceptable", "classes":"green-text acceptable_tag statusColumn"},{"contents":"N/A","classes":"actionColumn"},{"contents":"","classes":"commentColumn"}],[{"contents":6,"classes":"numberColumn"},{"contents":"Plastic Curtains","classes":"nameColumn"},{"contents": "Aceptable", "classes":"green-text acceptable_tag statusColumn"},{"contents":"N/A","classes":"actionColumn"},{"contents":"","classes":"commentColumn"}],[{"contents":7,"classes":"numberColumn"},{"contents":"Cooling Units","classes":"nameColumn"},{"contents": "Aceptable", "classes":"green-text acceptable_tag statusColumn"},{"contents":"N/A","classes":"actionColumn"},{"contents":"","classes":"commentColumn"}],[{"rowspan":6,"contents":"Cooler #2","classes":"areaColumn"},{"rowspan":6,"contents":"12:09","classes":"timeColumn"},{"contents":1,"classes":"numberColumn"},{"contents":"Floors","classes":"nameColumn"},{"contents": "Aceptable", "classes":"green-text acceptable_tag statusColumn"},{"contents":"N/A","classes":"actionColumn"},{"contents":"","classes":"commentColumn"}],[{"contents":2,"classes":"numberColumn"},{"contents":"Ceiling Lights","classes":"nameColumn"},{"contents": "Aceptable", "classes":"green-text acceptable_tag statusColumn"},{"contents":"N/A","classes":"actionColumn"},{"contents":"","classes":"commentColumn"}],[{"contents":3,"classes":"numberColumn"},{"contents":"Trash Recepticales","classes":"nameColumn"},{"contents": "Aceptable", "classes":"green-text acceptable_tag statusColumn"},{"contents":"N/A","classes":"actionColumn"},{"contents":"","classes":"commentColumn"}],[{"contents":4,"classes":"numberColumn"},{"contents":"Walls","classes":"nameColumn"},{"contents": "Aceptable", "classes":"green-text acceptable_tag statusColumn"},{"contents":"N/A","classes":"actionColumn"},{"contents":"","classes":"commentColumn"}],[{"contents":5,"classes":"numberColumn"},{"contents":"Plastic Curtains","classes":"nameColumn"},{"contents": "Aceptable", "classes":"green-text acceptable_tag statusColumn"},{"contents":"N/A","classes":"actionColumn"},{"contents":"","classes":"commentColumn"}],[{"contents":6,"classes":"numberColumn"},{"contents":"Cooling Units","classes":"nameColumn"},{"contents": "Aceptable", "classes":"green-text acceptable_tag statusColumn"},{"contents":"N/A","classes":"actionColumn"},{"contents":"","classes":"commentColumn"}]]');
    }

    /*echo json_encode(testData());

    echo "<br><br>";

    echo json_encode(flatten_array(testData()));

    echo "<br><br>";

    echo json_encode(array_flatten(testData()));*/

/*
    $testObject = new HTMLElement("div");

    $testObject->append("Soy un hermoso div de prueba");
    $testObject->append(array("Soy un hermoso div de prueba", "Soy un hermoso div de prueba"));

    $testObject->echoContents();

    echo $testObject;*/

    // echo reportRowColumn(testData()[0][0]);

    //echo reportTable("testTable", "lmao", reportTitle(null, "whatever", headerTestData()), reportBody(null, "whatever", testData()), null);

    //$testController = new Controller();

    /*

    $testObject = new HTMLElement("div");

    $testObject->addClass("center");
    $testObject->addClass("green-text");
    $testObject->addClass("nameColumn");
    $testObject->attr("id", "test_id");
    $testObject->attr("rowspan", "7");
    $testObject->append("Soy un hermoso div de prueba");
    $testObject->append(new HTMLElement("p"));

    echo $testObject;*/
?>