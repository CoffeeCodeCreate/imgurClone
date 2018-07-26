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



/**
 * 
 * Tells express to serve files form the 'public' folder
 * 
 */

app.use(express.static("public"));

//Connect to mongodb through mongoose, create a db.
mongoose.connect("mongodb://localhost/imgur_clone");

//schema setup

/**
 * Creates and reads the model that will be used in the database for the entries.
 * Using this model we can manipulate the db directly.
 * 
 * The models will be inserted into the collection: 'imageposts'
 * 
 * Mongoose takes the first parameter: 'Imagepost', lowercases and pluralizes it,
 * and then uses that as the collection name. i.e.: 'imageposts'
 */

var imagePostSchema = new mongoose.Schema({
    title: String,
    image: String,
});

var Imagepost = mongoose.model("Imagepost", imagePostSchema);

/*
    DUMMY POST USED FOR TESTING
*/
Imagepost.create({
    title: "Brain Power",
    image: "https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.X-J-U4R_-2NudxvBMukPugHaF1%26pid%3D15.1&f=1"
},

function(err,imagepost){
    if(err)
    {
        console.log(err);
    }
    else
    {
        console.log("Newly created campground");
        console.log(imagepost);
    }
});

app.get("/",function(req,res){
    res.render("landing");
})

app.get("/piktur", function(req,res){
    //get all campgrounds from DB
    Imagepost.find({}, function(err,allPosts){
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.render("index",{imageposts: allPosts}); //takes all the campgrounds from the DB
        }
    });
});

app.get("/piktur/new",function(req,res){
    res.render("new");
})


app.get("/piktur/:id",function(req,res){
    res.render("show");
});

//listen to port 3000
app.listen(3000, function(){
    console.log("server is running!");
})