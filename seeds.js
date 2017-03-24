var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3393/3510641019_bc91eb6818.jpg",
        description: "etc etc etc"
    },
    {
        name: "Desert Mesa", 
        image: "https://farm4.staticflickr.com/3247/2984118763_043f6f486e.jpg",
        description: "etc etc etc"
    },
    {
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/661/32853307921_c804935e58.jpg",
        description: "etc etc etc"
    }
];

function seedDB() {
    // remove all campgrounds
    Campground.remove({}, function(err) {
        if(err) {
            console.log(err);
        } 
        console.log("removed campgrounds!");
        // add campgrounds
        data.forEach(function(seed) {
            Campground.create(seed, function(err, campground) {
                if(err) {
                    console.log(err);
                } else {
                    console.log("added a campground");
                    Comment.create(
                        {
                            text: "This place is great, but I wish there was internet",
                            author: "Homer"
                        }, function(err, comment) {
                            if(err) {
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("created a new comment");
                            }
                        });
                }
            });
        });
    });
}

module.exports = seedDB;