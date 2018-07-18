//requiring node modules
var express = require('express');
//calling express
var app = express();
bodyParser = require("body-parser");
var mongoose = require("mongoose");

/**
 * Parses the body of the request in a json format,
 * saves it to an object called ' req.body '
 */

app.use(bodyParser.urlencoded({extended: true}));

/**
 * Sets the default view engine for express to .ejs
 * 
 * It will now look in the view folder and expect .ejs files to process
 * 
 * This allows us to not have to add the extension .ejs to the 'res.render' function everytime.
 * 
 */

app.set("view engine", "ejs");


//Connect to mongodb through mongoose, create a db.
mongoose.connect("mongodb://localhost/imgur_clone");

//schema setup
var imagePostSchema = new mongoose.Schema({
    title: String,
    image: String,
});

/**
 * Creates and reads the model that will be used in the database for the entries.
 * Using this model we can manipulate the db directly.
 * 
 * The models will be inserted into the collection: 'imageposts'
 * 
 * Mongoose takes the first parameter: 'Imagepost', lowercases and pluralizes it,
 * and then uses that as the collection name. i.e.: 'imageposts'
 */

var Imagepost = mongoose.model("Imagepost", imagePostSchema);


app.get("/",function(req,res){
    res.render("landing");
})

app.get("/fliktur", function(req,res){
    res.render("index");
});

app.get("/fliktur/new",function(req,res){
    res.render("new");
})


app.get("/fliktur/:id",function(req,res){
    res.render("show");
});

//listen to port 3000
app.listen(3000, function(){
    console.log("server is running!");
})