var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
		{name: "Salmon Creeks", image: "http://www.photosforclass.com/download/7626464792"},
		{name: "Granite Hill",  image: "http://www.photosforclass.com/download/4684194306"},
		{name: "Salmon Creeks", image: "http://www.photosforclass.com/download/7626464792"},
		{name: "Granite Hill",  image: "http://www.photosforclass.com/download/4684194306"},
		{name: "Salmon Creeks", image: "http://www.photosforclass.com/download/7626464792"},
		{name: "Granite Hill",  image: "http://www.photosforclass.com/download/4684194306"},
		{name: "Clay Mountain", image: "http://www.photosforclass.com/download/5641024448"}
	];

app.get("/", function(req, res) {
	res.render("landing");
});

app.get("/campgrounds", function(req, res) {
	res.render("campgrounds", {campgrounds:campgrounds});
});

app.get("/campgrounds/new", function(req, res) {
	res.render("new.ejs");
});

app.post("/campgrounds", function(req, res) {
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name: name, image: image};
	campgrounds.push(newCampground);
	res.redirect("/campgrounds");
});

app.listen(8080, function() {
	console.log("Yelp server is running.");
})